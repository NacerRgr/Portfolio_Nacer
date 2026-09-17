import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";

export function DotGrid({ sx }: { sx?: SxProps<Theme> }) {
  return (
    <Box
      aria-hidden="true"
      sx={{
        position: "absolute",
        width: 160,
        height: 160,
        backgroundImage: "radial-gradient(rgba(255,255,255,0.18) 1.2px, transparent 1.2px)",
        backgroundSize: "14px 14px",
        pointerEvents: "none",
        ...sx,
      }}
    />
  );
}
