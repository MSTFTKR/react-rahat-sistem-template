import { Grid, Button } from "@mui/material";
import { Apps } from "tabler-icons-react";
import { Typography, Paper, Popover } from "@mui/material";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DescriptionIcon from "@mui/icons-material/Description";
import PeopleIcon from "@mui/icons-material/People";
import SecurityIcon from "@mui/icons-material/Security";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const AppsMenu = () => {
  const [anchorEl, setAnchorEl] = useState(false);
  let navigate=useNavigate();
  const shortcuts = [
    {
      icon: <CalendarTodayIcon />,
      title: "Calendar",
      subtitle: "Appointments",
      path: "/"
    },
    {
      icon: <DescriptionIcon />,
      title: "Invoice App",
      subtitle: "Manage Accounts",
      path: "/"
    },
    { icon: <PeopleIcon />, title: "Users", subtitle: "Manage Users" },
    {
      icon: <SecurityIcon />,
      title: "Role Management",
      subtitle: "Permissions",
      path: "/login"
    },
    { icon: <DashboardIcon />, title: "Dashboard", subtitle: "User Dashboard" },
    { icon: <SettingsIcon />, title: "Settings", subtitle: "Account Settings" },
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleShortcutClick = (path) => {
    navigate(path);
    handleClose();
  };
  const open = Boolean(anchorEl);
  return (
    <Grid>
      <Button
        onClick={handleClick}
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
          transform: "rotate(90deg)",
        }}
      >
        <Apps color="black" />
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Grid sx={{ p: 2, width: 300 }}>
          <Typography variant="h6" gutterBottom>
            Shortcuts
          </Typography>
          <Grid container spacing={2}>
            {shortcuts.map((shortcut, index) => (
              <Grid item md={6} key={index} onClick={() => handleShortcutClick(shortcut.path)}>
                <Paper
                  elevation={0}
                  sx={{ p: 2, textAlign: "center", cursor: "pointer" }}
                >
                  {shortcut.icon}
                  <Typography variant="subtitle1">{shortcut.title}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {shortcut.subtitle}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Popover>
    </Grid>
  );
};
export default AppsMenu;
