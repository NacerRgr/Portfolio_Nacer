import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import { alpha } from "@mui/material/styles";
import { colors, fonts } from "../theme";

const ease = "cubic-bezier(0.65, 0, 0.35, 1)";

// Hand-inked arrow: a gently wavering brush-stroke shaft and a curved arrowhead.
// Give a parent's hover a `.shaft` width to stretch it (the stroke keeps its weight while stretching).
// The width stays in `sx` (a handful of fixed lengths) so those hover rules can override it.
const arrowWrapSx = { display: "inline-flex", alignItems: "center", flexShrink: 0 } as const;
const shaftSx = { height: 12, overflow: "visible", transition: `width 0.3s ${ease}` } as const;
const headSx = { width: 7, height: 12, ml: "-5px", overflow: "visible" } as const;

export function LineArrow({ flip, length = 22, color = "primary.main" }: { flip?: boolean; length?: number; color?: string }) {
  return (
    <Box component="span" aria-hidden="true" sx={[arrowWrapSx, { color }]} style={flip ? { transform: "scaleX(-1)" } : undefined}>
      <Box className="shaft" component="svg" viewBox="0 0 24 12" preserveAspectRatio="none" sx={[shaftSx, { width: length }]}>
        <path
          d="M1 6.5C5.5 5.3 10.2 7.4 15 6.2c2.9-.7 5.4-.5 7.6-.1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </Box>
      <Box component="svg" viewBox="0 0 8 12" sx={headSx}>
        <path d="M1.3 1.5c2 1.3 3.8 2.8 5.3 4.6-1.6 1.6-3.4 3-5.3 4.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </Box>
    </Box>
  );
}

type ArrowButtonProps = {
  href: string;
  children: ReactNode;
  size?: "small" | "medium" | "large";
};

// Primary call to action as a painted brush swash rather than a UI pill, with a seed that sprouts: one stroke of sky-blue
// paint with ragged edges, a paler wash peeking out off-register, the label and an inked arrow.
// On hover the paint lifts, the pale wash drifts the other way and the arrow reaches forward.
// Hover motion is transform-only.
const swashPath =
  "M7.5 17.2C29 6.6 67 3.6 108 4.4c33 .7 61 2.6 81.5 8.3 6.8 1.9 9.4 9.3 8.6 16.8-.9 8.6-3.6 16.2-11.2 19.2-24.1 6.4-60.4 7.1-96.3 6.4-30.1-.6-57.8-2.3-77.9-7.6C3.9 45.6 1.5 38.3 2.2 30.4c.5-5.2 1.6-9.9 5.3-13.2z";


// "Start a project" = plant a seed. A terracotta seed rests on the paint's top edge; on hover a stem
// draws itself up out of the button and two leaves unfurl (a nod to Totoro's overnight tree).
// Touch screens can't hover, so there it is shown already sprouted.
const grown = {
  "& .stem": { strokeDashoffset: 0 },
  "& .leaf-l": { transform: "scale(1) rotate(0deg)" },
  "& .leaf-r": { transform: "scale(1) rotate(0deg)" },
  "& .seed": { transform: "rotate(-14deg)" },
} as const;

const sproutSx = {
  position: "absolute",
  left: 20,
  // Sits so the seed rests on the swash's top edge (which dips on the left).
  top: -24,
  width: 34,
  height: 34,
  overflow: "visible",
  pointerEvents: "none",
  "& .stem": { fill: "none", stroke: colors.sprout, strokeWidth: 2, strokeLinecap: "round", strokeDasharray: 26, strokeDashoffset: 26, transition: `stroke-dashoffset 0.4s ${ease}` },
  "& .leaf-l, & .leaf-r": { fill: colors.sprout, transition: `transform 0.35s ${ease} 0.22s` },
  "& .leaf-l": { transformOrigin: "15px 15px", transform: "scale(0) rotate(30deg)" },
  "& .leaf-r": { transformOrigin: "15.5px 12px", transform: "scale(0) rotate(-30deg)", transitionDelay: "0.32s" },
  "& .leaf-vein": { fill: "none", stroke: alpha("#FFFFFF", 0.55), strokeWidth: 0.8, strokeLinecap: "round" },
  "& .seed": { fill: colors.warm, transformOrigin: "15px 28px", transition: `transform 0.5s ${ease}` },
  "@media (hover: none)": grown,
} as const;

