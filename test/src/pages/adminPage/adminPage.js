import React, { useState, useCallback,useEffect } from "react";
import AdminSidebar from "../../components/adminSideBar/adminSideBar";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import 'ag-grid-enterprise';
import { Grid, Typography, Button, TextField } from "@mui/material";

import localStorage from "local-storage";
function AdminPage() {
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
  return (
    <Grid container>
      <Grid item md={isOpen ? 2.3 : 0.7}>
        <AdminSidebar
          status={isOpen}
          toggleSidebar={toggleSidebar}
          location={"homePage"}
        />
      </Grid>
      <Grid
        item
        md={isOpen ? 9.7 : 11.3}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "column",
          pr: "4vh",
          gap: 1,
        }}
      >
        <Grid
          md={12}
          className="grid-area"
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection:"column",
            background: "linear-gradient(135deg, #8a84e2, #84fab0)",
          }}
        >
          <Grid item md={12} sx={{display:"flex",justifyContent:"center"}}><Typography variant="h4" color={"#E0E0E"}>
            Kontrol Merkezi
          </Typography></Grid>
          
          {/* Üst kısımdaki istatistik kartları */}
          <Grid
          item md={12}
            style={{
              display: "flex",
              justifyContent:"space-around",
              position:"relative",
              top:"55%"
            }}
          >
            <StatCard
              title="Aktif Kullanıcı"
              value="350,897"
              change="+3.48% since last month"
              color="#ff6b6b"
            />
            <StatCard
              title="Aktif Senkronizasyon"
              value="2,356"
              change="-3.84% since last week"
              color="#8b008b"
            />
            <StatCard
              title="Günlük Senkronizasyon Sayısı"
              value="924"
              change="-1.10% since yesterday"
              color="#fed330"
            />
            <StatCard
              title="Günlük Fatura Sayısı"
              value="49.65%"
              change="+12% since last month"
              color="#45aaf2"
            />
          </Grid>
        </Grid>
        <Grid md={12} sx={{display:"flex", flexDirection:"column",justifyContent: "center", 
    alignItems: "center", padding:"2vh",pt:"6%", mb:"2%"}} className="grid-area">
            <Typography variant="h2">İçerik alanı</Typography>
            <Typography variant="h2">-</Typography>
            <Typography variant="h2">--</Typography>
            <Typography variant="h2">---</Typography>
            <Typography variant="h2">----</Typography>
            <Typography variant="h2">-----</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
const StatCard = ({ title, value, change, color }) => (
  <div
    style={{
      background: "white",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      borderTop: `4px solid ${color}`,
    }}
  >
    <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>{title}</h3>
    <p style={{ fontSize: "24px", fontWeight: "bold", margin: "0 0 5px 0" }}>
      {value}
    </p>
    <small style={{ color: "#666" }}>{change}</small>
  </div>
);
export default AdminPage;
