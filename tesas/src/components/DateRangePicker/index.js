/** @format */

import React from "react";
import { TextField, Button,styled } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "moment/locale/tr";
import moment from "moment";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
  '& .MuiInputBase-root': {
    height: 'auto', // Ekran boyutuna göre dinamik yükseklik
    fontSize: '1rem', // Yazı boyutunu dinamik yapabiliriz
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.75rem', // Küçük ekranlarda yazı boyutunu küçültme
    },
  },
  '& .MuiInputBase-input': {
    padding: '1rem', // Padding değerini dinamik yapabiliriz
    [theme.breakpoints.down('sm')]: {
      padding: '0.5rem', // Küçük ekranlarda padding değerini küçültme
    },
  },
}));


const DateRangePicker = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  isLimitedRangeForMonth,
}) => {
  function CustomActionBar(props) {
    const { onSetToday, className } = props;

    return (
      <Button
        className={className}
        sx={{
          textTransform: "none",
          width: "50%",
          marginLeft: "auto",
          color: "black",
        }}
        onClick={() => {
          onSetToday();
          console.log(startDate, endDate);
        }}
        startIcon={<CalendarTodayIcon />}
      >
        Bugün
      </Button>
    );
  }

  const isToday = endDate ? moment(endDate).isSame(moment(), "day") : false;

  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="tr">
      <StyledDatePicker
        renderInput={(props) => (
          <TextField {...props}  label="Başlangıç Tarihi" />
        )}
        minDate={
          isLimitedRangeForMonth
            ? moment(moment(endDate)).subtract(30, "day")
            : null
        }
        maxDate={moment(endDate)}
        format="YYYY-MM-DD"
        value={
          isLimitedRangeForMonth
            ? startDate > endDate ||
              (startDate <
                moment(moment(endDate)).subtract(30, "day") &&
                !isLimitedRangeForMonth &&
                startDate !== null)
              ? setStartDate(null)
              : moment(startDate)
            : undefined
        }
        onChange={(newValue) => setStartDate(newValue)}
        label="Başlangıç Tarihi"
        slots={{
          actionBar: isToday ? CustomActionBar : null,
        }}
        slotProps={{
          actionBar: { actions: isToday ? ["today"] : null },
          textField: {
            size: "small",
          },
        }}
      />
      <StyledDatePicker
        renderInput={(props) => (
          <TextField {...props} margin="normal" label="Bitiş Tarihi" />
        )}
        format="YYYY-MM-DD"
        value={isLimitedRangeForMonth ? moment(endDate) : undefined}
        onChange={(newValue) => {
          console.log(newValue, "new");
          setEndDate(newValue);
        }}
        sx={{ marginLeft: "1vw" }}
        label="Bitiş Tarihi"
        disableFuture
        slots={{
          actionBar: CustomActionBar,
        }}
        slotProps={{
          actionBar: { actions: ["today"] },
          textField: { size: "small" },
        }}
      />
    </LocalizationProvider>
  );
};

export default DateRangePicker;
