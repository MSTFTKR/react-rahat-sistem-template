import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  Grid,
  Checkbox,
  IconButton,
} from "@mui/material";
import { logout } from "../../api/auth/logout";

import localStorage from "local-storage";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useNavigate, useLocation, Link } from "react-router-dom";
import largeLogo from "../../assets/images/by-rahatsistem-logo.png";
import smallLogo from "../../assets/images/rahatsistem-logo.png";

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {
  Home,
  Files,
  MessageCircle,
  ShoppingCart,
  Mail,
  Calendar,
  List as ListIcon,
  FileText as User,
  Key,
} from "tabler-icons-react";

const menuItems = [
  { text: "Anasayfa", icon: <Home size={22} />, path: "/homepage", badge: 7 },
  { text: "GridPage", icon: <Files size={22} />, path: "/user/gridPage" },
  { text: "Alt Programlar", header: true },
  {
    text: "Rahat Fatura",
    icon: <ShoppingCart size={22} />,
    subItems: [
      {
        text: "paneladmin",
        icon: <ShoppingCart size={22} />,
        path: "/panel/admin",
      },
      { text: "Add", icon: <ShoppingCart size={22} /> },
      {
        text: "Category",
        icon: <ShoppingCart size={22} />,
      },
    ],
  },
  {
    text: "Rahat Dinle",
    icon: <Mail size={22} />,
    subItems: [
      { text: "Page1", icon: <Mail size={22} />, path: "/products/list" },
      { text: "Page2", icon: <Mail size={22} />, path: "/products/add" },
      { text: "Page3", icon: <Mail size={22} />, path: "/products/category" },
    ],
  },
  { text: "Rahat İletişim", icon: <MessageCircle size={22} />, path: "/" },
  { text: "Takvim", icon: <Calendar size={22} /> },
  { text: "Belgeler", icon: <User size={22} /> },
  { text: "Yetkilendirmeler", icon: <Key size={22} /> },
  {
    text: "Çıkış",
    icon: <LogoutOutlinedIcon size={22} />,
    action: logout,
    path: "/login",
  },
];

const Sidebar = ({ status,toggleSidebar }) => {
  const [isHovered, setIsHovered] = useState(true);
  const [openSubMenu, setOpenSubMenu] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDrawer = () => {
    toggleSidebar(!status);
  };

  const handleMouseEnter = () => {
    if (!status) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleSubMenuToggle = (text) => {
    setOpenSubMenu((prevState) => ({ ...prevState, [text]: !prevState[text] }));
  };

  const drawerWidth = status ? 240 : 60;
  const effectiveWidth = status || isHovered ? 240 : 60;
  const handleItemClick = (item) => {
    if (item.action) {
      item.action();
    }
    if (item.path) {
      navigate(item.path);
    }
  };
  const renderMenuItem = (item, index) => {
    const isActive = location.pathname === item.path;
    const itemClass = isActive ? "selected-menu-item" : "unselected-menu-item";

    if (item.header) {
      return (
        (status || isHovered) && (
          <Typography
            key={index}
            variant="overline"
            sx={{ pl: 2, pt: 2, pb: 1, m: 3 }}
          >
            {item.text}
          </Typography>
        )
      );
    }

    if (item.subItems) {
      const subItemActive = item.subItems.some(
        (subItem) => location.pathname === subItem.path
      );
      const subItemClass = subItemActive
        ? "selected-menu-item"
        : "unselected-menu-item";

      return (
        <React.Fragment key={item.text}>
          <ListItem
            button
            onClick={() => handleSubMenuToggle(item.text)}
            className={subItemClass}
            sx={{ mt: 0.3, mb: 0.3 }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            {(status || isHovered) && (
              <>
                <ListItemText primary={item.text} />
                {openSubMenu[item.text] ? <ExpandLess /> : <ExpandMore />}
              </>
            )}
          </ListItem>
          <Collapse in={openSubMenu[item.text]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.subItems.map((subItem, subIndex) => (
                <ListItem
                  button
                  key={subItem.text}
                  component={Link}
                  to={subItem.path}
                  className={
                    location.pathname === subItem.path
                      ? "selected-menu-item"
                      : "unselected-menu-item"
                  }
                  sx={{ pl: 4, m: 1, width: "95%" }}
                >
                  <ListItemIcon>{subItem.icon}</ListItemIcon>{" "}
                  {/* Alt öğe için ikon ekledik */}
                  <ListItemText primary={subItem.text} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      );
    }

    return (
      <ListItem
        button
        key={item.text}
        onClick={item.action ? () => handleItemClick(item) : undefined}
        component={item.action ? undefined : Link}
        to={item.action ? undefined : item.path}
        className={itemClass}
        sx={{ mt: 0.3, mb: 0.3 }}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        {(status || isHovered) && (
          <>
            <ListItemText primary={item.text} />
            {item.badge && (
              <Grid
                sx={{
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "50%",
                  width: 20,
                  height: 20,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {item.badge}
              </Grid>
            )}
          </>
        )}
      </ListItem>
    );
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: effectiveWidth,
          boxSizing: "border-box",
          backgroundColor: "#ffffff",
          transition: "width 0.2s",
          overflowX: "hidden",
          overflowY: isHovered === true || status === true ? "" : "hidden",
        },
        "& .MuiDrawer-paper::-webkit-scrollbar": {
          width: "0.7vh", // Scrollbar genişliği
        },
        "& .MuiDrawer-paper::-webkit-scrollbar-thumb": {
          backgroundColor: "#888", // Scrollbar çizgisi rengi
          borderRadius: 10, // Scrollbar çizgisi köşe yuvarlama
        },
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Grid
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <img
          src={status || isHovered ? largeLogo : smallLogo}
          alt="Logo"
          style={{
            height: status ? "40px" : "40px",
            transition: "height 0.2s",
          }}
        />
        <Checkbox
          icon={
            <IconButton size="small" color="#786af2">
              <span style={{ fontSize: "1.5rem" }}>◯</span>
            </IconButton>
          }
          checkedIcon={
            <IconButton size="small">
              <span style={{ fontSize: "1.5rem" }}>◉</span>
            </IconButton>
          }
          checked={status}
          onChange={toggleDrawer}
          onClick={() => {
            localStorage.set("sidebar", `${!status}`);
          }}
          sx={{
            "&.Mui-checked": {
              color: "#7367f0",
            },
          }}
        />
      </Grid>
      <List sx={{ m: "2%" }}>{menuItems.map(renderMenuItem)}</List>
    </Drawer>
  );
};

export default Sidebar;
