import { Grid, TextField, Button } from "@mui/material";
import { Search, MoonStars } from "tabler-icons-react";
import UserProfileDropdown from "./profilMenu";
import AppsMenu from "./appsMenu";

const Navbar = () => {
  return (
    <Grid
      container
      className="navbar"
      xs={11.4}
      sm={12}
      sx={{ justifyContent: { sm: "space-between", xs: "center" } }}
    >
      <Grid
        item
        xs={12}
        sm={5}
        sx={{
          // backgroundColor: "#8400ff",

          display: "flex",
          paddingLeft: { xs: 0, sm: 2 },
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 1,
          order: { xs: 2, sm: 1 },
        }}
      >
        <Button
          sx={{
            borderRadius: "50%",
            width: "2.5rem",
            height: "2.5rem",
            minWidth: "2.5rem", // Varsayılan minimum genişliği sınırlar
            minHeight: "2.5rem", // Varsayılan minimum yüksekliği sınırlar
            padding: 0,
            boxShadow: "none",
            // backgroundColor: "#ff0000",
            overflow: "hidden", // Taşmayı engeller
            "&:hover": {
              backgroundColor: "rgba(126, 126, 126, 0.2)",
            },
          }}
          disableRipple
        >
          <Search size={20} color="black" />
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
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 1,
          order: { xs: 1, sm: 2 },
          // backgroundColor: "#ff0000",
        }}
      >
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
        <AppsMenu />
        <UserProfileDropdown
          title={"Mustafa Teker"}
          email={"mstftkrr@gmail.com"}
        />
      </Grid>
    </Grid>
  );
};

export default Navbar;
