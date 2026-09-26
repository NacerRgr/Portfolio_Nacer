import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import { alpha } from "@mui/material/styles";
import { colors } from "../theme";

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

// Same rolling-label hover as the navbar links.
function RollLabel({ children }: { children: ReactNode }) {
  return (
    <Box component="span" sx={{ display: "inline-block", height: "1.4em", lineHeight: 1.4, overflow: "hidden" }}>
      <Box component="span" className="roll" sx={{ display: "flex", flexDirection: "column", transition: `transform 0.4s ${ease}` }}>
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </Box>
    </Box>
  );
}

type ArrowButtonProps = {
  href: string;
  children: ReactNode;
  size?: "small" | "medium" | "large";
};

// Primary call to action: teal pill with the drawn arrow in a white "coin" at the end.
export function ArrowButton({ href, children, size = "medium" }: ArrowButtonProps) {
  const dims = {
    small: { coin: 28, gap: 1.25, pl: 2, pad: "4px", font: "0.85rem", arrow: 11 },
    medium: { coin: 36, gap: 1.75, pl: 2.5, pad: "5px", font: "0.95rem", arrow: 14 },
    large: { coin: 40, gap: 2, pl: 3, pad: "5px", font: "1rem", arrow: 14 },
  }[size];
  const coin = dims.coin;

  return (
    <ButtonBase
      component="a"
      href={href}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: dims.gap,
        pl: dims.pl,
        pr: dims.pad,
        py: dims.pad,
        borderRadius: 999,
        bgcolor: "primary.main",
        color: "#FFFFFF",
        fontWeight: 700,
        fontSize: dims.font,
        letterSpacing: "-0.005em",
        boxShadow: `0 1px 0 ${alpha("#FFFFFF", 0.18)} inset, 0 6px 16px ${alpha(colors.accent, 0.2)}`,
        transition: `background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ${ease}`,
        "&:hover": {
          bgcolor: colors.accentHover,
          boxShadow: `0 1px 0 ${alpha("#FFFFFF", 0.18)} inset, 0 12px 28px ${alpha(colors.accent, 0.3)}`,
        },
        "&:active": { transform: "scale(0.98)" },
        "&.Mui-focusVisible": { outline: `2px solid ${colors.accent}`, outlineOffset: 3 },
        "&:hover .roll, &.Mui-focusVisible .roll": { transform: "translateY(-50%)" },
        "&:hover .arrow-out, &.Mui-focusVisible .arrow-out": { transform: `translateX(${coin}px)` },
        "&:hover .arrow-in, &.Mui-focusVisible .arrow-in": { transform: "translateX(0)" },
        "&:hover .coin, &.Mui-focusVisible .coin": { transform: "scale(1.06)" },
      }}
    >
      <RollLabel>{children}</RollLabel>
      <Box
        component="span"
        className="coin"
        sx={{
          position: "relative",
          display: "grid",
          placeItems: "center",
          width: coin,
          height: coin,
          borderRadius: "50%",
          bgcolor: colors.warmSoft,
          overflow: "hidden",
          flexShrink: 0,
          transition: `transform 0.4s ${ease}`,
        }}
      >
        <Box component="span" className="arrow-out" sx={{ gridArea: "1 / 1", display: "flex", transition: `transform 0.4s ${ease}` }}>
          <LineArrow length={dims.arrow} />
        </Box>
        <Box component="span" className="arrow-in" sx={{ gridArea: "1 / 1", display: "flex", transform: `translateX(-${coin}px)`, transition: `transform 0.4s ${ease}` }}>
          <LineArrow length={dims.arrow} />
        </Box>
      </Box>
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
