import React, { useState, useMemo, useCallback, useEffect } from "react";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DateRangePicker from "../../components/DateRangePicker/index.js";
import gridSideBar from "../../components/GridSideBar/gridSideBar.js";
import { MenuButton } from "../../components/Buttons/buttons.js";
import { FileInfo } from "tabler-icons-react";
import { createColumnDefs } from "./columnDefs.js";
import localStorage from "local-storage";
import {
  Grid,
  Alert,
  Typography,
  Modal,
  Pagination,
  TextField,
  MenuItem,
  Box,
  IconButton,
  Autocomplete,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import localeTextTr from "../../locale.tr.js";

import moment from "moment";
import { LogoutSharp, Person, Save, Settings } from "@mui/icons-material";
import FormModal from "./formModal.js";
import Swal from "sweetalert2";
import { showLoadingSwal } from "../../components/loadingSwal/index.js";
import AnimatedAlertsWrapper from "../../components/AnimatedAlerts/index.js";

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

  const [isOpen, setIsOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [totalCount, setTotalCount] = useState(0);
  const [sort, setSort] = useState({ name: null, sort: null });

  const [lastScroll, setLastScroll] = useState();
  // MenuButton için örnek veri
  const menuItems = [
    { label: "Profil", icon: <Person fontSize="small" />, value: "profile" },
    {
      label: "Ayarlar",
      icon: <Settings fontSize="small" />,
      value: "settings",
    },
    { label: "Çıkış", icon: <LogoutSharp fontSize="small" />, value: "logout" },
  ];

  // MenuButton için tıklama işleyicisi
  const handleMenuItemClick = (item) => {
    console.log("Seçilen öğe:", item.value);
    // Seçilen öğeye göre işlem yapın
    if (item.value === "profile") {
      // Profil sayfasına yönlendir
    } else if (item.value === "settings") {
      // Ayarlar sayfasını aç
    } else if (item.value === "logout") {
      // Çıkış işlemini yap
    }
  };

  // Button için tıklama işleyicisi
  const handleSaveButtonClick = () => {
    console.log("Kaydet butonuna tıklandı");
    // Kaydetme işlemi
  };

  useEffect(() => {
    const lastPage = localStorage.get("page");
    const lastPageSize = localStorage.get("pageSize");
    const sideBarOpen = localStorage.get("sidebar");

    if (sideBarOpen === "false") {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
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
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const options = ["Elma", "Armut", "Muz", "Çilek", "Karpuz"];
  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      minWidth: 100,
      filter: true,
      sortable: true,
      resizable: true,
      floatingFilter: true,
      cellStyle: {
        textAlign: "center",
        display: "flex",
        alignItems: "center",
      },
      "@media (max-width: 600px)": {
        minWidth: 80, // Mobilde daha dar sütunlar
        fontSize: "0.9rem", // Daha küçük yazı
      },
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
    },
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
    },
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
    },
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
    },
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
    },
  ];
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleSubmit = async (formData) => {
    // Form verileri işleniyor
    setLoading(true);
    await showLoadingSwal();
    // API çağrısı simülasyonu
    setTimeout(() => {
      console.log("Form verileri:", formData);
      setLoading(false);
      setOpenModal(false);
      Swal.fire({
        title: "Başarılı!",
        text: "Form başarıyla kaydedildi!",
        icon: "success",
        confirmButtonText: "Tamam",
      });
    }, 1500);
  };
  const ButtonRenderer = (props) => {
    const handleClick = () => {
      console.log(props.data);
      handleOpen();
      localStorage.set("scrollPosition", Math.floor(window.scrollY));
      // Buraya tıklama durumunda yapılacak işlemi ekleyin
    };

    return (
      <IconButton onClick={handleClick}>
        <FileInfo></FileInfo>
      </IconButton>
    );
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState(
    createColumnDefs(ButtonRenderer)
  );

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
      <Grid
        item
        xs={11.5}
        sm={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* <Alert
          severity="info"
          sx={{
            borderRadius: "12px",
            fontWeight: "bold",
            border: "1px solid #1232e4",
            mb: 2,
          }}
        >
          BU SAYFADA UYGULAMALARDA SIKLIKLA KULLANDIĞIMIZ MODALLAR, BUTON VE
          DİĞER BİLEŞENLER YER ALMAKTADIR. LÜTFEN EKSTREM DURUMLAR DIŞINDA, BU
          YAPILARI KULLANMAYA ÖZEN GÖSTERİNİZ. KOD ANLAŞILABİLİRLİĞİ VE
          BÜTÜNLÜĞÜ AÇISINDAN BU ÖNEMLİDİR. BU SAYFAYI SİLMEYİP KOPYALAYARAK
          İLERLEMENİZ TAVSİYE EDİLİR. BOL ŞANS :D
        </Alert> */}
        <AnimatedAlertsWrapper
          alerts={[
            {
              type: "info",
              content: "Uzun süre gösterilecek bilgi",
              duration: 1000,
            },
            {
              type: "error",
              content: "Kısa süre gösterilecek hata",
              duration: 4000,
            },
            {
              type: "warning",
              content: "Normal süre gösterilecek uyarı",
              duration: 1000,
            },
          ]}
          animateTimeout={4000} // Varsayılan süre
          maxVisible={1} // Aynı anda maksimum 2 alert göster
        />
        <Grid
          container
          className="grid-area"
          xs={11.5}
          sm={12}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexWrap: "wrap",
            justifyContent: { lg: "space-between", xs: "center" },
            width: "100%", // Tam genişlik
          }}
        >
          {/* Tarih Seçici ve Buton */}
          <Grid
            item
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <LocalizationProvider
              dateAdapter={AdapterMoment}
              adapterLocale="tr"
            >
              <Grid sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton
                  onClick={handlePreviousMonth}
                  className="date-button"
                >
                  <KeyboardDoubleArrowLeftOutlinedIcon fontSize="small" />
                </IconButton>
                <DateRangePicker
                  setStartDate={setStartDate}
                  startDate={startDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                  isLimitedRangeForMonth={true}
                />
                <IconButton onClick={handleNextMonth} className="date-button">
                  <KeyboardDoubleArrowRightOutlinedIcon fontSize="small" />
                </IconButton>
                <Button
                  variant="contained"
                  startIcon={<SearchIcon />}
                  className="custom-button"
                  sx={{
                    ml: 2,
                    height: "40px", // Standart yükseklik
                  }}
                >
                  Ara
                </Button>
              </Grid>
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Grid
          container
          className="grid-area"
          sx={{
            display: "flex",
            justifyContent: { md: "space-between", xs: "center" },

            // bgcolor: "pink",
          }}
        >
          {/* Arama Alanı */}
          <Grid
            item
            sx={{
              display: "flex",
              alignItems: "center",
              mb: { xs: 1, md: 0 },
            }}
          >
            <TextField
              sx={{
                backgroundColor: "#ffffff",
                width: "200px",
                height: "40px", // Standart yükseklik (theme.js ile uyumlu)
              }}
              variant="standard"
              InputProps={{
                placeholder: "Ara...",
              }}
            />
            <IconButton>
              <SearchOutlinedIcon fontSize="small" />
            </IconButton>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              justifyContent: { md: "flex-end", xs: "center" },
              flexWrap: "wrap",
            }}
          >
            {" "}
            {/* MenuButton örneği */}
            <MenuButton
              label="İşlemler"
              menuItems={menuItems}
              onItemClick={handleMenuItemClick}
              color="primary"
            />
            {/* Button örnekleri */}
            <Button
              color="success"
              onClick={handleSaveButtonClick}
              startIcon={<Save />}
            >
              Kaydet
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleOpenModal}
            >
              {" "}
              Modal Aç
            </Button>
            <FormModal
              open={openModal}
              onClose={handleCloseModal}
              onSubmit={handleSubmit}
              title="Yeni Personel Kaydı"
              loading={loading}
            />
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
            suppressHorizontalScroll={window.innerWidth <= 600}
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
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
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
  );
}

export default GridPage;
