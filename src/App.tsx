import * as React from "react";

// import Adaptable Component and other types
import AdaptableReact, {
  AdaptableApi,
  AdaptableOptions,
} from "@adaptabletools/adaptable-react-aggrid";

import { AdaptableToolPanelAgGridComponent } from "@adaptabletools/adaptable/src/AdaptableComponents";

// import agGrid Component
import { AgGridReact } from "@ag-grid-community/react";

// import adaptable css and themes
import "@adaptabletools/adaptable-react-aggrid/base.css";
import "@adaptabletools/adaptable-react-aggrid/themes/light.css";
import "@adaptabletools/adaptable-react-aggrid/themes/dark.css";

// import aggrid themes (using new Balham theme)
import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-alpine-dark.css";

import {
  AllEnterpriseModules,
  GridOptions,
  ClientSideRowModelModule,
} from "@ag-grid-enterprise/all-modules";

import finance from "@adaptabletools/adaptable-plugin-finance";
import { useRef, useState } from "react";

const QuickSearchCustomComponent = (props: any) => {
  const [searchText, setSearchText] = useState("");
  return (
    <div>
      CUSTOM QuickSearch
      <input
        value={searchText}
        style={{ padding: "6px 10px", marginLeft: 5 }}
        onChange={(event) => {
          const value = event.target.value;
          setSearchText(value);
          props.onSearchTextChange(value);
        }}
      />
    </div>
  );
};
// create ag-Grid Column Definitions
const columnDefs = [
  {
    headerName: "Auto Make",
    field: "make",
    editable: true,
    filter: true,
    sortable: true,
    type: "abColDefString",
  },
  {
    headerName: "Model",
    field: "model",
    editable: true,
    filter: true,
    sortable: true,
    type: "abColDefString",
  },
  {
    headerName: "Price",
    field: "price",
    editable: true,
    filter: true,
    sortable: true,
    type: "abColDefNumber",
  },
  {
    headerName: "Date manufactured",
    field: "date",
    type: "abColDefDate",
    filter: true,
    floatingFilter: true,
  },
];
// some dummy data
const rowData = [
  { id: 1, make: "Toyota", model: "Celica", price: 35000, date: "2010-01-02" },
  { id: 2, make: "Ford", model: "Mondeo", price: 32000, date: "2012-01-02" },
  { id: 3, make: "Ford", model: "Fiesta", price: 22000, date: "2014-01-02" },
  { id: 4, make: "Porsche", model: "Boxter", price: 72000, date: "2016-01-02" },
];

// let ag-grid know which columns and what data to use and add some other properties
const gridOptions: GridOptions = {
  columnDefs: columnDefs,
  rowData: rowData,
  components: {
    AdaptableToolPanel: AdaptableToolPanelAgGridComponent,
  },
  sideBar: true,
  suppressMenuHide: true,
  enableRangeSelection: true,
  onSelectionChanged: (...args) => {
    // console.log("!!!!", args);
  },
};

// build the AdaptableOptions object
// in this example we are NOT passing in predefined config but in the real world you will ship the AdapTable with objects and permissions
const adaptableOptions: AdaptableOptions = {
  primaryKey: "id",
  userName: "sandbox user",
  adaptableId: "adaptable react demo",
  dashboardOptions: {
    customToolbars: [
      {
        name: "CustomQuickSearch",
        title: "Custom Quick Search",
        frameworkComponent: ({ adaptableApi }) => {
          return (
            <QuickSearchCustomComponent
              onSearchTextChange={(searchText: string) => {
                adaptableApi.quickSearchApi.runQuickSearch(searchText);
              }}
            />
          );
        },
      },
    ],
  },
  predefinedConfig: {
    Dashboard: {
      Revision: 10,
      Tabs: [
        {
          Name: "Welcome",
          Toolbars: ["Alert", "CustomQuickSearch"],
        },
      ],
    },
  },
  userInterfaceOptions: {
    showAdaptableToolPanel: true,
  },
  plugins: [finance()],
};

const modules = [...AllEnterpriseModules, ClientSideRowModelModule];

// Create the AdapTable inastance by using the AdapTableReact component
// And also create the ag-Grid instance by using the AgGridReact component
// NOTE: we pass the SAME gridOptions object into both
const App: React.FC = () => {
  return (
    <div style={{ display: "flex", flexFlow: "column", height: "100vh" }}>
      <AdaptableReact
        style={{ flex: "none" }}
        gridOptions={gridOptions}
        adaptableOptions={adaptableOptions}
        onAdaptableReady={({ adaptableApi }) => {
          console.log("ready!!!");
          adaptableApi.eventApi.on("SelectionChanged", (args) => {
            console.warn(args);
          });
        }}
        modules={modules}
      />
      <div className="ag-theme-alpine" style={{ flex: 1 }}>
        <AgGridReact gridOptions={gridOptions} modules={modules} />
      </div>
    </div>
  );
};

export default App;
