import React from "react";

interface CubeBackgroundProps {
  children?: React.ReactNode;
  title?: string;
  className?: string;
}

export function CubeBackground({ children, title, className }: CubeBackgroundProps) {
  return (
    <div className={`fixed inset-0 h-screen w-screen overflow-hidden bg-gradient-to-br from-zinc-950 via-gray-950 to-black pointer-events-none ${className || ""}`}>
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-gradient-radial from-slate-900/20 via-transparent to-transparent" />
      
      {/* Additional darker overlay for depth */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Title */}
      {title && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl md:text-5xl font-bold z-10 pointer-events-auto">
          {title}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 h-full w-full pointer-events-auto">{children}</div>

      {/* Cube elements - with darker theme colors */} 
      <div className="absolute top-[80vh] left-[45vw] w-2.5 h-2.5 border border-slate-300/20 animate-cube"></div>
      <div className="absolute top-[40vh] left-[25vw] w-2.5 h-2.5 border border-slate-300/25 animate-cube animation-delay-2000"></div>
      <div className="absolute top-[50vh] left-[75vw] w-2.5 h-2.5 border border-slate-300/20 animate-cube animation-delay-4000"></div>
      <div className="absolute top-[10vh] left-[90vw] w-2.5 h-2.5 border border-slate-300/25 animate-cube animation-delay-6000"></div>
      <div className="absolute top-[85vh] left-[10vw] w-2.5 h-2.5 border border-slate-300/20 animate-cube animation-delay-8000"></div>
      <div className="absolute top-[10vh] left-[50vw] w-2.5 h-2.5 border border-slate-300/25 animate-cube animation-delay-10000"></div>
    </div>
  );
}