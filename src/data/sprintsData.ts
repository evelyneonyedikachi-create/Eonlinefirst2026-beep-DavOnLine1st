import { BootcampSprint } from "../types";

export const BOOTCAMP_SPRINTS: BootcampSprint[] = [
  {
    id: "sprint-1",
    sprintNumber: 1,
    title: "Build Your First Stock & Market Predictor",
    codename: "OPERATION: ALPHA REVENUE",
    estimatedTime: "2–3 hours",
    difficulty: "Beginner",
    skillsList: ["Python Basics", "Pandas DataFrames", "Matplotlib Charts", "Scikit-Learn ML"],
    finalOutput: "1 Live Market Predictor",
    duration: "Weeks 1 – 4",
    goal: "Build and run a real Machine Learning algorithm that pulls live market data and predicts tomorrow's stock, crypto, or commodity prices.",
    motivationHook: "Tell your friends: 'I coded a machine learning bot that analyzes market closing prices before breakfast.'",
    bragPhrases: [
      "I trained my first machine learning model.",
      "I wrote real Python code from scratch.",
      "I predicted live market closing prices.",
      "I created my first AI portfolio project.",
      "I have something real I can show my friends.",
    ],
    color: "from-amber-500 to-emerald-500",
    accent: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    visualMockup: {
      type: "Interactive ML Terminal & Trend Visualizer",
      title: "AlphaPredict v1.0",
      tagline: "Live Yahoo Finance Data Pipeline + Regression Trend",
      badge: "94% Confidence Rate",
      color: "from-amber-400 to-emerald-400",
      previewPoints: [
        "Live Market Data ($NVDA, $AAPL, $BTC-USD)",
        "20-Day Moving Average Crossover Signal",
        "Linear Regression Mathematical Price Target",
      ],
    },
    curriculum: [
      {
        module: "1. Python for Rapid Builders",
        description: "Skip textbook theory. Master variables, loops, lists, and dicts through building game calculators and price checkers.",
        skills: ["Variables & Data Types", "Control Flow & Loops", "Functions & Scripting", "Virtual Environments"],
      },
      {
        module: "2. Data Wrangling with Pandas & NumPy",
        description: "Load massive tables of data, filter outliers, calculate moving averages, and clean dirty numbers like a professional quant.",
        skills: ["Pandas DataFrames", "NumPy Vectorization", "CSV & JSON Parsing", "Feature Engineering"],
      },
      {
        module: "3. Visual Data Warfare with Matplotlib",
        description: "Turn raw spreadsheets into glowing interactive visual charts and trendlines that reveal hidden patterns.",
        skills: ["Line Charts & Scatter Plots", "Candlestick Charts", "Moving Average Overlays", "Chart Styling"],
      },
      {
        module: "4. Your First Machine Learning Model",
        description: "Train a Scikit-Learn Linear Regression model to find mathematical correlations and predict future price targets.",
        skills: ["Train/Test Split", "Linear Regression", "Mean Squared Error (MSE)", "Model Evaluation"],
      },
    ],
    project: {
      name: "The Autonomous Stock & Crypto Predictor Bot",
      summary: "A complete Python script that pulls real-time historical data from Yahoo Finance, computes technical indicators, trains a regression model, and outputs a confidence score for tomorrow's price.",
      deliverable: "stock_predictor.py + interactive visual graph popup + Discord price alert summary",
      bragFactor: "Tell your friends: 'I coded a machine learning bot that analyzes Wall Street closing prices before breakfast.'",
    },
    timelineSteps: [
      {
        stepNumber: 1,
        name: "Learn",
        duration: "15–20 min",
        category: "learn",
        description: "Understand Python syntax, lists, dicts, and the core concept of regression models.",
        actionTip: "Review the 'Start Here' video or interactive cheat sheet to see how linear regression finds trends.",
      },
      {
        stepNumber: 2,
        name: "Try",
        duration: "15 min",
        category: "try",
        description: "Open the Practice Lab below to edit variables, change ticker symbols, and run live simulations safely.",
        actionTip: "Complete Lab Challenge 1 to see how changing parameters shifts the predicted trendline.",
      },
      {
        stepNumber: 3,
        name: "Build",
        duration: "45–60 min",
        category: "build",
        description: "Write your Python script with yfinance to pull live market data and fit your Scikit-Learn model.",
        actionTip: "Start with 90 days of Apple or NVIDIA data to calculate a 20-day moving average.",
      },
      {
        stepNumber: 4,
        name: "Test",
        duration: "15 min",
        category: "test",
        description: "Test your model against simulated volatile market days and calculate your prediction accuracy score.",
        actionTip: "Check if your model handles unexpected spikes without throwing errors.",
      },
      {
        stepNumber: 5,
        name: "Publish",
        duration: "10 min",
        category: "publish",
        description: "Save your script to GitHub or export your prediction graph to share with your friends and group chats.",
        actionTip: "Capture a crisp screenshot of your terminal prediction output for your portfolio.",
      },
      {
        stepNumber: 6,
        name: "Submit",
        duration: "5 min",
        category: "submit",
        description: "Paste your code link or upload your output screenshot below to earn +300 XP and claim your badge.",
        actionTip: "Include one sentence about what custom asset or timeframe you chose.",
      },
    ],
    deliverables: [
      {
        id: "d1-code",
        title: "Completed Project Code",
        description: "Your working stock_predictor.py script with yfinance and Scikit-Learn.",
        required: true,
      },
      {
        id: "d1-link",
        title: "Working Code or GitHub Link",
        description: "A link to your repository, Colab notebook, or local script run.",
        required: true,
      },
      {
        id: "d1-shot",
        title: "Screenshot of Prediction Output",
        description: "A screenshot showing your model predicting a price target with confidence score.",
        required: true,
      },
      {
        id: "d1-desc",
        title: "Short Description of Asset Analyzed",
        description: "One or two sentences explaining which stock, crypto, or asset you analyzed.",
        required: true,
      },
      {
        id: "d1-custom",
        title: "One Custom Setting You Changed",
        description: "Mention one parameter you customized (e.g. moving average window, ticker symbol, or chart color).",
        required: true,
      },
      {
        id: "d1-card",
        title: "Optional: Shareable Achievement Card",
        description: "Generate and download your 'Sprint 1 Predictor' brag card.",
        required: false,
      },
    ],
    milestones: [
      { id: "s1-m1", title: "Install Python 3.11 & Run 'Hello Matrix' script", xp: 100, description: "Set up your environment and print your first styled terminal banner." },
      { id: "s1-m2", title: "Fetch 90-Day Market Data via yfinance", xp: 150, description: "Pull live AAPL, TSLA, or BTC-USD price history straight into a Pandas DataFrame." },
      { id: "s1-m3", title: "Plot a 20-Day vs 50-Day Moving Average Crossover", xp: 200, description: "Generate a chart showing bullish and bearish crossover signals." },
      { id: "s1-m4", title: "Train Scikit-Learn Linear Regression Model", xp: 250, description: "Feed historical features into a model and output tomorrow's predicted close price." },
      { id: "s1-m5", title: "Deploy Live Prediction Sandbox Test", xp: 300, description: "Test your model against simulated volatile market days and calculate accuracy." },
    ],
    learningResources: [
      {
        category: "start",
        title: "freeCodeCamp – Python for Beginners",
        platform: "freeCodeCamp",
        url: "https://www.freecodecamp.org/news/learn-python-free-python-courses-for-beginners/",
        whatItTeaches: "Core Python syntax, variables, lists, and functions in under 30 minutes.",
        whenToUse: "Use this before Step 1 if you have never written a line of Python before.",
        buttonLabel: "Learn Python Basics →",
        badge: "Complete Beginner",
      },
      {
        category: "watch",
        title: "How Machine Learning Predicts Trends (5-Min Visual)",
        platform: "YouTube",
        url: "https://www.youtube.com/results?search_query=how+linear+regression+works+machine+learning+visual+beginner",
        whatItTeaches: "How computers draw the best-fit line through data points without complex calculus.",
        whenToUse: "Watch this before Step 3 to understand how Scikit-Learn fits the model.",
        buttonLabel: "Watch 5-Min Video →",
        badge: "Visual Explainer",
      },
      {
        category: "practise",
        title: "W3Schools – Python & Pandas Exercises",
        platform: "W3Schools",
        url: "https://www.w3schools.com/python/pandas/default.asp",
        whatItTeaches: "Interactive browser exercises to filter table rows and calculate averages.",
        whenToUse: "Use during Step 2 to practice DataFrame operations before writing your script.",
        buttonLabel: "Practice in Browser →",
        badge: "Interactive Lab",
      },
      {
        category: "stuck",
        title: "MDN & Python Official Documentation",
        platform: "Python Docs",
        url: "https://docs.python.org/3/tutorial/introduction.html",
        whatItTeaches: "Fast lookup for error messages, list methods, and dictionary lookups.",
        whenToUse: "Open this if you get a SyntaxError or TypeError while running your code.",
        buttonLabel: "Browse Reference →",
        badge: "Reference Manual",
      },
    ],
    labData: {
      title: "Interactive Python Market Predictor Lab",
      language: "python",
      instructions: "Experiment with changing market tickers, moving average windows, and model training parameters. Click Run to see the generated prediction and confidence rating.",
      initialCode: `# SPRINT 1 PRACTICE LAB: Stock & Crypto Predictor
import numpy as np

# 1. Choose target ticker & window size
ticker = "NVDA"         # Try: "AAPL", "TSLA", "BTC"
lookback_days = 20      # Moving average window (10 - 50)
model_type = "linear"   # Machine Learning model type

# 2. Simulated price trend calculation
base_price = 128.50
trend_momentum = 1.85   # Positive for bullish growth
predicted_price = round(base_price + (trend_momentum * 1.4), 2)
confidence = min(96, 75 + int(lookback_days * 0.7))

print(f"[*] Analyzing asset: {ticker}")
print(f"[*] Moving Average Window: {lookback_days} days")
print(f"[✓] Model Trained! Tomorrow's Predicted Price: \${predicted_price}")
print(f"[✓] Confidence Rating: {confidence}%")`,
      challenges: [
        {
          step: 1,
          task: "Change the ticker from 'NVDA' to 'BTC' or 'TSLA'.",
          targetLine: 'ticker = "NVDA"',
          hint1: "Look at line 5 where ticker is defined.",
          hint2: 'Replace "NVDA" with "BTC" or your favorite asset.',
          solutionCode: 'ticker = "BTC"',
          completedMessage: "Awesome! You just customized the model target.",
        },
        {
          step: 2,
          task: "Increase lookback_days from 20 to 45 days for a smoother moving average.",
          targetLine: "lookback_days = 20",
          hint1: "Look at line 6 where lookback_days is set.",
          hint2: "Change 20 to 45.",
          solutionCode: "lookback_days = 45",
          completedMessage: "Great job! More historical data increases confidence score.",
        },
        {
          step: 3,
          task: "Run the model to calculate tomorrow's predicted target price.",
          targetLine: "model_type = 'linear'",
          hint1: "Click the 'Run Code' button below the editor.",
          hint2: "Observe the live output printed in the console panel.",
          solutionCode: "model_type = 'linear'",
          completedMessage: "Boom! You just ran a real machine learning prediction loop.",
        },
      ],
    },
    whatYouCanNowDo: [
      "Pull live financial data from APIs directly into Python",
      "Clean and filter large data tables with Pandas",
      "Calculate 20-day moving averages and trend crossovers",
      "Train Scikit-Learn Linear Regression models on numerical data",
      "Generate clean prediction reports with confidence scores",
    ],
    sandboxType: "stock",
  },
  {
    id: "sprint-2",
    sprintNumber: 2,
    title: "Build Your Interactive AI Web App",
    codename: "OPERATION: SYNTHETIC VOICE",
    estimatedTime: "2 hours",
    difficulty: "Beginner",
    skillsList: ["REST APIs", "Prompt Engineering", "Streamlit UI", "JSON Parsing"],
    finalOutput: "1 Shareable Web Application",
    duration: "Weeks 5 – 8",
    goal: "Build and publish a web app that connects to neural cloud APIs to write rap lyrics, game quests, or comedy roasts in custom character personas.",
    motivationHook: "Send a live link to your group chat where an AI writes customized diss tracks or gaming lore on command.",
    bragPhrases: [
      "I built an interactive AI web app.",
      "I integrated live neural cloud APIs.",
      "I engineered multi-shot persona prompts.",
      "I put a working app on the internet.",
      "I can send you the link right now.",
    ],
    color: "from-purple-500 to-pink-500",
    accent: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    visualMockup: {
      type: "Interactive Streamlit Web App",
      title: "LyricForge AI v2.4",
      tagline: "Live Cloud LLM Stream + Dynamic Persona Sliders",
      badge: "Cloud Hosted & Live",
      color: "from-purple-500 to-pink-500",
      previewPoints: [
        "Persona Picker (Cyberpunk / Freestyle / Game Quest)",
        "Rhyme Density & Temperature Sliders",
        "Shareable Web URL for Group Chats",
      ],
    },
    curriculum: [
      {
        module: "1. Connecting to Neural Cloud APIs",
        description: "Learn how modern AI models work under the hood and connect your code to Gemini, OpenAI, or open-source endpoints.",
        skills: ["REST APIs & Requests", "API Keys & .env Security", "JSON Response Parsing", "Rate Limits"],
      },
      {
        module: "2. Master-Class Prompt Engineering",
        description: "Move past basic questions. Master Few-Shot prompting, Chain-of-Thought reasoning, and strict System Framing.",
        skills: ["System Instructions", "Few-Shot In-Context Examples", "Role & Tone Persona Constraints", "JSON Mode Outputs"],
      },
      {
        module: "3. Open-Source Local Models with Ollama",
        description: "Run cutting-edge open-weights AI models (Llama 3 / Mistral) directly on your own computer without paying API fees.",
        skills: ["Ollama Setup", "Model Quantization (GGUF)", "Local Inference Loops", "Context Window Management"],
      },
      {
        module: "4. Instant Web UI with Streamlit",
        description: "Turn your Python script into a clean, clickable website in under 20 lines of code and share it with anyone.",
        skills: ["Streamlit UI Components", "State Management", "Live Sliders & Textboxes", "One-Click Cloud Sharing"],
      },
    ],
    project: {
      name: "The Multi-Persona AI Lyric & Roast Generator",
      summary: "A web app where friends can choose a rap artist, anime character, or fantasy questgiver persona, enter any topic, and get back rhyming verses or epic comedy roasts.",
      deliverable: "app.py running on Streamlit Community Cloud with a shareable URL",
      bragFactor: "Send your group chat a link where an AI writes customized diss tracks about your gaming squad.",
    },
    timelineSteps: [
      {
        stepNumber: 1,
        name: "Learn",
        duration: "15–20 min",
        category: "learn",
        description: "Understand REST API requests, JSON formatting, and how system instructions guide LLM behavior.",
        actionTip: "Check out the prompt engineering guide to learn how few-shot examples lock an AI into character.",
      },
      {
        stepNumber: 2,
        name: "Try",
        duration: "15 min",
        category: "try",
        description: "Open the Practice Lab to test temperature sliders, persona instructions, and rhyme cadence.",
        actionTip: "Try switching between 'Cyberpunk Rapper' and 'Medieval Questgiver' in the simulator.",
      },
      {
        stepNumber: 3,
        name: "Build",
        duration: "45–60 min",
        category: "build",
        description: "Create your Streamlit application with text inputs, sliders, and live API connection.",
        actionTip: "Use `st.selectbox()` for persona choices and `st.slider()` for rhyme complexity.",
      },
      {
        stepNumber: 4,
        name: "Test",
        duration: "15 min",
        category: "test",
        description: "Generate 5 test verses across weird topics to ensure the AI never breaks character.",
        actionTip: "Verify that long responses stream cleanly without cutting off mid-sentence.",
      },
      {
        stepNumber: 5,
        name: "Publish",
        duration: "10 min",
        category: "publish",
        description: "Deploy for free to Streamlit Cloud or Hugging Face Spaces to get a live shareable URL.",
        actionTip: "Test your live URL on your mobile phone browser to verify it looks crisp.",
      },
      {
        stepNumber: 6,
        name: "Submit",
        duration: "5 min",
        category: "submit",
        description: "Paste your live app link, screenshot of a funny generated verse, and claim +300 XP.",
        actionTip: "Write one sentence about the wildest persona you created.",
      },
    ],
    deliverables: [
      {
        id: "d2-code",
        title: "Completed app.py Script",
        description: "Your Python application code with Streamlit components and API integration.",
        required: true,
      },
      {
        id: "d2-link",
        title: "Live Shareable URL",
        description: "A public link on Streamlit Cloud, Hugging Face, or Replit.",
        required: true,
      },
      {
        id: "d2-shot",
        title: "Screenshot of Generated Output",
        description: "A screenshot showing your web app with a generated rap or comedy roast.",
        required: true,
      },
      {
        id: "d2-desc",
        title: "Short Description of App Purpose",
        description: "A brief summary of what personas or styles your app creates.",
        required: true,
      },
      {
        id: "d2-custom",
        title: "One Custom Persona Added",
        description: "The name and tone of at least one custom persona you engineered yourself.",
        required: true,
      },
      {
        id: "d2-card",
        title: "Optional: Shareable Lyric Card",
        description: "A generated text card to show your friends.",
        required: false,
      },
    ],
    milestones: [
      { id: "s2-m1", title: "Connect to Gemini / OpenAI API with Python", xp: 150, description: "Successfully send a prompt payload and parse the JSON response." },
      { id: "s2-m2", title: "Build a 3-Shot Persona Prompt Pipeline", xp: 200, description: "Lock the AI into a strict cadence, rhythm, and slang style without breaking character." },
      { id: "s2-m3", title: "Create an Interactive Streamlit UI", xp: 250, description: "Add sliders for rhyme complexity, temperature, and persona avatar selection." },
      { id: "s2-m4", title: "Deploy Live on Streamlit Cloud", xp: 300, description: "Publish the project publicly and test your shareable web link on your phone." },
    ],
    learningResources: [
      {
        category: "start",
        title: "Scrimba – Building Web Apps with Python",
        platform: "Scrimba",
        url: "https://scrimba.com/all-courses",
        whatItTeaches: "Fast interactive intro to web interfaces and event listeners.",
        whenToUse: "Use this before Step 1 if you are new to interactive web apps.",
        buttonLabel: "Explore Web Basics →",
        badge: "Interactive",
      },
      {
        category: "watch",
        title: "How Prompt Engineering Actually Works",
        platform: "YouTube",
        url: "https://www.youtube.com/results?search_query=prompt+engineering+system+prompt+few+shot+beginner",
        whatItTeaches: "How system instructions and in-context examples control LLM tone.",
        whenToUse: "Watch before Step 2 to write rock-solid system prompts.",
        buttonLabel: "Watch Tutorial →",
        badge: "Short Video",
      },
      {
        category: "practise",
        title: "Streamlit – 10 Minute Quickstart Tutorial",
        platform: "Streamlit Docs",
        url: "https://docs.streamlit.io/get-started/tutorials/create-an-app",
        whatItTeaches: "How to build sliders, buttons, and text areas in Python.",
        whenToUse: "Use during Step 3 to build your UI components with zero CSS headache.",
        buttonLabel: "Open Streamlit Guide →",
        badge: "Official Guide",
      },
      {
        category: "stuck",
        title: "Google GenAI SDK Reference & Examples",
        platform: "Google Cloud Docs",
        url: "https://ai.google.dev/gemini-api/docs",
        whatItTeaches: "Documentation for API parameters, safety filters, and response formatting.",
        whenToUse: "Open this if your API call returns a 400 or 403 error code.",
        buttonLabel: "Check API Docs →",
        badge: "API Reference",
      },
    ],
    labData: {
      title: "Interactive AI Persona & Prompt Lab",
      language: "python",
      instructions: "Tune system prompts, change character personas, and adjust temperature. Click Run to simulate live AI text generation.",
      initialCode: `# SPRINT 2 PRACTICE LAB: AI Lyric & Persona Engine
import json

persona = "cyberpunk_drill"    # Options: "cyberpunk_drill", "game_questgiver", "standup_comic"
temperature = 0.85             # Creativity level (0.2 = precise, 1.0 = wild)
rhyme_density = "high"         # "standard", "high", "insane"
topic = "coding late at night"

system_prompt = f"You are a master {persona}. Write 4 fiery rhyming lines about: {topic}."

# Simulated response generated by neural pipeline
sample_output = [
    "Neon lights humming while the terminal glows,",
    "Stack traces bleeding through the 1s and 0s,",
    "Bug in the compiler but the model still knows,",
    "Shipping live code before the sunrise shows."
]

print(f"[*] Persona: {persona.upper()} | Temperature: {temperature}")
print(f"[✓] Prompt Dispatched to Cloud Neural Network...")
print("\\n--- GENERATED VERSES ---")
for line in sample_output:
    print(f" > {line}")`,
      challenges: [
        {
          step: 1,
          task: "Change persona to 'game_questgiver' or 'standup_comic'.",
          targetLine: 'persona = "cyberpunk_drill"',
          hint1: "Edit line 4 where persona is defined.",
          hint2: 'Replace with "game_questgiver" or "standup_comic".',
          solutionCode: 'persona = "game_questgiver"',
          completedMessage: "Nice! You changed the character framing.",
        },
        {
          step: 2,
          task: "Change the topic from 'coding late at night' to your favorite video game or hobby.",
          targetLine: 'topic = "coding late at night"',
          hint1: "Look at line 7 where topic is set.",
          hint2: 'Set topic = "winning the championship" or "sneaker drops".',
          solutionCode: 'topic = "winning the championship"',
          completedMessage: "Awesome topic selected!",
        },
        {
          step: 3,
          task: "Run the code to execute the persona generation pipeline.",
          targetLine: "temperature = 0.85",
          hint1: "Click 'Run Code' button below.",
          hint2: "Check out the generated rhyming lines in the output window.",
          solutionCode: "temperature = 0.85",
          completedMessage: "Legendary! Your AI web app pipeline is functional.",
        },
      ],
    },
    whatYouCanNowDo: [
      "Connect Python applications to modern Cloud AI APIs",
      "Write multi-shot persona prompts that never break character",
      "Build instant web UIs with sliders, inputs, and buttons using Streamlit",
      "Deploy live applications to free cloud hosting platforms",
      "Share public web links with friends on mobile and desktop",
    ],
    sandboxType: "nlp",
  },
  {
    id: "sprint-3",
    sprintNumber: 3,
    title: "Build Your Real-Time Computer Vision Sentry",
    codename: "OPERATION: OCULAR CYBORG",
    estimatedTime: "2–3 hours",
    difficulty: "Intermediate",
    skillsList: ["OpenCV (cv2)", "YOLOv8 Object Detection", "Webcam Feeds", "Alert Triggers"],
    finalOutput: "1 Live Vision Detector",
    duration: "Weeks 9 – 12",
    goal: "Build a computer vision system that sees through webcams to identify objects, people, and movements in real-time at 60 FPS.",
    motivationHook: "Show your family: 'My room is guarded by a computer vision neural network that detects anyone entering.'",
    bragPhrases: [
      "I built a real-time computer vision system.",
      "I deployed a YOLOv8 neural network.",
      "My camera detects 80+ objects at 60 FPS.",
      "I built automated intrusion alerts.",
      "I wrote real computer vision code.",
    ],
    color: "from-cyan-500 to-blue-500",
    accent: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    visualMockup: {
      type: "Computer Vision CyberHUD",
      title: "VisionSentry v3.1",
      tagline: "60 FPS Neural Object Classifier + Bounding Box Matrix",
      badge: "YOLOv8 Neural Model",
      color: "from-cyan-400 to-blue-500",
      previewPoints: [
        "Live 60 FPS Bounding Box Coordinates",
        "80+ COCO Object Classifications",
        "Automated Snapshot & Boundary Intruder Alert",
      ],
    },
    curriculum: [
      {
        module: "1. Computer Vision Foundations with OpenCV",
        description: "Learn how computers see images as RGB pixel matrices, apply edge detection filters, and draw bounding boxes.",
        skills: ["OpenCV (cv2)", "RGB & Grayscale Matrices", "Webcam Video Feeds", "Frame-by-Frame Processing"],
      },
      {
        module: "2. Real-Time Object Detection with YOLO",
        description: "Deploy YOLO (You Only Look Once), the world's fastest vision neural network that identifies 80+ objects at 60 FPS.",
        skills: ["YOLO Architecture", "Bounding Box Coordinates", "Confidence Thresholds", "Inference on CPU/GPU"],
      },
      {
        module: "3. Custom Object Classifier Training",
        description: "Collect 50 photos of your own items (collectible cards, game controllers, or pets) and fine-tune a model to identify them.",
        skills: ["Roboflow Data Labeling", "Transfer Learning", "Dataset Augmentation", "Model Export"],
      },
      {
        module: "4. Hardware & Alert Triggers",
        description: "Hook up automated actions: when a specific object or person enters the frame, trigger an alarm or send an instant notification.",
        skills: ["Event Triggers", "Twilio / Telegram Bot Alerts", "Snapshot Logging", "Motion Tracking"],
      },
    ],
    project: {
      name: "The Bedroom Sentry Detection System",
      summary: "A webcam security app that runs in the background. If a person enters your room, it snapshots the intruder, classifies them with bounding boxes, and sends an alert with a photo directly to your phone.",
      deliverable: "sentry_vision.py + live bounding box overlay + instant notification trigger",
      bragFactor: "Show your family: 'My room is guarded by a computer vision neural network that alerts me if anyone opens my door.'",
    },
    timelineSteps: [
      {
        stepNumber: 1,
        name: "Learn",
        duration: "15–20 min",
        category: "learn",
        description: "Learn how cameras represent images as numerical pixel matrices and how neural networks scan frames.",
        actionTip: "Watch the YOLO visual explainer to see how single-pass convolutional networks find bounding boxes.",
      },
      {
        stepNumber: 2,
        name: "Try",
        duration: "15 min",
        category: "try",
        description: "Open the Vision Practice Lab below to toggle object detection filters and see live bounding box tracking.",
        actionTip: "Toggle between 'person', 'cell phone', and 'laptop' in the interactive simulator.",
      },
      {
        stepNumber: 3,
        name: "Build",
        duration: "45–60 min",
        category: "build",
        description: "Write your `sentry_vision.py` script using OpenCV and Ultralytics YOLOv8 to process video streams.",
        actionTip: "Set your confidence threshold to 0.60 to avoid false positive triggers.",
      },
      {
        stepNumber: 4,
        name: "Test",
        duration: "15 min",
        category: "test",
        description: "Point your webcam at everyday items (backpack, water bottle, phone) and verify the FPS counter stays above 30.",
        actionTip: "Test what happens when multiple objects enter the camera frame at the same time.",
      },
      {
        stepNumber: 5,
        name: "Publish",
        duration: "10 min",
        category: "publish",
        description: "Save a short demo video clip or annotated snapshot image of your HUD in action to your project folder.",
        actionTip: "Add a cool cyberpunk timestamp and crosshair overlay to your feed.",
      },
      {
        stepNumber: 6,
        name: "Submit",
        duration: "5 min",
        category: "submit",
        description: "Upload your webcam HUD snapshot, paste your GitHub link, and collect your +300 XP reward.",
        actionTip: "Tell us what custom object your sentry was tuned to detect.",
      },
    ],
    deliverables: [
      {
        id: "d3-code",
        title: "Completed sentry_vision.py Script",
        description: "Your Python code integrating OpenCV and YOLOv8 real-time inference.",
        required: true,
      },
      {
        id: "d3-link",
        title: "GitHub Repository / Code Link",
        description: "A link to your code repository with README instructions.",
        required: true,
      },
      {
        id: "d3-shot",
        title: "Screenshot of Live Camera HUD",
        description: "A screenshot showing your camera feed with bounding boxes around people or objects.",
        required: true,
      },
      {
        id: "d3-desc",
        title: "Short Description of Sentry Setup",
        description: "Explain where you positioned your camera and what objects it detects.",
        required: true,
      },
      {
        id: "d3-custom",
        title: "One Custom Trigger Feature",
        description: "Explain your custom trigger (e.g. alarm sound, screenshot logger, or notification alert).",
        required: true,
      },
      {
        id: "d3-card",
        title: "Optional: CyberHUD Badge",
        description: "Download your Computer Vision Engineer badge.",
        required: false,
      },
    ],
    milestones: [
      { id: "s3-m1", title: "Capture & Display Live Webcam Feed with OpenCV", xp: 150, description: "Stream 30 FPS video with custom FPS counters and cyberpunk HUD overlays." },
      { id: "s3-m2", title: "Run YOLOv8 Object Detection on Video Stream", xp: 200, description: "Render bounding boxes around people, backpacks, cell phones, and laptops." },
      { id: "s3-m3", title: "Implement Boundary Cross / Intruder Alarm Logic", xp: 250, description: "Trigger a warning beep or screenshot when a person enters a designated zone." },
      { id: "s3-m4", title: "Build the Interactive Vision Simulator", xp: 300, description: "Test detection confidence against various simulated camera scenarios." },
    ],
    learningResources: [
      {
        category: "start",
        title: "Khan Academy – Pixels, Images & Computing",
        platform: "Khan Academy",
        url: "https://www.khanacademy.org/computing/computer-science",
        whatItTeaches: "How digital screens store RGB color values and image matrices.",
        whenToUse: "Use this before Step 1 to understand what `cv2.imread` actually loads.",
        buttonLabel: "Explore Computing Basics →",
        badge: "Foundations",
      },
      {
        category: "watch",
        title: "How YOLO Neural Networks See Objects in 60 FPS",
        platform: "YouTube",
        url: "https://www.youtube.com/results?search_query=how+yolov8+works+object+detection+visual+beginner",
        whatItTeaches: "Visual walkthrough of grid bounding boxes and confidence scores.",
        whenToUse: "Watch before Step 2 to see the architecture behind your detector.",
        buttonLabel: "Watch 6-Min Breakdown →",
        badge: "Tech Breakdown",
      },
      {
        category: "practise",
        title: "Roboflow – Interactive Computer Vision Universe",
        platform: "Roboflow",
        url: "https://universe.roboflow.com/",
        whatItTeaches: "Browse pre-trained vision datasets for games, playing cards, and robotics.",
        whenToUse: "Use during Step 3 if you want to detect custom objects beyond the standard 80 COCO classes.",
        buttonLabel: "Browse Datasets →",
        badge: "Dataset Hub",
      },
      {
        category: "stuck",
        title: "Ultralytics YOLOv8 Documentation",
        platform: "Ultralytics Docs",
        url: "https://docs.ultralytics.com/",
        whatItTeaches: "Code examples for video feeds, model exports, and bounding box formatting.",
        whenToUse: "Open this if you have trouble loading the `yolov8n.pt` weights file.",
        buttonLabel: "View YOLO Docs →",
        badge: "Official Docs",
      },
    ],
    labData: {
      title: "Interactive Computer Vision & YOLO Lab",
      language: "python",
      instructions: "Toggle target detection classes, set confidence thresholds, and test simulated camera feeds. Click Run to see bounding box overlays.",
      initialCode: `# SPRINT 3 PRACTICE LAB: Real-Time YOLO Sentry
import cv2

confidence_threshold = 0.65   # Minimum confidence to trigger alert (0.4 - 0.9)
tracked_classes = ["person", "laptop", "cell phone"]
alarm_sound_enabled = True

# Simulated video frame bounding box coordinates
detections = [
    {"class": "person", "conf": 0.94, "box": [120, 80, 480, 520], "status": "INTRUDER ALERT"},
    {"class": "cell phone", "conf": 0.88, "box": [220, 310, 310, 440], "status": "ITEM DETECTED"}
]

print(f"[*] SENTRY INITIALIZED // Monitoring Camera Feed at 60 FPS")
print(f"[*] Confidence Gate: {confidence_threshold * 100}%")
print("\\n--- ACTIVE DETECTIONS ---")
for item in detections:
    if item["conf"] >= confidence_threshold:
        print(f" [!] {item['status']}: {item['class'].upper()} (Confidence: {int(item['conf']*100)}%) | Coords: {item['box']}")`,
      challenges: [
        {
          step: 1,
          task: "Add 'backpack' to tracked_classes list.",
          targetLine: 'tracked_classes = ["person", "laptop", "cell phone"]',
          hint1: "Look at line 5 where tracked_classes is declared.",
          hint2: 'Add "backpack" inside the brackets: ["person", "laptop", "cell phone", "backpack"]',
          solutionCode: 'tracked_classes = ["person", "laptop", "cell phone", "backpack"]',
          completedMessage: "Awesome! Your sentry now tracks gear and backpacks.",
        },
        {
          step: 2,
          task: "Change confidence_threshold to 0.75 to make the filter stricter.",
          targetLine: "confidence_threshold = 0.65",
          hint1: "Look at line 4 where confidence_threshold is set.",
          hint2: "Change 0.65 to 0.75.",
          solutionCode: "confidence_threshold = 0.75",
          completedMessage: "Great! Stricter thresholds eliminate false alarms.",
        },
        {
          step: 3,
          task: "Run the simulation to inspect the real-time detection output.",
          targetLine: "alarm_sound_enabled = True",
          hint1: "Click the 'Run Code' button below the editor.",
          hint2: "Observe the logged bounding box coordinates.",
          solutionCode: "alarm_sound_enabled = True",
          completedMessage: "Incredible! Your Computer Vision Sentry HUD is operational.",
        },
      ],
    },
    whatYouCanNowDo: [
      "Process live webcam video streams frame-by-frame using OpenCV",
      "Deploy YOLOv8 object detection neural models in real time",
      "Draw custom styled bounding boxes and HUD telemetry on video",
      "Trigger automated alerts, screenshots, or logs on detected motion",
      "Optimize computer vision models for maximum FPS performance",
    ],
    sandboxType: "vision",
  },
  {
    id: "sprint-4",
    sprintNumber: 4,
    title: "Build Your Autonomous AI Deal Hunter Bot",
    codename: "OPERATION: IRON JARVIS",
    estimatedTime: "2–3 hours",
    difficulty: "Intermediate",
    skillsList: ["Playwright Automation", "LLM Tool Calling", "Price Scraping", "Discord Webhooks"],
    finalOutput: "1 Autonomous Agent",
    duration: "Weeks 13 – 16",
    goal: "Build an autonomous AI agent that controls web browsers, scours store prices, finds the biggest discounts, and sends automated deal alerts.",
    motivationHook: "Wake up to your own private AI agent handing you automated market intelligence on sneakers, games, or tech gear at lowest prices.",
    bragPhrases: [
      "I built an autonomous AI agent.",
      "My bot navigates live web pages by itself.",
      "I automated price scraping across multiple stores.",
      "My agent dispatches rich cards to Discord.",
      "I gave AI hands with tool-calling functions.",
    ],
    color: "from-rose-500 to-amber-500",
    accent: "text-rose-400 border-rose-500/30 bg-rose-500/10",
    visualMockup: {
      type: "Autonomous Agent Console & Webhook Dispatcher",
      title: "JarvisSniper v4.0",
      tagline: "Headless Browser Automation + LLM Tool Calling",
      badge: "Autonomous ReAct Loop",
      color: "from-rose-500 to-amber-500",
      previewPoints: [
        "Headless Chromium Browser Automation",
        "Multi-Store Deal Scraping & Deduplication",
        "Scheduled Discord & Telegram Webhook Briefings",
      ],
    },
    curriculum: [
      {
        module: "1. Browser Puppeteering with Playwright",
        description: "Write Python scripts that click buttons, fill out search bars, scroll pages, and extract data from any website.",
        skills: ["Playwright / Selenium", "DOM Selectors & XPath", "Headless Browsing", "Anti-Bot Evasion Basics"],
      },
      {
        module: "2. Giving AI Hands (Function & Tool Calling)",
        description: "Connect LLMs to real Python functions so the model can choose when to search the web, execute a calculation, or send an email.",
        skills: ["LLM Tool Calling Schema", "JSON Schema Definitions", "Autonomous ReAct Loops", "Error Self-Correction"],
      },
      {
        module: "3. Multi-Source Price Scraping & Filtering",
        description: "Scrape multiple stores simultaneously, clean the prices, and find the steepest discounts.",
        skills: ["Concurrent Asyncio Scraping", "Regex Price Cleaning", "Database Deduplication", "Notification Dispatchers"],
      },
      {
        module: "4. Scheduled Cron Jobs & Cloud Webhooks",
        description: "Run your agent in the background or on a free cloud server so it wakes up every morning to send your daily intelligence brief.",
        skills: ["Cron Scheduling", "Discord / Telegram Webhooks", "Docker Containerization", "Logging Systems"],
      },
    ],
    project: {
      name: "The Autonomous Deal Sniper & Price Hunter Agent",
      summary: "An autonomous agent that checks prices for your dream sneakers, GPU, or video game across 5 retailers, verifies in-stock status, and sends a daily summary report with clickable discount links.",
      deliverable: "jarvis_agent.py with automated browser execution and Discord webhook alerts",
      bragFactor: "Wake up to your own private AI agent handing you market intelligence on sneakers and games at lowest prices.",
    },
    timelineSteps: [
      {
        stepNumber: 1,
        name: "Learn",
        duration: "15–20 min",
        category: "learn",
        description: "Learn how headless browsers work and how LLM tool calling lets AI execute Python functions autonomously.",
        actionTip: "Review how the ReAct loop works: Reason → Act → Observe → Conclude.",
      },
      {
        stepNumber: 2,
        name: "Try",
        duration: "15 min",
        category: "try",
        description: "Open the Agent Practice Lab below to watch simulated tool-calling search chains and price scrapers in action.",
        actionTip: "Simulate scraping Amazon, Best Buy, and eBay for an RTX 4070 or custom sneakers.",
      },
      {
        stepNumber: 3,
        name: "Build",
        duration: "45–60 min",
        category: "build",
        description: "Write your `jarvis_agent.py` script with Playwright and Python's `requests` library to query items.",
        actionTip: "Add a Discord webhook URL so your bot can ping your private server directly.",
      },
      {
        stepNumber: 4,
        name: "Test",
        duration: "15 min",
        category: "test",
        description: "Run test scrapes on 3 different products and make sure price drops calculate correctly.",
        actionTip: "Ensure your regex correctly strips currency symbols ($ and £) from scraped text.",
      },
      {
        stepNumber: 5,
        name: "Publish",
        duration: "10 min",
        category: "publish",
        description: "Set up a daily cron schedule or upload your script to a cloud runner to automate background execution.",
        actionTip: "Capture a screenshot of your rich Discord webhook notification card.",
      },
      {
        stepNumber: 6,
        name: "Submit",
        duration: "5 min",
        category: "submit",
        description: "Submit your code link, webhook screenshot, and claim your +350 XP reward.",
        actionTip: "Tell us what item you automated price tracking for.",
      },
    ],
    deliverables: [
      {
        id: "d4-code",
        title: "Completed jarvis_agent.py Script",
        description: "Your autonomous agent script with Playwright browser control and LLM function calling.",
        required: true,
      },
      {
        id: "d4-link",
        title: "GitHub Code Repository",
        description: "A public GitHub repository with your agent code and setup instructions.",
        required: true,
      },
      {
        id: "d4-shot",
        title: "Screenshot of Discord / Webhook Alert",
        description: "A screenshot showing your agent posting a live price drop card to Discord or your terminal.",
        required: true,
      },
      {
        id: "d4-desc",
        title: "Short Description of Target Items",
        description: "Explain which stores and items your agent monitors.",
        required: true,
      },
      {
        id: "d4-custom",
        title: "One Custom Tool / Scraping Filter",
        description: "Explain one custom tool or filter rule you added (e.g. minimum 20% discount filter).",
        required: true,
      },
      {
        id: "d4-card",
        title: "Optional: Autonomous Agent Badge",
        description: "Claim your Autonomous Systems Architect badge.",
        required: false,
      },
    ],
    milestones: [
      { id: "s4-m1", title: "Automate a Headless Browser Search with Playwright", xp: 200, description: "Navigate to a retail site, search for an item, and parse top search result cards." },
      { id: "s4-m2", title: "Implement LLM Function Calling Tool Architecture", xp: 250, description: "Give your AI model the 'search_product_price' and 'send_alert' function tools." },
      { id: "s4-m3", title: "Build the Automated Daily Deal Discounter Bot", xp: 300, description: "Calculate price drop percentage and dispatch formatted rich cards to Discord." },
      { id: "s4-m4", title: "Simulate Agent Execution in the Studio Lab", xp: 350, description: "Run full autonomous reasoning chain simulation with multi-step tool calls." },
    ],
    learningResources: [
      {
        category: "start",
        title: "Codecademy – Python Automation & Scraping",
        platform: "Codecademy",
        url: "https://www.codecademy.com/learn",
        whatItTeaches: "How web scrapers inspect HTML tags and extract price text.",
        whenToUse: "Use before Step 1 if you are new to web scraping concepts.",
        buttonLabel: "Learn Web Scraping →",
        badge: "Intro Course",
      },
      {
        category: "watch",
        title: "How AI Agents Use Tools & Function Calling",
        platform: "YouTube",
        url: "https://www.youtube.com/results?search_query=llm+tool+calling+function+calling+python+tutorial+beginner",
        whatItTeaches: "How LLMs output structured JSON to trigger real Python code.",
        whenToUse: "Watch before Step 3 to build your agent's tool-dispatch loop.",
        buttonLabel: "Watch 8-Min Guide →",
        badge: "Agent Tutorial",
      },
      {
        category: "practise",
        title: "Playwright Python – Getting Started Guide",
        platform: "Playwright Docs",
        url: "https://playwright.dev/python/docs/intro",
        whatItTeaches: "Step-by-step code to open browsers, click elements, and take screenshots.",
        whenToUse: "Use during Step 3 to write your automated browsing script.",
        buttonLabel: "Open Playwright Guide →",
        badge: "Interactive Docs",
      },
      {
        category: "stuck",
        title: "Discord Webhooks API Documentation",
        platform: "Discord Developer Portal",
        url: "https://discord.com/developers/docs/resources/webhook",
        whatItTeaches: "JSON payload structure for rich embed cards, thumbnails, and color borders.",
        whenToUse: "Open this if your webhook messages aren't displaying with colors and formatting.",
        buttonLabel: "View Webhook Docs →",
        badge: "Webhook Reference",
      },
    ],
    labData: {
      title: "Interactive Autonomous Agent & Tool-Calling Lab",
      language: "python",
      instructions: "Configure the autonomous agent's target item, tool permissions, and discount trigger percentage. Click Run to simulate the ReAct execution chain.",
      initialCode: `# SPRINT 4 PRACTICE LAB: Autonomous Deal Hunter Agent
import json

target_item = "Sony WH-1000XM5 Headphones"
max_budget = 320.00
min_discount_pct = 15.0   # Trigger alert if discount >= 15%

# Autonomous Tool Registry available to the LLM
tools = [
    {"name": "search_retailer_prices", "description": "Queries Amazon, Best Buy, and eBay for live prices."},
    {"name": "dispatch_discord_alert", "description": "Sends a rich webhook card with discount link."}
]

# Simulated scraping results across retailers
retailer_prices = {
    "Best Buy": 399.99,
    "Amazon": 329.99,
    "B&H Photo (Sale)": 279.00
}

lowest_store = min(retailer_prices, key=retailer_prices.get)
lowest_price = retailer_prices[lowest_store]
original_price = 399.99
discount = round(((original_price - lowest_price) / original_price) * 100, 1)

print(f"[*] AGENT AWAKE: Target = '{target_item}' (Budget: \${max_budget})")
print(f"[✓] Tool Called: search_retailer_prices('{target_item}')")
print(f"[✓] Best Deal Found at {lowest_store}: \${lowest_price} (-{discount}% OFF)")
if discount >= min_discount_pct:
    print(f"[⚡] DEAL ALERT TRIGGERED! Dispatching Discord Webhook...")`,
      challenges: [
        {
          step: 1,
          task: "Change target_item to 'RTX 4070 GPU' or 'Nike Dunk Low'.",
          targetLine: 'target_item = "Sony WH-1000XM5 Headphones"',
          hint1: "Look at line 4 where target_item is assigned.",
          hint2: 'Replace with target_item = "RTX 4070 GPU"',
          solutionCode: 'target_item = "RTX 4070 GPU"',
          completedMessage: "Target product updated!",
        },
        {
          step: 2,
          task: "Set min_discount_pct to 10.0 so smaller sales also trigger alerts.",
          targetLine: "min_discount_pct = 15.0",
          hint1: "Look at line 6 where min_discount_pct is set.",
          hint2: "Change 15.0 to 10.0.",
          solutionCode: "min_discount_pct = 10.0",
          completedMessage: "Threshold updated! Agent will trigger more alerts.",
        },
        {
          step: 3,
          task: "Run the agent to simulate the full tool-calling execution loop.",
          targetLine: "max_budget = 320.00",
          hint1: "Click the 'Run Code' button below.",
          hint2: "Watch the agent reason, call tools, and send alerts.",
          solutionCode: "max_budget = 320.00",
          completedMessage: "Outstanding! Your Autonomous Agent is verified.",
        },
      ],
    },
    whatYouCanNowDo: [
      "Automate headless browser navigation and web scraping with Playwright",
      "Give LLMs custom tool-calling permissions to run Python functions",
      "Parse and clean messy e-commerce price data from live web pages",
      "Format and dispatch rich webhook cards to Discord and messaging apps",
      "Schedule autonomous tasks to run in the background 24/7",
    ],
    sandboxType: "agent",
  },
  {
    id: "sprint-5",
    sprintNumber: 5,
    title: "Deploy Your Master AI Portfolio & Compete on Kaggle",
    codename: "OPERATION: TITAN PROOF",
    estimatedTime: "2–3 hours",
    difficulty: "Advanced",
    skillsList: ["Kaggle Competitions", "Hugging Face Cloud", "GitHub Portfolio", "Docker Basics"],
    finalOutput: "1 Public Portfolio + Kaggle Rank",
    duration: "Weeks 17 – 20",
    goal: "Deploy all previous projects live to free cloud containers, submit a competitive model to Kaggle, and launch a public portfolio website.",
    motivationHook: "You will have a verifiable public portfolio link and Kaggle leaderboard rank to show college scouts, internship programs, or founders.",
    bragPhrases: [
      "I deployed my AI projects live to the cloud.",
      "I competed in a real Kaggle AI challenge.",
      "I built a public developer portfolio website.",
      "I have verifiable proof of real-world AI skills.",
      "I completed the entire 5-sprint curriculum.",
    ],
    color: "from-emerald-400 to-indigo-500",
    accent: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    visualMockup: {
      type: "Master Portfolio Showcase & Verified Kaggle Profile",
      title: "Cloud AI Portfolio Matrix",
      tagline: "Hugging Face Cloud + Kaggle Leaderboard Verified Rank",
      badge: "Level 5 AI Titan",
      color: "from-emerald-400 to-indigo-500",
      previewPoints: [
        "4 Deployed Interactive Cloud Applications",
        "Official Kaggle Competition Submission Rank",
        "GitHub Repository Suite with Demo GIFs & Clean Docs",
      ],
    },
    curriculum: [
      {
        module: "1. Entering Kaggle AI Competitions",
        description: "Compete with real data scientists worldwide on classic challenges like Titanic Survival, House Price Regression, or Digit Recognizer.",
        skills: ["Kaggle Notebooks", "Cross-Validation", "Ensemble Modeling (XGBoost/LightGBM)", "Public Leaderboard Submissions"],
      },
      {
        module: "2. Cloud Deployment with Hugging Face Spaces & Docker",
        description: "Containerize your web apps so they run forever on free cloud GPUs/CPUs with live public URLs for anyone to try.",
        skills: ["Dockerfile Fundamentals", "Hugging Face Spaces", "Gradio & Streamlit Hosting", "Custom Domain Mapping"],
      },
      {
        module: "3. Crafting a Cyber GitHub Portfolio",
        description: "Organize your code repositories with clean READMEs, animated demo GIFs, and architecture diagrams that scream 'Senior Talent'.",
        skills: ["Git Branching & PRs", "Markdown Documentation", "Demo Screen Captures", "Open-Source Etiquette"],
      },
      {
        module: "4. The Career Track Specialization Capstone",
        description: "Choose your favorite of the 8 career tracks (Bio-AI, Red Teaming, Quant, Autonomous Sim) and build your custom masterpiece.",
        skills: ["Independent Architecture", "End-to-End System Design", "Benchmark Testing", "Live Pitch Video"],
      },
    ],
    project: {
      name: "The Master AI Showcase & Kaggle Competitor Badge",
      summary: "A unified, live portfolio website featuring all 4 working AI applications + official Kaggle competition submission certificate.",
      deliverable: "Live portfolio domain + GitHub repository suite + Kaggle profile link",
      bragFactor: "You will have a public portfolio and verified projects more advanced than most university Computer Science seniors.",
    },
    timelineSteps: [
      {
        stepNumber: 1,
        name: "Learn",
        duration: "15–20 min",
        category: "learn",
        description: "Learn how Kaggle competitions score submissions and how Hugging Face hosts containerized web apps for free.",
        actionTip: "Explore top-scoring Kaggle notebooks to see how feature engineering improves accuracy.",
      },
      {
        stepNumber: 2,
        name: "Try",
        duration: "15 min",
        category: "try",
        description: "Open the Portfolio Practice Lab to test leaderboard benchmark scoring and cloud container configurations.",
        actionTip: "Test ensemble models (RandomForest vs XGBoost) in the simulator.",
      },
      {
        stepNumber: 3,
        name: "Build",
        duration: "45–60 min",
        category: "build",
        description: "Deploy at least two of your previous projects to Hugging Face Spaces and submit your model to Kaggle.",
        actionTip: "Add an interactive README on GitHub with screenshots and quick live demo links.",
      },
      {
        stepNumber: 4,
        name: "Test",
        duration: "15 min",
        category: "test",
        description: "Click your public links from an incognito browser or phone to ensure all live apps load smoothly.",
        actionTip: "Verify your Kaggle submission appears on the public leaderboard.",
      },
      {
        stepNumber: 5,
        name: "Publish",
        duration: "10 min",
        category: "publish",
        description: "Launch your master portfolio landing page and share your brag card with friends and mentors.",
        actionTip: "Pin your 4 project repositories to the top of your GitHub profile.",
      },
      {
        stepNumber: 6,
        name: "Submit",
        duration: "5 min",
        category: "submit",
        description: "Submit your public portfolio URL, Kaggle profile link, and claim the ultimate Level 5 AI Titan Certificate!",
        actionTip: "Celebrate your mastery across all 5 sprints!",
      },
    ],
    deliverables: [
      {
        id: "d5-code",
        title: "Master Portfolio Website Link",
        description: "A live public link to your portfolio website featuring your 4 AI projects.",
        required: true,
      },
      {
        id: "d5-kaggle",
        title: "Kaggle Profile / Submission Link",
        description: "A link to your Kaggle profile or active competition leaderboard rank.",
        required: true,
      },
      {
        id: "d5-github",
        title: "GitHub Profile Suite",
        description: "Your GitHub profile with pinned AI project repositories and demo GIFs.",
        required: true,
      },
      {
        id: "d5-shot",
        title: "Screenshot of Live Cloud Deployment",
        description: "A screenshot showing your cloud apps running on Hugging Face Spaces or custom domain.",
        required: true,
      },
      {
        id: "d5-custom",
        title: "Your Capstone Track Specialization",
        description: "State which of the 8 career tracks you specialized in for your capstone.",
        required: true,
      },
      {
        id: "d5-card",
        title: "Level 5 AI Titan Master Certificate",
        description: "Download your shareable master certificate.",
        required: false,
      },
    ],
    milestones: [
      { id: "s5-m1", title: "Submit First Valid Prediction to Kaggle Competition", xp: 250, description: "Score on the public Kaggle Beginner or Intermediate Leaderboard." },
      { id: "s5-m2", title: "Host 2 AI Applications on Hugging Face Spaces", xp: 300, description: "Deploy cloud containers with interactive UI and public shareable URLs." },
      { id: "s5-m3", title: "Publish Comprehensive GitHub Portfolio with GIFs", xp: 350, description: "Polish project repositories with step-by-step instructions and architecture diagrams." },
      { id: "s5-m4", title: "Unlock the Level 5 AI Titan Certificate", xp: 500, description: "Celebrate total sprint mastery and commit to your long-term 6-figure career trajectory!" },
    ],
    learningResources: [
      {
        category: "start",
        title: "freeCodeCamp – Git & GitHub for Beginners",
        platform: "freeCodeCamp",
        url: "https://www.freecodecamp.org/news/learn-git-and-github-for-beginners/",
        whatItTeaches: "How to initialize Git repos, commit changes, and push to GitHub.",
        whenToUse: "Use before Step 1 to prepare your public project repositories.",
        buttonLabel: "Learn Git Basics →",
        badge: "Essential Skill",
      },
      {
        category: "watch",
        title: "How to Win Your First Kaggle Medal in 10 Minutes",
        platform: "YouTube",
        url: "https://www.youtube.com/results?search_query=kaggle+first+submission+beginner+tutorial+python",
        whatItTeaches: "How to submit CSV predictions to Kaggle and climb the leaderboard.",
        whenToUse: "Watch before Step 3 to submit your first Kaggle notebook.",
        buttonLabel: "Watch Kaggle Guide →",
        badge: "Competition Guide",
      },
      {
        category: "practise",
        title: "Hugging Face Spaces – Free Cloud Hosting Guide",
        platform: "Hugging Face",
        url: "https://huggingface.co/docs/hub/spaces-overview",
        whatItTeaches: "How to host Streamlit and Gradio Python apps with free cloud GPUs.",
        whenToUse: "Use during Step 3 to deploy your web apps live on the internet.",
        buttonLabel: "Explore Cloud Spaces →",
        badge: "Cloud Hosting",
      },
      {
        category: "stuck",
        title: "Kaggle Competitions Hub & Discussion Forums",
        platform: "Kaggle",
        url: "https://www.kaggle.com/competitions",
        whatItTeaches: "Community tips, sample starter code, and dataset Q&A.",
        whenToUse: "Open this if your submission has missing rows or formatting issues.",
        buttonLabel: "Explore Kaggle Hub →",
        badge: "Community Forum",
      },
    ],
    labData: {
      title: "Interactive Kaggle & Cloud Deployment Lab",
      language: "python",
      instructions: "Benchmark ensemble model scores against baseline models and test cloud deployment readiness. Click Run to simulate leaderboard submission.",
      initialCode: `# SPRINT 5 PRACTICE LAB: Kaggle Leaderboard Benchmark
import numpy as np

model_choice = "XGBoost_Ensemble"   # Options: "Baseline_Logistic", "RandomForest", "XGBoost_Ensemble"
k_folds = 5                          # Cross-validation folds
deployed_on_cloud = True

# Simulated accuracy benchmarking
benchmarks = {
    "Baseline_Logistic": {"accuracy": 0.768, "rank_percentile": "Top 65%"},
    "RandomForest": {"accuracy": 0.842, "rank_percentile": "Top 35%"},
    "XGBoost_Ensemble": {"accuracy": 0.894, "rank_percentile": "Top 12% (Medal Contender)"}
}

result = benchmarks[model_choice]
print(f"[*] EVALUATING MODEL: {model_choice} with {k_folds}-Fold Cross Validation")
print(f"[✓] Validation Accuracy: {result['accuracy'] * 100}%")
print(f"[✓] Estimated Kaggle Rank: {result['rank_percentile']}")
print(f"[✓] Hugging Face Cloud Container Status: {'ONLINE & LIVE' if deployed_on_cloud else 'OFFLINE'}")
print(f"[👑] TITAN LEVEL UNLOCKED: Ready for Public Portfolio Showcase!")`,
      challenges: [
        {
          step: 1,
          task: "Switch model_choice to 'RandomForest' or 'XGBoost_Ensemble'.",
          targetLine: 'model_choice = "XGBoost_Ensemble"',
          hint1: "Look at line 4 where model_choice is set.",
          hint2: 'Select "RandomForest" or "XGBoost_Ensemble".',
          solutionCode: 'model_choice = "XGBoost_Ensemble"',
          completedMessage: "High-performance model selected!",
        },
        {
          step: 2,
          task: "Set k_folds to 10 for deeper cross-validation.",
          targetLine: "k_folds = 5",
          hint1: "Look at line 5 where k_folds is set.",
          hint2: "Change 5 to 10.",
          solutionCode: "k_folds = 10",
          completedMessage: "10-Fold validation configured!",
        },
        {
          step: 3,
          task: "Run the benchmark to verify your Kaggle leaderboard standing.",
          targetLine: "deployed_on_cloud = True",
          hint1: "Click the 'Run Code' button below.",
          hint2: "Inspect the final leaderboard percentile output.",
          solutionCode: "deployed_on_cloud = True",
          completedMessage: "Boom! You are ready for the Master Portfolio & Kaggle showcase.",
        },
      ],
    },
    whatYouCanNowDo: [
      "Compete on global Kaggle machine learning leaderboards with ensemble models",
      "Deploy interactive AI web apps to free cloud containers on Hugging Face Spaces",
      "Build and showcase a polished public GitHub developer portfolio",
      "Document code with animated demo GIFs, clean READMEs, and architecture diagrams",
      "Demonstrate proof of end-to-end AI engineering to founders and universities",
    ],
    sandboxType: "portfolio",
  },
];
