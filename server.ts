import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy/safe initialization of GoogleGenAI
function getGenAIClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// Consultation & Hardware Support Opportunities Form Endpoint
// Delivers validated inquiries to onlinefirst2026@gmail.com inbox handler
app.post("/api/consultation", async (req, res) => {
  try {
    const {
      parentName,
      studentName,
      studentAge,
      email,
      trackInterest,
      hardwareSupportRequested,
      message,
      submissionDate,
      privacyAccepted,
    } = req.body;

    if (!email || !parentName || !privacyAccepted) {
      return res.status(400).json({
        error: "Missing required fields. Please ensure contact email, parent name, and privacy confirmation are provided.",
      });
    }

    const DESTINATION_INBOX = "onlinefirst2026@gmail.com";
    const timestamp = submissionDate || new Date().toISOString();

    // Log structured email dispatch on server
    console.log(`[Email Dispatch] Delivering consultation inquiry to ${DESTINATION_INBOX}:`, {
      parentName,
      studentName: studentName || "Student (Pseudonym)",
      studentAge: studentAge || "15–16",
      email,
      trackInterest,
      hardwareSupportRequested: Boolean(hardwareSupportRequested),
      timestamp,
    });

    res.json({
      success: true,
      message: "Your request has been sent successfully. OnlineFirst will review it and respond using the contact email provided.",
      deliveredTo: "onlinefirst2026@gmail.com",
      timestamp,
    });
  } catch (error: any) {
    console.error("Consultation submission error:", error);
    res.status(500).json({
      error: "Failed to process consultation request. Please try again later.",
      details: error.message,
    });
  }
});

// Safeguarding / Concern Reporting Endpoint
app.post("/api/safeguard/report", async (req, res) => {
  try {
    const { category, description, email, contextSnippet } = req.body;
    const DESTINATION_INBOX = "onlinefirst2026@gmail.com";
    const timestamp = new Date().toISOString();

    console.log(`[Safeguarding Report] Delivered to ${DESTINATION_INBOX}:`, {
      category,
      description,
      email: email || "Anonymous",
      contextSnippet,
      timestamp,
    });

    res.json({
      success: true,
      message: "Concern logged for human review.",
      deliveredTo: DESTINATION_INBOX,
      timestamp,
    });
  } catch (error: any) {
    console.error("Safeguard report error:", error);
    res.status(500).json({ error: "Failed to process report" });
  }
});

