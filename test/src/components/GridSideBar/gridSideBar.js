const gridSideBar = {
    toolPanels: [
      {
        id: "columns",
        labelDefault: "Sütunlar",
        labelKey: "columns",
        iconKey: "columns",
        toolPanel: "agColumnsToolPanel",
        toolPanelParams: {
          suppressPivotMode: true, // Pivot Modu sekmesini gizle
          suppressValues: true, // Values sekmesini gizle
          suppressRowGroups: true, // Row Groups sekmesini gizle
        },
      },
      {
        id: "filters",
        labelDefault: "Filtreler",
        labelKey: "filters",
        iconKey: "filter",
        toolPanel: "agFiltersToolPanel",
      },
    ],
  };
  export default gridSideBar