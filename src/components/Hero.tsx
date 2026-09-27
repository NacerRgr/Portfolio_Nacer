import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { profile } from "../data/cv";
// Build-time WebP variants of the 1254px source: 1x/2x for the ~300px frame.
import portrait320 from "../assets/portrait-ghibli-workspace.png?w=320&quality=80&format=webp";
import portrait640 from "../assets/portrait-ghibli-workspace.png?w=640&quality=78&format=webp";
import { alpha, type SxProps, type Theme } from "@mui/material/styles";
import { colors, fonts, shortPhone } from "../theme";
import { ArrowButton, ArrowLink } from "./ArrowButton";
import { CodeIcon, ServerIcon, NetworkIcon, ChipIcon, IconWash, type WashTint } from "./SketchIcons";

// Phones up to ~820px tall: the summary sentence is dropped (headline + role already say it),
// leaving real breathing room around the portrait instead of a cramped top.
const compactPhone = "@media (max-width: 599px) and (max-height: 820px)";

export function Hero() {
  return (
    <Box
      component="section"
      aria-labelledby="hero-heading"
      // Phones: guaranteed breathing room under the navbar (the cloud and badges poke above the frame).
      sx={{ position: "relative", pt: { xs: 10.5, sm: 0 }, pb: { xs: 1, sm: 0 }, [compactPhone]: { pt: 9.5 } }}
    >
      <Box
        sx={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.35fr) minmax(220px, 0.65fr)" },
          gap: { xs: 3.5, sm: 5, md: 7 },
          alignItems: "center",
          [shortPhone]: { gap: 2.5 },
        }}
      >
        {/* Phones: portrait first as the anchor, then a centered text block spanning the width.
            From `sm` up the original side-by-side / left-aligned layout is unchanged. */}
        <Box sx={{ order: { xs: 2, sm: 0 }, textAlign: { xs: "center", sm: "left" } }}>
          {/* One quiet line: who, then what (two centered lines on phones). */}
          <Typography sx={{ mb: 2, fontSize: "0.9rem", color: "text.secondary" }}>
            <Box component="span" sx={{ display: { xs: "block", sm: "inline" }, color: "text.primary", fontWeight: 600 }}>
              {profile.displayName}
            </Box>
            <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
              {" · "}
            </Box>
            {profile.shortRole}
          </Typography>

          <Typography
            id="hero-heading"
            component="h1"
            sx={{
              color: "secondary.main",
              fontFamily: fonts.display,
              fontWeight: 700,
              letterSpacing: "-0.01em",
              lineHeight: 1.12,
              fontSize: { xs: "2.2rem", sm: "2.8rem", md: "3.1rem" },
              [shortPhone]: { fontSize: "1.9rem" },
            }}
          >
            I build software that{" "}
            <Box component="span" sx={{ color: "primary.main" }}>
              saves teams time.
            </Box>
          </Typography>

          <Typography sx={{ mt: 2, mx: { xs: "auto", sm: 0 }, maxWidth: { xs: 340, sm: 600 }, [compactPhone]: { display: "none" }, color: "text.secondary", lineHeight: 1.65, fontSize: { xs: "0.95rem", md: "1.05rem" } }}>
            {profile.summary}
          </Typography>

          <Stack
            direction="row"
            useFlexGap
            sx={{ mt: { xs: 3.5, sm: 3 }, gap: { xs: 2, sm: 2.5 }, flexWrap: "wrap", alignItems: "center", justifyContent: { xs: "center", sm: "flex-start" } }}
          >
            <ArrowButton href="#contact">Start a Project</ArrowButton>
            <ArrowLink href="#projects">View Case Studies</ArrowLink>
          </Stack>

        </Box>

        <PaintedPortrait />
      </Box>
    </Box>
  );
}

// Painted cloud: white puffs over a peach underside, like the clouds in the portrait.
function Cloud({ sx }: { sx: SxProps<Theme> }) {
  return (
    <Box component="svg" viewBox="0 0 120 64" aria-hidden="true" sx={[cloudSx, ...(Array.isArray(sx) ? sx : [sx])]}>
      <g fill={colors.warmSoft}>
        <circle cx="30" cy="42" r="18" />
        <circle cx="56" cy="30" r="24" />
        <circle cx="84" cy="38" r="19" />
        <rect x="20" y="40" width="82" height="20" rx="10" />
      </g>
      <g fill={colors.bgRaised}>
        <circle cx="30" cy="38" r="17" />
        <circle cx="56" cy="26" r="23" />
        <circle cx="84" cy="34" r="18" />
        <rect x="22" y="36" width="78" height="18" rx="9" />
      </g>
    </Box>
  );
}

const cloudSx = {
  position: "absolute",
  zIndex: 2,
  pointerEvents: "none",
  filter: `drop-shadow(0 6px 10px ${alpha(colors.navy, 0.08)})`,
  animation: "cloudDrift 9s ease-in-out infinite alternate",
  "@keyframes cloudDrift": { from: { transform: "translateX(0)" }, to: { transform: "translateX(14px)" } },
  // Don't animate while the home slide is off screen.
  "[inert] &": { animationPlayState: "paused" },
} as const;

// Everything around the portrait animates with transforms only and pauses while the home slide
// is off screen (the pane is `inert`); the global reduced-motion rule stops it entirely.
const pausedOffscreen = { "[inert] &": { animationPlayState: "paused" } } as const;

