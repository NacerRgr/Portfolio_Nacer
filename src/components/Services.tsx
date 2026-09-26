import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { RobotIcon, ServerIcon, WindowIcon, CloudIcon, IconWash, type WashTint } from "./SketchIcons";
import { services } from "../data/cv";
import { Section } from "./Section";

const SERVICE_ICONS = [RobotIcon, ServerIcon, WindowIcon, CloudIcon];
// Each service gets a wash from the painting: sunlit peach, sky, foliage, sky.
const SERVICE_TINTS: WashTint[] = ["peach", "sky", "leaf", "sky"];

export function Services() {
  const [featured, ...rest] = services;
  const FeaturedIcon = SERVICE_ICONS[0];

  return (
    <Section
      id="services"
      index={1}
      title="What I Can Build for You"
      intro="I work across product development, backend engineering and automation to turn business workflows into reliable software."
    >
      <Box
        sx={{
          p: { xs: 2, md: 2.25 },
          border: "1px solid",
          borderColor: "divider",
          borderTop: "3px solid",
          borderTopColor: "primary.main",
        }}
      >
        <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1, sm: 2.5 }} sx={{ alignItems: { sm: "center" } }}>
          <IconWash tint={SERVICE_TINTS[0]} size={54}>
            <FeaturedIcon sx={{ fontSize: 30 }} />
          </IconWash>
          <Box>
            <Typography component="h3" sx={{ fontWeight: 750, fontSize: { xs: "1.05rem", md: "1.15rem" }, letterSpacing: "-0.01em" }}>
              {featured.title}
            </Typography>
            <Typography sx={{ mt: 0.5, color: "text.secondary", lineHeight: 1.5, fontSize: "0.88rem", maxWidth: 560 }}>
              {featured.description}
            </Typography>
          </Box>
        </Stack>
        <Typography sx={{ mt: 1.25, color: "text.secondary", opacity: 0.75, lineHeight: 1.5, fontSize: "0.78rem" }}>
          {featured.examples.join(" · ")}
        </Typography>
      </Box>

      <Box sx={{ mt: 2, display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" }, gap: 2 }}>
        {rest.map((service, index) => {
          const Icon = SERVICE_ICONS[index + 1];
          return (
            <Box key={service.title} sx={{ p: { xs: 1.75, md: 2 }, border: "1px solid", borderColor: "divider" }}>
              <IconWash tint={SERVICE_TINTS[index + 1]} size={42}>
                <Icon sx={{ fontSize: 23 }} />
              </IconWash>
              <Typography component="h3" sx={{ mt: 0.75, fontWeight: 750, fontSize: "0.92rem", letterSpacing: "-0.01em" }}>
                {service.title}
              </Typography>
              <Typography sx={{ mt: 0.5, color: "text.secondary", lineHeight: 1.5, fontSize: "0.82rem" }}>
                {service.description}
              </Typography>
              <Typography sx={{ mt: 1, color: "text.secondary", opacity: 0.75, lineHeight: 1.4, fontSize: "0.74rem" }}>
                {service.examples.slice(0, 3).join(" · ")}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Section>
  );
}
