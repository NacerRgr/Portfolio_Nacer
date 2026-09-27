import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { RobotIcon, ServerIcon, WindowIcon, CloudIcon, IconWash, type WashTint } from "./SketchIcons";
import { services } from "../data/cv";
import { Section } from "./Section";
import { colors, fonts, shortPhone } from "../theme";

const SERVICE_ICONS = [RobotIcon, ServerIcon, WindowIcon, CloudIcon];
// Each service gets a wash from the painting: sunlit peach, sky, foliage, sky.
const SERVICE_TINTS: WashTint[] = ["peach", "sky", "leaf", "sky"];

// Four equal paper cards: icon, title, one outcome line, three tags. Nothing else.
// Hover lifts the card and tilts the icon (transform-only).
const gridSx = {
  display: "grid",
  gridTemplateColumns: { xs: "minmax(0, 1fr)", sm: "repeat(2, minmax(0, 1fr))", md: "repeat(4, minmax(0, 1fr))" },
  gap: { xs: 1.25, sm: 2 },
} as const;

const cardSx = {
  position: "relative",
  p: { xs: 1.75, md: 2.5 },
  bgcolor: alpha(colors.bgRaised, 0.7),
  border: `1px solid ${colors.line}`,
  borderRadius: "18px",
  // Phones: icon beside the text in a compact row.
  display: { xs: "grid", sm: "block" },
  gridTemplateColumns: "44px minmax(0, 1fr)",
  columnGap: 1.75,
  alignItems: "start",
  transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease, border-color 0.35s ease",
  "& .wash": { transition: "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)" },
  "@media (hover: hover)": {
    "&:hover": { transform: "translateY(-4px)", borderColor: alpha(colors.accentMuted, 0.7), boxShadow: `0 22px 40px -26px ${alpha(colors.navy, 0.45)}` },
    "&:hover .wash": { transform: "rotate(-8deg) scale(1.06)" },
  },
  [shortPhone]: { py: 1.25 },
} as const;

const tagSx = {
  display: "inline-block",
  px: 1,
  py: "2px",
  borderRadius: 999,
  bgcolor: alpha(colors.navy, 0.045),
  color: "text.secondary",
  fontSize: "0.72rem",
  fontWeight: 600,
  whiteSpace: "nowrap",
} as const;

export function Services() {
  return (
    <Section id="services" index={1} title="What I Can Build for You" intro="Software that removes busywork and holds up in production.">
      <Box sx={gridSx}>
        {services.map((service, index) => {
          const Icon = SERVICE_ICONS[index];
          return (
            <Box key={service.title} sx={cardSx}>
              <Box className="wash" sx={{ width: "fit-content", gridRow: { xs: "span 3", sm: "auto" } }}>
                <IconWash tint={SERVICE_TINTS[index]} size={{ xs: 44, md: 52 }}>
                  <Icon sx={{ fontSize: { xs: 24, md: 28 } }} />
                </IconWash>
              </Box>
              <Typography component="h3" sx={{ mt: { xs: 0.25, sm: 1.5 }, fontFamily: fonts.display, fontWeight: 700, fontSize: { xs: "1.02rem", md: "1.12rem" }, letterSpacing: "-0.01em" }}>
                {service.title}
              </Typography>
              <Typography sx={{ mt: 0.5, color: "text.secondary", lineHeight: 1.5, fontSize: { xs: "0.85rem", md: "0.88rem" } }}>{service.pitch}</Typography>
              <Box component="ul" aria-label={`${service.title} examples`} sx={{ m: 0, mt: { xs: 1, sm: 1.5 }, p: 0, listStyle: "none", display: "flex", flexWrap: "wrap", gap: 0.6 }}>
                {service.tags.map((tag) => (
                  <Box component="li" key={tag} sx={tagSx}>
                    {tag}
                  </Box>
                ))}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Section>
  );
}
