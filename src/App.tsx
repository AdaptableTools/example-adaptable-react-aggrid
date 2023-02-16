import * as React from 'react';
import { useState } from 'react';
import { createRoot } from 'react-dom/client';

// import Adaptable Component and other types
import AdaptableReact, {
  AdaptableApi,
  AdaptableButton,
  AdaptableOptions,
  CustomToolbarButtonContext,
  CustomToolPanelButtonContext,
  ToolPanelButtonContext,
} from '@adaptabletools/adaptable-react-aggrid';

// import agGrid Component
import { AgGridReact } from '@ag-grid-community/react';

// some types
import { ColDef, GridOptions, Module } from '@ag-grid-community/core';

// and all the modules we need
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { SideBarModule } from '@ag-grid-enterprise/side-bar';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import { StatusBarModule } from '@ag-grid-enterprise/status-bar';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { RichSelectModule } from '@ag-grid-enterprise/rich-select';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';
import { GridChartsModule } from '@ag-grid-enterprise/charts';
import { SparklinesModule } from '@ag-grid-enterprise/sparklines';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';

// import adaptable css and themes
import '@adaptabletools/adaptable-react-aggrid/base.css';
import '@adaptabletools/adaptable-react-aggrid/themes/light.css';
import '@adaptabletools/adaptable-react-aggrid/themes/dark.css';

// import aggrid themes (using new Alpine theme)
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';

import { CustomSettingsPanel } from './CustomSettingsPanel';

import finance from '@adaptabletools/adaptable-plugin-finance';
import openfin from '@adaptabletools/adaptable-plugin-openfin';
import { Provider, useDispatch } from 'react-redux';
import { counterSelector, store } from './store';
import { useSelector } from 'react-redux';
import { Car, rowData } from './rowData';

const RECOMMENDED_MODULES: Module[] = [
  ClientSideRowModelModule,
  SideBarModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  StatusBarModule,
  MenuModule,
  RangeSelectionModule,
  RichSelectModule,
  ExcelExportModule,
  GridChartsModule,
  SparklinesModule,
  RowGroupingModule,
  ClipboardModule,
];

const QuickSearchCustomComponent = (props: any) => {
  const [searchText, setSearchText] = useState('');
  const count = useSelector(counterSelector);
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
      <div>Counter {count}</div>
    </div>
  );
};
// create ag-Grid Column Definitions
const columnDefs: ColDef<Car>[] = [
  {
    colId: 'id',
    hide: true,
    suppressColumnsToolPanel: true,
    suppressFiltersToolPanel: true,
    type: 'abColDefNumber',
  },
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

// let ag-grid know which columns and what data to use and add some other properties
const gridOptions: GridOptions<Car> = {
  defaultColDef: {
    enablePivot: true,
    enableRowGroup: true,
    enableValue: true,
  },
  statusBar: {
    statusPanels: [],
  },
  columnDefs: columnDefs,
  rowData: rowData,
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
      },
    ],
  },
  dashboardOptions: {
    customToolbars: [
      {
        name: 'GithubRepo',
        title: 'Github Repo',
        showConfigureButton: false,
        toolbarButtons: [
          {
            label: 'See Source Code',
            buttonStyle: {
              variant: 'raised',
              tone: 'info',
            },
            icon: {
              src: 'https://www.pngkey.com/png/full/178-1787243_github-icon-png-github-icon-white-png.png',
              style: {
                width: 24,
                height: 24,
              },
            },
            onClick: () => {
              (window as any)
                ?.open(
                  'https://github.com/AdaptableTools/example-adaptable-react-aggrid',
                  '_blank'
                )
                .focus();
            },
          },
        ],
      },
      {
        name: 'CustomSettingsPanel',
        title: 'Custom Settings Panel',
        showConfigureButton: false,
        toolbarButtons: [
          {
            label: 'Open Custom Settings Panel',
            buttonStyle: {
              variant: 'raised',
              tone: 'accent',
            },
            onClick: (
              button: AdaptableButton<CustomToolbarButtonContext>,
              context: CustomToolbarButtonContext
            ) => {
              // context.adaptableApi.settingsPanelApi.openCustomSettingsPanel(
              //   'Custom Settings'
              // );
            },
          },
        ],
      },
      {
        // CUSTOM TOOLBAR COMPONENT
        // wraps a reusable React component (same component is used in a custom tool panel)
        name: 'CustomQuickSearch',
        title: 'Custom Quick Search',
        frameworkComponent: ({ adaptableApi }) => {
          return (
            <Provider store={store}>
              <QuickSearchCustomComponent
                onSearchTextChange={(searchText: string) => {
                  adaptableApi.quickSearchApi.runQuickSearch(searchText);
                }}
              />
            </Provider>
          );
        },
      },
    ],
  },
  toolPanelOptions: {
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
        buttons: [
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
    customButtons: [
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
          // context.adaptableApi.queryApi.openQuerySettingsPanel();
        },
      },
    ],
  },
  predefinedConfig: {
    Dashboard: {
      Tabs: [
        {
          Name: 'Welcome',
          Toolbars: ['GithubRepo', 'CustomSettingsPanel', 'CustomQuickSearch'],
        },
      ],
    },
    ToolPanel: {
      Revision: Date.now(),
    },
  },
  plugins: [finance(), openfin()],
};

const renderWeakMap: WeakMap<HTMLElement, any> = new WeakMap();

// Create the AdapTable inastance by using the AdapTableReact component
// And also create the ag-Grid instance by using the AgGridReact component
// NOTE: we pass the SAME gridOptions object into both
const App: React.FC = () => {
  const [adaptableApi, setAdaptableApi] = React.useState<AdaptableApi | null>(
    null
  );

  React.useEffect(() => {
    // safe to start using adaptable api
    // console.log({ adaptableApi });
  }, [adaptableApi]);

  const count = useSelector(counterSelector);
  const dispatch = useDispatch();
  return (
    <div style={{ display: 'flex', flexFlow: 'column', height: '100vh' }}>
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => dispatch({ type: 'counter/incremented' })}>
          increment
        </button>
        <button onClick={() => dispatch({ type: 'counter/decremented' })}>
          decrement
        </button>
        <b style={{ marginLeft: 10 }}>{count}</b>
      </div>
      <AdaptableReact
        style={{ flex: 'none' }}
        renderReactRoot={(node, container) => {
          let root = renderWeakMap.get(container);

          if (!root) {
            renderWeakMap.set(container, (root = createRoot(container)));
          }

          root.render(node);

          return () => {
            root.unmount();
          };
        }}
        gridOptions={gridOptions}
        adaptableOptions={adaptableOptions}
        onAdaptableReady={({ adaptableApi }) => {
          adaptableApi.eventApi.on('SelectionChanged', (args) => {
            console.warn(args);
          });

          setAdaptableApi(adaptableApi);
        }}
      />
      <div className="ag-theme-alpine" style={{ flex: 1 }}>
        <AgGridReact gridOptions={gridOptions} modules={RECOMMENDED_MODULES} />
      </div>
    </div>
  );
};

export default App;
