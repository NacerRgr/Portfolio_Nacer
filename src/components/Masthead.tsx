import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type Ref } from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import { alpha, type SxProps, type Theme } from "@mui/material/styles";
import { useActiveSlideIndex, useSlideActions, type Slide } from "./SlideDeck";
import { LineArrow } from "./ArrowButton";
import { CloseIcon, MenuIcon, PaperPlaneIcon, IconWash } from "./SketchIcons";
import { profile } from "../data/cv";
// Face crop of the illustrated portrait, 2x for the 36px avatar.
import avatar from "../assets/portrait-ghibli-face.png?w=72&quality=80&format=webp";
import { pageFrame, colors, fonts } from "../theme";

const display = fonts.display;
// Same curve as the slide track, so the nav indicator and the slides move together.
const slideEase = "cubic-bezier(0.22, 1, 0.36, 1)";

export function Masthead() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const { goTo } = useSlideActions();

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const selectFromMenu = useCallback(
    (id: string) => {
      goTo(id);
      closeMenu();
    },
    [goTo, closeMenu],
  );

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) closeMenu();
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [menuOpen, closeMenu]);

  return (
    <Box
      ref={headerRef}
      component="header"
      onKeyDown={(event) => {
        if (event.key === "Escape") closeMenu();
      }}
      sx={{ position: "relative", zIndex: 20, width: "100%" }}
    >
      <Box sx={{ position: "relative", maxWidth: pageFrame.maxWidth, mx: "auto", px: pageFrame.gutter, pt: { xs: 1.25, md: 1.5 } }}>
        <Box sx={barSx}>
          <Brand onHome={closeMenu} />

          <DesktopNav onSelect={goTo} />

          <Box sx={{ display: { xs: "none", md: "block" }, justifySelf: "end", lineHeight: 0 }}>
            <TalkLink />
          </Box>

          <IconButton
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            sx={{
              display: { xs: "inline-flex", md: "none" },
              justifySelf: "end",
              width: 38,
              height: 38,
              color: menuOpen ? "primary.main" : "text.primary",
              bgcolor: menuOpen ? colors.accentSoft : "transparent",
              borderRadius: "50%",
              "&:hover": { bgcolor: colors.accentSoft },
            }}
          >
            {menuOpen ? <CloseIcon fontSize="small" /> : <MenuIcon fontSize="small" />}
          </IconButton>
        </Box>

        <Box
          id="mobile-navigation"
          component="nav"
          aria-label="Mobile navigation"
          sx={{
            display: { xs: menuOpen ? "block" : "none", md: "none" },
            position: "absolute",
            top: "calc(100% + 10px)",
            left: pageFrame.gutter,
            right: pageFrame.gutter,
            p: 1,
            bgcolor: colors.bgRaised,
            border: `1px solid ${colors.line}`,
            borderRadius: "16px",
            boxShadow: `0 24px 48px ${alpha(colors.navy, 0.14)}`,
            animation: "menuIn 0.22s ease-out",
            "@keyframes menuIn": {
              from: { opacity: 0, transform: "translateY(-6px)" },
              to: { opacity: 1, transform: "none" },
            },
          }}
        >
          <MobileNavItems onSelect={selectFromMenu} />
          <Box onClick={closeMenu} sx={{ mt: 1, pt: 1.25, px: 0.5, pb: 0.25, borderTop: `1px solid ${colors.line}` }}>
            <TalkLink large />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

// No bar, border or divider: the avatar, links and "Let's talk" sit straight on the painted page.
// The brush stroke under the active link and the paper-plane dab give it all the structure it needs.
const barSx = {
  display: "grid",
  gridTemplateColumns: { xs: "minmax(0, 1fr) auto", md: "minmax(0, 1fr) auto minmax(0, 1fr)" },
  alignItems: "center",
  columnGap: 2,
  py: "6px",
} as const;

// A tapered, hand-painted brush stroke (filled shape, so it thins at both ends like real ink).
function BrushStroke({ sx, svgRef, className }: { sx?: SxProps<Theme>; svgRef?: Ref<SVGSVGElement>; className?: string }) {
  return (
    <Box component="svg" ref={svgRef} className={className} viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true" sx={[brushSx, ...(Array.isArray(sx) ? sx : [sx])]}>
      <path d="M1.2 6.6C18 4.4 44 3.9 72 4.3c9.4.1 18 .6 26.2 1.3.9.1 1.1 1.4.2 1.6-9.3 1.4-19.3 2.1-29.5 2.2C45 9.7 22.5 9.2 2 8.5.6 8.4.1 6.8 1.2 6.6z" />
    </Box>
  );
}

const brushSx = { display: "block", fill: colors.warm, opacity: 0.85, pointerEvents: "none", overflow: "visible" } as const;

// "Let's talk": a paper plane on a watercolor dab and the words in the heading font. No filled
// button: on hover the plane takes off and loops back, and a brush stroke paints under the words.
const talkSx = {
  display: "inline-flex",
  alignItems: "center",
  gap: 0.75,
  pl: "2px",
  pr: 2,
  py: "2px",
  borderRadius: 999,
  color: "text.primary",
  fontFamily: fonts.display,
  fontWeight: 700,
  letterSpacing: "-0.01em",
  textDecoration: "none",
  whiteSpace: "nowrap",
  transition: "color 0.25s ease",
  "& .talk-stroke": { position: "absolute", left: -3, right: -3, bottom: -3, height: 7, transform: "scaleX(0)", transformOrigin: "left center", transition: `transform 0.45s ${slideEase}` },
  "& .plane": { transition: `transform 0.3s ${slideEase}` },
  "&:hover, &:focus-visible": { color: "primary.main" },
  "&:hover .talk-stroke, &:focus-visible .talk-stroke": { transform: "scaleX(1)" },
  "&:hover .plane, &:focus-visible .plane": { animation: "planeFly 0.9s ease-in-out" },
  "@keyframes planeFly": {
    "0%": { transform: "none", opacity: 1 },
    "45%": { transform: "translate(14px, -14px) rotate(8deg)", opacity: 0 },
    "46%": { transform: "translate(-12px, 12px)", opacity: 0 },
    "100%": { transform: "none", opacity: 1 },
  },
  "&:focus-visible": { outline: `2px solid ${colors.accent}`, outlineOffset: 3 },
} as const;

function TalkLink({ large }: { large?: boolean }) {
  return (
    <Box component="a" href="#contact" sx={[talkSx, { fontSize: large ? "1.1rem" : "0.95rem" }]}>
      <IconWash tint="peach" size={large ? 42 : 36}>
        <PaperPlaneIcon className="plane" sx={{ fontSize: large ? 22 : 20 }} />
      </IconWash>
      <Box component="span" sx={{ position: "relative", display: "inline-block", lineHeight: 1.3 }}>
        <BrushStroke className="talk-stroke" />
        <Box component="span" sx={{ position: "relative" }}>
          Let&rsquo;s talk
        </Box>
      </Box>
    </Box>
  );
}

function Brand({ onHome }: { onHome: () => void }) {
  return (
    <Box
      component="a"
      href="#main"
      aria-label={`${profile.displayName}, back to home`}
      onClick={onHome}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1.25,
        justifySelf: "start",
        minWidth: 0,
        color: "text.primary",
        textDecoration: "none",
        borderRadius: "50%",
        "& img": { transition: `transform 0.4s ${slideEase}` },
        "&:hover img": { transform: "scale(1.08)" },
        "&:focus-visible": { outline: `2px solid ${colors.accent}`, outlineOffset: 4 },
      }}
    >
      <Box
        component="img"
        src={avatar}
        alt=""
        width={36}
        height={36}
        decoding="async"
        sx={{ display: "block", width: 36, height: 36, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: `2px solid ${colors.bgRaised}`, boxShadow: `0 0 0 1px ${colors.line}, 0 4px 10px ${alpha(colors.navy, 0.12)}` }}
      />
    </Box>
  );
}

