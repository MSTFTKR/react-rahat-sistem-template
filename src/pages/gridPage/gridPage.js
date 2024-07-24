import React, { useState, useMemo, useCallback, useEffect } from "react";

import Sidebar from "../../components/sideBar/sideBar";
import Navbar from "../../components/navbar/navbar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DateRangePicker from "../../components/DateRangePicker";
import gridSideBar from "../../components/GridSideBar/gridSideBar.js";
import { FileInfo } from "tabler-icons-react";
import { createColumnDefs  } from "./columnDefs.js";
import localStorage from "local-storage";
import {
  Grid,
  Alert,
  Typography,
  Modal,
  Pagination,
  TextField,
  MenuItem,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import localeTextTr from "../../locale.tr";

import moment from "moment";

function GridPage() {
  const [startDate, setStartDate] = useState(moment("2024-06-01"));
  const [endDate, setEndDate] = useState(moment("2024-06-30"));

  const handlePreviousMonth = () => {
    setStartDate((prevDate) =>
      prevDate.clone().subtract(1, "month").startOf("month")
    );
    setEndDate((prevDate) =>
      prevDate.clone().subtract(1, "month").endOf("month")
    );
  };

  const handleNextMonth = () => {
    setStartDate((prevDate) =>
      prevDate.clone().add(1, "month").startOf("month")
    );
    setEndDate((prevDate) => prevDate.clone().add(1, "month").endOf("month"));
  };

  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [totalCount, setTotalCount] = useState(0);
  const [sort, setSort] = useState({ name: null, sort: null });

  const [lastScroll, setLastScroll] = useState();

  useEffect(() => {
    const lastPage = localStorage.get("page");
    const lastPageSize = localStorage.get("pageSize");
    const sideBarOpen = localStorage.get("sidebar");

    if (sideBarOpen==="false") {
      setIsOpen(false)
    }else{setIsOpen(true)}
    if (lastPage) {
      setCurrentPage(lastPage);
    }
    if (lastPageSize) {
      setPageSize(lastPageSize);
    }
    const localScroll = localStorage.get("scrollPosition");
    if (localScroll) {
      setLastScroll(localScroll);
    }

    const cleanupLocalStorage = () => {
      localStorage.clear();
    };
    window.addEventListener("beforeunload", cleanupLocalStorage);
    return () => {
      window.removeEventListener("beforeunload", cleanupLocalStorage);
    };
  }, []);
  function clearLocalStorage() {
    localStorage.clear();
  }
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      minWidth: 100,
      filter: true,
      sortable: true,
      resizable: true,
      floatingFilter: true,
    }),
    []
  );

  const fakeData = [
    {
      faturaNo: "217",
      faturaProfili: "EARSIVFATURA",
      tip: "SATIS",
      tarih: "24/06/2024",
      gondericiVkn: "22222222",
      gondericiUnvan: "DEN...",
      aliciVkn: "1400000000",
      aliciUnvan: " SANAYI VE TIC...",
      subDetails: [
        //buraya detail objesi yerleştirilecek details: details gibi
        { description: "Detail 1" },
        { description: "Detail 2" },
      ],
    },{
      faturaNo: "217",
      faturaProfili: "EARSIVFATURA",
      tip: "SATIS",
      tarih: "24/06/2024",
      gondericiVkn: "22222222",
      gondericiUnvan: "DEN...",
      aliciVkn: "1400000000",
      aliciUnvan: " SANAYI VE TIC...",
      subDetails: [
        //buraya detail objesi yerleştirilecek details: details gibi
        { description: "Detail 1" },
        { description: "Detail 2" },
      ],
    },{
      faturaNo: "217",
      faturaProfili: "EARSIVFATURA",
      tip: "SATIS",
      tarih: "24/06/2024",
      gondericiVkn: "22222222",
      gondericiUnvan: "DEN...",
      aliciVkn: "1400000000",
      aliciUnvan: " SANAYI VE TIC...",
      subDetails: [
        //buraya detail objesi yerleştirilecek details: details gibi
        { description: "Detail 1" },
        { description: "Detail 2" },
      ],
    },{
      faturaNo: "217",
      faturaProfili: "EARSIVFATURA",
      tip: "SATIS",
      tarih: "24/06/2024",
      gondericiVkn: "22222222",
      gondericiUnvan: "DEN...",
      aliciVkn: "1400000000",
      aliciUnvan: " SANAYI VE TIC...",
      subDetails: [
        //buraya detail objesi yerleştirilecek details: details gibi
        { description: "Detail 1" },
        { description: "Detail 2" },
      ],
    },{
      faturaNo: "217",
      faturaProfili: "EARSIVFATURA",
      tip: "SATIS",
      tarih: "24/06/2024",
      gondericiVkn: "22222222",
      gondericiUnvan: "DEN...",
      aliciVkn: "1400000000",
      aliciUnvan: " SANAYI VE TIC...",
      subDetails: [
        //buraya detail objesi yerleştirilecek details: details gibi
        { description: "Detail 1" },
        { description: "Detail 2" },
      ],
    },
    
  ];
    const ButtonRenderer = (props) => {
    const handleClick = () => {
      console.log(props.data);
      handleOpen();
      localStorage.set("scrollPosition", Math.floor(window.scrollY));
      // Buraya tıklama durumunda yapılacak işlemi ekleyin
    };

    return (
      <Button onClick={handleClick}>
        <FileInfo></FileInfo>
      </Button>
    );
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState(createColumnDefs(ButtonRenderer));

  const detailCellRendererParams = useMemo(() => {
    return {
      detailGridOptions: {
        defaultExpanded: false,
        // sideBar={gridSideBar},
        // rowSelection: "multiple",
        // suppressRowClickSelection: true,
        enableRangeSelection: true,
        // paginationAutoPageSize: true,
        columnDefs: [{ field: "description" }],
        defaultColDef: {
          flex: 3,
          maxWidth: 300,
          resizable: true,
          floatingFilter: true,
          suppressMenu: false, // Allow menu in detail grid columns
        },
      },
      getDetailRowData: (params) => {
        params.successCallback(params.data.subDetails);
      },
    };
  }, []);

  const onGridReady = useCallback((params) => {
    setRowData(fakeData);
  }, []);

  return (
    <Grid container>
      <Grid item md={isOpen ? 2.3 : 0.7}>
        <Sidebar status={isOpen} toggleSidebar={toggleSidebar} />
      </Grid>
      <Grid
        item
        md={isOpen ? 9.7 : 11.3}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "column",
          gap: 1,
          pr: "4vh",
        }}
      >
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <Grid item md={12} sx={{ display: "flex", flexDirection: "column" }}>
          <Grid item md={12} sx={{ mt: 1 }}>
            <Alert
              severity="info"
              sx={{
                borderRadius: "2vh",
                border: "1px solid #1232e4",
                mb: 1,
              }}
            >
              Bilgilendirme Alanı
            </Alert>
          </Grid>
          <Grid
            className="grid-area"
            sx={{
              mb: 1,
            }}
          >
            <Grid
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                justifyContent: "space-between",
              }}
            >
              <Grid
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TextField
                  sx={{ backgroundColor: "#ffffff" }}
                  variant="standard"
                  InputProps={{
                    // disableUnderline: true, // Çizgiyi kaldırmak için
                    placeholder: "Ara...", // Placeholder metni
                  }}
                />
                <IconButton className="date-button">
                  <SearchOutlinedIcon fontSize="small" color="white" />
                </IconButton>
              </Grid>
              <Grid sx={{ display: "flex", alignItems: "center" }}>
                <LocalizationProvider
                  dateAdapter={AdapterMoment}
                  adapterLocale="tr"
                >
                  <Grid sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton
                      onClick={handlePreviousMonth}
                      className="date-button"
                    >
                      <KeyboardDoubleArrowLeftOutlinedIcon fontSize="small"></KeyboardDoubleArrowLeftOutlinedIcon>
                    </IconButton>
                    <DateRangePicker
                      setStartDate={setStartDate}
                      startDate={startDate}
                      endDate={endDate}
                      setEndDate={setEndDate}
                      isLimitedRangeForMonth={true}
                    />
                    <IconButton
                      onClick={handleNextMonth}
                      className="date-button"
                    >
                      <KeyboardDoubleArrowRightOutlinedIcon fontSize="small"></KeyboardDoubleArrowRightOutlinedIcon>
                    </IconButton>
                    <Button
                      variant="contained"
                      startIcon={<SearchIcon />}
                      className="date-button"
                      sx={{
                        ml: 2,
                      }}
                    >
                      Ara
                    </Button>
                  </Grid>
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            className="ag-theme-quartz"
            style={{
              flex: 1,
              minHeight: "80vh",
              width: "100%",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
          >
            <AgGridReact
              localeText={localeTextTr}
              rowSelection="multiple"
              rowData={rowData}
              columnDefs={columnDefs}
              enableRangeSelection={true}
              sideBar={gridSideBar}
              copyHeadersToClipboard={true}
              defaultColDef={defaultColDef}
              masterDetail={true}
              detailCellRendererParams={detailCellRendererParams}
              onGridReady={onGridReady}
            />
          </Grid>
          <Grid item md={5}>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                className="grid-area"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "50%",
                  height: "50%",
                  p: 4,
                }}
              >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor
                  ligula.
                </Typography>
              </Box>
            </Modal>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              justifyContent: "space-between",
              display: rowData?.length === 0 ? "none" : "flex",
              margin: "2% 0 2% 0",
              alignItems: "center",
            }}
          >
            <Grid item sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Pagination
                count={totalPage}
                showFirstButton
                showLastButton
                page={currentPage}
                onChange={(event, value) => {
                  setCurrentPage(value);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  localStorage.set("page", value);
                }}
              />
              <TextField
                select
                value={pageSize}
                size="small"
                sx={{
                  display: rowData && rowData?.length === 0 ? "none" : "block",
                }}
                onChange={(e) => {
                  setCurrentPage(1);
                  localStorage.set("page", 1);
                  localStorage.set("pageSize", e.target.value);
                  setPageSize(e.target.value);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={40}>40</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
                <MenuItem value={200}>250</MenuItem>
              </TextField>
            </Grid>

            <Grid sx={{ display: "flex", justifyContent: "end" }}>
              <Typography>Toplam Kayıt : {totalCount} </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default GridPage;