// Faint pencil-dash orbit around the frame, turning slowly, with one painted dot riding on it.
const orbitSx = {
  position: "absolute",
  inset: { xs: "-15%", md: "-17%" },
  zIndex: 0,
  pointerEvents: "none",
  animation: "orbitTurn 80s linear infinite",
  "@keyframes orbitTurn": { to: { transform: "rotate(360deg)" } },
  ...pausedOffscreen,
} as const;

function Orbit() {
  return (
    <Box component="svg" viewBox="0 0 200 200" aria-hidden="true" sx={orbitSx}>
      <circle cx="100" cy="100" r="96" fill="none" stroke={colors.accentMuted} strokeOpacity="0.55" strokeWidth="1.3" strokeDasharray="1 8" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      <circle cx="100" cy="4" r="2.8" fill={colors.warm} opacity="0.85" />
    </Box>
  );
}

// Small paper cards pinned around the frame, each bobbing on its own rhythm.
// The float keyframes are plain transforms (no CSS variables) so they run on the compositor;
// the tilt is a static rotation on the inner card.
const badgeFloatSx = {
  position: "absolute",
  zIndex: 3,
  pointerEvents: "none",
  animation: "badgeFloat 5.5s ease-in-out infinite alternate",
  "@keyframes badgeFloat": { from: { transform: "translateY(0)" }, to: { transform: "translateY(-7px)" } },
  ...pausedOffscreen,
} as const;

const badgeCardSx = {
  display: "grid",
  placeItems: "center",
  width: { xs: 42, md: 52 },
  height: { xs: 42, md: 52 },
  bgcolor: colors.bgRaised,
  border: `1px solid ${colors.line}`,
  borderRadius: { xs: "12px", md: "15px" },
  boxShadow: `0 14px 26px -12px ${alpha(colors.navy, 0.35)}`,
} as const;

type BadgeSpec = { Icon: typeof CodeIcon; tint: WashTint; tilt: string; delay: string; place: SxProps<Theme> };

const BADGES: BadgeSpec[] = [
  { Icon: CodeIcon, tint: "sky", tilt: "-7deg", delay: "0s", place: { top: { xs: 14, md: 22 }, left: { xs: -26, md: -36 } } },
  { Icon: ServerIcon, tint: "peach", tilt: "6deg", delay: "-1.8s", place: { top: { xs: -18, md: -24 }, right: { xs: 18, md: 26 } } },
  { Icon: NetworkIcon, tint: "leaf", tilt: "5deg", delay: "-3.1s", place: { bottom: { xs: 20, md: 30 }, left: { xs: -22, md: -32 } } },
  { Icon: ChipIcon, tint: "sky", tilt: "-6deg", delay: "-4.4s", place: { bottom: { xs: -16, md: -22 }, right: { xs: -18, md: -26 } } },
];

function Badge({ Icon, tint, tilt, delay, place }: BadgeSpec) {
  return (
    <Box aria-hidden="true" sx={[badgeFloatSx, ...(Array.isArray(place) ? place : [place])]} style={{ animationDelay: delay }}>
      <Box sx={badgeCardSx} style={{ transform: `rotate(${tilt})` }}>
        <IconWash tint={tint} size={{ xs: 28, md: 34 }}>
          <Icon sx={{ fontSize: { xs: 17, md: 21 } }} />
        </IconWash>
      </Box>
    </Box>
  );
}

// The portrait as a small painting pinned to the page: cream mat, soft shadow, slight tilt,
// a sunlit wash behind it, a pencil orbit, tech badges pinned around it and a cloud drifting past.
function PaintedPortrait() {
  return (
    <Box
      sx={{
        position: "relative",
        order: { xs: 1, sm: 0 },
        justifySelf: "center",
        // Phones: sized by the screen's height too, so shorter phones get a smaller portrait, not a cramped top.
        width: { xs: "min(56vw, 230px, 27vh)", sm: 260, md: 300 },
        mt: { xs: 0, sm: 3, md: 0 },
        mb: { xs: 0.5, sm: 2, md: 0 },
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: { xs: "-16px -20px -12px -18px", md: "-26px -30px -18px -28px" },
          bgcolor: colors.warmSoft,
          borderRadius: "58% 42% 55% 45% / 48% 58% 42% 52%",
          opacity: 0.9,
        }}
      />
      <Orbit />
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          p: { xs: "8px", md: "10px" },
          bgcolor: colors.bgRaised,
          border: `1px solid ${colors.line}`,
          borderRadius: "22px",
          boxShadow: `0 28px 50px -22px ${alpha(colors.navy, 0.4)}`,
          transform: "rotate(-2deg)",
          transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
          "&:hover": { transform: "rotate(0deg) translateY(-4px)" },
        }}
      >
        <Box
          component="img"
          src={portrait640}
          srcSet={`${portrait320} 320w, ${portrait640} 640w`}
          sizes="(min-width: 900px) 280px, 240px"
          alt={`Illustrated portrait of ${profile.name}`}
          width={640}
          height={640}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          sx={{ display: "block", width: "100%", height: "auto", aspectRatio: "1 / 1", objectFit: "cover", borderRadius: "14px" }}
        />
      </Box>
      {BADGES.map((badge) => (
        <Badge key={badge.tint + badge.tilt} {...badge} />
      ))}
      <Cloud sx={{ width: { xs: 74, md: 96 }, top: { xs: -30, md: -40 }, left: { xs: "22%", md: "24%" } }} />
    </Box>
  );
}
