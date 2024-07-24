import { useState, useCallback, useMemo, useEffect } from "react";
import AdminSidebar from "../../components/adminSideBar/adminSideBar";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-enterprise";
import {
  Grid,
  Typography,
  Button,
  TextField,
  IconButton,
  Pagination,
  MenuItem,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import gridSideBar from "../../components/GridSideBar/gridSideBar.js";
import { createColumnDefs  } from "./columnDefs.js";
import localeTextTr from "../../locale.tr";
import { FileInfo } from "tabler-icons-react";
import localStorage from "local-storage";
function AdminUsers() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [totalCount, setTotalCount] = useState(0);
  const [lastScroll, setLastScroll] = useState();

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

    const cleanupLocalStorage = () => {
      localStorage.clear();
    };
    window.addEventListener("beforeunload", cleanupLocalStorage);
    return () => {
      window.removeEventListener("beforeunload", cleanupLocalStorage);
    };
  }, []);

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
      faturaNo: "2424",
      faturaProfili: "EARSIVFATURA",
      tip: "SATIS",
      tarih: "24/06/2024",
      gondericiVkn: "4444444444",
      gondericiUnvan: "göndirici...",
      aliciVkn: "144444444444",
      aliciUnvan: "BASANAYI VE TIC...",
      subDetails: [
        //buraya detail objesi yerleştirilecek details: details gibi
        { description: "Detail 1" },
        { description: "Detail 2" },
      ],
    },
    {
      faturaNo: "1233",
      faturaProfili: "EARSIVFATURA",
      tip: "SATIS",
      tarih: "23/06/2024",
      gondericiVkn: "3223423432",
      gondericiUnvan: "gön yön...",
      aliciVkn: "1222221212",
      aliciUnvan: "alici2",
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
  const localeText = {
    // Set locale text here
    columns: "Kolonlar",
    filters: "Filtreler",
    // Other translations
    selectAll: "(Hepsini Seç)",
    selectAllSearchResults: "(Tüm Arama Sonuçlarını Seç)",
    searchOoo: "Arama...",
    blanks: "Boşluklar",
    noMatches: "Eşleşme Yok",
    // Add more as needed
  };
  const [columnDefs, setColumnDefs] = useState(createColumnDefs(ButtonRenderer));

  const [rowData, setRowData] = useState();

  // Örnek veri

  const buttonRenderer = (params) => {
    return (
      <Button onClick={() => console.log("Detay tıklandı:", params.data)}>
        Detay
      </Button>
    );
  };

  const onGridReady = useCallback((params) => {
    setRowData(fakeData);
  }, []);
  return (
    <Grid container>
      <Grid item md={isOpen ? 2.3 : 0.7}>
        <AdminSidebar
          status={isOpen}
          toggleSidebar={toggleSidebar}
          location={"homePage"}
        />
      </Grid>
      <Grid
        item
        md={isOpen ? 9.7 : 11.3}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "column",
          pr: "4vh",
          gap: 1,
        }}
      >
        <Grid
          md={12}
          className="grid-area"
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid md={12} style={{ display: "flex", flexDirection: "column" }}>
            <Grid
              item
              md={12}
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "2%",
              }}
            >
              <Typography variant="h4">Kullanıcılar</Typography>
            </Grid>

            <Grid
              item
              md={12}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1.5%",
              }}
            >
              <Grid item md={3}>
                <Grid
                  item
                  md={12}
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <TextField
                    className="input-field"
                    placeholder="Ara...(vkn/tckn,ünvan,e-posta)"
                  />
                  <IconButton className="date-button">
                    <SearchOutlinedIcon fontSize="small" color="white" />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid
                item
                md={8}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  justifyContent: "end",
                }}
              >
                <Button className="admin-button">Filtrele</Button>
                <Button className="admin-button">
                  Devam eden senk. kontrol et
                </Button>
                <Button className="admin-button">Verileri yönet</Button>
                <Button className="admin-button">Kullanıcı ekle</Button>
              </Grid>
            </Grid>
            <Grid
              className="ag-theme-quartz"
              style={{ minHeight: "70vh", width: "100%" }}
            >
              <AgGridReact
                rowSelection="multiple"
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                rowData={rowData}
                sideBar={gridSideBar}
                localeText={localeTextTr}
                paginationPageSize={10}
                onGridReady={onGridReady}
                frameworkComponents={{
                  buttonRenderer: buttonRenderer,
                }}
              />
            </Grid>
            <Grid
              item
              sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1, justifyContent:"space-between", }}
            >
              <Grid sx={{display:"flex", gap:2, alignItems:"center"}}><Pagination
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
                  setPageSize(e.target.value);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  localStorage.set("page", 1);
                  localStorage.set("pageSize", e.target.value);
                }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={40}>40</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
                <MenuItem value={200}>250</MenuItem>
              </TextField></Grid>
              
              <Typography>Toplam Kayıt : {totalCount} </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AdminUsers;
