import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { profile } from "../data/cv";
import { DotGrid } from "./DotGrid";

const impactStats = [
  { value: "+25%", label: "more users stayed in a redesigned funnel" },
  { value: "−75%", label: "less time spent waiting for validation jobs" },
  { value: "1,471", label: "automated tests protecting Docomptia" },
];

export function Hero() {
  return (
    <Box
      component="section"
      aria-labelledby="hero-heading"
      sx={{ position: "relative", py: { xs: 7, md: 11 }, minHeight: { md: "calc(100vh - 89px)" }, display: "grid", alignItems: "center" }}
    >
      <DotGrid sx={{ top: 22, left: -28, display: { xs: "none", sm: "block" }, opacity: 0.55 }} />

      <Box
        sx={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.35fr) minmax(280px, 0.65fr)" },
          gap: { xs: 6, md: 8 },
          alignItems: "center",
        }}
      >
        <Box>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 2.5 }}>
            <Box
              aria-hidden="true"
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: "#34d399",
                boxShadow: "0 0 0 5px rgba(52, 211, 153, 0.12)",
              }}
            />
            <Typography sx={{ color: "text.secondary", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              {profile.title} · Paris
            </Typography>
          </Stack>

          <Typography sx={{ color: "primary.main", fontWeight: 700, mb: 1.5 }}>
            {profile.name}
          </Typography>

          <Typography
            id="hero-heading"
            component="h1"
            sx={{
              maxWidth: 720,
              fontWeight: 850,
              letterSpacing: "-0.055em",
              lineHeight: 0.98,
              fontSize: { xs: "3rem", sm: "4.4rem", md: "5rem" },
            }}
          >
            I make complex software <Box component="span" sx={{ color: "primary.main" }}>feel simple.</Box>
          </Typography>

          <Typography sx={{ mt: 3, maxWidth: 650, color: "text.secondary", lineHeight: 1.75, fontSize: { xs: "1rem", md: "1.12rem" } }}>
            {profile.summary}
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 4.5, alignItems: { xs: "stretch", sm: "center" } }}>
            <Button variant="contained" href="#projects" endIcon={<ArrowForwardRoundedIcon />}>
              Explore my work
            </Button>
            <Button variant="outlined" href="/resume.pdf" target="_blank" rel="noreferrer" startIcon={<DescriptionOutlinedIcon />}>
              Download CV
            </Button>
          </Stack>

          <Stack direction="row" spacing={2.5} sx={{ mt: 3, alignItems: "center" }}>
            <Link href={profile.github} target="_blank" rel="noreferrer" underline="none" sx={{ display: "inline-flex", alignItems: "center", gap: 0.7, color: "text.secondary", fontSize: "0.88rem" }}>
              <GitHubIcon sx={{ fontSize: 18 }} /> GitHub
            </Link>
            <Link href={profile.linkedin} target="_blank" rel="noreferrer" underline="none" sx={{ display: "inline-flex", alignItems: "center", gap: 0.7, color: "text.secondary", fontSize: "0.88rem" }}>
              <LinkedInIcon sx={{ fontSize: 18, color: "#4da3ff" }} /> LinkedIn
            </Link>
            <Link href={`mailto:${profile.email}`} underline="none" sx={{ display: "inline-flex", alignItems: "center", gap: 0.7, color: "text.secondary", fontSize: "0.88rem" }}>
              <EmailOutlinedIcon sx={{ fontSize: 18, color: "primary.main" }} /> Email
            </Link>
          </Stack>
        </Box>

        <Box
          component="aside"
          aria-label="Results"
          sx={{
            position: "relative",
            p: { xs: 2.5, sm: 3 },
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
            background: "linear-gradient(145deg, rgba(103, 232, 249, 0.08), rgba(139, 92, 246, 0.04) 55%, rgba(17, 22, 30, 0.92))",
            boxShadow: "0 24px 80px rgba(0, 0, 0, 0.28)",
            overflow: "hidden",
          }}
        >
          <Box sx={{ position: "absolute", width: 150, height: 150, borderRadius: "50%", bgcolor: "rgba(103, 232, 249, 0.1)", filter: "blur(55px)", top: -60, right: -45 }} />
          <Typography sx={{ position: "relative", color: "text.secondary", fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", mb: 1 }}>
            A few numbers
          </Typography>
          {impactStats.map((stat) => (
            <Box key={stat.value} sx={{ position: "relative", py: 2.25, borderBottom: "1px solid", borderColor: "divider", "&:last-of-type": { borderBottom: 0 } }}>
              <Typography sx={{ color: "text.primary", fontWeight: 850, fontSize: { xs: "2rem", md: "2.35rem" }, letterSpacing: "-0.04em", lineHeight: 1 }}>
                {stat.value}
              </Typography>
              <Typography sx={{ mt: 0.7, color: "text.secondary", fontSize: "0.86rem", lineHeight: 1.5 }}>
                {stat.label}
              </Typography>
            </Box>
          ))}
          <Typography sx={{ position: "relative", mt: 2, display: "flex", alignItems: "center", gap: 1, color: "text.secondary", fontSize: "0.8rem" }}>
            <Box component="span" aria-hidden="true" sx={{ color: "#34d399" }}>●</Box>
            Looking for my next full-time role. Available for selected freelance work.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
