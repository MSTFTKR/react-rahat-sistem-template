/** @format */

import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Collapse,
} from "@mui/material";
import { keyframes } from "@emotion/react";
import { motion } from "framer-motion";
import {
  Settings,
  Shield,
  BarChart,
  Plus,
  Minus,
  Send,
  RefreshCcw,
} from "lucide-react";
import { FileInvoice } from "tabler-icons-react";
import { useLocation, useNavigate } from "react-router-dom";

// Animasyon tanımı
const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

// Hareketli daireler için stil
const animatedCircle = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0); }
`;

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "15px",
        transition: "0.3s",
        zIndex: 100,
        "&:hover": {
          animation: `${float} 3s ease-in-out infinite`,
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <Icon size={48} color="#70e000" />
        </Box>
        <Typography variant="h5" component="div" gutterBottom align="center">
          {title}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ fontSize: "18px" }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  </motion.div>
);

const FaqItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        mb: 2,
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        border: "1px solid #e0e0e0",
        transition: "box-shadow 0.3s, border-color 0.3s",
        "&:hover": {
          boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
          borderColor: "#d0d0d0",
        },
      }}
    >
      <Button
        onClick={() => setOpen(!open)}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 20px",
          background: "#f9f9f9",
          border: "none",
          borderBottom: "1px solid #e0e0e0",
          textAlign: "left",
          fontWeight: "500",
          fontSize: "16px",
          color: "#333",
          cursor: "pointer",
          transition: "background 0.3s, color 0.3s",
          "&:hover": {
            background: "#f0f0f0",
            color: "#000",
          },
          "&:focus": {
            outline: "none",
          },
        }}
      >
        <Box sx={{ flexGrow: 1 }}>{question}</Box>
        {open ? (
          <Minus size={20} color="#007BFF" />
        ) : (
          <Plus size={20} color="#007BFF" />
        )}
      </Button>
      <Collapse
        in={open}
        timeout="auto"
        sx={{ transition: "opacity 0.3s ease" }}
      >
        <Box sx={{ padding: "16px 20px", background: "#fafafa" }}>
          <Typography variant="body1" sx={{ color: "#555" }}>
            {answer}
          </Typography>
        </Box>
      </Collapse>
    </Box>
  );
};

const LandingPage = () => {
  const [circles, setCircles] = useState([]);
  const arcadeDemoRef = useRef(null);
  let navigate = useNavigate();
  let navigatee = useLocation();
  useEffect(() => {
    const numCircles = 15; // Görünümde kaç daire olacağını ayarlayın
    const newCircles = [];
    for (let i = 0; i < numCircles; i++) {
      newCircles.push({
        top: `${Math.random() * 100}vh`,
        left: `${Math.random() * 100}vw`,
        size: `${Math.random() * 30 + 20}px`, // Daire boyutu
        animationDelay: `${Math.random() * 5}s`, // Animasyon gecikmesi
        zIndex: 10,
      });
    }
    setCircles(newCircles);
  }, []);

  // "Denemek İçin Tıkla" butonu için scroll işlevi
  const scrollToDemoSection = () => {
    if (arcadeDemoRef.current) {
      arcadeDemoRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(to right, #0704a5, #2575fc)",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Hareketli daireler */}
        {circles.map((circle, index) => (
          <Box
            key={index}
            sx={{
              position: "absolute",
              top: circle.top,
              left: circle.left,
              width: circle.size,
              height: circle.size,
              zIndex: 0,
              display: "flex", // Simgeyi ortalamak için
              alignItems: "center",
              justifyContent: "center",
              opacity: 0.6,
              animation: `${animatedCircle} 6s ease-in-out ${circle.animationDelay} infinite`,
            }}
          >
            <FileInvoice size={circle.size} color="#fff" /> {/* Fatura iconu */}
          </Box>
        ))}

        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            marginTop: { xs: "20%", md: "2px" },
            marginBottom: { xs: 5, md: "2px" },
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "0 20px",
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Box sx={{ flex: 1, textAlign: "left" }}>
              <Typography
                variant="body2"
                sx={{
                  display: "inline-block",
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                  padding: "5px 10px",
                  borderRadius: "20px",
                  marginBottom: "20px",
                }}
              >
                RAHAT AKTARIM KULLANIN RAHATINIZA BAKIN
              </Typography>

              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "2rem", md: "3rem" },
                }}
              >
                Rahat Aktarım ile Evrak Toplamayı Bırakın.
              </Typography>
              <Typography
                variant="h3"
                gutterBottom
                sx={{
                  fontWeight: "400",
                  fontSize: { xs: "1rem", md: "2rem" },
                }}
              >
                {
                  <>
                    Belgelerinizi kolay bir şekilde genel muhasebe programına
                    aktarın.<br></br>
                    Zaman kazanın.
                  </>
                }
              </Typography>
              <Button
                component={motion.div} // Motion özelliklerini butona ekliyoruz
                animate={{ scale: [1, 1.05, 1] }} // Butonun büyüyüp küçülme animasyonu
                transition={{ duration: 1.5, repeat: Infinity }} // Sürekli tekrar eden animasyon
                variant="contained"
                size="large"
                onClick={scrollToDemoSection} // Butona tıklama işlevi
                sx={{
                  mt: 2,
                  borderRadius: "24px",
                  bgcolor: "#ffd700",
                  color: "rgba(0, 0, 0, 0.8)", // Yarı transparan siyah renk
                  "&:hover": {
                    bgcolor: "#e6c200",
                  },
                  fontWeight: "bold",
                }}
              >
                Denemek İçin Tıkla
              </Button>
            </Box>

            <Box
              sx={{
                flex: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "right",
                alignItems: "center",
                animation: `${float} 3s ease-in-out infinite`,
              }}
            >
              <img
                src="/images/login-bg.png"
                alt="Heros Pages"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </Box>
          </Box>

          <Button
            variant="contained"
            size="medium"
            sx={{
              position: "absolute",
              textTransform: "none", // Sadece istediğiniz harflerin büyük olmasını sağlar
              zIndex: 1000,
              top: "30px",
              right: "140px",
              bgcolor: "#ffff",
              borderRadius: "24px",
              color: "#041737",
              "&:hover": {
                bgcolor: "#041737",
                color: "#ffff",
              },
            }}
            onClick={() => {
              console.log("Giriş Yap");
              navigate("/homepage");
              //   window.location.href = "https://muhasebe.rahataktarim.com/login";
            }}
          >
            Giriş Yap
          </Button>
          <Button
            variant="contained"
            size="medium"
            component={motion.div} // Motion özelliklerini butona ekliyoruz
            animate={{ scale: [1, 1.05, 1] }} // Butonun büyüyüp küçülme animasyonu
            transition={{ duration: 1.5, repeat: Infinity }} // Sürekli tekrar eden animasyon
            sx={{
              position: "absolute",
              textTransform: "none", // Sadece istediğiniz harflerin büyük olmasını sağlar

              top: "30px",
              right: "50px",
              bgcolor: "#092a64",
              borderRadius: "24px",
              color: "#ffff",
              "&:hover": {
                bgcolor: "#ffff",
                color: "#041737",
              },
            }}
            onClick={() =>
              (window.location.href =
                "https://muhasebe.rahataktarim.com/register")
            }
          >
            Kayıt Ol
          </Button>
        </Grid>

        {/* Banner Kart  */}
        <Grid
          container
          spacing={3}
          sx={{
            justifyContent: "center",
            marginBottom: "3%",
            zIndex: 100,
          }}
        >
          <Grid item xs={11} md={3}>
            <FeatureCard
              icon={Settings}
              title="Bilgileri Gir"
              description="Gerekli tüm bilgileri doğru ve eksiksiz bir şekilde sisteme girip ayarlamaları yapın."
            />
          </Grid>

          <Grid item xs={11} md={3}>
            <FeatureCard
              icon={RefreshCcw}
              title="Senkronize Et"
              description="Seçilen tarih aralığındaki faturalarınızı tek tıkla sistemle senkronize edin."
            />
          </Grid>

          <Grid item xs={11} md={3}>
            <FeatureCard
              icon={Send}
              title="Fişleri Aktar"
              description="Belgelerinizi vakit harcamadan tek tıkla genel muhasebe programınıza aktarın."
            />
          </Grid>
        </Grid>
      </Grid>

      {/* Content Section */}
      <Grid container spacing={4} sx={{ mt: 0 }}>
        {/* ARCADE - DEMO Section */}
        <Grid
          container
          spacing={2}
          ref={arcadeDemoRef} // Arcade demo alanına referans
          sx={{ height: "100vh", marginBottom: "5px" }}
        >
          <Grid item xs={12}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                background: "linear-gradient(to right, #0704a5, #2575fc)",
              }}
            >
              <iframe
                src="https://demo.arcade.software/ivJORFs70fFRRayxO6Mn?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true"
                title="Arcade Demo"
                style={{
                  width: "90%",
                  height: "90%",
                  border: "none",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
      {/* Content Section */}
      <Grid
        container
        spacing={0.8}
        sx={{
          pb: 4,
          background: "linear-gradient(to right, #0704a5, #2575fc)",
          justifyContent: "center",
        }}
      >
        <Grid
          item
          xs={12} // Butonun tam genişlikte yer kaplamasını sağlıyor
          display="flex" // Flexbox ile düzenleme
          justifyContent="center" // Yatayda ortalama
          alignItems="center" // Dikeyde ortalama (gerekirse)
        >
          <Button
            component={motion.div} // Motion özelliklerini butona ekliyoruz
            animate={{ scale: [1, 1.05, 1] }} // Butonun büyüyüp küçülme animasyonu
            transition={{ duration: 1.5, repeat: Infinity }} // Sürekli tekrar eden animasyon
            variant="contained"
            size="large"
            sx={{
              width: "300px", // Butonun genişliğini artırıyoruz
              height: "70px", // Butonun yüksekliğini artırıyoruz
              mt: 2,
              borderRadius: "24px",
              backgroundImage:
                "linear-gradient(to right, #2165da,#2421b9,#2421b4  )",
              color: "#fff",
              "&:hover": {
                bgcolor: "#13518a",
              },
              fontWeight: "bold",
              fontSize: "18px", // Buton yazı boyutunu da artırıyoruz
            }}
            onClick={() =>
              (window.location.href =
                "https://muhasebe.rahataktarim.com/register")
            }
          >
            Kayıt Olmak İçin Tıkla !
          </Button>
        </Grid>
        <Grid item>
          <Grid
            container
            spacing={3}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "3%",
              marginTop: { xs: "10px", md: "0" },
            }}
          >
            {/* Features Section */}
            <Grid item xs={10} md={3}>
              <FeatureCard
                icon={Settings}
                title="Kolay Kullanım"
                description="Kullanıcı dostu arayüz ile fatura işlemlerinizi hızlı ve basit bir şekilde yönetin."
              />
            </Grid>

            <Grid item xs={10} md={3}>
              <FeatureCard
                icon={Shield}
                title="Yüksek Güvenlik"
                description="Verilerinizin güvenliğini ön planda tutarak, sizi ve verilerinizi korumaktayız."
              />
            </Grid>

            <Grid item xs={10} md={3}>
              <FeatureCard
                icon={BarChart}
                title="Raporlama ve Analiz"
                description="Detaylı raporlama ve analiz araçları ile finansal işlemlerinizi etkili bir şekilde yönetin."
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* FAQ Section */}
      <Grid
        container
        spacing={4}
        sx={{
          mt: 6,
          alignItems: "center",
          marginLeft: { xs: "10px", md: "30px" },
        }}
      >
        <Grid item xs={11} md={6} sx={{ paddingRight: { md: "60px" } }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{ mb: 4, textAlign: "center" }}
          >
            Sıkça Sorulan Sorular
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <FaqItem
                question="Rahat Aktarım kullanmanın avantajları nelerdir?"
                answer="Rahat Aktarım, faturalarınızı otomatik olarak senkronize etmenize olanak sağlayan ve bu faturaları muhasebe programınıza aktarmanızı kolaylaştırarak size zamandan tasarruf imkanı sağlar. İş yükünüzü %90 azaltır. Site içersinde ki raporlama alanları ile hesap yönetimi ve kontrollerinizde size kolaylık sağlar."
              />
            </Grid>
            <Grid item xs={12}>
              <FaqItem
                question="Rahat Aktarım nasıl çalışır?"
                answer="Rahat Aktarım, portallardan belgelerinizi çekerek muhasebe fişine çevirir."
              />
            </Grid>
            <Grid item xs={12}>
              <FaqItem
                question="Verilerim güvende mi?"
                answer="Evet, tüm verileriniz güçlü güvenlik önlemleriyle korunur ve şifrelenir."
              />
            </Grid>
            <Grid item xs={12}>
              <FaqItem
                question="Destek ekibi ile nasıl iletişime geçebilirim?"
                answer="Destek ekibimizle iletişime geçmek için web sitemizdeki iletişim formunu kullanabilirsiniz."
              />
            </Grid>
            <Grid item xs={12}>
              <FaqItem
                question="Ücretsiz deneme süresi var mı?"
                answer="E-Defter Saklama hizmeti alanlara, 2024 yılı ücretsizdir."
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50%",
              animation: `${float} 3s ease-in-out infinite`,
            }}
          >
            <img
              src="/images/about-img.png"
              alt="FAQ Illustration"
              style={{
                maxWidth: "50%",
                height: "auto",
              }}
            />
          </Box>
        </Grid>
      </Grid>
      {/* Footer Section */}
      <Grid item xs={12} sx={{ textAlign: "center", mt: 6 }}>
        <Typography variant="body2" color="textSecondary">
          © 2024 Rahat Aktarım Muhasebe. Tüm Hakları Saklıdır.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LandingPage;
