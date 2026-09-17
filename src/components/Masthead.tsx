import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const NAV_ITEMS = [
  { href: "#main", label: "Home" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Masthead() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#main");
  const headerRef = useRef<HTMLElement | null>(null);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    let animationFrame = 0;

    const updateActiveSection = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        const marker = window.scrollY + Math.min(window.innerHeight * 0.35, 240);
        let current = NAV_ITEMS[0].href;

        NAV_ITEMS.slice(1).forEach((item) => {
          const section = document.querySelector<HTMLElement>(item.href);
          if (section && section.offsetTop <= marker) current = item.href;
        });

        setActiveHref(current);
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) closeMenu();
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [menuOpen]);

  return (
    <Box
      ref={headerRef}
      component="header"
      onKeyDown={(event) => {
        if (event.key === "Escape") closeMenu();
      }}
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        width: "100%",
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "rgba(8, 11, 16, 0.9)",
        backdropFilter: "blur(20px)",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 1120,
          mx: "auto",
          px: { xs: "20px", md: "32px" },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: 70,
          py: 1.5,
        }}
      >
        <Typography
          component="a"
          href="#main"
          aria-label="Back to home"
          onClick={() => {
            setActiveHref("#main");
            closeMenu();
          }}
          variant="h6"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            minWidth: 42,
            textDecoration: "none",
            borderRadius: 2,
            transition: "transform 0.2s ease, filter 0.2s ease",
            "&:hover": { transform: "translateY(-1px)", filter: "brightness(1.12)" },
          }}
        >
          <Box
            component="img"
            src="/brand-mark.png"
            alt=""
            width={42}
            height={42}
            sx={{ display: "block", width: 42, height: 42, objectFit: "contain" }}
          />
        </Typography>

        <Stack
          direction="row"
          spacing={3.5}
          component="nav"
          aria-label="Main navigation"
          sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}
        >
          {NAV_ITEMS.map((item) => {
            const active = activeHref === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setActiveHref(item.href)}
                underline="none"
                sx={{
                  position: "relative",
                  color: active ? "primary.main" : "text.secondary",
                  fontWeight: 650,
                  fontSize: "0.9rem",
                  transition: "color 0.2s ease",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: -8,
                    height: 2,
                    borderRadius: 2,
                    bgcolor: "primary.main",
                    transform: active ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "center",
                    transition: "transform 0.2s ease",
                  },
                  "&:hover": { color: "text.primary" },
                  "&:hover::after": { transform: "scaleX(1)" },
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </Stack>

        <IconButton
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          sx={{
            display: { xs: "inline-flex", sm: "none" },
            width: 42,
            height: 42,
            color: "text.primary",
            border: "1px solid",
            borderColor: menuOpen ? "rgba(103, 232, 249, 0.4)" : "divider",
            bgcolor: menuOpen ? "rgba(103, 232, 249, 0.08)" : "rgba(255,255,255,0.025)",
          }}
        >
          {menuOpen ? <CloseRoundedIcon /> : <MenuRoundedIcon />}
        </IconButton>

        <Box
          id="mobile-navigation"
          component="nav"
          aria-label="Mobile navigation"
          sx={{
            display: { xs: menuOpen ? "block" : "none", sm: "none" },
            position: "absolute",
            top: "calc(100% + 1px)",
            left: { xs: "20px", md: "32px" },
            right: { xs: "20px", md: "32px" },
            p: 1.25,
            border: "1px solid",
            borderTop: 0,
            borderColor: "divider",
            borderRadius: "0 0 16px 16px",
            bgcolor: "rgba(12, 16, 23, 0.98)",
            backdropFilter: "blur(22px)",
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.45)",
          }}
        >
          {NAV_ITEMS.map((item, index) => {
            const active = activeHref === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => {
                  setActiveHref(item.href);
                  closeMenu();
                }}
                underline="none"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 1.5,
                  py: 1.35,
                  borderRadius: 2,
                  color: active ? "primary.main" : "text.primary",
                  bgcolor: active ? "rgba(103, 232, 249, 0.06)" : "transparent",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  transition: "background-color 0.2s ease, color 0.2s ease",
                  "&:hover": { color: "primary.main", bgcolor: "rgba(103, 232, 249, 0.06)" },
                }}
              >
                {item.label}
                <Typography component="span" sx={{ color: "text.secondary", fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.12em" }}>
                  {String(index + 1).padStart(2, "0")}
                </Typography>
              </Link>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
