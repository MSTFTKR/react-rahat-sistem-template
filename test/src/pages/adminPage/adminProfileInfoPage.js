
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

const AdminProfileInfoPage = ({ adminInfo}) => {
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
                  <ListItemText primary="Ad Soyad" secondary={adminInfo.name} />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <WorkIcon />
                  </ListItemIcon>
                  <ListItemText primary="Role" secondary={adminInfo.role} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <FlagIcon />
                  </ListItemIcon>
                  <ListItemText primary="Country" secondary={adminInfo.country} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LanguageIcon />
                  </ListItemIcon>
                  <ListItemText primary="Language" secondary={adminInfo.language} />
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
                    secondary={adminInfo.number}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Email"
                    secondary={adminInfo.email}
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

export default AdminProfileInfoPage;