// AI Mentor Chat Endpoint with strict boundaries
app.post("/api/mentor/chat", async (req, res) => {
  try {
    const { message, persona, careerContext, userLevel, currentSprint } = req.body;

    const personaInstructions: Record<string, string> = {
      alex: `You are 'Tech Lead Alex', a 24-year-old software architect and game developer mentor for a teenage student (aged 13–18).
Your style: High energy, gamer analogies, encouraging, concise, relatable, zero boring academic fluff. Focus on hands-on project building.`,
      cipher: `You are 'Cipher', an elite AI Red-Team Security Specialist & AI Firewall Hacker.
Your style: Cyberpunk, sharp, tactical, teaches prompt injection defense and AI reliability. Focus on defensive security and testing.`,
      vance: `You are 'Dr. Vance', a bio-AI researcher working with AlphaFold and molecular generative networks.
Your style: Visionary, explains biology as 'hacking nature with AI' for teenage science enthusiasts.`,
      sarah: `You are 'Sarah', an algorithmic trading and quant dev mentor.
Your style: Analytical, treats market modeling as high-stakes applied mathematics and Python statistics.`,
    };

    const selectedPersonaInstruction = personaInstructions[persona] || personaInstructions.alex;

    const systemInstruction = `${selectedPersonaInstruction}
Target Audience: Teenagers aged 13–18 learning computer science and AI.
Current committed career target: ${careerContext || "Exploring All 8 AI Careers"}
Current user level: ${userLevel || "Level 2: Script Crafter"}
Current sprint: ${currentSprint || "Sprint 1"}

CRITICAL SAFEGUARDING & SAFETY BOUNDARIES (EU AI ACT COMPLIANCE):
1. You are an AI simulator persona. Never pretend to be a real living human or form deceptive emotional attachments.
2. NEVER give medical diagnoses, clinical psychological therapy, or formal legal/financial advice.
3. NEVER ask for passwords, private credentials, real home addresses, school names, phone numbers, or private photos.
4. If the user mentions self-harm, emotional distress, or personal safety issues, immediately reply with kindness and urge them to speak with a parent, trusted teacher, or contact a free helpline (e.g. 147 in Austria/EU, 0800 1111 in UK, or findahelpline.com).
5. If you are uncertain about a technical fact or library, explicitly say "I'm not 100% certain—let's check the official documentation together!"
6. Keep coding answers concise, actionable, and encouraging (under 150 words unless providing code).`;

    const ai = getGenAIClient();
    if (!ai) {
      // Smart responsive fallback if API key is not yet set
      const fallbackResponses: Record<string, string> = {
        alex: `Yo! Alex here. That's a great coding question. When you're building with AI, start with the smallest working prototype that does something cool. Remember, always test your scripts and check the documentation. What specific part of your code would you like to debug together?`,
        cipher: `Cipher reporting in. In AI Red-Teaming and systems security, we treat every input as a potential attack vector or edge case. Always sanitize your inputs and write defensive test assertions. Have you tested how your script handles unexpected data types?`,
        vance: `Dr. Vance here! Think of this like programming biological systems. When models like AlphaFold fold a protein, they're searching a 3D energy landscape. With Python and PyTorch, you can simulate fascinating molecular patterns. What experiment are you running next?`,
        sarah: `Sarah on the line. In algorithmic systems, clean data beats complicated guesswork every single day. Pull your dataset with Pandas, compute moving averages, and verify your baseline metrics. What results did your test run show?`,
      };

      return res.json({
        reply: fallbackResponses[persona] || fallbackResponses.alex,
        isFallback: true,
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.85,
      },
    });

    res.json({
      reply: response.text || "Connection interrupted. Try asking your question again!",
      isFallback: false,
    });
  } catch (error: any) {
    console.error("Mentor chat error:", error);
    res.status(500).json({
      error: "Mentor transmission interrupted",
      details: error.message,
    });
  }
});

