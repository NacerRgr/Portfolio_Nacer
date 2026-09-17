import Link from "@mui/material/Link";

export function SkipLink() {
  return (
    <Link
      href="#main"
      sx={{
        position: "absolute",
        left: 16,
        top: -48,
        zIndex: 1400,
        bgcolor: "primary.main",
        color: "primary.contrastText",
        px: 2,
        py: 1,
        borderRadius: 1,
        fontWeight: 600,
        transition: "top 0.15s ease",
        "&:focus-visible": {
          top: 16,
        },
      }}
    >
      Skip to content
    </Link>
  );
}
