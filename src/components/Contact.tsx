import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
// GitHub / LinkedIn keep their official marks; everything else is the hand-inked set.
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { MailIcon, DocumentIcon, ArrowOutwardIcon, IconWash, type WashTint } from "./SketchIcons";
import { profile } from "../data/cv";
import { ArrowButton } from "./ArrowButton";
import { fonts } from "../theme";

type Channel = {
  label: string;
  value: string;
  href: string;
  icon: ReactNode;
  tint: WashTint;
  external?: boolean;
};

const channels: Channel[] = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: <MailIcon sx={{ fontSize: 21 }} />, tint: "sky" },
  { label: "LinkedIn", value: profile.linkedin.replace("https://", ""), href: profile.linkedin, icon: <LinkedInIcon sx={{ fontSize: 19 }} />, tint: "peach", external: true },
  { label: "GitHub", value: profile.github.replace("https://", ""), href: profile.github, icon: <GitHubIcon sx={{ fontSize: 19 }} />, tint: "leaf", external: true },
  { label: "Resume", value: "Download CV (PDF)", href: "/resume.pdf", icon: <DocumentIcon sx={{ fontSize: 21 }} />, tint: "sky", external: true },
];

export function Contact() {
  return (
    <Box
      component="section"
      id="contact"
      aria-labelledby="contact-heading"
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.15fr) minmax(0, 1fr)" },
        gap: { xs: 3, md: 7 },
        alignItems: "center",
      }}
    >
      <Box>
        <Typography sx={{ mb: 1.5, color: "primary.main", fontWeight: 800, fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          Contact
        </Typography>
        <Typography
          id="contact-heading"
          component="h2"
          sx={{
            color: "secondary.main",
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: { xs: "1.7rem", md: "2.35rem" },
            letterSpacing: "-0.02em",
            lineHeight: 1.12,
          }}
        >
          Have a workflow to automate or a SaaS product to build?
        </Typography>

        <Typography sx={{ mt: 1.5, maxWidth: 520, color: "text.secondary", lineHeight: 1.6, fontSize: "0.92rem" }}>
          Tell me what is slowing your team down or what you want to launch. I can help you design, build and ship a reliable production-ready solution.
        </Typography>

        <Box sx={{ mt: 3 }}>
          <ArrowButton href={`mailto:${profile.email}`} size="large">
            Start a Project
          </ArrowButton>
        </Box>

        <Typography sx={{ mt: 2, display: "flex", alignItems: "center", gap: 0.8, color: "text.secondary", opacity: 0.8, fontSize: "0.82rem" }}>
          <Box component="span" aria-hidden="true" sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: "success.main", flexShrink: 0 }} />
          Available for freelance and long-term collaborations.
        </Typography>
      </Box>

      <Box>
        <Box sx={{ borderTop: "2px solid", borderColor: "primary.main" }}>
          {channels.map((channel) => (
            <Link
              key={channel.label}
              href={channel.href}
              {...(channel.external ? { target: "_blank", rel: "noreferrer" } : {})}
              underline="none"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                py: { xs: 1.5, md: 1.75 },
                borderBottom: "1px solid",
                borderColor: "divider",
                color: "text.primary",
                transition: "padding 0.2s ease, color 0.2s ease",
                "&:hover": { pl: 1, color: "primary.main" },
                "&:hover .channel-arrow": { opacity: 1, transform: "translate(2px, -2px)" },
              }}
            >
              <IconWash tint={channel.tint} size={40}>
                {channel.icon}
              </IconWash>
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography sx={{ color: "text.secondary", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {channel.label}
                </Typography>
                <Typography sx={{ fontWeight: 650, fontSize: "0.92rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {channel.value}
                </Typography>
              </Box>
              <ArrowOutwardIcon className="channel-arrow" aria-hidden="true" sx={{ fontSize: 20, opacity: 0.4, transition: "opacity 0.2s ease, transform 0.3s ease" }} />
            </Link>
          ))}
        </Box>

        <Typography variant="caption" color="text.secondary" component="p" sx={{ mt: 2 }}>
          &copy; {new Date().getFullYear()} {profile.name}
        </Typography>
      </Box>
    </Box>
  );
}
