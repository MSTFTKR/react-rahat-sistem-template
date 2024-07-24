export const createColumnDefs = (ButtonRenderer) => [
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
      maxWidth: 50,
      minWidth: 50,
      pinned: "left",
      filter: false,

      suppressMenu: true,
    },
    {
      headerName: "",
      field: "",
      maxWidth: 50,
      minWidth: 50,
      cellRenderer: "agGroupCellRenderer",
      filter: false,
      suppressMenu: true,
    },
    {
      headerName: "Detay",
      field: "actions",
      width: 70,
      cellRenderer: ButtonRenderer,
      filter: false,
      suppressMenu: true,
    },

    {
      field: "faturaNo",
      headerName: "Fatura No",
      filter: "agTextColumnFilter",
    }, {
      field: "faturaProfili",
      headerName: "Fatura Profili",
      filter: "agTextColumnFilter",
    },
    { field: "tip", headerName: "Tip", filter: "agTextColumnFilter" },
    { field: "tarih", headerName: "Tarih", filter: "agDateColumnFilter" },
    {
      field: "gondericiVkn",
      headerName: "Gönderici VKN",
      filter: "agTextColumnFilter",
    },
    {
      field: "gondericiUnvan",
      headerName: "Gönderici Ünvan",
      filter: "agTextColumnFilter",
    },
    {
      field: "aliciVkn",
      headerName: "Alıcı VKN",
      filter: "agTextColumnFilter",
    },
    {
      field: "aliciUnvan",
      headerName: "Alıcı Ünvan",
      filter: "agTextColumnFilter",
    },
  ]