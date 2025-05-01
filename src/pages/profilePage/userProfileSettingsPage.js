import React from "react";
import { Button, TextField, Grid, Divider } from "@mui/material";

const UserProfileSettingsPage = ({ userInfo }) => {
  return (
    <Grid
      container
      item
      md={12}
      className="grid-area"
      justifyContent={"space-between"}
      sx={{ gap: 2 }}
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
            defaultValue={userInfo.name}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            className="input-field"
            label="Soyad"
            variant="outlined"
            defaultValue={userInfo.surname}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            className="input-field"
            label="Email"
            variant="outlined"
            defaultValue={userInfo.email}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            className="input-field"
            label="Görevi"
            variant="outlined"
            defaultValue={userInfo.organization}
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
            defaultValue={userInfo.number}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            label="Adres"
            className="input-field"
            variant="outlined"
            defaultValue={userInfo.address}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            label="Konum"
            variant="outlined"
            className="input-field"
            defaultValue={userInfo.state}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            label="Posta Kodu"
            variant="outlined"
            className="input-field"
            defaultValue={userInfo.zipCode}
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

export default UserProfileSettingsPage;
