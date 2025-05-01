/** @format */
import React, { useState, useEffect, useRef } from "react";
import { Grid, Alert, Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const AnimatedAlerts = ({
  alerts = [],
  animateTimeout = 10000,
  maxVisible = 3,
  spacing = 2,
}) => {
  const [visibleAlerts, setVisibleAlerts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);
  const hoverStates = useRef({});

  useEffect(() => {
    if (!alerts || alerts.length === 0) return;

    const normalizedAlerts = alerts
      .map((alert, index) => {
        if (typeof alert === "string") {
          return { id: `auto-${index}`, type: "info", content: alert };
        } else if (typeof alert === "object") {
          return {
            id: alert.id || `auto-${index}`,
            type: alert.type || "info",
            content: alert.content || "",
            duration: alert.duration || animateTimeout, // Varsayılan animateTimeout
          };
        }
        return null;
      })
      .filter((alert) => alert !== null && alert.content);

    setVisibleAlerts(normalizedAlerts.slice(0, maxVisible));
    setCurrentIndex(0); // Başlangıçta sıfırdan başla

    if (normalizedAlerts.length > maxVisible) {
      startRotation(normalizedAlerts);
    }

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [alerts, maxVisible, animateTimeout]);

  const startRotation = (allAlerts) => {
    clearTimeout(timeoutRef.current);

    let index = 0;

    const rotateAlerts = () => {
      if (Object.values(hoverStates.current).some((state) => state)) {
        timeoutRef.current = setTimeout(rotateAlerts, 100);
        return;
      }

      index = (index + 1) % allAlerts.length;
      setVisibleAlerts([allAlerts[index]]);
      setCurrentIndex(index);

      const nextDuration = allAlerts[index]?.duration || animateTimeout;
      timeoutRef.current = setTimeout(rotateAlerts, nextDuration);
    };

    // İlk alert'i ayarla
    setVisibleAlerts([allAlerts[0]]);
    setCurrentIndex(0);
    timeoutRef.current = setTimeout(
      rotateAlerts,
      allAlerts[0]?.duration || animateTimeout
    );
  };

  const handleMouseEnter = (alertId) => {
    hoverStates.current[alertId] = true;
  };

  const handleMouseLeave = (alertId, allAlerts) => {
    hoverStates.current[alertId] = false;
    if (
      !Object.values(hoverStates.current).some((state) => state) &&
      alerts.length > maxVisible
    ) {
      clearTimeout(timeoutRef.current);
      startRotation(
        alerts.map((alert, index) => ({
          id: alert.id || `auto-${index}`,
          type: alert.type || "info",
          content: alert.content || "",
          duration: alert.duration || animateTimeout,
        }))
      );
    }
  };

  const renderAlert = (alert, index) => {
    const borderColors = {
      info: "#041737",
      warning: "#ef7918",
      error: "#d32f2f",
      success: "#2e7d32",
    };

    return (
      <Box
        key={alert.id}
        sx={{ marginBottom: 1 }}
        onMouseEnter={() => handleMouseEnter(alert.id)}
        onMouseLeave={() => handleMouseLeave(alert.id, alerts)}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Alert
            severity={alert.type}
            sx={{
              borderRadius: "8px",
              border: `1px solid ${borderColors[alert.type] || "#041737"}`,
              transition: "all 0.3s ease-in-out",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              "&:hover": {
                boxShadow: "0 4px 15px rgba(0,0,0,0.12)",
                transform: "translateY(-2px)",
              },
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: alert.content }} />
          </Alert>
        </motion.div>
      </Box>
    );
  };

  return (
    <Grid item md={12} sx={{ width: "100%" }}>
      <Box sx={{ position: "relative" }}>
        {visibleAlerts.map((alert, index) => (
          <AnimatePresence key={`container-${alert.id}`} mode="wait">
            {renderAlert(alert, index)}
          </AnimatePresence>
        ))}
      </Box>
    </Grid>
  );
};

const AnimatedAlertsWrapper = ({
  infoText,
  warningText,
  errorText,
  alerts = [],
  ...otherProps
}) => {
  const allAlerts = [...alerts];
  if (infoText) {
    allAlerts.push({ type: "info", content: infoText, id: "legacy-info" });
  }
  if (warningText) {
    allAlerts.push({
      type: "warning",
      content: warningText,
      id: "legacy-warning",
    });
  }
  if (errorText) {
    allAlerts.push({ type: "error", content: errorText, id: "legacy-error" });
  }

  return <AnimatedAlerts alerts={allAlerts} {...otherProps} />;
};

export default AnimatedAlertsWrapper;
