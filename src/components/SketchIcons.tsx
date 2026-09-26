import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import { alpha } from "@mui/material/styles";
import { colors } from "../theme";

// Hand-inked line icons for the Ghibli theme: round caps, slightly uneven curves, drawn in the
// text navy. Drop-in replacements for the MUI icons (same `fontSize` / `sx` API).
const inkSx = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "& .dot": { fill: "currentColor", stroke: "none" },
} as const;

function sketchIcon(displayName: string, paths: ReactNode) {
  function Icon({ sx, ...props }: SvgIconProps) {
    return (
      <SvgIcon viewBox="0 0 24 24" {...props} sx={[inkSx, ...(Array.isArray(sx) ? sx : [sx])]}>
        {paths}
      </SvgIcon>
    );
  }
  Icon.displayName = displayName;
  return Icon;
}

// A little Laputa-style robot for AI automation.
export const RobotIcon = sketchIcon(
  "RobotIcon",
  <>
    <path d="M6.6 8.7c0-1.5 1-2.5 2.5-2.5h5.9c1.5 0 2.4 1 2.4 2.5v6c0 1.5-1 2.5-2.5 2.5H9.1c-1.5 0-2.5-1-2.5-2.5z" />
    <path d="M12 6.1V4.2" />
    <circle className="dot" cx="12" cy="3.4" r="0.95" />
    <circle className="dot" cx="9.8" cy="11" r="1.05" />
    <circle className="dot" cx="14.2" cy="11" r="1.05" />
    <path d="M10.3 14.1c1 .6 2.4.6 3.4 0" />
    <path d="M4.6 10.2v3.4M19.4 10.2v3.4" />
    <path d="M9.5 17.3 9 19.8M14.5 17.3l.5 2.5" />
  </>,
);

export const ServerIcon = sketchIcon(
  "ServerIcon",
  <>
    <path d="M5 5.6c0-.9.6-1.5 1.5-1.5h11c.9 0 1.5.6 1.5 1.5V9c0 .9-.6 1.5-1.5 1.5h-11C5.6 10.5 5 9.9 5 9z" />
    <path d="M5 15c0-.9.6-1.5 1.5-1.5h11c.9 0 1.5.6 1.5 1.5v3.4c0 .9-.6 1.5-1.5 1.5h-11c-.9 0-1.5-.6-1.5-1.5z" />
    <circle className="dot" cx="8.2" cy="7.3" r="0.9" />
    <circle className="dot" cx="8.2" cy="16.7" r="0.9" />
    <path d="M11.4 7.3h4.4M11.4 16.7h3.4M12 10.6v2.8" />
  </>,
);

export const WindowIcon = sketchIcon(
  "WindowIcon",
  <>
    <path d="M3.8 6.7c0-1.2.9-2.1 2.1-2.1h12.2c1.2 0 2.1.9 2.1 2.1v10.6c0 1.2-.9 2.1-2.1 2.1H5.9c-1.2 0-2.1-.9-2.1-2.1z" />
    <path d="M4 9.1c5.3-.2 10.7-.2 16 0" />
    <circle className="dot" cx="6.7" cy="6.9" r="0.75" />
    <circle className="dot" cx="9" cy="6.9" r="0.75" />
    <path d="M7 12.6h5.2M7 15.6h8.4" />
  </>,
);

// Same puffy silhouette as the painted clouds on the home slide.
export const CloudIcon = sketchIcon(
  "CloudIcon",
  <>
    <path d="M7.3 18.3h9.8a3.7 3.7 0 0 0 .6-7.3 5.1 5.1 0 0 0-9.8-1.2 4.3 4.3 0 0 0-.6 8.5z" />
    <path d="M9.6 10.1c.6-1 1.5-1.6 2.6-1.8" />
  </>,
);

export const CodeIcon = sketchIcon(
  "CodeIcon",
  <>
    <path d="M8.6 7.2c-1.8 1.5-3.4 3.1-4.9 4.8 1.5 1.7 3.1 3.3 4.9 4.8" />
    <path d="M15.4 7.2c1.8 1.5 3.4 3.1 4.9 4.8-1.5 1.7-3.1 3.3-4.9 4.8" />
    <path d="M13.3 5.6c-.8 4.3-1.7 8.5-2.6 12.8" />
  </>,
);

// Three linked nodes, for architecture / integrations.
export const NetworkIcon = sketchIcon(
  "NetworkIcon",
  <>
    <circle cx="12" cy="5.8" r="2.3" />
    <circle cx="5.9" cy="17.6" r="2.3" />
    <circle cx="18.1" cy="17.6" r="2.3" />
    <path d="M10.9 7.9c-1.3 2.5-2.6 5-3.8 7.6M13.1 7.9c1.3 2.5 2.6 5 3.8 7.6M8.3 17.7c2.5.2 4.9.2 7.4 0" />
  </>,
);

