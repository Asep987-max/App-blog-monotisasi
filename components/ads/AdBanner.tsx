import React from 'react';
import { AdVariant } from '../../types';

interface AdBannerProps {
  variant: AdVariant;
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ variant, className = '' }) => {
  // CLS Protection: Define explicit heights for different ad slots
  const dimensions = {
    [AdVariant.LEADERBOARD]: "h-[90px] w-full md:w-[728px]",
    [AdVariant.RECTANGLE]: "h-[250px] w-[300px]", // Common MPU size
    [AdVariant.MOBILE_BANNER]: "h-[50px] w-[320px]",
    [AdVariant.IN_FEED]: "h-[250px] w-full",
  };

  const labels = {
    [AdVariant.LEADERBOARD]: "Leaderboard (728x90)",
    [AdVariant.RECTANGLE]: "Rectangle (300x250)",
    [AdVariant.MOBILE_BANNER]: "Mobile Banner (320x50)",
    [AdVariant.IN_FEED]: "Advertisement",
  };

  return (
    <div className={`flex justify-center my-6 ${className}`}>
      <div 
        className={`${dimensions[variant]} bg-slate-100 border border-slate-200 flex flex-col items-center justify-center relative overflow-hidden`}
        aria-label="Advertisement"
      >
        <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold z-10">
          {labels[variant]}
        </span>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-slate-50 to-transparent opacity-50" />
        <div className="absolute bottom-1 right-2 text-[10px] text-slate-300">Sponsored</div>
      </div>
    </div>
  );
};

export default AdBanner;