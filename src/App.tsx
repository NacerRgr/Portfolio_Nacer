import { lazy } from "react";
import Box from "@mui/material/Box";
import { SkipLink } from "./components/SkipLink";
import { Masthead } from "./components/Masthead";
import { Hero } from "./components/Hero";
import { SlideDeckProvider, SlideViewport, type Slide } from "./components/SlideDeck";

// Home ships in the main bundle; every other slide is its own chunk, loaded when the browser is idle
// (see SlideTrack) or as soon as someone navigates to it.
const Services = lazy(() => import("./components/Services").then((m) => ({ default: m.Services })));
const Projects = lazy(() => import("./components/Projects").then((m) => ({ default: m.Projects })));
const HowIWork = lazy(() => import("./components/HowIWork").then((m) => ({ default: m.HowIWork })));
const Experience = lazy(() => import("./components/Experience").then((m) => ({ default: m.Experience })));
const Skills = lazy(() => import("./components/Skills").then((m) => ({ default: m.Skills })));
const Contact = lazy(() => import("./components/Contact").then((m) => ({ default: m.Contact })));

const slides: Slide[] = [
  { id: "main", label: "Home", content: <Hero /> },
  { id: "services", label: "Services", content: <Services /> },
  { id: "projects", label: "Projects", content: <Projects /> },
  { id: "how-i-work", label: "Process", content: <HowIWork /> },
  { id: "experience", label: "Experience", content: <Experience /> },
  { id: "skills", label: "Skills", content: <Skills /> },
  { id: "contact", label: "Contact", content: <Contact /> },
];

function App() {
  return (
    <SlideDeckProvider slides={slides}>
      <Box sx={{ height: "100dvh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <SkipLink />
        <Masthead />
        <SlideViewport />
      </Box>
    </SlideDeckProvider>
  );
}

export default App;
