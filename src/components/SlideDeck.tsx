import { createContext, memo, Suspense, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ButtonBase from "@mui/material/ButtonBase";
import { alpha } from "@mui/material/styles";
import { colors, pageFrame, fonts } from "../theme";
import { LineArrow } from "./ArrowButton";

export type Slide = {
  id: string;
  label: string;
  content: ReactNode;
};

type SlideActions = {
  slides: Slide[];
  count: number;
  goTo: (id: string) => void;
  next: () => void;
  prev: () => void;
};

// Two contexts: the actions never change, so components that only navigate (logo, links)
// don't re-render on every slide change — only readers of the active index do.
const SlideActionsContext = createContext<SlideActions | null>(null);
const SlideIndexContext = createContext(0);

export function useSlideActions() {
  const ctx = useContext(SlideActionsContext);
  if (!ctx) throw new Error("useSlideActions must be used inside a SlideDeckProvider");
  return ctx;
}

export function useActiveSlideIndex() {
  return useContext(SlideIndexContext);
}

function readIndexFromHash(slides: Slide[]) {
  const hash = window.location.hash.replace("#", "");
  const found = slides.findIndex((slide) => slide.id === hash);
  return found >= 0 ? found : 0;
}

// Keys typed into a field, or pressed inside a dialog, belong to that element — not the deck.
function isInteractiveTarget(target: EventTarget | null) {
  const el = target as HTMLElement | null;
  if (!el?.closest) return false;
  return el.isContentEditable || Boolean(el.closest('input, textarea, select, [role="dialog"]'));
}

// True when some element between the target and the viewport can still scroll in that direction,
// so the wheel should scroll it instead of changing slides.
function canScroll(target: EventTarget | null, boundary: HTMLElement, axis: "x" | "y", delta: number) {
  let el = target as HTMLElement | null;
  while (el && el !== boundary) {
    const style = getComputedStyle(el);
    const overflow = axis === "y" ? style.overflowY : style.overflowX;
    if (overflow === "auto" || overflow === "scroll") {
      const pos = axis === "y" ? el.scrollTop : el.scrollLeft;
      const max = axis === "y" ? el.scrollHeight - el.clientHeight : el.scrollWidth - el.clientWidth;
      if (max > 1 && (delta > 0 ? pos < max - 1 : pos > 0)) return true;
    }
    el = el.parentElement;
  }
  return false;
}

export function SlideDeckProvider({ slides, children }: { slides: Slide[]; children: ReactNode }) {
  const idToIndex = useMemo(() => new Map(slides.map((slide, i) => [slide.id, i])), [slides]);
  const [activeIndex, setActiveIndex] = useState(() => readIndexFromHash(slides));

  const last = slides.length - 1;
  const goTo = useCallback(
    (id: string) => {
      const index = idToIndex.get(id);
      if (index !== undefined) setActiveIndex(index);
    },
    [idToIndex],
  );
  const next = useCallback(() => setActiveIndex((i) => Math.min(last, i + 1)), [last]);
  const prev = useCallback(() => setActiveIndex((i) => Math.max(0, i - 1)), []);

  // Each visited slide becomes a history entry, so the browser Back button walks back through them.
  useEffect(() => {
    const id = slides[activeIndex]?.id;
    if (!id || window.location.hash === `#${id}`) return;
    if (window.location.hash) window.history.pushState(null, "", `#${id}`);
    else window.history.replaceState(null, "", `#${id}`);
  }, [activeIndex, slides]);

  useEffect(() => {
    const onPopState = () => setActiveIndex(readIndexFromHash(slides));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [slides]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute("href")?.slice(1);
      if (!hash || !idToIndex.has(hash)) return;
      event.preventDefault();
      goTo(hash);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [idToIndex, goTo]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || isInteractiveTarget(event.target)) return;
      if (event.key === "ArrowRight" || event.key === "PageDown") {
        event.preventDefault();
        next();
      } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        prev();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [next, prev]);

  const actions = useMemo<SlideActions>(() => ({ slides, count: slides.length, goTo, next, prev }), [slides, goTo, next, prev]);

  return (
    <SlideActionsContext.Provider value={actions}>
      <SlideIndexContext.Provider value={activeIndex}>{children}</SlideIndexContext.Provider>
    </SlideActionsContext.Provider>
  );
}

function StepButton({ direction }: { direction: "prev" | "next" }) {
  const { slides, next, prev } = useSlideActions();
  const index = useActiveSlideIndex();
  const isNext = direction === "next";
  const target = slides[isNext ? index + 1 : index - 1];

  return (
    <ButtonBase
      onClick={isNext ? next : prev}
      disabled={!target}
      aria-label={target ? `${isNext ? "Next" : "Previous"} section: ${target.label}` : undefined}
      sx={{
        justifySelf: isNext ? "end" : "start",
        visibility: target ? "visible" : "hidden",
        display: "inline-flex",
        flexDirection: "column",
        alignItems: isNext ? "flex-end" : "flex-start",
        maxWidth: "100%",
        px: 0.5,
        py: 0.25,
        borderRadius: 1,
        textAlign: isNext ? "right" : "left",
        "&.Mui-focusVisible": { outline: `2px solid ${colors.accent}`, outlineOffset: 4 },
        "&:hover .shaft": { width: 40 },
        "&:hover .step-label": { color: "text.primary" },
      }}
    >
      <Box component="span" sx={{ color: "text.secondary", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", lineHeight: 1.2 }}>
        {isNext ? "Next" : "Previous"}
      </Box>
      <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 1.25, maxWidth: "100%", flexDirection: isNext ? "row" : "row-reverse" }}>
        <Box
          component="span"
          className="step-label"
          sx={{
            minWidth: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontFamily: fonts.display,
            fontSize: { xs: "0.9rem", md: "0.98rem" },
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: "text.secondary",
            transition: "color 0.2s ease",
          }}
        >
          {target?.label}
        </Box>
        <LineArrow flip={!isNext} />
      </Box>
    </ButtonBase>
  );
}

// Memoized so a slide change only re-renders the two dots whose state flips.
const Dot = memo(function Dot({ slide, active, onSelect }: { slide: Slide; active: boolean; onSelect: (id: string) => void }) {
  return (
    <Box
      component="button"
      type="button"
      title={slide.label}
      aria-label={`Go to ${slide.label}`}
      aria-current={active ? "true" : undefined}
      onClick={() => onSelect(slide.id)}
      sx={{
        display: "grid",
        placeItems: "center",
        height: 28,
        p: 0,
        minWidth: 14,
        border: "none",
        bgcolor: "transparent",
        cursor: "pointer",
        "&::after": {
          content: '""',
          width: active ? 20 : 7,
          height: 7,
          borderRadius: 4,
          bgcolor: active ? "primary.main" : "divider",
          transition: "width 0.25s ease, background-color 0.25s ease",
        },
        "&:hover::after": { bgcolor: active ? "primary.main" : colors.accentMuted },
        "&:focus-visible": { outline: `2px solid ${colors.accent}`, outlineOffset: 1, borderRadius: 1 },
      }}
    />
  );
});

function SlideDots() {
  const { slides, goTo } = useSlideActions();
  const activeIndex = useActiveSlideIndex();

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {slides.map((slide, i) => (
        <Dot key={slide.id} slide={slide} active={i === activeIndex} onSelect={goTo} />
      ))}
    </Box>
  );
}

