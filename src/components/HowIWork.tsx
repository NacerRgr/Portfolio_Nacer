import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { principles, valueProps } from "../data/cv";
import { Section } from "./Section";
import { colors, fonts } from "../theme";

export function HowIWork() {
  return (
    <Section id="how-i-work" index={3} title="How I Work" intro="I care about what changes after the code ships.">
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" }, gap: { xs: 0, md: 3 } }}>
        {principles.map((principle, index) => (
          <Box
            key={principle.title}
            sx={{
              py: { xs: 1, md: 1.5 },
              borderTop: { xs: index === 0 ? "none" : "1px solid", md: "2px solid" },
              borderColor: { xs: "divider", md: "primary.main" },
            }}
          >
            <Typography sx={{ color: "primary.main", fontFamily: fonts.display, fontWeight: 700, fontSize: { xs: "1.05rem", md: "1.6rem" }, lineHeight: 1 }}>
              {String(index + 1).padStart(2, "0")}
            </Typography>
            <Typography component="h3" sx={{ mt: { xs: 0.5, md: 1.25 }, fontWeight: 750, fontSize: "0.98rem" }}>
              {principle.title}
            </Typography>
            <Typography sx={{ mt: 0.5, color: "text.secondary", lineHeight: 1.55, fontSize: "0.85rem" }}>
              {principle.description}
            </Typography>
            {index === 2 && (
              <Typography sx={{ mt: 0.75, color: "text.secondary", opacity: 0.8, lineHeight: 1.45, fontSize: "0.76rem" }}>
                Example:{" "}
                <Link href="https://www.lesfurets.com" target="_blank" rel="noreferrer">
                  LesFurets.com
                </Link>{" "}
                (+25% retention),{" "}
                <Link href="https://www.st.com" target="_blank" rel="noreferrer">
                  STMicroelectronics
                </Link>{" "}
                (-75% validation time).
              </Typography>
            )}
          </Box>
        ))}
      </Box>

      <Box sx={{ mt: { xs: 2.5, md: 3.5 }, p: { xs: 1.75, md: 2.25 }, bgcolor: colors.accentSoft, border: "1px solid", borderColor: "divider" }}>
        <Typography component="h3" sx={{ mb: 1.25, fontWeight: 800, fontSize: "1rem", letterSpacing: "-0.02em" }}>
          Why Clients Work With Me
        </Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", md: "repeat(4, minmax(0, 1fr))" }, gap: { xs: 1, md: 2.5 } }}>
          {valueProps.map((value) => (
            <Box key={value.title}>
              <Typography sx={{ color: "text.primary", fontWeight: 700, fontSize: "0.85rem" }}>{value.title}</Typography>
              <Typography sx={{ mt: 0.35, color: "text.secondary", lineHeight: 1.5, fontSize: "0.8rem" }}>{value.description}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Section>
  );
}
