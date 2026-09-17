import { createTheme } from "@mui/material/styles";

export const colors = {
  bg: "#080b10",
  bgRaised: "#11161e",
  text: "#f7f9fc",
  textSoft: "#9ca8b8",
  textFaint: "#687384",
  accent: "#67e8f9",
  line: "rgba(255, 255, 255, 0.09)",
};

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: colors.accent, contrastText: "#04141a" },
    background: { default: colors.bg, paper: colors.bgRaised },
    text: { primary: colors.text, secondary: colors.textSoft },
    divider: colors.line,
  },
  shape: { borderRadius: 14 },
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
          boxShadow: "0 18px 55px rgba(0, 0, 0, 0.16)",
          backgroundColor: colors.bgRaised,
          border: `1px solid ${colors.line}`,
          transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
          "&:hover": {
            transform: "translateY(-3px)",
            borderColor: "rgba(103, 232, 249, 0.28)",
            boxShadow: "0 24px 70px rgba(0, 0, 0, 0.24)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          backgroundColor: "rgba(255, 255, 255, 0.025)",
          border: `1px solid ${colors.line}`,
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 10,
          paddingInline: 18,
          paddingBlock: 10,
        },
        outlined: {
          backgroundColor: colors.bgRaised,
          borderColor: colors.line,
          color: colors.text,
          "&:hover": { backgroundColor: "rgba(103, 232, 249, 0.06)", borderColor: colors.accent },
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
