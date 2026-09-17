import { useState } from "react";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { projects } from "../data/cv";
import { skillIcons } from "../data/skillIcons";
import { skillColors } from "../data/skillColors";
import { Section } from "./Section";
import { Carousel } from "./Carousel";

const shortTitle = (title: string) => title.split(": ")[0];

export function Projects() {
  const [index, setIndex] = useState(0);
  const count = projects.length;
  const project = projects[index];
  const go = (delta: number) => setIndex((current) => (current + delta + count) % count);

  return (
    <Section id="projects" icon="🚀" title="Work I’m Proud Of">
      <Typography sx={{ mt: -3, mb: 3.5, maxWidth: 650, color: "text.secondary", lineHeight: 1.7 }}>
        These projects show how I work: understand the problem, make the trade-offs, build the product and measure what improved.
      </Typography>

      <Typography sx={{ mb: 1.5, color: "text.secondary", fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" }}>
        Pick a project
      </Typography>
      <Box
        role="group"
        aria-label="Choose a project"
        sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", md: "repeat(4, minmax(0, 1fr))" }, gap: 1.25, mb: 3 }}
      >
        {projects.map((item, itemIndex) => (
          <ButtonBase
            key={item.title}
            aria-pressed={itemIndex === index}
            onClick={() => setIndex(itemIndex)}
            sx={{
              display: "block",
              minWidth: 0,
              p: { xs: 1.5, sm: 2 },
              textAlign: "left",
              border: "1px solid",
              borderColor: itemIndex === index ? "primary.main" : "divider",
              borderRadius: 2.5,
              bgcolor: itemIndex === index ? "rgba(103, 232, 249, 0.08)" : "rgba(255,255,255,0.02)",
              transition: "border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease",
              "&:hover": { borderColor: "rgba(103, 232, 249, 0.5)", transform: "translateY(-2px)" },
              "&:focus-visible": { outline: "2px solid", outlineColor: "primary.main", outlineOffset: 2 },
            }}
          >
            <Typography component="span" sx={{ display: "block", color: itemIndex === index ? "primary.main" : "text.secondary", fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.12em" }}>
              {String(itemIndex + 1).padStart(2, "0")}
            </Typography>
            <Typography component="span" sx={{ display: "block", mt: 0.65, color: "text.primary", fontSize: { xs: "0.82rem", sm: "0.9rem" }, fontWeight: 750, lineHeight: 1.25 }}>
              {shortTitle(item.title)}
            </Typography>
            <Typography component="span" sx={{ display: "block", mt: 0.9, color: itemIndex === index ? "primary.main" : "text.secondary", fontSize: "0.7rem", fontWeight: 650, lineHeight: 1.3 }}>
              {item.impact}
            </Typography>
          </ButtonBase>
        ))}
      </Box>

      <Box
        role="group"
        aria-label="Projects"
        aria-live="polite"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") go(-1);
          if (event.key === "ArrowRight") go(1);
        }}
        sx={{ outline: "none" }}
      >
        <Card key={project.title} variant="outlined" sx={{ overflow: "hidden", animation: "projectReveal 0.35s ease both" }}>
          {project.images.length > 0 && <Carousel images={project.images} title={project.title} aspectRatio="2 / 1" />}

          <CardContent sx={{ p: { xs: 2.5, md: 4 }, "&:last-child": { pb: { xs: 2.5, md: 4 } } }}>
            <Typography sx={{ color: "primary.main", fontWeight: 800, fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              {project.role}
            </Typography>
            <Typography component="h3" sx={{ mt: 1, fontWeight: 800, fontSize: { xs: "1.3rem", md: "1.75rem" }, letterSpacing: "-0.025em" }}>
              {project.title}
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 1.5, maxWidth: 850, lineHeight: 1.75 }}>
              {project.description}
            </Typography>

            <Box
              component="ul"
              sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" }, columnGap: 4, rowGap: 1, mt: 2.5, mb: 0, pl: 2.25 }}
            >
              {project.features.map((feature) => (
                <Typography key={feature} component="li" color="text.secondary" sx={{ pl: 0.4, fontSize: "0.88rem", lineHeight: 1.55, "&::marker": { color: "primary.main" } }}>
                  {feature}
                </Typography>
              ))}
            </Box>

            <Stack direction="row" spacing={0.75} sx={{ mt: 2.75, flexWrap: "wrap", rowGap: 0.75 }}>
              {project.tech.map((tech) => {
                const Icon = skillIcons[tech];
                const color = skillColors[tech];
                return <Chip key={tech} icon={Icon ? <Icon aria-hidden="true" size={12} color={color} /> : undefined} label={tech} size="small" />;
              })}
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 2.5, alignItems: { xs: "flex-start", sm: "center" }, justifyContent: "space-between" }}>
              <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                {project.note}
              </Typography>
              {project.link && (
                <Link href={project.link} target="_blank" rel="noreferrer" sx={{ display: "inline-flex", alignItems: "center", gap: 0.6, fontSize: "0.85rem", flexShrink: 0 }}>
                  <GitHubIcon fontSize="inherit" /> View on GitHub
                </Link>
              )}
            </Stack>
          </CardContent>
        </Card>

        <Stack direction="row" sx={{ mt: 2, alignItems: "center", justifyContent: "space-between" }}>
          <Button variant="text" startIcon={<ArrowBackRoundedIcon />} onClick={() => go(-1)} sx={{ color: "text.secondary", px: 0 }}>
            Previous
          </Button>
          <Typography sx={{ color: "text.secondary", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em" }}>
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </Typography>
          <Button variant="text" endIcon={<ArrowForwardRoundedIcon />} onClick={() => go(1)} sx={{ color: "text.secondary", px: 0 }}>
            Next
          </Button>
        </Stack>
      </Box>
    </Section>
  );
}
