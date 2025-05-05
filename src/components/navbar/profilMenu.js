import { useState } from "react";
import {
  Grid,
  Button,
  Avatar,
  Popper,
  Paper,
  MenuItem,
  ListItemIcon,
  Divider,
  Typography,
  ClickAwayListener,
  Grow,
  Box,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../api/auth/logout";

// Menü öğeleri
const defaultMenuItems = [
  {
    label: "Profilim",
    icon: <PersonOutlineIcon fontSize="small" />,
    to: "/user/profile",
    component: Link,
  },
  {
    label: "Ayarlar",
    icon: <SettingsIcon fontSize="small" />,
    onClick: () => {},
  },
  {
    label: "Çıkış",
    icon: <LogoutIcon fontSize="small" />,
    onClick: (navigate) => {
      logout();
      navigate("/login", { replace: true });
    },
    sx: { color: "error.main" },
    iconSx: { color: "error.main", gap: 1.5 },
  },
];

// Stiller
const styles = {
  button: {
    borderRadius: "50%",
    minWidth: 0,
    width: "3rem",
    height: "3rem",
    padding: 0,
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "rgba(126, 126, 126, 0.2)",
    },
  },
  popperPaper: {
    elevation: 0,
    sx: {
      overflow: "visible",
      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
      maxWidth: { xs: "90vw", sm: "auto" },
      width: { xs: "200px", sm: "auto" },
      bgcolor: "background.paper",
      borderRadius: "8px",
      "& .MuiAvatar-root": {
        width: 32,
        height: 32,
        ml: -0.5,
        mr: 1,
      },
    },
  },
  popper: {
    zIndex: 1300, // Menü navbarın üstünde görünsün
    position: { xs: "fixed", sm: "absolute" },
    top: { xs: "10px", sm: "auto" },
    right: { xs: "10px", sm: "auto" },
  },
  profileItem: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    padding: "12px 16px",
  },
  profileAvatar: {
    width: "6vh",
    height: "6vh",
  },
  grid: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    flexShrink: 0,
    width: "auto",
  },
};

const UserProfileDropdown = ({
  title,
  email,
  menuItems = defaultMenuItems,
  avatarSrc = "/path/to/your/image.jpg",
}) => {
  const [open, setOpen] = useState(false);
  const [anchorRef, setAnchorRef] = useState(null);
  const navigate = useNavigate();

  const handleToggle = (event) => {
    setAnchorRef(event.currentTarget);
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef && anchorRef.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <Grid sx={styles.grid}>
      <Button sx={styles.button} onClick={handleToggle}>
        <Avatar
          alt={
            title.split(" ").length > 2
              ? `${title.split(" ")[0]} ${title.split(" ")[1]}`
              : title
          }
          src={avatarSrc}
        />
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef}
        placement="bottom-end" // Masaüstünde butonun sağ altına hizalanır
        transition
        disablePortal
        sx={styles.popper}
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 10], // Masaüstünde butondan 10px aşağı
            },
          },
          {
            name: "preventOverflow",
            options: {
              boundariesElement: "viewport", // Menü ekran dışına taşmaz
            },
          },
        ]}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper {...styles.popperPaper}>
              <ClickAwayListener onClickAway={handleClose}>
                <Box sx={{ pb: 1 }}>
                  <MenuItem sx={styles.profileItem}>
                    <Avatar
                      alt={title}
                      src={avatarSrc}
                      sx={styles.profileAvatar}
                    />
                    <Grid>
                      <Typography variant="subtitle1">
                        {title.split(" ").length > 2
                          ? `${title.split(" ").slice(0, 2).join(" ")} ${title
                              .split(" ")
                              .slice(2)
                              .map((word) => word[0] + ".")
                              .join(" ")}`
                          : title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {email}
                      </Typography>
                    </Grid>
                  </MenuItem>
                  <Divider />
                  {menuItems.map((item, index) => (
                    <MenuItem
                      key={index}
                      component={item.component || "div"}
                      to={item.to}
                      onClick={(event) => {
                        if (item.onClick) {
                          item.onClick(navigate);
                        }
                        handleClose(event);
                      }}
                      sx={item.sx}
                    >
                      <ListItemIcon sx={item.iconSx}>{item.icon}</ListItemIcon>
                      {item.label}
                    </MenuItem>
                  ))}
                </Box>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Grid>
  );
};

export default UserProfileDropdown;
