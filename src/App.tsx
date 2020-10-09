import * as React from "react";

// import Adaptable Component and other types
import AdaptableReact, {
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
];
// some dummy data
const rowData = [
  { id: 1, make: "Toyota", model: "Celica", price: 35000 },
  { id: 2, make: "Ford", model: "Mondeo", price: 32000 },
  { id: 3, make: "Ford", model: "Fiesta", price: 22000 },
  { id: 4, make: "Porsche", model: "Boxter", price: 72000 },
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
    console.log("!!!!", args);
  },

  columnTypes: {
    // not required but helpful for column data type identification
    abColDefNumber: {},
    abColDefString: {},
    abColDefBoolean: {},
    abColDefDate: {},
    abColDefObject: {},
  },
};

// build the AdaptableOptions object
// in this example we are NOT passing in predefined config but in the real world you will ship the AdapTable with objects and permissions
const adaptableOptions: AdaptableOptions = {
  primaryKey: "id",
  userName: "sandbox user",
  adaptableId: "adaptable react demo",
  predefinedConfig: {},
  userInterfaceOptions: {
    showAdaptableToolPanel: true,
  },
};

// Create the AdapTable inastance by using the AdapTableReact component
// And also create the ag-Grid instance by using the AgGridReact component
// NOTE: we pass the SAME gridOptions object into both
const App: React.FC = () => (
  <div style={{ display: "flex", flexFlow: "column", height: "100vh" }}>
    <AdaptableReact
      style={{ flex: "none" }}
      gridOptions={gridOptions}
      adaptableOptions={adaptableOptions}
      onAdaptableReady={({ adaptableApi }) => {
        console.log("ready!!!!");
        adaptableApi.eventApi.on("SelectionChanged", (args) => {
          console.warn(args);
        });
      }}
    />
    <div className="ag-theme-alpine" style={{ flex: 1 }}>
      <AgGridReact
        gridOptions={gridOptions}
        modules={[...AllEnterpriseModules, ClientSideRowModelModule]}
      />
    </div>
  </div>
);

export default App;
