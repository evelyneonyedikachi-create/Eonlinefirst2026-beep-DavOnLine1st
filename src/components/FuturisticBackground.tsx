import React from "react";

export const FuturisticBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#05070a]">
      {/* Radial ambient glow gradients matching the Frosted Glass theme */}
      <div 
        className="absolute -top-[10%] right-[5%] w-[800px] h-[600px] rounded-full opacity-30 blur-[140px]"
        style={{ background: "radial-gradient(circle, #0a192f 0%, #00f2ff 35%, transparent 75%)" }}
      />
      <div 
        className="absolute top-[35%] -left-[10%] w-[650px] h-[650px] rounded-full opacity-15 blur-[130px]"
        style={{ background: "radial-gradient(circle, #00f2ff 0%, #0369a1 40%, transparent 70%)" }}
      />
      <div 
        className="absolute bottom-[5%] right-[10%] w-[700px] h-[500px] rounded-full opacity-15 blur-[150px]"
        style={{ background: "radial-gradient(circle, #6366f1 0%, #0a192f 50%, transparent 70%)" }}
      />

      {/* Frosted Glass Micro Grid Lines */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse at center, black 45%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 45%, transparent 90%)",
        }}
      />

      {/* Ambient noise / glass texture feel */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, #fff, #fff 1px, transparent 1px, transparent 3px)",
        }}
      />
    </div>
  );
};

