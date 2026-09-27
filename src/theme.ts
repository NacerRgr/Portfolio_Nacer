import { alpha, createTheme } from "@mui/material/styles";

// Palette sampled from the Ghibli-style portrait: cloud cream paper, suit navy, painted sky,
// leaf green and rooftop terracotta. Text-bearing colors are deepened to pass WCAG AA on cream.
export const colors = {
  bg: "#FAF5EA", // cloud cream paper
  bgRaised: "#FFFDF7",
  navy: "#232A45", // suit navy (headings)
  text: "#2A3150",
  textSoft: "#525A72",
  textFaint: "#646B80",
  accent: "#2F6E9E", // painted sky, deepened for text and white-on-blue buttons
  accentHover: "#255A83",
  accentSoft: "#E4F0F7", // pale sky wash
  accentMuted: "#90C2DF", // the sky itself (decorative)
  // Warm tones are decorative only (too light for text on cream).
  warm: "#D9824F", // rooftop terracotta
  warmSoft: "#F7E4D0", // sunlit cloud peach
  leaf: "#B8C597", // foliage (decorative)
  leafSoft: "#E6EBD3", // foliage wash behind icons
  sprout: "#6FA64A", // young-leaf green for the "Start a Project" sprout
  success: "#5E9E4A", // leaf green status dots
  successText: "#3C6E2F", // deeper leaf for small green text
  line: "#E8DFCC", // paper edge
};

// Phones (< 600px) get a trimmed version of dense slides; tablets and desktop keep everything.
// Hides an element on phones and restores its display type from `sm` up.
export const phoneHidden = (display: "block" | "flex" | "grid" = "block") => ({ display: { xs: "none", sm: display } }) as const;

// Small / short phones (e.g. 360×740): tighten stacked slides so they fit one screen.
export const shortPhone = "@media (max-width: 599px) and (max-height: 780px)";

export const fonts = {
  // Rounded Japanese gothic for headings (the soft lettering of Japanese animation posters);
  // Inter stays for body text. Only weight 700 is loaded.
  display: '"Zen Maru Gothic", "Hiragino Maru Gothic ProN", "Arial Rounded MT Bold", system-ui, sans-serif',
};

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: colors.accent, contrastText: "#FFFFFF" },
    secondary: { main: colors.navy, contrastText: "#FFFFFF" },
    success: { main: colors.success },
    background: { default: colors.bg, paper: colors.bgRaised },
    text: { primary: colors.text, secondary: colors.textSoft },
    divider: colors.line,
  },
  shape: { borderRadius: 6 },
  typography: {
    fontFamily: '"Inter Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    button: { textTransform: "none", fontWeight: 700 },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: `0 12px 32px ${alpha(colors.text, 0.07)}`,
          backgroundColor: colors.bgRaised,
          border: `1px solid ${colors.line}`,
          transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
          "&:hover": {
            transform: "translateY(-3px)",
            borderColor: alpha(colors.accent, 0.32),
            boxShadow: `0 18px 44px ${alpha(colors.text, 0.1)}`,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          backgroundColor: alpha(colors.text, 0.035),
          border: `1px solid ${colors.line}`,
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 4,
          paddingInline: 18,
          paddingBlock: 10,
        },
        outlined: {
          backgroundColor: colors.bgRaised,
          borderColor: colors.line,
          color: colors.text,
          "&:hover": { backgroundColor: alpha(colors.accent, 0.06), borderColor: colors.accent },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiLink: {
      defaultProps: { underline: "hover" },
      styleOverrides: {
        root: { color: colors.accent, fontWeight: 600 },
      },
    },
  },
});

// Shared page frame so the navbar and every slide line up on the same edges.
// sm–md leaves room for the slide arrows; from lg the 1120px frame has side margin of its own.
export const pageFrame = {
  maxWidth: 1120,
  gutter: { xs: "20px", sm: "72px", lg: "32px" },
};
