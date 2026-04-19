import React from 'react';
import { PetState } from '../types';

interface PetVisualsProps {
  state: PetState;
}

export const PetVisuals: React.FC<PetVisualsProps> = ({ state }) => {
  const isReward = state === PetState.REWARD;
  const isActive = state === PetState.ACTIVE;
  const isIdle = state === PetState.IDLE;

  const outlineColor = "#1F2937";
  const furColor = "#FFFFFF";
  const earColor = "#000000";
  const collarColor = "#EF4444";
  const shadowColor = "#E5E7EB";

  return (
    <div className={`relative w-36 h-36 -mt-6 -ml-6 select-none pointer-events-none transition-transform duration-300 ${isIdle ? 'animate-breathe' : ''}`}>
      <svg
        viewBox="0 0 140 140"
        className={`w-full h-full drop-shadow-xl transition-all duration-500
            ${isActive ? 'scale-110 -translate-y-2' : 'scale-100'}
            ${isReward ? 'animate-bounce' : ''}`}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <defs>
          <filter id="blush-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
        </defs>

        <ellipse cx="70" cy="115" rx="40" ry="10" fill={shadowColor} opacity="0.6" />

        <path
            d="M 35 95 Q 20 90 25 80 Q 30 75 40 85"
            fill={furColor}
            stroke={outlineColor}
            strokeWidth="3"
            className={`origin-bottom-left ${isReward ? 'animate-wiggle' : ''}`}
        />

        <path
            d="M 50 110 C 45 110, 45 80, 55 70 L 85 70 C 95 80, 95 110, 90 110 Z"
            fill={furColor}
            stroke={outlineColor}
            strokeWidth="3"
        />

        <g transform={isIdle ? "translate(0, 0)" : "translate(0, -2)"}>
            <ellipse cx="50" cy="112" rx="14" ry="10" fill={furColor} stroke={outlineColor} strokeWidth="3" />
            <path d="M 45 105 L 45 112 M 50 105 L 50 112 M 55 105 L 55 112" stroke={outlineColor} strokeWidth="2" />

            <ellipse cx="90" cy="112" rx="14" ry="10" fill={furColor} stroke={outlineColor} strokeWidth="3" />
            <path d="M 85 105 L 85 112 M 90 105 L 90 112 M 95 105 L 95 112" stroke={outlineColor} strokeWidth="2" />
        </g>

        <path
            d="M 52 72 Q 70 78 88 72"
            stroke={collarColor}
            strokeWidth="8"
            strokeLinecap="round"
            className="drop-shadow-sm"
        />

        <g className={`transition-transform duration-700 ${isIdle ? 'translate-y-2 rotate-1' : 'translate-y-0'}`}>

            <path
                d="M 40 45 Q 25 60 28 85 Q 40 95 50 65"
                fill={earColor}
                stroke={earColor}
                strokeWidth="2"
                className={`${isReward ? 'animate-wiggle origin-top' : ''}`}
            />

            <path
                d="M 40 50 C 40 20, 100 20, 100 50 C 100 75, 80 80, 70 80 L 70 80 C 50 80, 40 70, 40 50 Z"
                fill={furColor}
                stroke={outlineColor}
                strokeWidth="3"
            />

             <path
                d="M 100 45 Q 115 60 112 85 Q 100 95 90 65"
                fill={earColor}
                stroke={earColor}
                strokeWidth="2"
                className={`${isReward ? 'animate-wiggle origin-top' : ''}`}
            />

            <circle
                cx={isActive && !isReward ? "70" : "92"}
                cy={isActive && !isReward ? "60" : "52"}
                r={isActive && !isReward ? "8" : "6"}
                fill={earColor}
                className="transition-all duration-300"
            />

            {isIdle && (
            <g>
                <path d="M 55 45 Q 60 50 65 45" stroke={outlineColor} strokeWidth="3" fill="none" />
                <path d="M 60 65 Q 65 68 70 65" stroke={outlineColor} strokeWidth="2" fill="none" />

                <circle cx="95" cy="48" r="0" fill="#BAE6FD" stroke="#38BDF8" strokeWidth="1" opacity="0.6">
                    <animate attributeName="r" values="0;8;0" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;0.8;0" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="cx" values="95;100;95" dur="3s" repeatCount="indefinite" />
                </circle>
                <text x="105" y="30" fontSize="16" fill="#9CA3AF" className="animate-bounce" style={{ animationDuration: '2s', fontWeight: 'bold' }}>Z</text>
            </g>
            )}

            {isActive && !isReward && (
            <g className="transition-opacity duration-300 animate-fade-in">
                <circle cx="55" cy="50" r="3" fill={outlineColor} />
                <circle cx="85" cy="50" r="3" fill={outlineColor} />

                <path d="M 52 42 Q 55 39 58 42" stroke={outlineColor} strokeWidth="2" fill="none" />
                <path d="M 82 42 Q 85 39 88 42" stroke={outlineColor} strokeWidth="2" fill="none" />

                <path d="M 65 72 Q 70 75 75 72" stroke={outlineColor} strokeWidth="2.5" fill="none" />
            </g>
            )}

            {isReward && (
            <g>
                <path d="M 55 48 L 60 42 L 65 48" stroke={outlineColor} strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M 70 48 L 75 42 L 80 48" stroke={outlineColor} strokeWidth="3" fill="none" strokeLinecap="round" />

                <path d="M 60 60 Q 70 75 85 60 Z" fill={outlineColor} />
                <path d="M 65 62 Q 72 68 80 62" fill="#FDA4AF" />
            </g>
            )}
        </g>
      </svg>

      {isReward && (
        <>
          <div className="absolute top-0 left-1/2 -ml-2 text-yellow-500 animate-coin text-3xl drop-shadow-md">🪙</div>
          <div className="absolute top-0 left-1/3 -ml-2 text-yellow-400 animate-coin text-2xl drop-shadow-md" style={{ animationDelay: '0.2s' }}>✨</div>
          <div className="absolute top-0 right-1/3 -ml-2 text-pink-400 animate-coin text-2xl drop-shadow-md" style={{ animationDelay: '0.4s' }}>❤️</div>
        </>
      )}
    </div>
  );
};
