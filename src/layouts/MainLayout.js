import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sideBar/sideBar";
import Navbar from "../components/navbar/navbar";
import localStorage from "local-storage";
import { Box, Grid } from "@mui/material";

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const sideBarOpen = localStorage.get("sidebar");

    if (sideBarOpen === "false") {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box sx={{ position: "relative", display: "flex", width: "100%" }}>
      <Box
        sx={{
          width: { xs: "70px", sm: isOpen ? "275px" : "95px" },
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          zIndex: 3,
          transition: "width 0.3s ease",
        }}
      >
        <Sidebar status={isOpen} toggleSidebar={toggleSidebar} />
      </Box>

      <Box
        sx={{
          marginLeft: { xs: "90px", sm: isOpen ? "275px" : "95px" },
          width: {
            xs: "calc(100% - 70px)",
            sm: isOpen ? "calc(100% - 275px)" : "calc(100% - 95px)",
          },
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end", // İçeriği sağa yaslar
          transition: "margin-left 0.3s ease, width 0.3s ease",
        }}
      >
        <Box sx={{ width: "100%", paddingRight: { xs: "10px", sm: "20px" } }}>
          <Navbar />
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