export const ChipIcon = sketchIcon(
  "ChipIcon",
  <>
    <path d="M7.4 6.3h9.2c.6 0 1.1.5 1.1 1.1v9.2c0 .6-.5 1.1-1.1 1.1H7.4c-.6 0-1.1-.5-1.1-1.1V7.4c0-.6.5-1.1 1.1-1.1z" />
    <path d="M10 9.6h4c.2 0 .4.2.4.4v4c0 .2-.2.4-.4.4h-4c-.2 0-.4-.2-.4-.4v-4c0-.2.2-.4.4-.4z" />
    <path d="M9.5 3.6v2.6M14.5 3.6v2.6M9.5 17.8v2.6M14.5 17.8v2.6M3.6 9.5h2.6M3.6 14.5h2.6M17.8 9.5h2.6M17.8 14.5h2.6" />
  </>,
);

// Paper plane with a little swoosh trail: "send me a message".
export const PaperPlaneIcon = sketchIcon(
  "PaperPlaneIcon",
  <>
    <path d="M20.4 3.6 3.8 10.6c-.8.3-.7 1.4.1 1.6l5.9 1.8 1.9 5.9c.2.8 1.3.9 1.6.1z" />
    <path d="M9.9 14c3.4-3.5 6.9-6.9 10.4-10.3" />
    <path d="M3.4 20.3c.9-.9 1.9-1.6 3-2.1" />
  </>,
);

export const MailIcon = sketchIcon(
  "MailIcon",
  <>
    <path d="M4 7.3c0-1 .8-1.8 1.8-1.8h12.4c1 0 1.8.8 1.8 1.8v9.4c0 1-.8 1.8-1.8 1.8H5.8c-1 0-1.8-.8-1.8-1.8z" />
    <path d="m4.7 7.6 6.2 4.7c.7.5 1.5.5 2.2 0l6.2-4.7" />
  </>,
);

export const DocumentIcon = sketchIcon(
  "DocumentIcon",
  <>
    <path d="M7.1 3.9h6.5l4.2 4.3v10.4c0 1-.8 1.7-1.7 1.7H7.1c-1 0-1.7-.7-1.7-1.7V5.6c0-1 .7-1.7 1.7-1.7z" />
    <path d="M13.4 4.1v3.1c0 .6.4 1 1 1h3.1" />
    <path d="M8.6 12.4h6.8M8.6 15.4h4.4" />
  </>,
);

export const ArrowOutwardIcon = sketchIcon(
  "ArrowOutwardIcon",
  <>
    <path d="M7.4 16.6 16.4 7.6" />
    <path d="M9.6 7.3c2.4-.3 4.7-.2 7.1.1.3 2.4.4 4.7.1 7.1" />
  </>,
);

// Three strokes of different lengths, like quick brush marks.
export const MenuIcon = sketchIcon("MenuIcon", <path d="M4.5 7.5h15M4.5 12h10.5M4.5 16.5h13" />);

export const CloseIcon = sketchIcon("CloseIcon", <path d="M6.7 6.5c3.6 3.5 7.1 7.2 10.6 10.9M17.4 6.6c-3.6 3.5-7.1 7.2-10.7 10.8" />);

export const ChevronLeftIcon = sketchIcon("ChevronLeftIcon", <path d="M14.8 5.8c-2 2-4 4.1-6 6.2 2 2.1 4 4.1 6 6.2" />);

export const ChevronRightIcon = sketchIcon("ChevronRightIcon", <path d="M9.2 5.8c2 2 4 4.1 6 6.2-2 2.1-4 4.1-6 6.2" />);

export type WashTint = "sky" | "peach" | "leaf";

// Each wash: the pale fill plus a deeper tone for the rim watercolor leaves as it dries.
const washColors: Record<WashTint, { fill: string; rim: string }> = {
  sky: { fill: colors.accentSoft, rim: alpha(colors.accentMuted, 0.55) },
  peach: { fill: colors.warmSoft, rim: alpha(colors.warm, 0.3) },
  leaf: { fill: colors.leafSoft, rim: alpha(colors.leaf, 0.6) },
};

const washBaseSx = {
  position: "relative",
  display: "grid",
  placeItems: "center",
  flexShrink: 0,
  color: colors.navy,
  "&::before": {
    content: '""',
    position: "absolute",
    inset: "6% 2% 4% 8%",
    borderRadius: "63% 37% 54% 46% / 45% 58% 42% 55%",
    // Off-register, like watercolor bleeding past the ink line.
    transform: "translate(10%, 9%) rotate(-14deg)",
  },
  "& > *": { position: "relative" },
} as const;

// An inked icon over a soft watercolor dab in one of the painting's colors.
type WashSize = number | Partial<Record<"xs" | "sm" | "md" | "lg", number>>;

export function IconWash({ children, tint = "sky", size = 40 }: { children: ReactNode; tint?: WashTint; size?: WashSize }) {
  return (
    <Box
      aria-hidden="true"
      sx={[washBaseSx, { width: size, height: size, "&::before": { bgcolor: washColors[tint].fill, boxShadow: `inset 0 0 0 1.5px ${washColors[tint].rim}` } }]}
    >
      {children}
    </Box>
  );
}
