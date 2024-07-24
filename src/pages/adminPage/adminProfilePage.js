import { useState,useEffect } from "react";
import {
  Grid,
  Avatar,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import AdminSidebar from "../../components/adminSideBar/adminSideBar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import AdminInfo from "./adminProfileInfoPage.js";
import AdminSettings from "./adminProfileSettingsPage.js";
import localStorage from "local-storage";
const AdminSettingsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const sideBarOpen = localStorage.get("sidebar");

    if (sideBarOpen === "false") {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }

    const cleanupLocalStorage = () => {
      localStorage.clear();
    };
    window.addEventListener("beforeunload", cleanupLocalStorage);
    return () => {
      window.removeEventListener("beforeunload", cleanupLocalStorage);
    };
  }, []);
  const [adminInfo, setAdminInfo] = useState({
    name: "Mustafa",
    surname: "Teker",
    email:"mstftkr99@gmail.com",
    number:"5310000000",
    country:"Türkiye",
    language:"Türkçe",
    organization:"EtrSoft",
    address:"Nivo Ataköy",
    state:"İstanbul",
    zipCode:"34200",
    role:"Yazılımcı"
  });
  const [userStatus, setUserStatus] = useState(true); //Kullanıcının aktif pasiflik durumunu belirtir.
  const [selectedButtonId, setSelectedButtonId] = useState(1);

  const handleButtonClick = (buttonId) => {
    setSelectedButtonId(buttonId);
  };

  return (
    <Grid container>
      <Grid item md={isOpen ? 2.3 : 0.7}>
        <AdminSidebar status={isOpen} toggleSidebar={toggleSidebar} />
      </Grid>
      <Grid
        item
        md={isOpen ? 9.7 : 11.3}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "column",
          pr: "4vh",
        }}
      >
        <Grid //Profil Header Alanı
          item
          md={12}
          sx={{
            marginTop: "3vh",
            backgroundColor: "white",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          <Card sx={{ width: "100%" }}>
            <Grid
              sx={{
                height: 150,
                background:
                  "linear-gradient(90deg, rgba(255,39,39,1) 8%, rgba(226,135,43,1) 24%, rgba(176,75,233,1) 65%, rgba(30,144,255,1) 100%)",
              }}
            />
            <CardContent sx={{ position: "relative" }}>
              <Avatar
                alt="Mustafa Teker"
                src="/path-to-profile-image.jpg"
                sx={{
                  width: 120,
                  height: 120,
                  border: "4px solid white",
                  position: "absolute",
                  top: -60,
                  left: 20,
                }}
              />

              <Grid
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  position: "relative",
                  top: 0,
                  left: 150,
                }}
              >
                <Grid item sx={{ marginRight: "1vh" }}>
                  <Typography variant="h5" component="div">
                    Mustafa Teker
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  position: "absolute",
                  top: 20,
                  right: 20,
                }}
              >
                <Grid item sx={{ display: "flex", alignItems: "center" }}>
                  <WorkIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Web Arayüz Tasarımcısı
                  </Typography>
                </Grid>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ height: "5vh" }}
                />
                <Grid item sx={{ display: "flex", alignItems: "center" }}>
                  <LocationOnIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Gotham City
                  </Typography>
                </Grid>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ height: "5vh" }}
                />
                <Grid item sx={{ display: "flex", alignItems: "center" }}>
                  <CalendarTodayIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Temmuz 2024
                  </Typography>
                </Grid>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ height: "5vh" }}
                />
                <Grid
                  item
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Durum :
                  </Typography>
                  <Chip
                    label={userStatus ? "Aktif" : "Pasif"}
                    color={userStatus ? "success" : "error"}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          md={12}
          sx={{
            display: "flex",
            mt: "3vh",
            gap: 5,
            pt: "1vh",
            pb: "1vh",
            alignItems: "center",
          }}
        >
          <Grid item md={1}>
            <Button
              fullWidth
              variant={selectedButtonId === 1 ? "contained" : "text"}
              type="submit"
              className={
                selectedButtonId === 1 ? "selected-button" : "unselected-button"
              }
              sx={{ display: "flex", gap: 1 }}
              onClick={() => handleButtonClick(1)}
            >
              <BadgeOutlinedIcon fontSize="medium" />
              Bilgiler
            </Button>
          </Grid>
          <Grid item md={1}>
            <Button
              fullWidth
              variant={selectedButtonId === 2 ? "contained" : "text"}
              type="submit"
              className={
                selectedButtonId === 2 ? "selected-button" : "unselected-button"
              }
              sx={{ display: "flex", gap: 1, pt: "1vh", pb: "1vh" }}
              onClick={() => handleButtonClick(2)}
            >
              <ManageAccountsOutlinedIcon fontSize="medium" />
              Ayarlar
            </Button>
          </Grid>
        </Grid>
        {selectedButtonId === 1 ? (
          <AdminInfo adminInfo={adminInfo}/>
        ) : selectedButtonId === 2 ? (
          <AdminSettings adminInfo={adminInfo} />
        ) : (
          ""
        )}
      </Grid>
    </Grid>
  );
};

export default AdminSettingsPage;
