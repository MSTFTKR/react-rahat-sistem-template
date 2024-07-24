import React, {  useState } from "react";
import {
  Grid,
  Button,
  Typography,
  Checkbox,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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

        <Grid
          item
          md={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Typography variant="h5">Kayıt Ol</Typography>
          <Typography>
            Lütfen gerekli bilgileri doğru ve eksiksiz doldurunuz.
          </Typography>
        </Grid>
        <Grid item md={12} sx={{ width: "100vh" }}>
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
        </Grid>
        <Grid item md={12} sx={{ width: "100vh" }}>
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
          sx={{ display: "flex", alignItems: "center", width: "100vh" }}
        >
          <Checkbox
            checked={agree}
            className="default-checked"
            onChange={(e) => setAgree(e.target.checked)}
          />
          <Button
            // onClick={}
            className="unframed-button"
            sx={{ color: "#786af2", textDecoration: "none" }}
          >
            Gizlilik Politikası ve Şartlarını
          </Button>
          <Typography fontSize={14}>Kabul Ediyorum</Typography>
        </Grid>

        <Grid item md={12} sx={{ width: "100%" }}>
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
          }}
        >
          <Typography variant="body2">Zaten bir hesabınız var mı? </Typography>

          <Button
            variant="body2"
            onClick={() => {
              navigate("/login");
            }}
            className="unframed-button "
            sx={{ color: "#786af2", textDecoration: "none" }}
          >
            Giriş yap
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Register;
