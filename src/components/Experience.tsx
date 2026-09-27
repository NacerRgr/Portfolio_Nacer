import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { experience } from "../data/cv";
import { skillIcons } from "../data/skillIcons";
import { skillColors } from "../data/skillColors";
import { Section } from "./Section";
import { colors, phoneHidden } from "../theme";

// Oldest on the left, current role last so the timeline reads toward "now".
const orderedExperience = [...experience]
  .sort((first, second) => {
    if (first.end === "Present") return -1;
    if (second.end === "Present") return 1;
    return 0;
  })
  .reverse();

export function Experience() {
  return (
    <Section
      id="experience"
      index={4}
      title="Experience"
      intro={
        <>
          From backend internships to owning production features{" "}
          {/* The timeline runs left→right on tablet/desktop but stacks newest-first on phones. */}
          <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
            — oldest on the left, where I am now on the right.
          </Box>
          <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
            — most recent first.
          </Box>
        </>
      }
    >
      <Box
        component="ol"
        sx={{
          listStyle: "none",
          m: 0,
          p: 0,
          display: { xs: "flex", md: "grid" },
          flexDirection: "column-reverse",
          gridTemplateColumns: { md: `repeat(${orderedExperience.length}, minmax(0, 1fr))` },
          columnGap: 2.5,
        }}
      >
        {orderedExperience.map((job, index) => {
          const current = job.end === "Present";
          return (
            <Box
              component="li"
              key={`${job.company}-${job.start}`}
              sx={{
                position: "relative",
                minWidth: 0,
                py: { xs: 1, md: 0 },
                pt: { md: 2.5 },
                borderTop: { xs: index === orderedExperience.length - 1 ? "none" : "1px solid", md: "2px solid" },
                borderColor: { xs: "divider", md: current ? "primary.main" : "divider" },
                "&::before": {
                  content: '""',
                  display: { xs: "none", md: "block" },
                  position: "absolute",
                  top: -7,
                  left: 0,
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  border: "2px solid",
                  borderColor: current ? "primary.main" : "text.secondary",
                  bgcolor: current ? "primary.main" : "background.default",
                },
              }}
            >
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", whiteSpace: "nowrap", fontWeight: 600 }}>
                {job.start} – {job.end}
                {current && (
                  <Box component="span" sx={{ ml: 1, color: colors.successText, fontWeight: 700, fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Current
                  </Box>
                )}
              </Typography>
              <Typography component="h3" sx={{ mt: 0.5, fontWeight: 750, fontSize: { xs: "0.92rem", md: "1rem" }, letterSpacing: "-0.01em" }}>
                {job.company}
              </Typography>
              <Typography sx={{ color: "primary.main", fontSize: "0.78rem", fontWeight: 600, lineHeight: 1.35 }}>{job.role}</Typography>
              <Typography sx={{ mt: { xs: 0.4, md: 1 }, color: "text.secondary", fontSize: "0.8rem", lineHeight: 1.5 }}>{job.highlights[0]}</Typography>
              <Stack direction="row" sx={{ ...phoneHidden("flex"), mt: 1, flexWrap: "wrap", gap: 0.6 }}>
                {job.tech.slice(0, 4).map((tech) => {
                  const Icon = skillIcons[tech];
                  const color = skillColors[tech];
                  return <Chip key={tech} icon={Icon ? <Icon aria-hidden="true" size={11} color={color} /> : undefined} label={tech} size="small" sx={{ height: 20, fontSize: "0.68rem" }} />;
                })}
              </Stack>
            </Box>
          );
        })}
      </Box>
    </Section>
  );
}
