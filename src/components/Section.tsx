import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { colors, fonts } from "../theme";

type SectionProps = {
  id: string;
  index: number;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
};

export function Section({ id, index, title, intro, children }: SectionProps) {
  return (
    <Box component="section" aria-labelledby={`${id}-heading`}>
      <Box component="header" sx={{ mb: { xs: 3, md: 4.5 } }}>
        <Box sx={{ display: "flex", alignItems: "baseline", gap: { xs: 1.5, md: 2.5 } }}>
          <Typography
            aria-hidden="true"
            sx={{
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: { xs: "1.3rem", md: "1.6rem" },
              lineHeight: 1,
              color: colors.warm,
            }}
          >
            {String(index).padStart(2, "0")}
          </Typography>
          <Typography
            id={`${id}-heading`}
            component="h2"
            sx={{
              color: "secondary.main",
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: { xs: "1.5rem", md: "1.9rem" },
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            {title}
          </Typography>
        </Box>
        {intro && (
          <Typography sx={{ mt: { xs: 1.25, md: 1.75 }, maxWidth: 640, color: "text.secondary", lineHeight: 1.6, fontSize: { xs: "0.9rem", md: "0.98rem" } }}>
            {intro}
          </Typography>
        )}
      </Box>
      {children}
    </Box>
  );
}