const slideFrameSx = {
  maxWidth: `${pageFrame.maxWidth}px`,
  px: pageFrame.gutter,
  pt: { xs: 3, md: 4 },
  pb: { xs: 11, md: 10 },
  // Short laptop screens: tighten the frame so every slide still fits without scrolling.
  "@media (min-width: 900px) and (max-height: 720px)": { pt: 2, pb: 7 },
  my: "auto",
  width: "100%",
} as const;

// Memoized: the slide content never changes, so only the outgoing and incoming panes
// re-render (to flip `inert`) when the active slide changes.
// Content renders once the pane is active or the deck is warm (browser idle after load), and stays
// rendered after that, so lazy slide chunks don't compete with the first paint of the home slide.
const SlidePane = memo(function SlidePane({ content, active, warm, width }: { content: ReactNode; active: boolean; warm: boolean; width: string }) {
  const [seen, setSeen] = useState(active);
  if (active && !seen) setSeen(true);

  return (
    <Box inert={!active} sx={{ width, flexShrink: 0, height: "100%", overflowY: "auto", overflowX: "hidden" }}>
      <Box sx={{ minHeight: "100%", display: "flex", flexDirection: "column" }}>
        <Container maxWidth={false} sx={slideFrameSx}>
          {(seen || warm) && <Suspense fallback={null}>{content}</Suspense>}
        </Container>
      </Box>
    </Box>
  );
});

