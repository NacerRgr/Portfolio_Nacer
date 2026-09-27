import { Fragment } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { skills, secondarySkills, education, languages } from "../data/cv";
import { Section } from "./Section";
import { fonts, phoneHidden } from "../theme";

const display = fonts.display;

const label = {
  color: "text.secondary",
  fontWeight: 700,
  fontSize: "0.72rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
} as const;

export function Skills() {
  return (
    <Section id="skills" index={5} title="Skills" intro="The stack I use day to day to design, build, test and ship.">
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "minmax(0, 1fr)",
            md: "minmax(0, 2fr) minmax(0, 1fr)",
          },
          columnGap: { md: 7 },
          rowGap: { xs: 3, sm: 5 },
        }}
      >
        <Box>
          {/* Phones: categories in two columns (half the height); from `sm` up, the ruled list. */}
          <Box
            component="dl"
            sx={{
              m: 0,
              display: { xs: "grid", sm: "block" },
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              columnGap: 2.5,
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            {skills.map((group) => {
              return (
                <Box
                  key={group.category}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "minmax(0, 1fr)",
                      sm: "150px minmax(0, 1fr)",
                    },
                    columnGap: 3,
                    rowGap: 0.5,
                    py: { xs: 1, sm: 1.25, md: 1.4 },
                    borderTop: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Typography component="dt" sx={{ ...label, pt: { sm: "3px" } }}>
                    {group.category}
                  </Typography>
                  <Box component="dd" sx={{ m: 0, minWidth: 0 }}>
                    <Typography
                      sx={{
                        fontFamily: display,
                        fontWeight: 700,
                        fontSize: { xs: "0.9rem", sm: "0.98rem", md: "1.06rem" },
                        letterSpacing: "-0.01em",
                        lineHeight: 1.45,
                      }}
                    >
                      {group.skills.map((skill, i) => (
                        <Fragment key={skill}>
                          <Box component="span" sx={{ whiteSpace: "nowrap" }}>
                            {skill}
                            {i < group.skills.length - 1 && (
                              <>
                                {" "}
                                <Box
                                  component="span"
                                  aria-hidden="true"
                                  sx={{
                                    color: "primary.main",
                                    opacity: 0.5,
                                    mx: 0.5,
                                  }}
                                >
                                  /
                                </Box>
                              </>
                            )}
                          </Box>{" "}
                        </Fragment>
                      ))}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>

          <Typography
            sx={{
              ...phoneHidden(),
              mt: 2,
              color: "text.secondary",
              fontSize: "0.8rem",
              lineHeight: 1.65,
            }}
          >
            <Box component="span" sx={{ color: "text.primary", fontWeight: 700 }}>
              Also:{" "}
            </Box>
            {/* A short taste of the wider toolbox instead of a 26-item wall of text. */}
            {secondarySkills.slice(0, 6).join(" · ")}
          </Typography>
        </Box>

        <Box id="education">
          <Typography
            component="h3"
            sx={{
              ...label,
              pb: 1.4,
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            Education
          </Typography>
          {education.map((item) => (
            <Box
              key={item.school}
              sx={{
                py: { xs: 1, sm: 1.4 },
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: 2,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.88rem",
                    lineHeight: 1.35,
                  }}
                >
                  {item.school}
                </Typography>
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.74rem",
                    fontVariantNumeric: "tabular-nums",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.start.slice(-4)}–{item.end.slice(-4)}
                </Typography>
              </Box>
              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: "0.8rem",
                  lineHeight: 1.45,
                }}
              >
                {item.degree}, {item.detail}
              </Typography>
            </Box>
          ))}

          <Typography component="h3" sx={{ ...label, mt: 3.5, mb: 1 }}>
            Languages
          </Typography>
          <Typography sx={{ fontSize: "0.85rem", lineHeight: 1.7 }}>
            {languages.map((lang, i) => (
              <Fragment key={lang.name}>
                <Box component="span" sx={{ whiteSpace: "nowrap" }}>
                  <Box component="span" sx={{ fontWeight: 700 }}>
                    {lang.name}
                  </Box>{" "}
                  <Box component="span" sx={{ color: "text.secondary" }}>
                    ({lang.level}){i < languages.length - 1 && " ·"}
                  </Box>
                </Box>{" "}
              </Fragment>
            ))}
          </Typography>
        </Box>
      </Box>
    </Section>
  );
}
