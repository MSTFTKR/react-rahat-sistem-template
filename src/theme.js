// theme.js
import { createTheme } from "@mui/material/styles";
const palette = {
  primary: {
    main: "#a51616",
    contrastText: "#ffffff",
    light: "#c14343", // Light version of primary
    dark: "#7f1111", // Dark version of primary
  },
  secondary: {
    main: "#e58e26",
    contrastText: "#ffffff",
    light: "#eaa554", // Light version of secondary
    dark: "#b67012", // Dark version of secondary
  },
  accent: {
    main: "#305f72",
    contrastText: "#ffffff",
    light: "#4c7a8d", // Light version of accent
    dark: "#264859", // Dark version of accent
  },
  success: {
    main: "#2e7d32",
    light: "#4caf50",
    dark: "#1b5e20",
    contrastText: "#ffffff",
  },
  error: {
    main: "#c62828",
    light: "#ef5350",
    dark: "#b71c1c",
    contrastText: "#ffffff",
  },
  warning: {
    main: "#f9a825",
    light: "#fbc02d",
    dark: "#f57f17",
    contrastText: "#ffffff",
  },
  info: {
    main: "#1976d2",
    light: "#42a5f5",
    dark: "#1565c0",
    contrastText: "#ffffff",
  },
  background: {
    default: "#fdf7f6",
    paper: "#ffffff",
    hover: "#f5f7fd",
    active: "#e8ecfb",
    disabled: "#f0f0f0",
  },
  text: {
    primary: "#1e1e1e",
    secondary: "#4e4e4e",
    disabled: "#b0b0b0",
    hint: "#6c6c6c",
  },
  action: {
    hover: "rgba(0, 0, 0, 0.04)",
    selected: "#1976d2",
  },
};

