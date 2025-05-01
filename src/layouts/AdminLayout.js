import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/adminSideBar/adminSideBar"; // Admin'e özel bir sidebar yapabilirsin
import localStorage from "local-storage";
import { Grid } from "@mui/material";
import Navbar from "../components/navbar/navbar";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const sideBarOpen = localStorage.get("admin_sidebar");

    if (sideBarOpen === "false") {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }

    const cleanupLocalStorage = () => {
      localStorage.remove("admin_sidebar"); // Sadece admin sidebar için temizlik
    };
    window.addEventListener("beforeunload", cleanupLocalStorage);
    return () => {
      window.removeEventListener("beforeunload", cleanupLocalStorage);
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    localStorage.set("sidebar", !isOpen); // admin için kaydediyoruz
  };

  return (
    <Grid container>
      <Grid
        item
        sx={{
          flexBasis: isOpen ? "275px" : "95px",
          flexShrink: 0,
          transition: "flex-basis 0.3s ease",
        }}
        zIndex={1}
      >
        <AdminSidebar status={isOpen} toggleSidebar={toggleSidebar} />
      </Grid>

      <Grid item xs sx={{ paddingRight: "20px" }}>
        <Navbar />
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default AdminLayout;
