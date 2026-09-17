import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type SectionProps = {
  id: string;
  icon: string;
  title: string;
  children: ReactNode;
};

export function Section({ id, icon, title, children }: SectionProps) {
  return (
    <Box
      component="section"
      id={id}
      aria-labelledby={`${id}-heading`}
      sx={{ py: { xs: 7, md: 10 }, borderTop: "1px solid", borderColor: "divider", scrollMarginTop: 80 }}
    >
      <Typography
        id={`${id}-heading`}
        component="h2"
        sx={{ display: "flex", alignItems: "center", gap: 1.5, fontWeight: 850, fontSize: { xs: "1.7rem", md: "2.15rem" }, letterSpacing: "-0.035em", mb: { xs: 4, md: 5 } }}
      >
        <Box
          component="span"
          aria-hidden="true"
          sx={{ display: "grid", placeItems: "center", width: 38, height: 38, borderRadius: 2, bgcolor: "rgba(103, 232, 249, 0.08)", border: "1px solid rgba(103, 232, 249, 0.14)", fontSize: "1.05rem" }}
        >
          {icon}
        </Box>
        {title}
      </Typography>
      {children}
    </Box>
  );
}