function Sprout() {
  return (
    <Box component="svg" viewBox="0 0 30 30" aria-hidden="true" sx={sproutSx}>
      <path className="stem" d="M15 28.5c-.4-5.2.3-10 1-14.8.4-2.8.3-5.3-.3-7.9" />
      <g className="leaf-l">
        <path d="M15.2 15.5C11.8 16.6 7.3 15.9 4.4 12.9 8 10.6 12.6 11 15.2 15.5z" />
        <path className="leaf-vein" d="M14.4 15.1c-2.8-1.4-5.5-2-8.3-2.1" />
      </g>
      <g className="leaf-r">
        <path d="M15.7 12.2c2.2-3.6 6.2-5.9 10.5-5.3-1.3 4.1-5.6 6.7-10.5 5.3z" />
        <path className="leaf-vein" d="M16.4 11.7c2.6-1.8 5.1-3 7.9-3.8" />
      </g>
      <ellipse className="seed" cx="15" cy="28.2" rx="3.4" ry="2.3" />
    </Box>
  );
}

const paintButtonSx = {
  position: "relative",
  isolation: "isolate",
  display: "inline-flex",
  alignItems: "center",
  color: "#FFFFFF",
  fontFamily: fonts.display,
  fontWeight: 700,
  letterSpacing: "-0.005em",
  whiteSpace: "nowrap",
  "& .swash, & .swash-under": { position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", zIndex: -1, transition: `transform 0.45s ${ease}` },
  "& .swash": { fill: colors.accent, filter: `drop-shadow(0 8px 14px ${alpha(colors.accent, 0.28)})` },
  "& .swash-under": { fill: colors.accentMuted, opacity: 0.75, transform: "translate(5px, 4px) rotate(-1.2deg)" },
  "&:hover .swash, &.Mui-focusVisible .swash": { transform: "translateY(-2px) rotate(-0.6deg)" },
  "&:hover .swash-under, &.Mui-focusVisible .swash-under": { transform: "translate(8px, 6px) rotate(-2deg)" },
  "&:hover .shaft, &.Mui-focusVisible .shaft": { width: 32 },
  "&:hover, &.Mui-focusVisible": grown,
  "&:active .swash": { transform: "translateY(0) scale(0.985)" },
  "&.Mui-focusVisible": { outline: `2px solid ${colors.accent}`, outlineOffset: 6, borderRadius: "14px" },
} as const;

const paintSizes = {
  small: { font: "0.85rem", px: 2, py: 1, gap: 1, arrow: 14 },
  medium: { font: "1rem", px: 3, py: 1.4, gap: 1.25, arrow: 18 },
  large: { font: "1.08rem", px: 3.5, py: 1.6, gap: 1.5, arrow: 20 },
} as const;

export function ArrowButton({ href, children, size = "medium" }: ArrowButtonProps) {
  const d = paintSizes[size];
  return (
    <ButtonBase component="a" href={href} disableRipple sx={[paintButtonSx, { fontSize: d.font, px: d.px, py: d.py, gap: d.gap }]}>
      <Box component="svg" className="swash-under" viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true">
        <path d={swashPath} />
      </Box>
      <Box component="svg" className="swash" viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true">
        <path d={swashPath} />
      </Box>
      {size !== "small" && <Sprout />}
      <span>{children}</span>
      <LineArrow length={d.arrow} color="#FFFFFF" />
    </ButtonBase>
  );
}

// Secondary action: plain text with a line arrow that stretches on hover.
export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Box
      component="a"
      href={href}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1.25,
        py: 1,
        color: "text.primary",
        fontWeight: 650,
        fontSize: "0.95rem",
        textDecoration: "none",
        borderRadius: 0.5,
        transition: "color 0.2s ease",
        "&:hover": { color: "primary.main" },
        "&:hover .shaft, &:focus-visible .shaft": { width: 40 },
        "&:focus-visible": { outline: `2px solid ${colors.accent}`, outlineOffset: 3 },
      }}
    >
      {children}
      <LineArrow />
    </Box>
  );
}