// Flips to true once the page has loaded and the browser is idle.
function useWarmAfterLoad() {
  const [warm, setWarm] = useState(false);

  useEffect(() => {
    let idleId: number | undefined;
    let timeoutId: number | undefined;
    const schedule = () => {
      if (typeof window.requestIdleCallback === "function") idleId = window.requestIdleCallback(() => setWarm(true), { timeout: 2000 });
      else timeoutId = window.setTimeout(() => setWarm(true), 300);
    };

    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      window.removeEventListener("load", schedule);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  return warm;
}

const trackSx = {
  display: "flex",
  height: "100%",
  // Ease-out: the slide starts moving on the same frame as the click, then settles.
  transition: "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
  // Keeps the strip on its own GPU layer so each transition doesn't re-rasterize it.
  willChange: "transform",
} as const;

function SlideTrack() {
  const { slides } = useSlideActions();
  const activeIndex = useActiveSlideIndex();
  const warm = useWarmAfterLoad();
  const paneWidth = `${100 / slides.length}%`;

  return (
    <Box
      sx={trackSx}
      // Dynamic values go through `style` so emotion doesn't generate a new class per slide.
      style={{ width: `${slides.length * 100}%`, transform: `translateX(-${activeIndex * (100 / slides.length)}%)` }}
    >
      {slides.map((slide, i) => (
        <SlidePane key={slide.id} content={slide.content} active={i === activeIndex} warm={warm} width={paneWidth} />
      ))}
    </Box>
  );
}

const keycapSx = {
  display: "inline-grid",
  placeItems: "center",
  minWidth: 24,
  height: 22,
  px: 0.5,
  borderRadius: "6px",
  border: `1px solid ${colors.line}`,
  borderBottomWidth: "2px",
  bgcolor: colors.bg,
  color: "text.primary",
  fontSize: "0.75rem",
  fontWeight: 700,
  lineHeight: 1,
} as const;

const hintSx = {
  position: "absolute",
  left: "50%",
  bottom: { xs: 58, md: 64 },
  display: "inline-flex",
  alignItems: "center",
  gap: 0.75,
  px: 1.5,
  py: 0.75,
  whiteSpace: "nowrap",
  borderRadius: 999,
  bgcolor: colors.bgRaised,
  border: `1px solid ${colors.line}`,
  boxShadow: `0 8px 24px ${alpha(colors.navy, 0.08)}`,
  color: "text.secondary",
  fontSize: "0.78rem",
  fontWeight: 600,
  pointerEvents: "none",
  transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
  // Mouse/trackpad visitors get keys + scroll; touch visitors get swipe.
  "& .touch": { display: "none" },
  "@media (pointer: coarse)": { "& .desktop": { display: "none" }, "& .touch": { display: "inline" } },
  // The → key "presses" itself: a 1px dip plus an accent outline fading in. Transform and opacity
  // only, so it runs on the compositor instead of restyling the page every frame.
  "& .press": { position: "relative", animation: "keyPress 2.6s ease-in-out 1.6s infinite" },
  "& .press::after": {
    content: '""',
    position: "absolute",
    inset: -1,
    borderRadius: "6px",
    border: `1.5px solid ${colors.accent}`,
    opacity: 0,
    animation: "keyGlow 2.6s ease-in-out 1.6s infinite",
  },
  "@keyframes keyPress": { "0%, 70%, 86%, 100%": { transform: "none" }, "78%": { transform: "translateY(1px)" } },
  "@keyframes keyGlow": { "0%, 70%, 86%, 100%": { opacity: 0 }, "78%": { opacity: 1 } },
} as const;

// First-visit hint: fades in after load, fades out once the visitor changes slide, then unmounts
// (so after that it costs nothing per slide change beyond a context read).
function ExploreHint() {
  const activeIndex = useActiveSlideIndex();
  const startIndex = useRef(activeIndex);
  const [shown, setShown] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [gone, setGone] = useState(false);
  if (!dismissed && activeIndex !== startIndex.current) setDismissed(true);

  useEffect(() => {
    const id = window.setTimeout(() => setShown(true), 900);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!dismissed) return;
    const id = window.setTimeout(() => setGone(true), 600);
    return () => window.clearTimeout(id);
  }, [dismissed]);

  if (gone) return null;
  const visible = shown && !dismissed;

  return (
    <Box role="note" aria-hidden={!visible} sx={hintSx} style={{ opacity: visible ? 1 : 0, transform: `translate(-50%, ${visible ? 0 : 8}px)` }}>
      <span className="desktop">Use</span>
      <span className="touch">Swipe or tap</span>
      <Box component="kbd" aria-label="left arrow key" className="desktop" sx={keycapSx}>
        <LineArrow flip length={9} color="inherit" />
      </Box>
      <Box component="kbd" aria-label="right arrow key" className="press" sx={keycapSx}>
        <LineArrow length={9} color="inherit" />
      </Box>
      <span className="desktop">or scroll to explore</span>
      <span className="touch">to explore</span>
    </Box>
  );
}

// No props and no index subscription: it never re-renders; its step buttons and dots update themselves.
const SlideNavBar = memo(function SlideNavBar() {
  return (
    <Box
      component="nav"
      aria-label="Section navigation"
      sx={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        pt: 3,
        pb: { xs: 1, md: 1.5 },
        background: `linear-gradient(to bottom, ${alpha(colors.bg, 0)}, ${colors.bg} 22px)`,
      }}
    >
      <Box
        sx={{
          maxWidth: `${pageFrame.maxWidth}px`,
          mx: "auto",
          px: { xs: "8px", sm: pageFrame.gutter.sm, lg: pageFrame.gutter.lg },
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) auto minmax(0, 1fr)",
          alignItems: "center",
          columnGap: 1,
        }}
      >
        <StepButton direction="prev" />
        <SlideDots />
        <StepButton direction="next" />
      </Box>
      <ExploreHint />
    </Box>
  );
});

