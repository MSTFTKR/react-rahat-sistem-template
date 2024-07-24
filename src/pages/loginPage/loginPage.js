import React, { useEffect, useState } from "react";
import { cookies } from "../../utils/cookie";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import {
  Grid,
  Button,
  Checkbox,
  Typography,
  InputAdornment,
  IconButton,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {login} from "../../api/auth/login/index"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (event) => {
    login(email, password)
    .then((resp) => {
        cookies.set("jwt-access", resp.data.tokens.access.token);

        cookies.set(
            "jwt-access-expires",
            resp.data.tokens.access.expires
        );
        cookies.set("jwt-refresh", resp.data.tokens.refresh.token);

        cookies.set(
            "jwt-refresh-expires",
            resp.data.tokens.refresh.expires
        );
        const decodedToken = jwtDecode(resp.data.tokens.access.token);
        const role = decodedToken.role;
        if (role === "user") {
            navigate("/homepage");
        } else if (role === "admin") {
            navigate("/admin");
        }
    })
    .catch((err) => {
        Swal.fire({
            title: err.response.data.message,
            icon: "error",
            confirmButtonText: "Tamam",
        });
    });
  };

  return (
    <Grid
      container
      sx={{
        height: "100vh",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "5vh",
      }}
      md={12}
      spacing={2}
    >
      <Grid
        item
        md={8.5}
        sm={8.5}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {" "}
        <Grid
          component="img"
          sx={{
            width: "80vh", // Genişliği %100 yaparak gridin tamamını kaplar
            height: "80vh", // Yüksekliği otomatik yaparak orijinal oranları korur
          }}
          alt="My Image"
          src={`/images/login-pages.png`} // public klasöründen çağırma
        />
      </Grid>

      <Grid
        item
        md={3.5}
        sm={3.5}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20vh",
          marginBottom: "20vh",
          backgroundColor: "#ffffff",
          padding: "2vh",
        }}
      >
        {/* Sağ taraftaki giriş formu */}

        <Grid item md={12}>
          <Typography variant="h4">Rahat ... Hoşgeldiniz</Typography>
          <Typography variant="body1" color="textSecondary">
            Lütfen hesabınızda oturum açın ve "RAHAT"ınıza bakın :)
          </Typography>
        </Grid>
        <Grid
          item
          md={12}
          sx={{
            backgroundColor: "#e8e7fd",
            height: "100vh",
            width: "100vh",
            padding: "1.3vh",
            borderRadius: "5px",
          }}
        >
          <Typography variant="body2" color="#786af2" height={"100"}>
            Email: admin@rahat.com / Pass: admin
          </Typography>
        </Grid>

        <Grid item md={12} sx={{ width: "100vh" }}>
          <TextField
            className="input-field"
            fullWidth
            label="Email"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Grid>
        <Grid item md={12} sx={{ width: "100vh" }}>
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
                    {showPassword ? (
                      <Visibility
                        fontSize="inherit"
                        style={{ fontSize: "1rem" }}
                      />
                    ) : (
                      <VisibilityOff
                        fontSize="inherit"
                        style={{ fontSize: "1rem" }}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid
          item
          md={12}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Grid
            item
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "flex-start",
            }}
          >
            <Checkbox
              checked={rememberMe}
              className="default-checked"
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <Typography variant="body2">Beni Hatırla</Typography>
          </Grid>
          <Grid
            item
            md={6}
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            <Button
              onClick={() => navigate("/forgot-password")}
              className="unframed-button"
              sx={{ color: "#786af2", textDecoration: "none" }}
            >
              Şifreni mi unuttun?
            </Button>
          </Grid>
        </Grid>
        <Grid item md={12} sx={{ width: "100%" }}>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            type="submit"
            onClick={handleLogin}
            className="custom-button"
            // Inline styles for background color and width
          >
            Giriş
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
          }}
        >
          <Typography variant="body2">Henüz kaydınız yok mu? </Typography>

          <Button
            variant="body2"
            onClick={() => {
              navigate("/register");
            }}
            className="unframed-button "
            sx={{ color: "#786af2", textDecoration: "none" }}
          >
            Kayıt ol
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
