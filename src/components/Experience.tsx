import { useState } from "react";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { experience, type Experience as ExperienceItem } from "../data/cv";
import { skillIcons } from "../data/skillIcons";
import { skillColors } from "../data/skillColors";
import { Section } from "./Section";

const orderedExperience = [...experience].sort((first, second) => {
  if (first.end === "Present") return -1;
  if (second.end === "Present") return 1;
  return 0;
});

function ExperienceCard({
  job,
  expanded,
  onToggle,
}: {
  job: ExperienceItem;
  expanded: boolean;
  onToggle: () => void;
}) {
  const visibleHighlights = expanded ? job.highlights : job.highlights.slice(0, 4);
  const hiddenCount = job.highlights.length - visibleHighlights.length;

  return (
    <Card sx={{ position: "relative", overflow: "visible" }}>
      {job.end === "Present" && (
        <Box sx={{ position: "absolute", top: 24, left: -5, width: 3, height: 38, borderRadius: 4, bgcolor: "primary.main", boxShadow: "0 0 18px rgba(103, 232, 249, 0.55)" }} />
      )}
      <CardContent sx={{ p: { xs: 2.5, md: 3 }, "&:last-child": { pb: { xs: 2.5, md: 3 } } }}>
        <Stack direction={{ xs: "column", sm: "row" }} sx={{ alignItems: "flex-start", justifyContent: "space-between", gap: 1.5 }}>
          <Box>
            <Typography component="h3" variant="subtitle1" sx={{ fontWeight: 750 }}>
              {job.company}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {job.role} · {job.type} · {job.location}
            </Typography>
          </Box>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexShrink: 0 }}>
            {job.end === "Present" && <Chip label="Current" size="small" color="primary" variant="outlined" />}
            <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
              {job.start} – {job.end}
            </Typography>
          </Stack>
        </Stack>

        <Box component="ul" sx={{ mt: 1.5, mb: 0, pl: 2.5 }}>
          {visibleHighlights.map((point) => (
            <Typography
              key={point}
              component="li"
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.7, lineHeight: 1.6, "&::marker": { color: point.includes("%") ? "primary.main" : "rgba(255,255,255,0.22)" } }}
            >
              {point}
            </Typography>
          ))}
        </Box>

        {job.highlights.length > 4 && (
          <Button
            variant="text"
            size="small"
            onClick={onToggle}
            aria-expanded={expanded}
            endIcon={<ExpandMoreRoundedIcon sx={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }} />}
            sx={{ mt: 1, ml: -1, color: "text.secondary" }}
          >
            {expanded ? "Show less" : `Show ${hiddenCount} more`}
          </Button>
        )}

        <Stack direction="row" spacing={1} sx={{ mt: 1.5, flexWrap: "wrap", rowGap: 1 }}>
          {job.tech.map((tech) => {
            const Icon = skillIcons[tech];
            const color = skillColors[tech];
            return <Chip key={tech} icon={Icon ? <Icon aria-hidden="true" size={13} color={color} /> : undefined} label={tech} size="small" />;
          })}
        </Stack>
      </CardContent>
    </Card>
  );
}

export function Experience() {
  const [expandedJobs, setExpandedJobs] = useState<string[]>([]);
  const [showEarlier, setShowEarlier] = useState(false);
  const featuredExperience = orderedExperience.slice(0, 3);
  const earlierExperience = orderedExperience.slice(3);

  const toggleJob = (job: ExperienceItem) => {
    const key = `${job.company}-${job.start}`;
    setExpandedJobs((current) => (current.includes(key) ? current.filter((item) => item !== key) : [...current, key]));
  };

  const isExpanded = (job: ExperienceItem) => expandedJobs.includes(`${job.company}-${job.start}`);

  return (
    <Section id="experience" icon="💼" title="Experience">
      <Stack spacing={2}>
        {featuredExperience.map((job) => (
          <ExperienceCard key={`${job.company}-${job.start}`} job={job} expanded={isExpanded(job)} onToggle={() => toggleJob(job)} />
        ))}

        {earlierExperience.length > 0 && (
          <>
            <Button
              variant="outlined"
              aria-expanded={showEarlier}
              onClick={() => setShowEarlier((visible) => !visible)}
              endIcon={<ExpandMoreRoundedIcon sx={{ transform: showEarlier ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }} />}
              sx={{ alignSelf: "center", mt: 1 }}
            >
              {showEarlier ? "Hide earlier experience" : `Show earlier experience (${earlierExperience.length})`}
            </Button>

            {showEarlier &&
              earlierExperience.map((job) => (
                <ExperienceCard key={`${job.company}-${job.start}`} job={job} expanded={isExpanded(job)} onToggle={() => toggleJob(job)} />
              ))}
          </>
        )}
      </Stack>
    </Section>
  );
}
