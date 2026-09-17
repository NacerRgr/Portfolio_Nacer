import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { profile } from "../data/cv";

export function Contact() {
  return (
    <Box
      component="section"
      id="contact"
      aria-labelledby="contact-heading"
      sx={{
        position: "relative",
        overflow: "hidden",
        py: { xs: 9, md: 13 },
        px: 2.5,
        textAlign: "center",
        borderTop: "1px solid",
        borderColor: "divider",
        background: "linear-gradient(180deg, rgba(103,232,249,0.035), rgba(139,92,246,0.045))",
      }}
    >
      <Box aria-hidden="true" sx={{ position: "absolute", width: 380, height: 380, borderRadius: "50%", bgcolor: "rgba(103,232,249,0.07)", filter: "blur(90px)", left: "50%", top: "45%", transform: "translate(-50%, -50%)" }} />
      <Typography id="contact-heading" component="h2" sx={{ position: "relative", fontWeight: 800, fontSize: { xs: "2.25rem", md: "3rem" } }}>
        Have a role or a problem worth solving?
      </Typography>

      <Typography sx={{ position: "relative", mt: 1.5, mx: "auto", maxWidth: 560, color: "text.secondary", lineHeight: 1.7 }}>
        I&apos;m looking for a full-time software engineering role and take on a small number of freelance projects. The easiest way to reach me is by email or LinkedIn.
      </Typography>

      <Stack direction="row" spacing={1.5} sx={{ position: "relative", mt: 4, justifyContent: "center", flexWrap: "wrap", rowGap: 1.5 }}>
        <Button
          variant="outlined"
          startIcon={<GitHubIcon sx={{ color: "#e5e5e5" }} />}
          href={profile.github}
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </Button>
        <Button
          variant="outlined"
          startIcon={<LinkedInIcon sx={{ color: "#0a66c2" }} />}
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<EmailOutlinedIcon />}
          href={`mailto:${profile.email}`}
        >
          Email
        </Button>
        <Button
          variant="outlined"
          startIcon={<DescriptionOutlinedIcon />}
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Download CV
        </Button>
      </Stack>
    </Box>
  );
}
