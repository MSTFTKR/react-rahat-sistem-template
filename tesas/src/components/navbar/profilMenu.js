import { useState } from "react";
import {
  Grid,
  Button,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import localStorage from "local-storage";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../api/auth/logout";

const UserProfileDropdown = ({ title, email }) => {
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const isProfileMenuOpen = Boolean(profileMenuAnchor);
  const navigate = useNavigate();
  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <Grid>
      <Button
        sx={{
          borderRadius: "50%",
          minWidth: 0,
          width: "3rem",
          height: "3rem",
          padding: 0,
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "rgba(126, 126, 126, 0.2)",
          },
        }}
        onClick={handleProfileMenuOpen}
      >
        <Avatar
          alt={title} //Kullanıcını ismi buraya çekilmeli
          src="/path/to/your/image.jpg"
        />
      </Button>
      <Menu
        anchorEl={profileMenuAnchor}
        id="user-profile-menu"
        open={isProfileMenuOpen}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Avatar
            alt={title} //Kullanıcını ismi buraya çekilmeli
            src="/path/to/your/image.jpg"
            sx={{ width: "6vh", height: "6vh" }}
          />
          <Grid sx={{ ml: 2 }}>
            <Typography variant="subtitle1">{title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {email}
            </Typography>
          </Grid>
        </MenuItem>
        <Divider />
        <MenuItem
          component={Link} 
          to="/user/profile"
        >
          <ListItemIcon>
            <PersonOutlineIcon fontSize="small" />
          </ListItemIcon>
          Profilim
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Ayarlar
        </MenuItem>
        <Divider />
        <MenuItem sx={{ color: "error.main" }} onClick={handleLogout}>
          <ListItemIcon sx={{ color: "error.main", gap: 1.5 }}>
            <LogoutIcon fontSize="small" sx={{ color: "error.main" }} />
            Çıkış
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </Grid>
  );
};
export default UserProfileDropdown;
