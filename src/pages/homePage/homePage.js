import { useState, useEffect } from "react";

import {
  Grid,
  Button,
  Alert,
  Card,
  CardMedia,
  Typography,
  CardContent,
  Divider,
} from "@mui/material";
import images1 from "../../assets/images/images1.jpg";
import images2 from "../../assets/images/images2.jpg";
import images3 from "../../assets/images/images3.png";

function HomePage() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  const companies = [
    { name: "SİSTEM TEST 1", id: "1234567802", image: images1 },
    { name: "SİSTEM TEST 2", id: "1234234232", image: images2 },
    { name: "SİSTEM TEST 3", id: "1232345687", image: images3 },
  ];

  return (
    <Grid container sx={{ width: "100%" }}>
      <Grid
        item
        xs={11.5}
        sm={12}
        sx={{ display: "flex", alignItems: "center", gap: 2 }}
      >
        <Typography variant="h6">Kontrol Paneli</Typography>
        <Divider
          orientation="vertical"
          flexItem
          sm={{ height: "5vh", my: 2 }}
        />

        <Typography variant="subtitle1">Firmalar</Typography>
      </Grid>

      <Grid item xs={11.5} sm={12}>
        <Alert
          severity="info"
          sx={{
            mb: 1,
            borderRadius: "12px",
            border: "1px solid #1232e4",
          }}
        >
          Lütfen bağlanmak istediğiniz firmayı seçiniz.
        </Alert>
      </Grid>
      <Grid
        item
        xs={11.5}
        sm={12}
        sx={{ display: "flex", gap: 1, justifyContent: "space-between" }}
      >
        {companies.map((company, index) => (
          <Grid
            item
            xs={3.8}
            sm={4}
            key={index}
            sx={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
          >
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={company.image}
                alt={company.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {company.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {company.id}
                </Typography>
              </CardContent>
              <Grid container sx={{ p: 2 }}>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    // onClick={handleOpenModal}
                  >
                    Bağlan
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default HomePage;
