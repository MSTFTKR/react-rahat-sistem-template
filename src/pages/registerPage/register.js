import React, { useState } from "react";
import {
  Grid,
  Button,
  Typography,
  Checkbox,
  TextField,
  InputAdornment,
  IconButton,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import smallLogo from "../../assets/images/rahatsistem-logo.png";
const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const navigate = useNavigate();
  const [agree, setAgree] = useState(false);

  return (
    <Grid
      container
      sx={{
        height: "100vh",
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: {
          xs: "center",
          sm: "space-between",
        },
      }}
      xs={12}
    >
      <Grid
        item
        xs={0}
        md={7}
        sx={{
          height: "100vh",
          display: {
            xs: "none",
            md: "flex",
          },
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#dbb697",
        }}
      >
        <Grid
          component="img"
          sx={{
            backgroundSize: "cover", // Resmin kapsama alanını belirtir
            backgroundPosition: "center", // Resmin konumunu belirtir
            backgroundRepeat: "no-repeat", // Resmin tekrarını belirtir
            width: "100%", // Genişliği %100 yaparak gridin tamamını kaplar
            height: "80vh", // Yüksekliği otomatik yaparak orijinal oranları korur
          }}
          alt="My Image"
          src={`/images/login-pages.png`} // public klasöründen çağırma
        />
      </Grid>

      <Grid
        container
        md={5}
        xs={12}
        sx={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",

          borderRadius: "4px",
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={smallLogo}
            alt="Logo"
            style={{ width: "80px", height: "80px" }}
          />
        </Box>
        {/* Sağ taraftaki giriş formu */}
        <Grid
          item
          xs={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography variant="h5">Kayıt Ol</Typography>
          <Typography>
            Lütfen gerekli bilgileri doğru ve eksiksiz doldurunuz.
          </Typography>
        </Grid>
        <Grid
          item
          md={8}
          lg={7}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "80%",
            backgroundColor: "white",
            gap: 2,
          }}
        >
          <TextField
            className="input-field"
            fullWidth
            placeholder="Kullanıcı adı giriniz"
            label="Kullanıcı Adı"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            className="input-field"
            fullWidth
            placeholder="E-mail adresinizi giriniz"
            label="Email"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            fullWidth
            className="input-field" // CSS class'ını ekleyin
            label="Şifre"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid
          item
          xs={10}
          md={12}
          sx={{
            width: { xs: "100%", md: "80%" },
            pr: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Checkbox
            checked={agree}
            className="default-checked"
            onChange={(e) => setAgree(e.target.checked)}
          />
          <Button
            variant="text"
            sx={{
              fontSize: "0.875rem", // text-sm
              "&:hover": {
                backgroundColor: "transparent",
                boxShadow: "none",
              },
            }}
          >
            Gizlilik Politikası ve Şartlarını
          </Button>
          <Typography fontSize={14}>Kabul Ediyorum</Typography>
        </Grid>

        <Grid item xs={5} sx={{ width: "100%" }}>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            type="submit"
            className="custom-button"
            // onClick={handleSubmit}
          >
            Kayıt Ol
          </Button>
        </Grid>
        <Grid
          item
          md={12}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            gap: 2,
          }}
        >
          <Typography variant="body2">Zaten bir hesabınız var mı? </Typography>

          <Button
            variant="body2"
            onClick={() => {
              navigate("/login");
            }}
            sx={{ textDecoration: "none" }}
          >
            Giriş yap
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Register;
