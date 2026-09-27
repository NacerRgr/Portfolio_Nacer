import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { alpha } from "@mui/material/styles";
import { principles, valueProps } from "../data/cv";
import { Section } from "./Section";
import { colors, fonts, phoneHidden } from "../theme";
import { MagnifierIcon, WrenchIcon, GrowthIcon, RouteIcon, GearIcon, ShieldIcon, TargetIcon, IconWash, type WashTint } from "./SketchIcons";

// Understand → build → measure, drawn in the same inked style as the rest of the site.
const STEP_ICONS = [MagnifierIcon, WrenchIcon, GrowthIcon];
const STEP_TINTS: WashTint[] = ["sky", "peach", "leaf"];
// End-to-end, automation, production-ready, business-focused.
const VALUE_ICONS = [RouteIcon, GearIcon, ShieldIcon, TargetIcon];

export function HowIWork() {
  return (
    <Section id="how-i-work" index={3} title="How I Work" intro="I care about what changes after the code ships.">
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" }, gap: { xs: 0, md: 3 } }}>
        {principles.map((principle, index) => (
          <Box
            key={principle.title}
            sx={{
              py: { xs: 1, md: 1.5 },
              borderTop: { xs: index === 0 ? "none" : `1px solid ${colors.line}`, md: `1px solid ${colors.line}` },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
              <IconWash tint={STEP_TINTS[index]} size={{ xs: 40, md: 48 }}>
                {(() => {
                  const Icon = STEP_ICONS[index];
                  return <Icon sx={{ fontSize: { xs: 22, md: 26 } }} />;
                })()}
              </IconWash>
              <Typography aria-hidden="true" sx={{ color: colors.warm, fontFamily: fonts.display, fontWeight: 700, fontSize: { xs: "0.95rem", md: "1.05rem" }, lineHeight: 1 }}>
                {String(index + 1).padStart(2, "0")}
              </Typography>
            </Box>
            <Typography component="h3" sx={{ mt: { xs: 0.75, md: 1.25 }, fontFamily: fonts.display, fontWeight: 700, fontSize: "1rem" }}>
              {principle.title}
            </Typography>
            <Typography sx={{ mt: 0.5, color: "text.secondary", lineHeight: 1.55, fontSize: "0.85rem" }}>
              {principle.description}
            </Typography>
            {index === 2 && (
              <Typography sx={{ mt: 0.75, color: "text.secondary", opacity: 0.8, lineHeight: 1.45, fontSize: "0.76rem" }}>
                Example:{" "}
                <Link href="https://www.lesfurets.com" target="_blank" rel="noreferrer">
                  LesFurets.com
                </Link>{" "}
                (+25% retention),{" "}
                <Link href="https://www.st.com" target="_blank" rel="noreferrer">
                  STMicroelectronics
                </Link>{" "}
                (-75% validation time).
              </Typography>
            )}
          </Box>
        ))}
      </Box>

      {/* Same paper card as the service cards, instead of a flat colored panel. */}
      <Box sx={{ mt: { xs: 2.5, md: 3.5 }, p: { xs: 1.75, md: 2.5 }, bgcolor: alpha(colors.bgRaised, 0.7), border: `1px solid ${colors.line}`, borderRadius: "18px" }}>
        <Typography component="h3" sx={{ mb: 1.5, fontFamily: fonts.display, fontWeight: 700, fontSize: "1.02rem" }}>
          Why Clients Work With Me
        </Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", md: "repeat(4, minmax(0, 1fr))" }, gap: { xs: 1, md: 2.5 } }}>
          {valueProps.map((value) => (
            <Box key={value.title}>
              <Typography sx={{ display: "flex", alignItems: "center", gap: 0.75, color: "text.primary", fontWeight: 700, fontSize: "0.85rem" }}>
                {(() => {
                  const Icon = VALUE_ICONS[valueProps.indexOf(value)];
                  return <Icon aria-hidden="true" sx={{ fontSize: 19, color: "primary.main", flexShrink: 0 }} />;
                })()}
                {value.title}
              </Typography>
              <Typography sx={{ ...phoneHidden(), mt: 0.35, color: "text.secondary", lineHeight: 1.5, fontSize: "0.8rem" }}>{value.description}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Section>
  );
}
