// Inline SVG icon set — stroke-based to match the botanical/minimal look.
// Each icon is a small React component that forwards className/size.

const base = (size) => ({ width: size, height: size });

export const Leaf = ({ size = 22, className }) => (
  <svg
    {...base(size)}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6" />
  </svg>
);

export const Search = ({ size = 20, className }) => (
  <svg
    {...base(size)}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export const User = ({ size = 20, className }) => (
  <svg
    {...base(size)}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const Cart = ({ size = 21, className }) => (
  <svg
    {...base(size)}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
);

export const Heart = ({ size = 15, className }) => (
  <svg
    {...base(size)}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

export const Arrow = ({ size = 16, className = "arrow" }) => (
  <svg
    {...base(size)}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export const Menu = ({ size = 26, className }) => (
  <svg
    {...base(size)}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
  >
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const Globe = ({ size = 20, className }) => (
  <svg
    {...base(size)}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
  </svg>
);

export const Sparkle = ({ size = 20, className }) => (
  <svg
    {...base(size)}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M12 3v18M3 12h18M6 6l12 12M18 6 6 18" strokeLinecap="round" />
  </svg>
);

export const Drop = ({ size = 20, className }) => (
  <svg
    {...base(size)}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path
      d="M12 2s6 6.5 6 11a6 6 0 0 1-12 0C6 8.5 12 2 12 2Z"
      strokeLinejoin="round"
    />
  </svg>
);

export const Phone = ({ size = 18, className }) => (
  <svg
    {...base(size)}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
  >
    <path
      d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.7 2Z"
      strokeLinejoin="round"
    />
  </svg>
);

export const Mail = ({ size = 18, className }) => (
  <svg
    {...base(size)}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 6 10 7L22 6" />
  </svg>
);

export const Pin = ({ size = 18, className }) => (
  <svg
    {...base(size)}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const Instagram = ({ size = 16, className }) => (
  <svg
    {...base(size)}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
);

export const Facebook = ({ size = 16, className }) => (
  <svg
    {...base(size)}
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M14 9h3l.5-3H14V4.5c0-.9.3-1.5 1.6-1.5H17V.3C16.5.2 15.5 0 14.3 0 11.8 0 10 1.5 10 4.2V6H7v3h3v9h4V9Z" />
  </svg>
);

export const TikTok = ({ size = 16, className }) => (
  <svg
    {...base(size)}
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M16 2c.3 2.2 1.6 3.9 3.9 4.1v2.7c-1.4.1-2.7-.3-3.9-1v6.6c0 3.6-2.6 6-6 5.7-3-.3-4.9-3-4.5-5.9.3-2.4 2.3-4.2 4.7-4.2.4 0 .8 0 1.2.1v2.9c-.4-.1-.8-.2-1.2-.2-1.2 0-2.1 1-2 2.2 0 1.1 1 2 2.2 2 1.3 0 2.2-1 2.2-2.4V2H16Z" />
  </svg>
);

export const YouTube = ({ size = 16, className }) => (
  <svg
    {...base(size)}
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M22 7.2a3 3 0 0 0-2.1-2.1C18 4.6 12 4.6 12 4.6s-6 0-7.9.5A3 3 0 0 0 2 7.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 16.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15V9l5 3-5 3Z" />
  </svg>
);

export const Clock = ({ size = 18, className }) => (
  <svg
    {...base(size)}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" strokeLinecap="round" />
  </svg>
);

export const Chevron = ({ size = 14, className }) => (
  <svg
    {...base(size)}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

// Map string keys -> components (used by data-driven feature lists)
export const IconByName = {
  leaf: Leaf,
  heart: Heart,
  globe: Globe,
  sparkle: Sparkle,
  drop: Drop,
  user: User,
};
