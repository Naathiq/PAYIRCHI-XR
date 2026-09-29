import React from 'react';

/**
 * High-fidelity vector representation of the official Government of Jharkhand Seal
 * Matching the state emblem with:
 * - Top arc: "झारखण्ड सरकार"
 * - Bottom arc: "GOVERNMENT OF JHARKHAND"
 * - Green ring with 24 white elephants
 * - Palash flowers ring
 * - Tribal dance figures (Sauria Paharia art)
 * - Green beaded ring
 * - Central Ashoka Lion Capital with "सत्यमेव जयते"
 */
export const JharkhandSeal: React.FC<{ className?: string; size?: number }> = ({ 
  className = "w-20 h-20", 
  size = 80 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 400 400" 
      className={`shrink-0 ${className}`}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Government of Jharkhand Official Seal"
    >
      <defs>
        {/* Top curved path for Hindi text: झारखण्ड सरकार */}
        {/* Arc centered at (200, 200), radius 176, sweeping clockwise */}
        <path 
          id="jh-text-path-hindi" 
          d="M 28 200 A 172 172 0 0 1 372 200" 
          fill="none" 
        />

        {/* Bottom curved path for English text: GOVERNMENT OF JHARKHAND */}
        {/* We use an arc that reads left-to-right along the bottom */}
        <path 
          id="jh-text-path-eng" 
          d="M 36 200 A 164 164 0 0 0 364 200" 
          fill="none" 
        />

        {/* Subtle drop shadow for depth */}
        <filter id="jh-seal-shadow" x="-4%" y="-4%" width="108%" height="108%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1" />
        </filter>
      </defs>

      {/* Main Base Disc */}
      <circle cx="200" cy="200" r="197" fill="#FFFFFF" stroke="#005A28" strokeWidth="5.5" filter="url(#jh-seal-shadow)" />

      {/* Outer Inner Border Line */}
      <circle cx="200" cy="200" r="190" fill="none" stroke="#005A28" strokeWidth="2.5" />

      {/* Border separating text ring from elephant ring */}
      <circle cx="200" cy="200" r="150" fill="none" stroke="#005A28" strokeWidth="3" />

      {/* Top Text: झारखण्ड सरकार in Hindi */}
      <text 
        fill="#005A28" 
        fontSize="30" 
        fontWeight="800" 
        letterSpacing="2.5" 
        textAnchor="middle" 
        fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
      >
        <textPath href="#jh-text-path-hindi" startOffset="50%">
          झारखण्ड सरकार
        </textPath>
      </text>

      {/* Side separator dots */}
      <circle cx="34" cy="200" r="7.5" fill="#005A28" />
      <circle cx="366" cy="200" r="7.5" fill="#005A28" />

      {/* Bottom Text: GOVERNMENT OF JHARKHAND in English */}
      <text 
        fill="#005A28" 
        fontSize="21.5" 
        fontWeight="800" 
        letterSpacing="3.5" 
        textAnchor="middle" 
        fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
      >
        <textPath href="#jh-text-path-eng" startOffset="50%">
          GOVERNMENT OF JHARKHAND
        </textPath>
      </text>

      {/* Ring 2: Green Ring with 24 White Elephants */}
      {/* Outer r=150, Inner r=118 */}
      <circle cx="200" cy="200" r="148" fill="#00632B" stroke="#005A28" strokeWidth="2" />
      <circle cx="200" cy="200" r="118" fill="#FFFFFF" stroke="#005A28" strokeWidth="2" />

      {/* 24 Marching White Elephants */}
      {[...Array(24)].map((_, i) => {
        const angle = i * 15;
        return (
          <g key={i} transform={`rotate(${angle} 200 200)`}>
            {/* White elephant facing forward/counter-clockwise */}
            <g transform="translate(193, 56) scale(0.65)">
              <path 
                d="M 12 18 C 10 14 14 8 20 8 C 24 8 26 10 28 11 C 29 8 32 6 35 6 C 39 6 42 10 43 14 C 44 14 47 15 47 18 C 47 21 44 23 43 24 L 43 32 L 39 32 L 39 25 L 34 25 L 34 32 L 30 32 L 30 24 L 25 24 L 25 32 L 21 32 L 21 24 C 18 24 16 23 15 25 L 14 31 L 11 31 L 12 24 C 9 23 7 19 8 16 C 8 13 10 12 12 14 Z" 
                fill="#FFFFFF" 
              />
              {/* Trunk upward curl & ear definition */}
              <circle cx="34" cy="12" r="2.2" fill="#00632B" />
              <path d="M 43 17 Q 48 18 47 24 Q 45 23 44 20 Z" fill="#FFFFFF" />
            </g>
          </g>
        );
      })}

      {/* Ring 3: Palash / Flame of the Forest Flowers Ring */}
      {/* White background ring between r=118 and r=94 */}
      <circle cx="200" cy="200" r="94" fill="#FFFFFF" stroke="#005A28" strokeWidth="2" />

      {/* 24 Palash Flowers (Flame orange petals with dark sepals) */}
      {[...Array(24)].map((_, i) => {
        const angle = i * 15;
        return (
          <g key={i} transform={`rotate(${angle} 200 200)`}>
            <g transform="translate(193, 85) scale(0.68)">
              {/* Green/dark base sepal */}
              <path d="M 7 19 C 9 16 13 16 15 19 L 11 23 Z" fill="#6B2D10" />
              {/* Main curved orange flame petal */}
              <path d="M 11 3 C 18 7 21 16 15 20 C 13 16 9 14 11 3 Z" fill="#EA580C" />
              {/* Inner bright yellow-orange highlight */}
              <path d="M 11 5 C 15 8 17 14 13 17 C 12 14 10 11 11 5 Z" fill="#F97316" />
              {/* Left wing petal */}
              <path d="M 6 10 C 10 11 11 16 7 18 C 5 15 5 12 6 10 Z" fill="#C2410C" />
            </g>
          </g>
        );
      })}

      {/* Ring 4: Traditional Sauria Paharia Tribal Dancers */}
      {/* White background ring between r=94 and r=72 */}
      <circle cx="200" cy="200" r="72" fill="#FFFFFF" stroke="#005A28" strokeWidth="2" />

      {/* Tribal human figures in circle holding hands */}
      {[...Array(32)].map((_, i) => {
        const angle = i * (360 / 32);
        return (
          <g key={i} transform={`rotate(${angle} 200 200)`}>
            <g transform="translate(196, 96) scale(0.52)">
              {/* Head */}
              <circle cx="8" cy="4" r="2.5" fill="#431407" />
              {/* Body (Hourglass stick figure style) */}
              <path d="M 5 8 L 11 8 L 8 13 L 11 18 L 5 18 L 8 13 Z" fill="#7C2D12" />
              {/* Raised arms linked to neighbors */}
              <path d="M 1 9 L 8 9 L 15 9" stroke="#431407" strokeWidth="1.6" strokeLinecap="round" fill="none" />
              {/* Legs */}
              <path d="M 6 18 L 4 25" stroke="#431407" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M 10 18 L 12 25" stroke="#431407" strokeWidth="1.6" strokeLinecap="round" />
            </g>
          </g>
        );
      })}

      {/* Ring 5: Green Beaded Ring */}
      {/* 60 green beads on white track between r=72 and r=63 */}
      <circle cx="200" cy="200" r="63" fill="#FFFFFF" stroke="#005A28" strokeWidth="2" />
      {[...Array(48)].map((_, i) => {
        const angle = i * (360 / 48);
        return (
          <g key={i} transform={`rotate(${angle} 200 200)`}>
            <circle cx="200" cy="132" r="2.2" fill="#00632B" />
          </g>
        );
      })}

      {/* Center Disc: Ashoka Lion Capital (Emblem of India) */}
      <circle cx="200" cy="200" r="62" fill="#FFFFFF" />

      {/* Detailed Lion Capital with Abacus and Satyameva Jayate */}
      <g transform="translate(164, 142) scale(0.72)">
        {/* Central Lion body & mane */}
        <path 
          d="M 50 14 C 44 14 38 20 38 30 C 38 39 42 45 46 51 C 42 53 38 60 38 68 L 62 68 C 62 60 58 53 54 51 C 58 45 62 39 62 30 C 62 20 56 14 50 14 Z" 
          fill="#374151" 
        />
        {/* Left Lion Head & Mane */}
        <path 
          d="M 37 24 C 30 22 24 28 24 37 C 24 45 28 51 34 56 L 38 48 C 34 44 34 32 37 24 Z" 
          fill="#4B5563" 
        />
        {/* Right Lion Head & Mane */}
        <path 
          d="M 63 24 C 70 22 76 28 76 37 C 76 45 72 51 66 56 L 62 48 C 66 44 66 32 63 24 Z" 
          fill="#4B5563" 
        />

        {/* Detailed Facial Fur and Muzzle */}
        <ellipse cx="50" cy="31" rx="5.5" ry="4.5" fill="#1F2937" />
        <ellipse cx="44" cy="25" rx="1.8" ry="1.8" fill="#111827" />
        <ellipse cx="56" cy="25" rx="1.8" ry="1.8" fill="#111827" />
        <path d="M 47 32 L 53 32 L 50 36 Z" fill="#111827" />

        {/* Muscle & Mane Shading lines */}
        <path d="M 41 40 Q 50 44 59 40" stroke="#1F2937" strokeWidth="1.2" fill="none" />
        <path d="M 43 47 Q 50 51 57 47" stroke="#1F2937" strokeWidth="1.2" fill="none" />
        <path d="M 45 54 Q 50 58 55 54" stroke="#1F2937" strokeWidth="1.2" fill="none" />

        {/* Abacus platform */}
        <rect x="22" y="68" width="56" height="8" rx="2" fill="#1F2937" />

        {/* Ashoka Chakra in center of abacus */}
        <circle cx="50" cy="72" r="3.8" fill="#FFFFFF" stroke="#1E3A8A" strokeWidth="0.9" />
        <circle cx="50" cy="72" r="1.1" fill="#1E3A8A" />
        {/* Spokes representation */}
        {[...Array(8)].map((_, i) => (
          <line 
            key={i} 
            x1="50" 
            y1="68.4" 
            x2="50" 
            y2="75.6" 
            stroke="#1E3A8A" 
            strokeWidth="0.6" 
            transform={`rotate(${i * 22.5} 50 72)`} 
          />
        ))}

        {/* Galloping horse on left, walking bull on right */}
        <circle cx="33" cy="72" r="1.8" fill="#E5E7EB" />
        <circle cx="67" cy="72" r="1.8" fill="#E5E7EB" />

        {/* Bell-shaped inverted lotus base */}
        <path d="M 27 76 C 36 83 64 83 73 76 Z" fill="#374151" />

        {/* Motto: सत्यमेव जयते */}
        <text 
          x="50" 
          y="91" 
          textAnchor="middle" 
          fontSize="8.5" 
          fontWeight="bold" 
          fill="#005A28" 
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          सत्यमेव जयते
        </text>
      </g>
    </svg>
  );
};

