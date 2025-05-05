// src/components/modal/FormModal.jsx
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  Button,
  TextField,
  Autocomplete,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  MenuItem,
  Select,
  InputLabel,
  Grid,
  Divider,
  Stack,
  Chip,
  Switch,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import "moment/locale/tr";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

/**
 * Comprehensive form modal template with various form elements
 *
 * @param {Object} props
 * @param {boolean} props.open - Controls whether the modal is open
 * @param {Function} props.onClose - Function to call when the modal is closed
 * @param {Function} props.onSubmit - Function to call when the form is submitted
 * @param {string} props.title - Title of the modal
 * @param {boolean} props.loading - Whether the form is in loading state
 */
const FormModal = ({
  open,
  onClose,
  onSubmit,
  title = "Form Modal",
  loading = false,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  useEffect(() => {
    if (open === false) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        gender: "male",
        birthDate: null,
        department: "",
        skills: [],
        address: "",
        notifications: true,
        agreeToTerms: false,
      });
    }
  }, [open]);
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "male",
    birthDate: null,
    department: "",
    skills: [],
    address: "",
    notifications: true,
    agreeToTerms: false,
  });

  // Validation state
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error when field is changed
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  // Handle date change
  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      birthDate: date,
    });

    if (errors.birthDate) {
      setErrors({
        ...errors,
        birthDate: null,
      });
    }
  };

  // Handle autocomplete change
  const handleSkillsChange = (event, newValue) => {
    const uniqueSkills = Array.from(
      new Map(newValue.map((item) => [item.id, item])).values()
    );

    setFormData((prev) => ({
      ...prev,
      skills: uniqueSkills,
    }));

    if (errors.skills) {
      setErrors((prev) => ({
        ...prev,
        skills: null,
      }));
    }
  };
  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "İsim alanı zorunludur";
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-posta alanı zorunludur";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Geçerli bir e-posta adresi girin";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Telefon alanı zorunludur";
    }

    if (!formData.department) {
      newErrors.department = "Departman seçimi zorunludur";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "Şartları kabul etmeniz gerekmektedir";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  // Sample data
  const departments = [
    { id: "engineering", name: "Mühendislik" },
    { id: "marketing", name: "Pazarlama" },
    { id: "sales", name: "Satış" },
    { id: "hr", name: "İnsan Kaynakları" },
    { id: "finance", name: "Finans" },
  ];

  const skillOptions = [
    { id: "react", label: "React" },
    { id: "angular", label: "Angular" },
    { id: "vue", label: "Vue.js" },
    { id: "javascript", label: "JavaScript" },
    { id: "typescript", label: "TypeScript" },
    { id: "html", label: "HTML" },
    { id: "css", label: "CSS" },
    { id: "node", label: "Node.js" },
    { id: "python", label: "Python" },
    { id: "java", label: "Java" },
  ];

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        //MODALIN DIŞINA BASILDIĞINDA KAPANMASINI İSTİYORSANIZ. onClose={onClose} olarak değiştirebilirsiniz.
        if (reason !== "backdropClick") {
          onClose(event, reason);
        }
      }}
      fullWidth
      maxWidth="md"
      fullScreen={fullScreen}
      PaperProps={{
        elevation: 3,
        sx: {
          borderRadius: "8px",
          overflow: "visible",
        },
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: "#a51616",
          color: theme.palette.primary.contrastText,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: 1.6, // üst-alt padding azaltıldı

          borderRadius: "7px 7px 0 0",

          // px: 2, // sağ-sol padding
          // padding: "10px 18x",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="kapat"
          size="small"
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "50%",
            position: "absolute",
            top: -10,
            right: -8,
            width: 30,
            height: 30,
            padding: 0,
            ":hover": {
              backgroundColor: "rgba(185, 185, 185, 1)",
              "& svg": {
                color: "#ff0000", // Hover rengi
              },
            },
          }}
        >
          <CloseIcon
            sx={{
              borderRadius: "50%",
              fontSize: 18,
              color: "#e03131",
              padding: "6px",
            }}
          />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ padding: "24px" }}>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Typography
            variant="subtitle1"
            fontWeight="medium"
            color="#0079FF"
            gutterBottom
          >
            Temel Bilgiler
          </Typography>
          <Grid container spacing={2} mb={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="İsim Soyisim"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="E-posta"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Telefon"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
                size="small"
                required
                placeholder="555 123 4567"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider
                dateAdapter={AdapterMoment}
                adapterLocale="tr"
              >
                <DatePicker
                  label="Doğum Tarihi"
                  value={formData.birthDate}
                  onChange={handleDateChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: "small",
                      error: !!errors.birthDate,
                      helperText: errors.birthDate,
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Typography
            variant="subtitle1"
            fontWeight="medium"
            color="#0079FF"
            gutterBottom
          >
            İş Bilgileri
          </Typography>
          <Grid container spacing={2} mb={3}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small" error={!!errors.department}>
                <InputLabel id="department-label">Departman</InputLabel>
                <Select
                  labelId="department-label"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  label="Departman"
                  required
                >
                  {departments.map((dept) => (
                    <MenuItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.department && (
                  <Typography variant="caption" color="error">
                    {errors.department}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                multiple
                options={skillOptions}
                getOptionLabel={(option) => option.label}
                filterSelectedOptions
                value={formData.skills}
                onChange={handleSkillsChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Yetenekler"
                    size="small"
                    placeholder="Yetenekler seçin"
                    error={!!errors.skills}
                    helperText={errors.skills}
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option.label}
                      size="small"
                      variant="outlined"
                      {...getTagProps({ index })}
                    />
                  ))
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Adres"
                name="address"
                value={formData.address}
                onChange={handleChange}
                multiline
                rows={3}
                placeholder="Adres bilgilerinizi girin"
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Typography
            variant="subtitle1"
            fontWeight="medium"
            color="#0079FF"
            gutterBottom
          >
            Tercihler
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Cinsiyet</FormLabel>
                <RadioGroup
                  row
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio size="small" />}
                    label="Erkek"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio size="small" />}
                    label="Kadın"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio size="small" />}
                    label="Diğer"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography>Bildirimler:</Typography>
                <Switch
                  name="notifications"
                  checked={formData.notifications}
                  onChange={handleChange}
                  color="primary"
                  size="small"
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    color="primary"
                    size="small"
                  />
                }
                label="Şartları ve koşulları kabul ediyorum"
              />
              {errors.agreeToTerms && (
                <Typography variant="caption" color="error" display="block">
                  {errors.agreeToTerms}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          padding: "16px 24px",
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Button
          startIcon={<CancelIcon />}
          onClick={onClose}
          color="inherit"
          variant="outlined"
        >
          İptal
        </Button>
        <Button
          startIcon={<SaveIcon />}
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={loading}
        >
          {loading ? "Kaydediliyor..." : "Kaydet"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormModal;