// Only reads the (stable) actions, so the viewport shell itself doesn't re-render on slide changes.
export function SlideViewport() {
  const { next, prev } = useSlideActions();
  const viewportRef = useRef<HTMLElement | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const lastWheel = useRef(0);

  // Wheel / trackpad: one gesture moves one slide. A new move only fires after a short pause,
  // so trackpad momentum can't skip several slides, and reaching the end of a long slide doesn't
  // tip straight into the next one mid-gesture.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return;
      const now = Date.now();
      const gap = now - lastWheel.current;
      lastWheel.current = now;

      const vertical = Math.abs(event.deltaY) >= Math.abs(event.deltaX);
      const delta = vertical ? event.deltaY : event.deltaX;
      if (Math.abs(delta) < 4) return;
      if (canScroll(event.target, viewport, vertical ? "y" : "x", delta)) return;
      if (gap < 180) return;

      if (delta > 0) next();
      else prev();
    };

    viewport.addEventListener("wheel", onWheel, { passive: true });
    return () => viewport.removeEventListener("wheel", onWheel);
  }, [next, prev]);

  return (
    <Box
      component="main"
      id="main"
      ref={viewportRef}
      sx={{ position: "relative", flex: 1, minHeight: 0, overflow: "hidden" }}
      onTouchStart={(event) => {
        const touch = event.touches[0];
        touchStart.current = { x: touch.clientX, y: touch.clientY };
      }}
      onTouchEnd={(event) => {
        if (!touchStart.current) return;
        const touch = event.changedTouches[0];
        const dx = touch.clientX - touchStart.current.x;
        const dy = touch.clientY - touchStart.current.y;
        touchStart.current = null;
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
          if (dx < 0) next();
          else prev();
        }
      }}
    >
      <SlideTrack />
      <SlideNavBar />
    </Box>
  );
}
