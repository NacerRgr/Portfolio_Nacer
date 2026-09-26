import { lazy, Suspense, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import { projects, type Project } from "../data/cv";
import { Section } from "./Section";
import { alpha } from "@mui/material/styles";
import { colors } from "../theme";

// The dialog (with its carousel and brand icons) is only fetched when a case study is about to be opened.
const loadProjectDialog = () => import("./ProjectDialog");
const ProjectDialog = lazy(() => loadProjectDialog().then((m) => ({ default: m.ProjectDialog })));

export function Projects() {
  const [openProject, setOpenProject] = useState<Project | null>(null);
  // Stays mounted after the first open so the dialog's close animation keeps working.
  const [dialogMounted, setDialogMounted] = useState(false);

  // Warm the dialog chunk in idle time so the first click opens instantly.
  useEffect(() => {
    if (typeof window.requestIdleCallback !== "function") return void window.setTimeout(loadProjectDialog, 1500);
    const id = window.requestIdleCallback(() => void loadProjectDialog(), { timeout: 4000 });
    return () => window.cancelIdleCallback(id);
  }, []);

  return (
    <Section
      id="projects"
      index={2}
      title="Featured Case Studies"
      intro="Real products and engineering systems built around automation, reliability and measurable outcomes. Click a project to open the case study."
    >
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", sm: "repeat(3, minmax(0, 1fr))", md: "repeat(4, minmax(0, 1fr))" }, gap: 1.5 }}>
        {projects.map((project) => {
          const cover = project.images[0];
          return (
            <ButtonBase
              key={project.slug}
              onClick={() => {
                setDialogMounted(true);
                setOpenProject(project);
              }}
              onMouseEnter={loadProjectDialog}
              onFocus={loadProjectDialog}
              aria-haspopup="dialog"
              sx={{
                display: "block",
                width: "100%",
                textAlign: "left",
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                overflow: "hidden",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                "&:hover": { borderColor: alpha(colors.accent, 0.32), boxShadow: `0 8px 20px ${alpha(colors.text, 0.08)}` },
                "&:focus-visible": { outline: "2px solid", outlineColor: "primary.main", outlineOffset: 2 },
              }}
            >
              {cover && (
                <Box sx={{ position: "relative", aspectRatio: "16 / 9", bgcolor: "#0a0a0a" }}>
                  <Box
                    component="img"
                    src={cover.thumb ?? cover.src}
                    alt={cover.alt}
                    decoding="async"
                    width={560}
                    height={280}
                    sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                  {project.metric && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 6,
                        left: 6,
                        px: 0.75,
                        py: 0.25,
                        bgcolor: alpha(colors.text, 0.82),
                        border: `1px solid ${alpha(colors.accent, 0.35)}`,
                        color: "primary.main",
                        fontSize: "0.6rem",
                        fontWeight: 800,
                      }}
                    >
                      {project.metric}
                    </Box>
                  )}
                </Box>
              )}
              <Box sx={{ px: 1, py: 0.5 }}>
                <Typography sx={{ color: "text.secondary", fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {project.category.split(" / ")[0]}
                </Typography>
                <Typography sx={{ fontWeight: 750, fontSize: "0.85rem", letterSpacing: "-0.01em" }}>{project.name}</Typography>
              </Box>
            </ButtonBase>
          );
        })}
      </Box>

      {dialogMounted && (
        <Suspense fallback={null}>
          <ProjectDialog project={openProject} onClose={() => setOpenProject(null)} />
        </Suspense>
      )}
    </Section>
  );
}
