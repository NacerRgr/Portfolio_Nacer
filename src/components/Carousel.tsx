import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type CarouselImage = {
  src: string;
  alt: string;
};

export function Carousel({
  images,
  title,
  aspectRatio = "16 / 9",
}: {
  images: CarouselImage[];
  title: string;
  aspectRatio?: string;
}) {
  const [index, setIndex] = useState(0);
  const count = images.length;

  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);

  return (
    <Box
      role="group"
      aria-label={`${title} screenshots`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
      sx={{
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid",
        borderColor: "divider",
        outline: "none",
        "&:focus-visible": { boxShadow: (t) => `inset 0 0 0 2px ${t.palette.primary.main}` },
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: `${count * 100}%`,
          transform: `translateX(-${index * (100 / count)}%)`,
          transition: "transform 0.3s ease",
        }}
      >
        {images.map((img) => (
          <Box
            key={img.src}
            component="img"
            src={img.src}
            alt={img.alt}
            loading="lazy"
            sx={{
              width: `${100 / count}%`,
              aspectRatio,
              objectFit: "contain",
              bgcolor: "#0a0a0a",
              flexShrink: 0,
              display: "block",
            }}
          />
        ))}
      </Box>

      <Typography
        aria-hidden="true"
        title={images[index].alt}
        sx={{
          position: "absolute",
          bottom: 8,
          left: 10,
          maxWidth: "calc(100% - 88px)",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          fontSize: "0.7rem",
          color: "#fff",
          bgcolor: "rgba(10,10,10,0.68)",
          px: 0.9,
          py: 0.35,
          borderRadius: 1,
        }}
      >
        {images[index].alt}
      </Typography>

      {count > 1 && (
        <>
          <IconButton
            aria-label="Previous screenshot"
            onClick={() => go(-1)}
            size="small"
            sx={{
              position: "absolute",
              top: "50%",
              left: 8,
              transform: "translateY(-50%)",
              bgcolor: "rgba(10,10,10,0.6)",
              color: "#fff",
              "&:hover": { bgcolor: "rgba(10,10,10,0.8)" },
            }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          <IconButton
            aria-label="Next screenshot"
            onClick={() => go(1)}
            size="small"
            sx={{
              position: "absolute",
              top: "50%",
              right: 8,
              transform: "translateY(-50%)",
              bgcolor: "rgba(10,10,10,0.6)",
              color: "#fff",
              "&:hover": { bgcolor: "rgba(10,10,10,0.8)" },
            }}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>

          <Typography
            aria-hidden="true"
            sx={{
              position: "absolute",
              bottom: 8,
              right: 10,
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "#fff",
              bgcolor: "rgba(10,10,10,0.6)",
              px: 0.8,
              py: 0.2,
              borderRadius: 1,
            }}
          >
            {index + 1} / {count}
          </Typography>
        </>
      )}
    </Box>
  );
}
