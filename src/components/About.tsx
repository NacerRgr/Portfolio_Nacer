import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { profile } from "../data/cv";
import { DotGrid } from "./DotGrid";
import { Section } from "./Section";
import portrait from "../assets/portrait.jpg";

export function About() {
  return (
    <Section id="about" icon="⚡" title="How I Work">
      <Stack direction={{ xs: "column-reverse", md: "row" }} spacing={{ xs: 5, md: 9 }} sx={{ alignItems: "center" }}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ color: "text.primary", fontWeight: 700, fontSize: { xs: "1.2rem", md: "1.45rem" }, lineHeight: 1.5, letterSpacing: "-0.02em" }}>
            I care about what changes after the code ships.
          </Typography>
          <Typography sx={{ mt: 2.5, color: "text.secondary", lineHeight: 1.8 }}>
            At{" "}
            <Link href="https://www.lesfurets.com" target="_blank" rel="noreferrer">
              LesFurets.com
            </Link>
            , I work on a platform used by millions of people, from backend services and production fixes to React journeys tested with real users. A recent redesign improved funnel retention by 25%.
          </Typography>
          <Typography sx={{ mt: 2, color: "text.secondary", lineHeight: 1.8 }}>
            At{" "}
            <Link href="https://www.st.com" target="_blank" rel="noreferrer">
              STMicroelectronics
            </Link>
            , I replaced a slow validation workflow with a service that cut job time by 75% and was adopted by several teams. I also lead Docomptia with two teammates, taking invoice processing from document capture and OCR to balanced accounting export.
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mt: 3, flexWrap: "wrap", rowGap: 1 }}>
            {profile.stack.map((item) => (
              <Box
                key={item}
                component="span"
                sx={{ px: 1.4, py: 0.7, borderRadius: 10, border: "1px solid", borderColor: "divider", color: "text.secondary", bgcolor: "rgba(255,255,255,0.025)", fontSize: "0.8rem", fontWeight: 700 }}
              >
                {item}
              </Box>
            ))}
          </Stack>
        </Box>

        <Box sx={{ position: "relative", flexShrink: 0 }}>
          <DotGrid sx={{ top: -28, right: -28, display: { xs: "none", sm: "block" }, opacity: 0.5 }} />
          <Box
            sx={{
              position: "absolute",
              inset: -10,
              borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(103,232,249,0.7), rgba(139,92,246,0.6))",
              filter: "blur(12px)",
              opacity: 0.38,
            }}
          />
          <Box
            component="img"
            src={portrait}
            alt={`Portrait of ${profile.name}`}
            width={416}
            height={416}
            loading="lazy"
            sx={{
              position: "relative",
              display: "block",
              width: { xs: 190, sm: 230, md: 250 },
              height: { xs: 190, sm: 230, md: 250 },
              borderRadius: "50%",
              border: "4px solid",
              borderColor: "background.default",
              objectFit: "cover",
            }}
          />
        </Box>
      </Stack>
    </Section>
  );
}
