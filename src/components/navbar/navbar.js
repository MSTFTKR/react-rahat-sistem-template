import { Grid, TextField, Button } from "@mui/material";
import { Search, MoonStars } from "tabler-icons-react";
import UserProfileDropdown from './profilMenu'
import AppsMenu from './appsMenu'

const Navbar = () => {
  

  return (
    <Grid container className="navbar">
      <Grid sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Button
          sx={{
            borderRadius: "50%", // Yuvarlak kenarlığını sağlar
            minWidth: 0, // İçeriğin genişliği kadar boyut ayarlar
            width: "3rem", // İsteğe bağlı olarak genişlik ayarlanabilir
            height: "3rem", // İsteğe bağlı olarak yükseklik ayarlanabilir
            padding: 0, // İçerikten boşluk kaldırır
            boxShadow: "none", // Gölgeyi kaldırır
            "&:hover": {
              backgroundColor: "rgba(126, 126, 126, 0.2)",
            },
          }}
        >
          <Search size={24} color="black" />
        </Button>

        <TextField
          sx={{ backgroundColor: "#ffffff" }}
          variant="standard"
          InputProps={{
            disableUnderline: true, // Çizgiyi kaldırmak için
            placeholder: "Ara...", // Placeholder metni
          }}
        />
      </Grid>
      <Grid sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
        >
          <MoonStars color="black" />
        </Button>
        <AppsMenu/>
        <UserProfileDropdown title={'Mustafa Teker'} email={'mstftkr@gmail.com'}/>
      </Grid>
    </Grid>
  );
};

export default Navbar;