/**
 * High-fidelity vector representation of "Will Code For Coffee" Logo
 */
export const WillCodeForCoffeeLogo: React.FC<{ className?: string; size?: number }> = ({ 
  className = "w-20 h-20", 
  size = 80 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 200 200" 
      className={`shrink-0 ${className}`}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Will Code For Coffee Logo"
    >
      {/* Background container styling */}
      <rect width="200" height="200" rx="16" fill="#FFFFFF" />

      {/* Code steam </> floating above the mug */}
      <g stroke="#3A241A" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round">
        {/* Left angle bracket < */}
        <path d="M 85 28 L 73 38 L 85 48" />
        {/* Slash / */}
        <path d="M 103 23 L 95 53" />
        {/* Right angle bracket > */}
        <path d="M 113 28 L 125 38 L 113 48" />
        {/* Gentle steam wisps */}
        <path d="M 98 14 Q 102 18 97 22" strokeWidth="2.4" />
      </g>

      {/* Left Curly Brace { */}
      <path 
        d="M 68 62 C 60 62 56 68 56 76 L 56 89 C 56 95 52 99 45 100 C 52 101 56 105 56 111 L 56 124 C 56 132 60 138 68 138" 
        stroke="#3A241A" 
        strokeWidth="6.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
      />

      {/* Right Curly Brace } */}
      <path 
        d="M 132 62 C 140 62 144 68 144 76 L 144 89 C 144 95 148 99 155 100 C 148 101 144 105 144 111 L 144 124 C 144 132 140 138 132 138" 
        stroke="#3A241A" 
        strokeWidth="6.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
      />

      {/* Coffee Mug Body */}
      <g>
        {/* Outer cup shape */}
        <path 
          d="M 72 74 C 72 71 74 69 77 69 L 123 69 C 126 69 128 71 128 74 L 127 122 C 127 128 122 133 116 133 L 84 133 C 78 133 73 128 73 122 Z" 
          fill="#523628" 
        />
        
        {/* Foamy wavy coffee layer at the top */}
        <path 
          d="M 73 78 Q 85 71 98 77 Q 112 83 127 75 L 128 72 L 72 72 Z" 
          fill="#C4A895" 
        />
        {/* Coffee crema foam bubbles */}
        <circle cx="106" cy="74" r="2.2" fill="#E8DCD4" />
        <circle cx="114" cy="76" r="1.6" fill="#E8DCD4" />
        <circle cx="88" cy="75" r="1.8" fill="#E8DCD4" />

        {/* Text "CODE" embossed on the mug */}
        <text 
          x="100" 
          y="108" 
          textAnchor="middle" 
          fontSize="17" 
          fontWeight="900" 
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
          fill="#CBB2A0" 
          letterSpacing="1.5"
        >
          CODE
        </text>

        {/* Coffee Mug Handle */}
        <path 
          d="M 128 80 C 137 80 144 86 144 95 L 144 108 C 144 117 137 123 128 123" 
          stroke="#3A241A" 
          strokeWidth="6.5" 
          strokeLinecap="round" 
          fill="none" 
        />
      </g>

      {/* Bottom text: WILL CODE FOR COFFEE */}
      <text 
        x="100" 
        y="163" 
        textAnchor="middle" 
        fontSize="16.5" 
        fontWeight="900" 
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
        fill="#262626" 
        letterSpacing="0.8"
      >
        WILL CODE
      </text>
      <text 
        x="100" 
        y="182" 
        textAnchor="middle" 
        fontSize="16.5" 
        fontWeight="900" 
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
        fill="#262626" 
        letterSpacing="0.8"
      >
        FOR COFFEE
      </text>
    </svg>
  );
};

