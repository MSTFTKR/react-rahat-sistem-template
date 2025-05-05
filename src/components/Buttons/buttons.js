import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Typography,
  Box,
  ButtonBase,
  CircularProgress,
} from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";

/**
 * MenuButton component that displays a button with a dropdown menu
 *
 * @param {Object} props
 * @param {string} props.label - Button label text
 * @param {Array} props.menuItems - Array of menu items to display
 * @param {Function} props.onItemClick - Callback when menu item is clicked
 * @param {'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'} [props.color='primary'] - Button color
 * @param {'contained' | 'outlined' | 'text'} [props.variant='contained'] - Button variant
 * @param {string} [props.startIcon] - Icon component to display before button text
 * @param {Object} [props.sx] - Additional styling for the button
 */
export const MenuButton = ({
  label,
  menuItems = [],
  onItemClick,
  color = "primary",
  variant = "contained",
  startIcon,
  sx,
  ...props
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (item) => {
    if (onItemClick) {
      onItemClick(item);
    }
    handleClose();
  };

  return (
    <Box>
      <Button
        variant={variant}
        color={color}
        onClick={handleClick}
        endIcon={<KeyboardArrowDown />}
        startIcon={startIcon}
        aria-controls={open ? "menu-button" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={{
          position: "relative",
          borderRadius: "4px",
          textTransform: "none",
          fontSize: "0.875rem",
          fontWeight: 500,
          padding: "6px 14px",
          minWidth: "120px",
          boxShadow: variant === "contained" ? 2 : "none",
          "&:hover": {
            boxShadow: variant === "contained" ? 3 : "none",
          },
          ...sx,
        }}
        {...props}
      >
        {label}
      </Button>
      <Menu
        id="menu-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 0.5,
            borderRadius: "4px",
            minWidth: "180px",
            overflow: "visible",
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              left: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
      >
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => handleMenuItemClick(item)}
            sx={{
              "&:hover": {
                backgroundColor: `#e2e0fa`,
              },
            }}
          >
            {item.icon && (
              <Box
                component="span"
                sx={{ mr: 1, display: "flex", alignItems: "center" }}
              >
                {item.icon}
              </Box>
            )}
            <Typography variant="body2">{item.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
