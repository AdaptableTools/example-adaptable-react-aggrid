import * as React from 'react';
import { useState } from 'react';

// import Adaptable Component and other types
import AdaptableReact, {
  AdaptableButton,
  AdaptableOptions,
  CustomToolPanelButtonContext,
  ToolPanelButtonContext,
} from '@adaptabletools/adaptable-react-aggrid';

import { AdaptableToolPanelAgGridComponent } from '@adaptabletools/adaptable/src/AdaptableComponents';

// import agGrid Component
import { AgGridReact } from '@ag-grid-community/react';

// import adaptable css and themes
import '@adaptabletools/adaptable-react-aggrid/base.css';
import '@adaptabletools/adaptable-react-aggrid/themes/light.css';
import '@adaptabletools/adaptable-react-aggrid/themes/dark.css';

// import aggrid themes (using new Alpine theme)
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine-dark.css';

import { CustomSettingsPanel } from './CustomSettingsPanel';

import {
  AllEnterpriseModules,
  GridOptions,
} from '@ag-grid-enterprise/all-modules';

import finance from '@adaptabletools/adaptable-plugin-finance';
import openfin from '@adaptabletools/adaptable-plugin-openfin';

const QuickSearchCustomComponent = (props: any) => {
  const [searchText, setSearchText] = useState('');
  return (
    <div>
      CUSTOM QuickSearch
      <input
        value={searchText}
        style={{ padding: '6px 10px', marginLeft: 5 }}
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
    headerName: 'Auto Make',
    field: 'make',
    editable: true,
    filter: true,
    sortable: true,
    type: 'abColDefString',
  },
  {
    headerName: 'Model',
    field: 'model',
    editable: true,
    filter: true,
    sortable: true,
    type: 'abColDefString',
  },
  {
    headerName: 'Price',
    field: 'price',
    editable: true,
    filter: true,
    sortable: true,
    type: 'abColDefNumber',
  },
  {
    headerName: 'Date manufactured',
    field: 'date',
    type: 'abColDefDate',
    filter: true,
    floatingFilter: true,
  },
];
// some dummy data
const rowData = [
  { id: 1, make: 'Toyota', model: 'Celica', price: 35000, date: '2010-01-02' },
  { id: 2, make: 'Ford', model: 'Mondeo', price: 32000, date: '2012-01-02' },
  { id: 3, make: 'Ford', model: 'Fiesta', price: 22000, date: '2014-01-02' },
  { id: 4, make: 'Porsche', model: 'Boxter', price: 72000, date: '2016-01-02' },
  { id: 5, make: 'Ford', model: 'Galaxy', price: 14900, date: '2010-08-08' },
  { id: 6, make: 'Porsche', model: 'Mission', price: 53500, date: '2014-07-02' },
  { id: 7, make: 'Mitsubishi', model: 'Outlander', price: 4500, date: '2018-05-02' },
  { id: 8, make: 'Toyota', model: 'Yaris', price: 30000, date: '2017-03-02' },
  { id: 9, make: 'Ford', model: 'Mondeo', price: 46000, date: '2019-01-02' },
  { id: 10, make: 'Toyota', model: 'Corolla', price: 31000, date: '2016-08-04' },
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
  enableCharts: true,
};

// build the AdaptableOptions object
// in this example we are NOT passing in predefined config but in the real world you will ship the AdapTable with objects and permissions
const adaptableOptions: AdaptableOptions = {
  primaryKey: 'id',
  userName: 'sandbox user',
  licenseKey: process.env.REACT_APP_ADAPTABLE_LICENSE_KEY,
  adaptableId: 'adaptable react demo',
  settingsPanelOptions: {
    customSettingsPanels: [
      {
        // CUSTOM SETTINGS PANEL COMPONENT
        frameworkComponent: CustomSettingsPanel,
        name: 'Custom Settings',
      }
    ]
  },
  dashboardOptions: {
    customToolbars: [
      {
        // CUSTOM TOOLBAR COMPONENT
        // wraps a reusable React component (same component is used in a custom tool panel)
        name: 'CustomQuickSearch',
        title: 'Custom Quick Search',
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
  toolPanelOptions: {
    toolPanelOrder: ['adaptable', 'columns', 'filters'],
    customToolPanels: [
      {
        // CUSTOM TOOLPANEL COMPONENT
        // wraps a reusable React component (same component is used in a custom toolbar)
        name: 'CustomQuickSearch',
        title: 'Custom Quick Search',
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
      {
        // CUSTOM TOOLPANEL COMPONENT
        // wraps a AdaptableButton component
        name: 'CustomToolPanelButton',
        toolPanelButtons: [
          {
            label: 'AlertButton',
            buttonStyle: {
              variant: 'raised',
              tone: 'accent',
            },
            onClick: (
              button: AdaptableButton<CustomToolPanelButtonContext>,
              context: CustomToolPanelButtonContext
            ) => {
              context.adaptableApi.alertApi.showAlertInfo(
                'CustomToolPanelButton',
                'Styled button & icon'
              );
            },
          },
        ],
      },
    ],
    // CUSTOM TOOLPANEL COMPONENT
    // rendered as a Button in the heading of the tool panel section
    customToolPanelButtons: [
      {
        label: 'Query Popup',
        icon: {
          src: 'https://img.icons8.com/glyph-neue/64/000000/zoom-in.png',
        },
        buttonStyle: {
          variant: 'outlined',
          // tone: 'accent',
        },
        onClick: (
          button: AdaptableButton<ToolPanelButtonContext>,
          context: ToolPanelButtonContext
        ) => {
          context.adaptableApi.queryApi.showQueryPopup();
        },
      },
    ],
  },
  predefinedConfig: {
    Dashboard: {
      Tabs: [
        {
          Name: 'Welcome',
          Toolbars: ['CustomQuickSearch'],
        },
      ],
    },
    ToolPanel: {
      Revision: Date.now(),
    },
  },
  plugins: [finance(), openfin()],
};

const modules = [...AllEnterpriseModules];


// Create the AdapTable inastance by using the AdapTableReact component
// And also create the ag-Grid instance by using the AgGridReact component
// NOTE: we pass the SAME gridOptions object into both
const App: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexFlow: 'column', height: '100vh' }}>
      <AdaptableReact
        style={{ flex: 'none' }}
        gridOptions={gridOptions}
        adaptableOptions={adaptableOptions}
        onAdaptableReady={({ adaptableApi }) => {
          adaptableApi.eventApi.on('SelectionChanged', (args) => {
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