/**
 * High-fidelity vector representation of the official DigiLocker Logo
 * Features:
 * - Purple document with top-right fold
 * - Overlaid white cloud with purple keyhole
 * - "DigiLocker" brand typography in #5452A2
 * - Sky blue horizontal accent line
 * - Tagline: "Your documents anytime, anywhere"
 */
export const DigiLockerLogo: React.FC<{ 
  className?: string; 
  height?: number;
}> = ({ 
  className = "h-11 w-auto", 
  height = 44 
}) => {
  return (
    <svg 
      height={height} 
      viewBox="0 0 350 96" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-2xs ${className}`}
      role="img"
      aria-label="DigiLocker - Your documents anytime, anywhere"
    >
      {/* Document Icon (Purple) */}
      <g>
        {/* Main Document Body */}
        <path 
          d="M 28 8 L 66 8 L 88 30 L 88 88 C 88 92.4 84.4 96 80 96 L 28 96 C 23.6 96 20 92.4 20 88 L 20 16 C 20 11.6 23.6 8 28 8 Z" 
          fill="#5452A2" 
        />
        {/* Document Folded Corner (White Notch with Corner flap) */}
        <path 
          d="M 66 8 L 66 30 L 88 30 Z" 
          fill="#FFFFFF" 
        />
      </g>

      {/* Overlaid Cloud with Keyhole */}
      <g>
        {/* White Cloud Shape with Purple Border */}
        <path 
          d="M 24 82 L 60 82 C 67.5 82 73.5 76 73.5 68.5 C 73.5 61.8 68.8 56.2 62.2 55.2 C 61.2 46.5 53.8 39.5 44.8 39.5 C 37.2 39.5 30.6 44.2 27.8 51 C 26.2 50.3 24.5 50 22.7 50 C 15.7 50 10 55.7 10 62.7 C 10 69.3 15.1 74.8 21.6 75.3 L 24 82 Z" 
          fill="#FFFFFF" 
          stroke="#5452A2" 
          strokeWidth="3.2" 
          strokeLinejoin="round"
        />

        {/* Purple Keyhole inside Cloud */}
        {/* Keyhole circular top */}
        <circle cx="43" cy="59" r="4.2" fill="#5452A2" />
        {/* Keyhole tapered slot bottom */}
        <path 
          d="M 40.8 61 L 45.2 61 L 46.5 71 L 39.5 71 Z" 
          fill="#5452A2" 
        />
      </g>

      {/* Typography: DigiLocker */}
      <text 
        x="104" 
        y="52" 
        fill="#5452A2" 
        fontSize="46" 
        fontWeight="800" 
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        letterSpacing="-0.8"
      >
        DigiLocker
      </text>

      {/* Sky Blue Accent Underline */}
      <rect 
        x="104" 
        y="63" 
        width="234" 
        height="2.5" 
        rx="1.25" 
        fill="#38BDF8" 
      />

      {/* Tagline: Your documents anytime, anywhere */}
      <text 
        x="104" 
        y="83" 
        fill="#64748B" 
        fontSize="14" 
        fontWeight="500" 
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        letterSpacing="0.2"
      >
        Your documents anytime, anywhere
      </text>
    </svg>
  );
};
