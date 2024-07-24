import { useState } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";

import WorkIcon from "@mui/icons-material/Work";
import FlagIcon from "@mui/icons-material/Flag";
import LanguageIcon from "@mui/icons-material/Language";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

const UserProfileInfoPage = ({ userInfo}) => {
  return (
    <Grid item md={12} className="grid-area">
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item md={5}>
              <Typography variant="h6" sx={{ ml: "2vh" }}>
                Bilgiler
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Ad Soyad" secondary={userInfo.name} />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <WorkIcon />
                  </ListItemIcon>
                  <ListItemText primary="Role" secondary={userInfo.role} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <FlagIcon />
                  </ListItemIcon>
                  <ListItemText primary="Country" secondary={userInfo.country} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LanguageIcon />
                  </ListItemIcon>
                  <ListItemText primary="Language" secondary={userInfo.language} />
                </ListItem>
              </List>
            </Grid>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ display: { xs: "none", md: "block" } }}
            />
            <Grid item md={1}></Grid>
            <Grid item md={5}>
              <Typography variant="h6" sx={{ ml: "2vh" }}>
                İletişim
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Telefon No"
                    secondary={userInfo.number}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Email"
                    secondary={userInfo.email}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default UserProfileInfoPage;
