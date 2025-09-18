import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: { main: "#EAD336", dark: "#FFFFFF", contrastText: "#040100" },
    secondary: { main: "#FFFFFF", dark: "#EAD336", contrastText: "#040100" },
    background: { default: "#fff8ea", paper: "#ffffff" },
    text: { primary: "#040100" },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
  },
  shape: { borderRadius: 8 },
  spacing: 8,

  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#000",
          textDecoration: "none",
          fontWeight: 500,
          transition: "color 0.2s ease-in-out",
          "&:hover": {
            color: "#1565c0",
          },
          "&.active": {
            color: "#dc004e",
            fontWeight: 600,
          },
        },
      },
    },

    MuiButtonBase: {
      styleOverrides: {
        root: {
          "& .MuiTouchRipple-child": {
            backgroundColor: "#EAD336",
          },
          "& .MuiTouchRipple-rippleVisible": {
            opacity: 0.45,
          },
        },
      },
    },

    MuiCssBaseline: {
      styleOverrides: {
        ".MuiTouchRipple-child": { backgroundColor: "#EAD336" },
        ".MuiTouchRipple-rippleVisible": { opacity: 0.45 },
      },
    },

    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 8,
          textTransform: "none",
          padding: "8px 16px",
          fontWeight: 600,
          border: `1px solid ${theme.palette.primary.main}`,
          "&& .MuiTouchRipple-child": { backgroundColor: "#EAD336" },
        }),
        containedPrimary: ({ theme }) => ({
          boxShadow: "none",
          backgroundColor: theme.palette.primary.main,
          border: `1px solid ${theme.palette.primary.main}`,
          color: theme.palette.text.primary,
          "&:hover": {
            boxShadow: "none",
            backgroundColor: "inherit",
          },
        }),
        outlinedPrimary: ({ theme }) => ({
          backgroundColor: "transparent",
          border: `1px solid ${theme.palette.primary.main}`,
          color: theme.palette.text.primary,
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
          },
        }),
      },
    },

    MuiPaper: { styleOverrides: { root: { borderRadius: 8 } } },
  },
});
