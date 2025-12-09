export function SnapchatLogo() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="snapchat-logo"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Ghost body - outer shape */}
      <g fill="white" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Main ghost body */}
        <path d="M 50 10 C 35 10 25 20 25 35 C 25 45 28 52 32 57 L 32 65 C 32 72 38 78 45 80 L 50 80.5 L 55 80 C 62 78 68 72 68 65 L 68 57 C 72 52 75 45 75 35 C 75 20 65 10 50 10 Z" />
        
        {/* Left eye */}
        <circle cx="40" cy="32" r="3.5" fill="black" />
        
        {/* Right eye */}
        <circle cx="60" cy="32" r="3.5" fill="black" />
        
        {/* Mouth - curved smile */}
        <path d="M 42 48 Q 50 54 58 48" stroke="black" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}