type NavItemProps = { item: Slide; index: number; active: boolean; onSelect: (id: string) => void };

const navRowSx = {
  display: { xs: "none", md: "flex" },
  position: "relative",
  alignItems: "center",
} as const;

// Fixed 100px stroke, sized and placed with translateX + scaleX: moving it between links is a pure
// compositor transform (animating `width` would re-layout the header every frame).
const navStrokeSx = {
  position: "absolute",
  left: 0,
  bottom: 2,
  height: 7,
  width: 100,
  opacity: 0,
  transformOrigin: "0 50%",
  transition: `transform 0.45s ${slideEase}`,
} as const;

// Desktop: plain links; one painted brush stroke glides under the active word.
function DesktopNav({ onSelect }: { onSelect: (id: string) => void }) {
  const { slides } = useSlideActions();
  const activeIndex = useActiveSlideIndex();
  const itemEls = useRef<(HTMLAnchorElement | null)[]>([]);
  // Stable ref callbacks, so memoized items aren't re-rendered by a new ref function each time.
  const refSetters = useMemo(
    () =>
      slides.map((_, i) => (el: HTMLAnchorElement | null) => {
        itemEls.current[i] = el;
      }),
    [slides],
  );
  const strokeRef = useRef<SVGSVGElement | null>(null);

  // The stroke is positioned by writing straight to its style: no second render per slide change,
  // and no new emotion class for every position.
  useLayoutEffect(() => {
    const measure = () => {
      const el = itemEls.current[activeIndex];
      const stroke = strokeRef.current;
      if (!el || !stroke || !el.offsetWidth) return;
      // Span the word itself (link box minus its horizontal padding), a touch wider for a painted feel.
      const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
      const width = el.offsetWidth - pad * 2 + 8;
      stroke.style.transform = `translateX(${el.offsetLeft + pad - 4}px) scaleX(${width / 100})`;
      stroke.style.opacity = "1";
    };
    measure();
    // Re-measure once the web fonts settle and whenever the layout width changes.
    void document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeIndex]);

  return (
    <Box
      component="nav"
      aria-label="Main navigation"
      sx={navRowSx}
    >
      <BrushStroke svgRef={strokeRef} sx={navStrokeSx} />
      {slides.map((item, i) => (
        <DesktopNavItem key={item.id} ref={refSetters[i]} item={item} index={i} active={i === activeIndex} onSelect={onSelect} />
      ))}
    </Box>
  );
}