const theme = createTheme({
  palette: {
    mode: "light",
    ...palette,
  },
  typography: {
    fontFamily: ['"Roboto"', "sans-serif"].join(","),
    h1: { fontSize: "2.5rem", fontWeight: 500 },
    h2: { fontSize: "2rem", fontWeight: 500 },
    h3: { fontSize: "1.75rem", fontWeight: 500 },
    body1: { fontSize: "0.975rem" }, // Daha küçük body1
    body2: { fontSize: "0.85rem" }, // Daha küçük body2
    button: { fontSize: "0.975rem" }, // Buton yazıları küçük
  },
  components: {
    MuiGrid: {},
    MuiTextField: {
      defaultProps: {
        padding: "10px",
        size: "small", // TextField'i küçük yapıyoruz
      },
      styleOverrides: {
        root: {
          borderRadius: "5px",
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variant: "body2", // Varsayılan yazı tipi küçük olacak
      },
      styleOverrides: {
        root: {
          overflowWrap: "break-word",
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        size: "small", // Select'i küçük yapmak için
      },
      styleOverrides: {
        icon: {
          color: (theme) => theme.palette.primary.main,
        },
        root: {
          maxWidth: "100%",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: "1.0rem", // Küçük yazı tipi
        },
        input: {
          padding: "2px",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          whiteSpace: "nowrap", // Seçeneklerin satır içinde daraltılmaması için
        },
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        size: "small",
        noOptionsText: "Seçenek bulunamadı",
      },
      styleOverrides: {
        root: {
          borderRadius: "5px",
        },
        inputRoot: {
          padding: "2px 4px", // Padding değerini azalttım
        },
        input: {
          padding: "6px 4px", // Input içi padding değerini de ayarlayın
        },
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: "medium",
      },
      styleOverrides: {
        root: {
          borderRadius: "30%",
          backgroundColor: "transparent",
          color: (theme) => theme.palette.primary.main,
          padding: "4px",
          transition: "all 0.2s ease",
          textTransform: "none",
          "&:hover": {
            backgroundColor: (theme) =>
              `rgba(${hexToRgb(theme.palette.primary.main)}, 0.1)`,
            transform: "translateY(-1px)",
            boxShadow: (theme) =>
              `0 4px 8px rgba(${hexToRgb(theme.palette.primary.main)}, 0.2)`,
          },
          "&:active": {
            backgroundColor: (theme) =>
              `rgba(${hexToRgb(theme.palette.primary.main)}, 0.2)`,
            transform: "translateY(0)",
            boxShadow: (theme) =>
              `0 1px 2px rgba(${hexToRgb(theme.palette.primary.main)}, 0.1)`,
          },
          "&.Mui-disabled": {
            backgroundColor: "transparent",
            color: (theme) => theme.palette.text.disabled,
            cursor: "not-allowed",
            opacity: 0.7,
            boxShadow: "none",
          },
        },
        // Boyut varyasyonları
        sizeSmall: {
          padding: "6px",
          fontSize: "0.875rem",
        },
        sizeLarge: {
          padding: "12px",
          fontSize: "1.25rem",
        },
      },
    },

    MuiButton: {
      defaultProps: {
        size: "medium",
        disableElevation: false,
      },
      styleOverrides: {
        root: {
          borderRadius: "8px",
          backgroundColor: (theme) => theme.palette.background.paper,
          color: (theme) => theme.palette.primary.main,
          minWidth: "auto",
          padding: "6px 8px",
          width: "auto",
          transition: "all 0.2s ease",
          position: "relative",
          overflow: "hidden",
          textTransform: "none",
          fontWeight: 500,
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(255, 255, 255, 0.1)",
            transform: "translateX(-100%)",
            transition: "transform 0.3s ease-out",
          },
          "&:hover": {
            backgroundColor: (theme) => theme.palette.background.hover,
            boxShadow: (theme) =>
              `0 4px 10px rgba(${hexToRgb(theme.palette.primary.main)}, 0.25)`,
            transform: "translateY(-2px)",
            "&:before": {
              transform: "translateX(0)",
            },
          },
          "&:active": {
            backgroundColor: (theme) => theme.palette.background.active,
            boxShadow: (theme) =>
              `0 1px 3px rgba(${hexToRgb(theme.palette.primary.main)}, 0.15)`,
            transform: "translateY(0)",
          },
          "&.Mui-disabled": {
            backgroundColor: (theme) => theme.palette.background.disabled,
            color: (theme) => theme.palette.text.disabled,
            cursor: "not-allowed",
            opacity: 0.7,
            boxShadow: "none",
          },
        },
        // Varyantlar
        containedPrimary: {
          backgroundColor: (theme) => theme.palette.primary.main,
          color: (theme) => theme.palette.primary.contrastText,
          "&:hover": {
            backgroundColor: (theme) => theme.palette.primary.dark,
          },
          "&:active": {
            backgroundColor: (theme) =>
              darken(theme.palette.primary.dark, 0.15),
          },
        },
        containedSecondary: {
          backgroundColor: (theme) => theme.palette.secondary.main,
          color: (theme) => theme.palette.secondary.contrastText,
          "&:hover": {
            backgroundColor: (theme) => theme.palette.secondary.dark,
          },
          "&:active": {
            backgroundColor: (theme) =>
              darken(theme.palette.secondary.dark, 0.15),
          },
        },
        outlined: {
          borderColor: (theme) => theme.palette.primary.main,
          color: (theme) => theme.palette.primary.main,
          backgroundColor: "transparent",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: (theme) =>
              `rgba(${hexToRgb(theme.palette.primary.main)}, 0.04)`,
            borderColor: (theme) => theme.palette.primary.main,
            color: (theme) => theme.palette.primary.main,
          },
        },
        // Boyut varyasyonları
        sizeSmall: {
          padding: "4px 10px",
          fontSize: "0.775rem",
        },
        sizeLarge: {
          padding: "10px 20px",
          fontSize: "1rem",
        },
        sizeMedium: {
          padding: "6px 14px",
          fontSize: "0.875rem",
        },
        // Tam genişlik
        fullWidth: {
          width: "100%",
        },
      },
    },

    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: (theme) => theme.palette.primary.main, // Varsayılan renk
        },
        checked: {
          color: (theme) => theme.palette.primary.main, // Onaylı checkbox rengi
        },
      },
    },

    MuiButtonBase: {
      styleOverrides: {
        root: {
          textTransform: "none !important",
        },
      },
    },
    MuiPickersArrowSwitcher: {
      styleOverrides: {
        root: {
          justifyContent: "space-between",
          display: "flex",
          alignItems: "center",
          gap: 4, // Butonlar arası boşluk (px)s
        },
        button: {
          // < ve > butonlarını küçült
          width: 35,
          height: 35,
          minWidth: 35,
          fontSize: "1.3rem", // simgelerin boyutu
          padding: 0,
          borderRadius: "50%",
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: (theme) => theme.palette.action.hover,
          },
          "&.Mui-selected": {
            backgroundColor: (theme) => theme.palette.action.selected,
            color: (theme) => theme.palette.primary.contrastText,
          },
        },
      },
    },
    MuiDatePickerToolbar: {
      styleOverrides: {
        root: {
          color: (theme) => theme.palette.primary.main,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          transform: "translate(16px, 10px) scale(1)",
        },
        shrink: {
          transform: "translate(16px, -8px) scale(0.75)",
        },
      },
    },
    MuiCustomButton: {
      styleOverrides: {
        root: {
          backgroundColor: (theme) =>
            `${theme.palette.primary.main} !important`,
          width: "100%",
          textTransform: "none !important",
          borderRadius: "8px",
          padding: "10px 16px",
          boxShadow: (theme) =>
            `0 4px 8px rgba(${hexToRgb(theme.palette.primary.main)}, 0.25)`,
          transition: "all 0.3s ease",
          fontWeight: 500,
          "&:hover": {
            backgroundColor: (theme) =>
              `${theme.palette.primary.dark} !important`,
            boxShadow: (theme) =>
              `0 6px 12px rgba(${hexToRgb(theme.palette.primary.main)}, 0.4)`,
            transform: "translateY(-2px)",
          },
          "&:active": {
            backgroundColor: (theme) =>
              `${darken(theme.palette.primary.dark, 0.15)} !important`,
            boxShadow: (theme) =>
              `0 2px 4px rgba(${hexToRgb(theme.palette.primary.main)}, 0.2)`,
            transform: "translateY(1px)",
          },
          "&:focus": {
            outline: "none",
            boxShadow: (theme) =>
              `0 0 0 3px rgba(${hexToRgb(theme.palette.primary.main)}, 0.3)`,
          },
        },
      },
    },
    MuiUnselectedButton: {
      styleOverrides: {
        root: {
          textTransform: "none !important",
          color: (theme) => `${theme.palette.text.secondary} !important`,
          borderRadius: "8px",
          padding: "8px 16px",
          backgroundColor: (theme) => theme.palette.background.default,
          transition: "all 0.2s ease",
          fontWeight: 500,
          border: "1px solid transparent",
          "&:hover": {
            backgroundColor: (theme) =>
              `rgba(${hexToRgb(theme.palette.primary.main)}, 0.1) !important`,
            color: (theme) => `${theme.palette.primary.main} !important`,
            border: (theme) =>
              `1px solid rgba(${hexToRgb(theme.palette.primary.main)}, 0.3)`,
          },
          "&:active": {
            backgroundColor: (theme) =>
              `rgba(${hexToRgb(theme.palette.primary.main)}, 0.2) !important`,
          },
          "&:focus": {
            outline: "none",
            boxShadow: (theme) =>
              `0 0 0 2px rgba(${hexToRgb(theme.palette.primary.main)}, 0.2)`,
          },
        },
      },
    },
  },
});

// Helper functions for color manipulation
function hexToRgb(hex) {
  // Remove # if present
  hex = hex.replace("#", "");

  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Return the RGB values as a string
  return `${r}, ${g}, ${b}`;
}

function darken(color, amount) {
  // Remove # if present
  color = color.replace("#", "");

  // Parse the hex values
  let r = parseInt(color.substring(0, 2), 16);
  let g = parseInt(color.substring(2, 4), 16);
  let b = parseInt(color.substring(4, 6), 16);

  // Darken each channel
  r = Math.max(0, Math.floor(r * (1 - amount)));
  g = Math.max(0, Math.floor(g * (1 - amount)));
  b = Math.max(0, Math.floor(b * (1 - amount)));

  // Convert back to hex
  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

export default theme;