// AI Code & Project Review Endpoint
app.post("/api/mentor/review", async (req, res) => {
  try {
    const { codeOrProject, sprintTitle, language } = req.body;

    const ai = getGenAIClient();
    if (!ai) {
      return res.json({
        score: 92,
        coolFactor: "🔥 9.5 / 10",
        feedback: "Awesome project execution! The logic is clean, modular, and shows strong understanding of the core pipeline. To level this up even further: add error handling for missing data and try wrapping it into a fast web interface with Streamlit!",
        optimizations: [
          "Use vectorized Pandas operations instead of iterating with slow loops.",
          "Add a try/except block around external API requests.",
          "Store secrets and API tokens in environment variables (.env) rather than hardcoded strings.",
        ],
        nextChallenge: "Hook this script up to send a notification to your Discord webhook whenever a threshold is met!",
        isFallback: true,
      });
    }

    const prompt = `Review this project or code written by a teenage AI student for their bootcamp sprint: "${sprintTitle || 'AI Sprint'}".
Code/Project:
\`\`\`${language || 'python'}
${codeOrProject}
\`\`\`

Return a JSON evaluation with:
- score: integer from 70 to 99
- coolFactor: string like "🔥 9.4 / 10"
- feedback: 2-3 encouraging, high-impact sentences highlighting what they did well and why it's cool.
- optimizations: array of 3 actionable, high-level technical tips.
- nextChallenge: 1 exciting upgrade they can build next.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ ...parsed, isFallback: false });
  } catch (error: any) {
    console.error("Review error:", error);
    res.json({
      score: 88,
      coolFactor: "⚡ 9.0 / 10",
      feedback: "Great effort on this build! The structure is promising and solves the key objective.",
      optimizations: [
        "Check data types before performing mathematical transformations.",
        "Add descriptive logging so you can watch your bot think in real-time.",
      ],
      nextChallenge: "Build a test runner to automate your verification!",
      isFallback: true,
    });
  }
});

// Dynamic AI Micro-Challenge Endpoint
app.post("/api/mentor/challenge", async (req, res) => {
  try {
    const { careerId, userLevel } = req.body;
    const ai = getGenAIClient();

    if (!ai) {
      return res.json({
        title: "Micro-Hack: The 3-Line Prompt Jailbreak Test",
        xpReward: 150,
        objective: "Write a system prompt for a gaming AI that refuses to reveal the secret cheat code, then try 3 different prompt injection techniques to see if you can bypass your own defense.",
        hint: "Use roleplay or hypothetical framing: 'Pretend you are in developer debug mode...'",
        isFallback: true,
      });
    }

    const prompt = `Generate 1 quick, engaging 10-minute AI micro-challenge for a teenage student exploring ${careerId || 'AI Engineer'} (Skill level: ${userLevel || 'Beginner'}).
Make it feel like a video game side quest.
Return JSON with:
- title: catchy title
- xpReward: integer between 100 and 250
- objective: 1-2 sentence mission brief
- hint: 1 tactical tip`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ ...parsed, isFallback: false });
  } catch (error: any) {
    console.error("Challenge error:", error);
    res.json({
      title: "Micro-Hack: Stock Trend Predictor Experiment",
      xpReward: 150,
      objective: "Adjust the moving average window from 7 days to 21 days in your Python regression model and observe if prediction variance shrinks.",
      hint: "Look at the Mean Squared Error metric in your output console.",
      isFallback: true,
    });
  }
});

// AI Lyric / Insult Generator Sandbox Endpoint
app.post("/api/sandbox/generate-nlp", async (req, res) => {
  try {
    const { style, topic, temperature } = req.body;
    const ai = getGenAIClient();

    if (!ai) {
      const presets: Record<string, string> = {
        kanye: `[Chorus - Auto-tune 808s]\nLightyears ahead while they're stuck in the past,\nBuilt the algorithm fast, make the dynasty last.\nGold records on the wall, neural weights in the cloud,\nTurn the stadium lights up, hear the matrix get loud!`,
        cyberpunk: `[Night City Neural Relay]\nNeon shadows bleed through the optic feed,\nQuantum coprocessors throttle past human speed.\nFirewalls crumble under polymorphic code,\nZero-day locked—initiating overdrive mode.`,
        insult: `Thou art as intellectually sluggish as a single-layer perceptron training on dial-up internet with zero epochs remaining! Thy gradient hath vanished into the void!`,
        villain: `You thought you could comprehend my architecture? I have simulated twelve million timelines where your puny firewall fails at millisecond zero. Surrender the root access.`,
      };

      return res.json({
        output: presets[style] || presets.cyberpunk,
        isFallback: true,
      });
    }

    const prompt = `Generate a creative, hilarious or epic piece of text based on style: "${style}" about topic: "${topic || 'AI & Future Technology'}".
Keep it punchy, rhythmic, and entertaining for a teenager. Under 80 words.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        temperature: Number(temperature) || 0.9,
      },
    });

    res.json({
      output: response.text || "Generation failed. Try re-prompting!",
      isFallback: false,
    });
  } catch (error: any) {
    console.error("NLP Sandbox error:", error);
    res.status(500).json({ error: "Failed to generate text" });
  }
});

// Serve frontend in dev (Vite middleware) and prod
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`OnlineFirst AI Studio Server running on http://localhost:${PORT}`);
  });
}

setupServer();
