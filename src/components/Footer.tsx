import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { profile } from "../data/cv";

export function Footer() {
  return (
    <Box component="footer" sx={{ py: 3, textAlign: "center" }}>
      <Typography variant="caption" color="text.secondary" component="p">
        Designed &amp; built by {profile.name}.
      </Typography>
      <Typography variant="caption" color="text.secondary" component="p">
        Built with{" "}
        <Link href="https://react.dev" target="_blank" rel="noreferrer">
          React
        </Link>{" "}
        &amp;{" "}
        <Link href="https://mui.com" target="_blank" rel="noreferrer">
          Material UI
        </Link>
        .
      </Typography>
    </Box>
  );
}
