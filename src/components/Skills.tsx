import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { skills } from "../data/cv";
import { skillIcons } from "../data/skillIcons";
import { skillColors } from "../data/skillColors";
import { Section } from "./Section";

export function Skills() {
  return (
    <Section id="skills" icon="🧰" title="Skills">
      <Grid container spacing={3}>
        {skills.map((group) => (
          <Grid key={group.category} size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 1 }}>
              {group.category}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", rowGap: 1 }}>
              {group.skills.map((skill) => {
                const Icon = skillIcons[skill];
                const color = skillColors[skill];
                return (
                  <Chip
                    key={skill}
                    icon={Icon ? <Icon aria-hidden="true" size={14} color={color} /> : undefined}
                    label={skill}
                    size="small"
                  />
                );
              })}
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Section>
  );
}
