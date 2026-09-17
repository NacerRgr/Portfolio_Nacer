import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { education, languages } from "../data/cv";
import { Section } from "./Section";

export function Education() {
  return (
    <Section id="education" icon="🎓" title="Education">
      <Stack spacing={2}>
        {education.map((item) => (
          <Card key={item.school}>
            <CardContent>
              <Stack direction="row" sx={{ alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    flexShrink: 0,
                    width: 56,
                    height: 56,
                    borderRadius: 1.5,
                    bgcolor: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    component="img"
                    src={item.logo}
                    alt={`${item.school} logo`}
                    loading="lazy"
                    sx={{ maxWidth: "80%", maxHeight: "80%", objectFit: "contain" }}
                  />
                </Box>

                <Stack direction="row" sx={{ flex: 1, alignItems: "flex-start", justifyContent: "space-between", gap: 2 }}>
                  <Box>
                    <Typography component="h3" variant="subtitle1" sx={{ fontWeight: 700 }}>
                      {item.school}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.degree} · {item.detail}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.location}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
                    {item.start} – {item.end}
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mt: 4, mb: 1 }}>
        Languages
      </Typography>
      <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", rowGap: 1 }}>
        {languages.map((lang) => (
          <Chip key={lang.name} label={`${lang.name} · ${lang.level}`} size="small" variant="outlined" />
        ))}
      </Stack>
    </Section>
  );
}
