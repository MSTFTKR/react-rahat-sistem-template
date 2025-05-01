// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light", // dark tema istersen 'dark' yapabilirsin
    primary: {
      main: "#0079FF", // mavi
    },
    secondary: {
      main: "#9c27b0", // mor
    },
    error: {
      main: "#d32f2f",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
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
          color: "#0079FF",
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
          borderRadius: "8px",
          backgroundColor: "#ffffff",
          color: "#0079FF",
          minWidth: "auto",
          padding: "4px",
          margin: "1px",
          width: "auto",
          height: "auto",
          boxShadow: "0 2px 4px rgba(92, 94, 216, 0.1)",
          transition: "all 0.2s ease",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "rgba(182, 198, 241, 0.2)",
            transform: "translateY(-1px)",
            boxShadow: "0 4px 8px rgba(92, 94, 216, 0.2)",
          },
          "&:active": {
            backgroundColor: "rgba(182, 198, 241, 0.4)",
            transform: "translateY(0)",
            boxShadow: "0 1px 2px rgba(92, 94, 216, 0.1)",
          },
          "&:focus": {
            outline: "none",
            boxShadow: "0 0 0 2px rgba(92, 94, 216, 0.3)",
          },
          "&.Mui-disabled": {
            backgroundColor: "#f0f0f0",
            color: "#b0b0b0",
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
          backgroundColor: "#ffffff",
          color: "#0079FF",
          minWidth: "auto",
          padding: "8px 16px",
          width: "auto",
          boxShadow: "0 2px 5px rgba(92, 94, 216, 0.15)",
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
            backgroundColor: "#f5f7fd",
            boxShadow: "0 4px 10px rgba(92, 94, 216, 0.25)",
            transform: "translateY(-2px)",
            "&:before": {
              transform: "translateX(0)",
            },
          },
          "&:active": {
            backgroundColor: "#e8ecfb",
            boxShadow: "0 1px 3px rgba(92, 94, 216, 0.15)",
            transform: "translateY(0)",
          },
          "&:focus": {
            outline: "none",
            boxShadow: "0 0 0 3px rgba(92, 94, 216, 0.2)",
          },
          "&.Mui-disabled": {
            backgroundColor: "#f0f0f0",
            color: "#b0b0b0",
            cursor: "not-allowed",
            opacity: 0.7,
            boxShadow: "none",
          },
        },
        // Varyantlar
        containedPrimary: {
          backgroundColor: "#7367f0",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#675cd8",
          },
          "&:active": {
            backgroundColor: "#5b52c2",
          },
        },
        containedSecondary: {
          backgroundColor: "#ff9f43",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#f88f2f",
          },
          "&:active": {
            backgroundColor: "#e57f1e",
          },
        },
        outlined: {
          borderColor: "#7367f0",
          color: "#7367f0",
          backgroundColor: "transparent",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "rgba(115, 103, 240, 0.04)",
            borderColor: "#675cd8",
            color: "#675cd8",
          },
        },
        // Boyut varyasyonları
        sizeSmall: {
          padding: "6px 12px",
          fontSize: "0.875rem",
        },
        sizeLarge: {
          padding: "12px 24px",
          fontSize: "1rem",
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
          color: "#0079FF", // Varsayılan renk
        },
        checked: {
          color: "#0079FF", // Onaylı checkbox rengi
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          "&.selected-menu-item": {
            backgroundColor: "#0079FF !important",
            borderRadius: "8px !important",
            color: "white !important",
          },
          "&.selected-menu-item .MuiListItemText-primary": {
            color: "white !important",
          },
          "&.selected-menu-item .MuiListItemIcon-root": {
            color: "white !important",
          },
          "&.unselected-menu-item": {
            position: "relative",
            overflow: "hidden",
            height: "3rem",
            borderRadius: "8px",
            background: "#ffffff",
            backgroundSize: "300%",
            border: "none",
            cursor: "pointer",
          },
          "&.unselected-menu-item:hover::before": {
            transform: "scaleX(1)",
          },
          "&.unselected-menu-item::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            transform: "scaleX(0)",
            transformOrigin: "0 50%",
            width: "100%",
            height: "inherit",
            borderRadius: "8px",
            backgroundColor: "rgba(48, 92, 238, 0.3) !important",
            transition: "all 0.475s",
          },
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
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
          "&.Mui-selected": {
            backgroundColor: "#1976d2",
            color: "#fff",
          },
        },
      },
    },
    MuiDatePickerToolbar: {
      styleOverrides: {
        root: {
          color: "#1ea2f2",
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
          backgroundColor: "#7367f0 !important",
          width: "100%",
          textTransform: "none !important",
          borderRadius: "8px",
          padding: "10px 16px",
          boxShadow: "0 4px 8px rgba(115, 103, 240, 0.25)",
          transition: "all 0.3s ease",
          fontWeight: 500,
          "&:hover": {
            backgroundColor: "#675cd8 !important",
            boxShadow: "0 6px 12px rgba(115, 103, 240, 0.4)",
            transform: "translateY(-2px)",
          },
          "&:active": {
            backgroundColor: "#5b52c2 !important",
            boxShadow: "0 2px 4px rgba(115, 103, 240, 0.2)",
            transform: "translateY(1px)",
          },
          "&:focus": {
            outline: "none",
            boxShadow: "0 0 0 3px rgba(115, 103, 240, 0.3)",
          },
        },
      },
    },
    MuiUnselectedButton: {
      styleOverrides: {
        root: {
          textTransform: "none !important",
          color: "#4b4b4b !important",
          borderRadius: "8px",
          padding: "8px 16px",
          backgroundColor: "#f8f8fc",
          transition: "all 0.2s ease",
          fontWeight: 500,
          border: "1px solid transparent",
          "&:hover": {
            backgroundColor: "rgba(115, 103, 240, 0.1) !important",
            color: "#7367f0 !important",
            border: "1px solid rgba(115, 103, 240, 0.3)",
          },
          "&:active": {
            backgroundColor: "rgba(115, 103, 240, 0.2) !important",
          },
          "&:focus": {
            outline: "none",
            boxShadow: "0 0 0 2px rgba(115, 103, 240, 0.2)",
          },
        },
      },
    },
  },
});

export default theme;
