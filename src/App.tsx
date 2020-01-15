import * as React from "react";

// import the blotter and types
import AdaptableReact from "@adaptabletools/adaptable-react-aggrid";

// import blotter css and themes
import "@adaptabletools/adaptable-react-aggrid/base.css";
import "@adaptabletools/adaptable-react-aggrid/themes/light.css";
import "@adaptabletools/adaptable-react-aggrid/themes/dark.css";

// import aggrid themes
import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css";

import { AllEnterpriseModules } from "@ag-grid-enterprise/all-modules";

// create ag-Grid Column Definitions
const columnDefs = [
  {
    headerName: "Auto Make",
    field: "make",
    editable: true,
    filter: true,
    sortable: true,
    type: "abColDefString"
  },
  {
    headerName: "Model",
    field: "model",
    editable: true,
    filter: true,
    sortable: true,
    type: "abColDefString"
  },
  {
    headerName: "Price",
    field: "price",
    editable: true,
    filter: true,
    sortable: true,
    type: "abColDefNumber"
  }
];
// some dummy data
const rowData = [
  { id: 1, make: "Toyota", model: "Celica", price: 35000 },
  { id: 2, make: "Ford", model: "Mondeo", price: 32000 },
  { id: 3, make: "Ford", model: "Fiesta", price: 22000 },
  { id: 4, make: "Porsche", model: "Boxter", price: 72000 }
];

// let ag-grid know which columns and what data to use and add some other properties
const gridOptions = {
  columnDefs: columnDefs,
  rowData: rowData,
  enableRangeSelection: true,
  floatingFilter: true,
  sideBar: true,
  suppressMenuHide: true,
  columnTypes: {
    // not required but helpful for column data type identification
    abColDefNumber: {},
    abColDefString: {},
    abColDefBoolean: {},
    abColDefDate: {},
    abColDefObject: {}
  }
};

// build the IAdaptableOptions object
// in this example we are NOT passing in predefined config but in the real world you will ship the Blotter with objects and permissions
const adaptableOptions = {
  primaryKey: "id",
  userName: "sandbox user",
  adaptableId: "blotter react demo"
};

// Create the Adaptable Blotter by using the AdaptableBlotterReact component
const App: React.FC = () => (
  <AdaptableReact
    style={{ height: "100vh" }}
    gridOptions={gridOptions}
    adaptableOptions={adaptableOptions}
    modules={AllEnterpriseModules}
  />
);

export default App;
