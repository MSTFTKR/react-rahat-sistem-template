import { useState, useEffect } from "react";
import {
  Grid,
  Avatar,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Box,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import localStorage from "local-storage";
import Sidebar from "../../components/sideBar/sideBar";
import UserInfo from "./userProfileInfoPage.js";
import UserSetting from "./userProfileSettingsPage.js";

const ProfilePage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [userInfo, setUserInfo] = useState({
    name: "Mustafa",
    surname: "Teker",
    email: "mstftkr99@gmail.com",
    number: "5310000000",
    country: "Türkiye",
    language: "Türkçe",
    organization: "EtrSoft",
    address: "Nivo Ataköy",
    state: "İstanbul",
    zipCode: "34200",
    role: "Yazılımcı",
  });
  const [userStatus, setUserStatus] = useState(true);
  const [selectedButtonId, setSelectedButtonId] = useState(1);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleButtonClick = (buttonId) => {
    setSelectedButtonId(buttonId);
  };

  useEffect(() => {
    const sideBarOpen = localStorage.get("sidebar");
    setIsOpen(sideBarOpen !== "false");

    const cleanupLocalStorage = () => {
      localStorage.clear();
    };
    window.addEventListener("beforeunload", cleanupLocalStorage);
    return () => {
      window.removeEventListener("beforeunload", cleanupLocalStorage);
    };
  }, []);

  return (
    <Grid container>
      <Grid
        item
        xs={11.5}
        sm={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid container sx={{ width: "100%", gap: 2 }}>
          {/* Profile Header */}
          <Grid item xs={12}>
            <Card sx={{ width: "100%" }}>
              <Box
                sx={{
                  height: 150,
                  background:
                    "linear-gradient(90deg, rgba(255,39,39,1) 8%, rgba(226,135,43,1) 24%, rgba(176,75,233,1) 65%, rgba(30,144,255,1) 100%)",
                }}
              />
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  {/* Avatar and Name */}
                  <Grid item xs={12} sm={6} md={4}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar
                        alt="Mustafa Teker"
                        src="/path-to-profile-image.jpg"
                        sx={{
                          width: { xs: 80, sm: 100, md: 120 },
                          height: { xs: 80, sm: 100, md: 120 },
                          border: "4px solid white",
                          mt: { xs: -8, sm: -10 }, // Adjust for overlap with gradient
                        }}
                      />
                      <Typography variant="h5" component="div">
                        Mustafa Teker
                      </Typography>
                    </Box>
                  </Grid>

                  {/* Status Info */}
                  <Grid item xs={12} sm={6} md={8}>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 2,
                        justifyContent: { xs: "flex-start", sm: "flex-end" },
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <WorkIcon fontSize="small" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          Web Arayüz Tasarımcısı
                        </Typography>
                      </Box>
                      <Divider
                        orientation="vertical"
                        flexItem
                        sx={{
                          height: "5vh",
                          display: { xs: "none", sm: "block" },
                        }}
                      />
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <LocationOnIcon fontSize="small" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          Gotham City
                        </Typography>
                      </Box>
                      <Divider
                        orientation="vertical"
                        flexItem
                        sx={{
                          height: "5vh",
                          display: { xs: "none", sm: "block" },
                        }}
                      />
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CalendarTodayIcon fontSize="small" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          Temmuz 2024
                        </Typography>
                      </Box>
                      <Divider
                        orientation="vertical"
                        flexItem
                        sx={{
                          height: "5vh",
                          display: { xs: "none", sm: "block" },
                        }}
                      />
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Durum:
                        </Typography>
                        <Chip
                          label={userStatus ? "Aktif" : "Pasif"}
                          color={userStatus ? "success" : "error"}
                        />
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Buttons */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={2}>
                <Button
                  fullWidth
                  variant={selectedButtonId === 1 ? "contained" : "text"}
                  sx={{ display: "flex", gap: 1 }}
                  onClick={() => handleButtonClick(1)}
                >
                  <BadgeOutlinedIcon fontSize="medium" />
                  Bilgiler
                </Button>
              </Grid>
              <Grid item xs={6} sm={2}>
                <Button
                  fullWidth
                  variant={selectedButtonId === 2 ? "contained" : "text"}
                  sx={{ display: "flex", gap: 1 }}
                  onClick={() => handleButtonClick(2)}
                >
                  <ManageAccountsOutlinedIcon fontSize="medium" />
                  Ayarlar
                </Button>
              </Grid>
            </Grid>
          </Grid>

          {/* Conditional Content */}
          <Grid item xs={12}>
            {selectedButtonId === 1 ? (
              <UserInfo userInfo={userInfo} />
            ) : (
              <UserSetting userInfo={userInfo} />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
