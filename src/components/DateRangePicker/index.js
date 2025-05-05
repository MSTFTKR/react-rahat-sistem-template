/** @format */
import React from "react";
import { TextField, Button, Box } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "moment/locale/tr";
import moment from "moment";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

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
          height: "35px",
          marginLeft: "auto",
          color: "black",
          marginTop: "-20px",
          marginBottom: "5px",
        }}
        onClick={() => {
          onSetToday();
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
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 2, sm: "1vw" },
          alignItems: "flex-start",
        }}
      >
        <DatePicker
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
                (startDate < moment(moment(endDate)).subtract(30, "day") &&
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
            textField: {
              size: "small",
              fullWidth: { xs: true, sm: false },
              InputProps: {
                sx: {
                  width: { xs: "100%", sm: 190 },
                  "& input": {
                    fontSize: "0.95rem",
                    padding: "10px 8px 4px 12px",
                  },
                },
              },
            },
          }}
        />
        <DatePicker
          format="YYYY-MM-DD"
          value={isLimitedRangeForMonth ? moment(endDate) : undefined}
          onChange={(newValue) => {
            console.log(newValue, "new");
            setEndDate(newValue);
          }}
          label="Bitiş Tarihi"
          disableFuture
          slots={{
            actionBar: CustomActionBar,
          }}
          slotProps={{
            textField: {
              size: "small",
              fullWidth: { xs: true, sm: false },
              InputProps: {
                sx: {
                  width: { xs: "100%", sm: 190 },
                  "& input": {
                    fontSize: "0.95rem",
                    padding: "10px 8px 4px 12px",
                  },
                },
              },
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default DateRangePicker;
