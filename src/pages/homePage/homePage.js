import  { useState,useEffect } from "react";
import Sidebar from "../../components/sideBar/sideBar";
import Navbar from "../../components/navbar/navbar";
import localStorage from "local-storage";
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
import images1 from "../../assets/images/images1.jpg"
import images2 from "../../assets/images/images2.jpg"
import images3 from "../../assets/images/images3.png"

function HomePage() {
  const [isOpen, setIsOpen] = useState(false);



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
    <Grid container>
      <Grid item md={isOpen ? 2.3 : 0.7}>
        <Sidebar status={isOpen} toggleSidebar={toggleSidebar} location={'homePage'} />
      </Grid>
      <Grid
        item
        md={isOpen ? 9.7 : 11.3}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "column",
          pr:"4vh",gap:1
        }}
      >

        <Grid item md={12} >
          <Navbar />
        </Grid>
        <Grid item md={12} sx={{ marginRight: "4vh",display:"flex", flexDirection:"column",gap:1 }}>
          <Grid item md={12} sx={{ display: "flex", alignItems: "center", gap:2 }}>
            <Typography variant="h6" >
              Kontrol Paneli
            </Typography>
              <Divider
                orientation="vertical"
                flexItem
                md={{ height: '5vh', my: 2 }}
              />

            <Typography variant="subtitle1" >
              Firmalar
            </Typography>
          </Grid>

          <Grid item md={12}  >
            <Alert severity="info" sx={{marginBottom:"2vh", borderRadius:"2vh", border: '1px solid #1232e4'}}>
              Lütfen bağlanmak istediğiniz firmayı seçiniz.
            </Alert>
          </Grid>
          <Grid item md={12} sx={{display:"flex",gap:1,}}>
          {companies.map((company, index) => (
            <Grid item xs={4} sm={6} md={4} key={index}sx={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
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
                    <Button variant="contained" fullWidth color="success">
                      Bağlan
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}

          </Grid>
          
        </Grid>
      </Grid>
    </Grid>
  );
}

export default HomePage;
