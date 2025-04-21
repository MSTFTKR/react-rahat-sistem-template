import React, { useEffect, useRef, useState } from "react";
import { cookies } from "../../utils/cookie";
import { jwtDecode } from "jwt-decode";
import localStorage from "local-storage";
import Swal from "sweetalert2";
import {
  Grid,
  Button,
  Checkbox,
  Typography,
  InputAdornment,
  IconButton,
  TextField,
  Box,
  CircularProgress,
  FormControlLabel,
} from "@mui/material";
import smallLogo from "../../assets/images/rahatsistem-logo.png";
import { useNavigate } from "react-router-dom";
import {
  AccountCircle,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { login } from "../../api/auth/login/index";
import { emailFormatControl } from "../../utils/emailFormatControl";

const Login = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const [helperEmailText, setHelperEmailText] = useState("");
  const [helperText, setHelperText] = useState("");
  const [error, setError] = useState(false);

  const loginButtonRef = useRef(null); //TODO ENTER KOMUTU İÇİN

  useEffect(() => {
    const rememberMe = localStorage.get("rememberMe");
    if (rememberMe) {
      setRememberMe(true);
      setEmail(rememberMe);
    }
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        loginButtonRef.current.click();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleLogin = (event) => {
    login(email, password)
      .then((resp) => {
        cookies.set("jwt-access", resp.data.tokens.access.token);

        cookies.set("jwt-access-expires", resp.data.tokens.access.expires);
        cookies.set("jwt-refresh", resp.data.tokens.refresh.token);

        cookies.set("jwt-refresh-expires", resp.data.tokens.refresh.expires);
        const decodedToken = jwtDecode(resp.data.tokens.access.token);
        const role = decodedToken.role;
        if (role === "user") {
          navigate("/homepage");
        } else if (role === "admin") {
          navigate("/homepage");
          // navigate("/admin");
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
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: {
          xs: "center",
          sm: "space-between",
        },
      }}
      md={12}
    >
      <Grid
        item
        md={7}
        xs={0}
        sx={{
          display: {
            xs: "none",
            sm: "flex",
          },
          justifyContent: "center",
          backgroundColor: "#041737",
        }}
      >
        <Grid
          component="img"
          sx={{
            backgroundSize: "cover", // Resmin kapsama alanını belirtir
            backgroundPosition: "center", // Resmin konumunu belirtir
            backgroundRepeat: "no-repeat", // Resmin tekrarını belirtir
            width: "100%", // Genişliği %100 yaparak gridin tamamını kaplar
            height: "100vh", // Yüksekliği otomatik yaparak orijinal oranları korur
          }}
          alt="My Image"
          src={`/images/login-pages.png`} // public klasöründen çağırma
        />
      </Grid>

      <Grid
        container
        md={4.8}
        xs={11}
        sx={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          borderRadius: "4px",
          marginRight: {
            xs: "0px",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: 100,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={smallLogo}
            alt="Logo"
            style={{ width: "100px", height: "100%" }}
          />
        </Box>
        <Grid
          item
          md={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h4" sx={{ display: "flex" }}>
            Rahat template
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Oturum açın ve "RAHAT"ınıza bakın.
          </Typography>
        </Grid>

        <Grid
          item
          md={6}
          sx={{
            width: "95%",
            backgroundColor: "white",
            borderRadius: "10px",
            p: 2,
            pb: 0,
            mb: "0px !important",
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            label="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setHelperEmailText("");
            }}
            error={
              (error && email.length === 0) || helperEmailText.length !== 0
            }
            helperText={
              error && email.length === 0
                ? `${helperText}`
                : error && email.length !== 0
                ? `${helperEmailText}`
                : ""
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
            }}
          />
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            label="Şifre"
            type={showPassword ? "text" : "password"}
            value={password}
            error={error && password.length === 0}
            helperText={error && password.length === 0 ? `${helperText}` : ""}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
            }}
          />
        </Grid>
        <Grid
          item
          md={9.1}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Grid
            item
            md={6}
            sx={{
              pr: 3,
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  className="default-checked"
                  onChange={(e) => setRememberMe(e.target.checked)}
                  label
                />
              }
              label="Beni Hatırla"
            />
          </Grid>
          <Grid
            item
            md={6}
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-start",
            }}
          >
            <Button
              variant="body2"
              onClick={() => navigate("/forgot-password")}
              className="unframed-button"
            >
              Şifreni mi unuttun?
            </Button>
          </Grid>
        </Grid>
        <Grid item md={5} sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            ref={loginButtonRef}
            onClick={handleLogin}
            className={isLoading ? "" : "custom-button"}
            disabled={isLoading}
            sx={{
              backgroundColor: "#3f51b5",
              textTransform: "none",
              color: "#fff",
              padding: "8px",
              borderRadius: "30px",
              "&:hover": {
                backgroundColor: "#303f9f",
              },
              display: "flex",
              alignItems: "center",
              width: "80%",
            }}
            // Inline styles for background color and width
          >
            Giriş
            {isLoading && (
              <CircularProgress
                size={17}
                sx={{
                  color: "#fff",
                  marginLeft: 2, // Spinner'ı giriş yazısının yanına hizalar
                }}
              />
            )}
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
            className="unframed-button"
          >
            Kayıt ol
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
