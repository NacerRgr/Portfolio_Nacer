import { useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { SkipLink } from "./components/SkipLink";
import { Masthead } from "./components/Masthead";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Education } from "./components/Education";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

function App() {
  useEffect(() => {
    const scrollToHash = () => {
      if (!window.location.hash) return;
      const target = document.querySelector<HTMLElement>(window.location.hash);
      target?.scrollIntoView({ block: "start", behavior: "auto" });
    };

    const firstFrame = requestAnimationFrame(() => {
      requestAnimationFrame(scrollToHash);
    });

    document.fonts?.ready.then(scrollToHash);
    window.addEventListener("hashchange", scrollToHash);

    return () => {
      cancelAnimationFrame(firstFrame);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  return (
    <>
      <SkipLink />
      <Masthead />
      <Container maxWidth="lg" sx={{ maxWidth: "1120px !important", px: { xs: "20px", md: "32px" } }}>
        <Box component="main" id="main" tabIndex={-1} sx={{ outline: "none" }}>
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Skills />
          <Education />
        </Box>
      </Container>
      <Contact />
      <Container maxWidth="lg" sx={{ maxWidth: "1120px !important", px: { xs: "20px", md: "32px" } }}>
        <Footer />
      </Container>
    </>
  );
}

export default App;
