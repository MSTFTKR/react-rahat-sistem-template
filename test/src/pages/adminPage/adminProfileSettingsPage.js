import React from "react";
import { Button, TextField, Grid, Divider } from "@mui/material";

const AdminProfileSettingsPage = ({ adminInfo }) => {
  return (
    <Grid
      container
      item
      md={12}
      className="grid-area"
      justifyContent={"space-between"}
    >
      <Grid
        item
        xs={12}
        md={5.5}
        sx={{ display: "flex", gap: 2, flexDirection: "column" }}
      >
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            className="input-field"
            label="Ad"
            variant="outlined"
            defaultValue={adminInfo.name}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            className="input-field"
            label="Soyad"
            variant="outlined"
            defaultValue={adminInfo.surname}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            className="input-field"
            label="Email"
            variant="outlined"
            defaultValue={adminInfo.email}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            className="input-field"
            label="Görevi"
            variant="outlined"
            defaultValue={adminInfo.organization}
          />
        </Grid>
      </Grid>
      <Divider
        orientation="vertical"
        flexItem
        sx={{ display: { xs: "none", md: "block" } }}
      />
      <Grid
        item
        xs={12}
        md={5.5}
        sx={{ display: "flex", gap: 2, flexDirection: "column" }}
      >
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            className="input-field"
            label="Telefon Numarası"
            variant="outlined"
            defaultValue={adminInfo.number}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            label="Adres"
            className="input-field"
            variant="outlined"
            defaultValue={adminInfo.address}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            label="Konum"
            variant="outlined"
            className="input-field"
            defaultValue={adminInfo.state}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            label="Posta Kodu"
            variant="outlined"
            className="input-field"
            defaultValue={adminInfo.zipCode}
          />
        </Grid>
      </Grid>

      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          mt: "3vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid md={3}>
          <Button variant="contained" color="primary" className="custom-button">
            Değişiklikleri Kaydet
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminProfileSettingsPage;
