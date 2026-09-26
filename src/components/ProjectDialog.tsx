import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import GitHubIcon from "@mui/icons-material/GitHub";
import type { Project } from "../data/cv";
import { skillIcons } from "../data/skillIcons";
import { skillColors } from "../data/skillColors";
import { Carousel } from "./Carousel";
import { CloseIcon } from "./SketchIcons";
import { fonts } from "../theme";

const STORY_SECTIONS: { key: keyof Project; label: string }[] = [
  { key: "challenge", label: "Challenge" },
  { key: "solution", label: "Solution" },
  { key: "contribution", label: "My contribution" },
  { key: "impact", label: "Impact" },
];

export function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <Dialog
      open={project !== null}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="body"
      // The page never scrolls (body is overflow: hidden for the slide deck), so MUI's scroll lock is
      // pure cost: it restyles <body> and forces a relayout of every slide when the dialog opens.
      disableScrollLock
      aria-labelledby="project-dialog-heading"
      slotProps={{ paper: { sx: { bgcolor: "background.paper", backgroundImage: "none" } } }}
    >
      {project && (
        <>
          <IconButton
            aria-label="Close case study"
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              zIndex: 2,
              bgcolor: "rgba(10,10,10,0.55)",
              color: "#fff",
              "&:hover": { bgcolor: "rgba(10,10,10,0.75)" },
            }}
          >
            <CloseIcon />
          </IconButton>

          {project.images.length > 0 && <Carousel images={project.images} title={project.name} aspectRatio="2 / 1" />}

          <DialogContent sx={{ p: { xs: 2.5, md: 4 } }}>
            <Typography sx={{ color: "primary.main", fontWeight: 800, fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              {project.category}
            </Typography>
            <Typography
              id="project-dialog-heading"
              component="h3"
              sx={{ mt: 1, fontFamily: fonts.display, fontWeight: 700, fontSize: { xs: "1.4rem", md: "1.75rem" }, letterSpacing: "-0.015em" }}
            >
              {project.name}: {project.title}
            </Typography>
            <Typography sx={{ mt: 1, color: "text.secondary", lineHeight: 1.7, maxWidth: 700 }}>{project.valueProposition}</Typography>

            <Stack spacing={2.25} sx={{ mt: 3 }}>
              {STORY_SECTIONS.map((section) => (
                <Box key={section.label}>
                  <Typography sx={{ color: "text.secondary", fontWeight: 800, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    {section.label}
                  </Typography>
                  <Typography sx={{ mt: 0.6, color: "text.primary", lineHeight: 1.75, fontSize: "0.94rem" }}>
                    {project[section.key] as string}
                  </Typography>
                </Box>
              ))}
            </Stack>

            <Typography sx={{ mt: 2.75, color: "text.secondary", fontWeight: 800, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Stack
            </Typography>
            <Stack direction="row" spacing={0.75} sx={{ mt: 1, flexWrap: "wrap", rowGap: 0.75 }}>
              {project.stack.map((tech) => {
                const Icon = skillIcons[tech];
                const color = skillColors[tech];
                return <Chip key={tech} icon={Icon ? <Icon aria-hidden="true" size={12} color={color} /> : undefined} label={tech} size="small" />;
              })}
            </Stack>

            {project.link && (
              <Link href={project.link} target="_blank" rel="noreferrer" sx={{ display: "inline-flex", alignItems: "center", gap: 0.6, mt: 2.75, fontSize: "0.88rem" }}>
                <GitHubIcon fontSize="inherit" /> View on GitHub
              </Link>
            )}
          </DialogContent>
        </>
      )}
    </Dialog>
  );
}
