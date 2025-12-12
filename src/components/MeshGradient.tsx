import React, { useEffect, useState } from 'react';

const MeshGradient: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient layer */}
      <div 
        className={`absolute inset-0 transition-all duration-[2000ms] ease-out ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}
      >
        {/* Primary mesh - deep purple/blue */}
        <div 
          className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[150%] h-[80%] rounded-full blur-[100px] opacity-80 animate-mesh-1"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.6) 0%, rgba(59, 130, 246, 0.4) 40%, transparent 70%)',
          }}
        />
        
        {/* Secondary mesh - vibrant pink/coral */}
        <div 
          className="absolute bottom-[-10%] left-1/3 w-[100%] h-[80%] rounded-full blur-[120px] opacity-70 animate-mesh-2"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(244, 63, 94, 0.7) 0%, rgba(251, 113, 133, 0.5) 40%, transparent 70%)',
          }}
        />
        
        {/* Tertiary mesh - warm orange */}
        <div 
          className="absolute bottom-[-5%] right-1/4 w-[80%] h-[60%] rounded-full blur-[100px] opacity-60 animate-mesh-3"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(249, 115, 22, 0.6) 0%, rgba(251, 146, 60, 0.4) 50%, transparent 70%)',
          }}
        />
        
        {/* Accent - cyan glow */}
        <div 
          className="absolute top-1/4 right-1/6 w-[50%] h-[50%] rounded-full blur-[80px] opacity-40 animate-mesh-4"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(34, 211, 238, 0.5) 0%, rgba(6, 182, 212, 0.3) 50%, transparent 70%)',
          }}
        />
      </div>
    </div>
  );
};

export default MeshGradient;