// Memoized: on a slide change only the previously and newly active links re-render.
const DesktopNavItem = memo(function DesktopNavItem({ item, active, onSelect, ref }: NavItemProps & { ref: (el: HTMLAnchorElement | null) => void }) {
  return (
    <Link
      ref={ref}
      href={`#${item.id}`}
      aria-current={active ? "page" : undefined}
      onClick={(event) => {
        event.preventDefault();
        onSelect(item.id);
      }}
      underline="none"
      sx={{
        position: "relative",
        zIndex: 1,
        display: "inline-flex",
        px: { md: 1.5, lg: 1.75 },
        py: 0.75,
        borderRadius: 999,
        fontSize: "0.85rem",
        fontWeight: active ? 700 : 600,
        color: active ? "text.primary" : "text.secondary",
        transition: "color 0.3s ease",
        "&:hover": { color: "text.primary" },
        "&:hover .roll, &:focus-visible .roll": { transform: "translateY(-50%)" },
        "&:focus-visible": { outline: `2px solid ${colors.accent}`, outlineOffset: 2 },
      }}
    >
      <Box component="span" sx={{ display: "inline-block", height: "1.4em", lineHeight: 1.4, overflow: "hidden" }}>
        <Box component="span" className="roll" sx={{ display: "flex", flexDirection: "column", transition: "transform 0.35s cubic-bezier(0.65, 0, 0.35, 1)" }}>
          <span>{item.label}</span>
          <Box component="span" aria-hidden="true" sx={{ color: "primary.main" }}>
            {item.label}
          </Box>
        </Box>
      </Box>
    </Link>
  );
});

function MobileNavItems({ onSelect }: { onSelect: (id: string) => void }) {
  const { slides } = useSlideActions();
  const activeIndex = useActiveSlideIndex();

  return (
    <>
      {slides.map((item, i) => (
        <MobileNavItem key={item.id} item={item} index={i} active={i === activeIndex} onSelect={onSelect} />
      ))}
    </>
  );
}

const mobileStrokeSx = { position: "absolute", left: -4, right: -4, bottom: -1, height: 8 } as const;

// Rows carry the same numbering as the section titles (Services = 01, …).
const MobileNavItem = memo(function MobileNavItem({ item, index, active, onSelect }: NavItemProps) {
  return (
    <Link
      href={`#${item.id}`}
      aria-current={active ? "page" : undefined}
      onClick={(event) => {
        event.preventDefault();
        onSelect(item.id);
      }}
      underline="none"
      sx={{
        display: "grid",
        gridTemplateColumns: "28px minmax(0, 1fr) auto",
        alignItems: "center",
        px: 1.25,
        py: 1.1,
        borderRadius: "12px",
        color: "text.primary",
        transition: "background-color 0.2s ease, color 0.2s ease",
        "&:hover": { bgcolor: colors.accentSoft },
        "&:focus-visible": { outline: `2px solid ${colors.accent}`, outlineOffset: -2 },
      }}
    >
      <Box component="span" aria-hidden="true" sx={{ fontFamily: display, fontWeight: 700, fontSize: "0.78rem", color: colors.warm, fontVariantNumeric: "tabular-nums" }}>
        {String(index).padStart(2, "0")}
      </Box>
      <Box component="span" sx={{ position: "relative", justifySelf: "start", fontFamily: display, fontWeight: 700, fontSize: "1.05rem", letterSpacing: "-0.01em" }}>
        {active && <BrushStroke sx={mobileStrokeSx} />}
        <Box component="span" sx={{ position: "relative" }}>
          {item.label}
        </Box>
      </Box>
      {active && <LineArrow length={16} />}
    </Link>
  );
});
