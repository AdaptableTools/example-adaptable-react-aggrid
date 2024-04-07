import * as React from 'react';
import { useMemo } from 'react';
import { GridOptions } from '@ag-grid-community/core';
import { LicenseManager } from '@ag-grid-enterprise/core';
import {
  Adaptable,
  AdaptableApi,
  AdaptableButton,
  AdaptableOptions,
  CustomToolbarButtonContext,
  CustomToolPanelButtonContext,
  ToolPanelButtonContext,
} from '@adaptabletools/adaptable-react-aggrid';
import { columnDefs, defaultColDef } from './columnDefs';
import { WebFramework, rowData } from './rowData';
import { agGridModules } from './agGridModules';
import { CustomSettingsPanel } from '../CustomSettingsPanel.tsx';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { QuickSearchCustomComponent } from '../QuickSearchCustomComponent.tsx';
import { counterSelector, storeRedux } from '../store-redux.ts';

LicenseManager.setLicenseKey(import.meta.env.VITE_AG_GRID_LICENSE_KEY);

const CONFIG_REVISION = 1;

export const AdaptableAgGrid = () => {
  const gridOptions = useMemo<GridOptions<WebFramework>>(
    () => ({
      defaultColDef,
      columnDefs,
      rowData,
      sideBar: true,
      statusBar: {
        statusPanels: [
          { statusPanel: 'agTotalRowCountComponent', align: 'left' },
          { statusPanel: 'agFilteredRowCountComponent' },
          {
            key: 'Center Panel',
            statusPanel: 'AdaptableStatusPanel',
            align: 'center',
          },
        ],
      },

      suppressMenuHide: true,
      enableRangeSelection: true,
      enableCharts: true,
    }),
    []
  );
  const adaptableOptions = useMemo<AdaptableOptions<WebFramework>>(
    () => ({
      licenseKey: import.meta.env.VITE_ADAPTABLE_LICENSE_KEY,
      primaryKey: 'id',
      userName: 'Test User',
      adaptableId: 'Adaptable React Demo',
      adaptableStateKey: 'adaptable_react_demo',
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
                  _button: AdaptableButton<CustomToolbarButtonContext>,
                  context: CustomToolbarButtonContext
                ) => {
                  context.adaptableApi.settingsPanelApi.openCustomSettingsPanel('Custom Settings');
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
                <Provider store={storeRedux}>
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
                  _button: AdaptableButton<CustomToolPanelButtonContext>,
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
            label: 'Grid Filter Popup',
            icon: {
              src: 'https://img.icons8.com/glyph-neue/64/000000/zoom-in.png',
            },
            buttonStyle: {
              variant: 'outlined',
              // tone: 'accent',
            },
            onClick: (
              _button: AdaptableButton<ToolPanelButtonContext>,
              context: ToolPanelButtonContext
            ) => {
              context.adaptableApi.gridFilterApi.openUIEditorForGridFilter(
                'CONTAINS([language],"type")'
              );
            },
          },
        ],
      },
      predefinedConfig: {
        Dashboard: {
          Revision: CONFIG_REVISION,
          Tabs: [
            {
              Name: 'Welcome',
              Toolbars: ['GithubRepo', 'CustomSettingsPanel', 'CustomQuickSearch'],
            },
          ],
        },
        StatusBar: {
          Revision: CONFIG_REVISION,
          StatusBars: [
            {
              Key: 'Center Panel',
              StatusBarPanels: ['Theme', 'Layout'],
            },
          ],
        },
      },
    }),
    []
  );

  const adaptableApiRef = React.useRef<AdaptableApi>();

  const count = useSelector(counterSelector);
  const dispatch = useDispatch();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => dispatch({ type: 'counter/incremented' })}>increment</button>
        <button onClick={() => dispatch({ type: 'counter/decremented' })}>decrement</button>
        <b style={{ marginLeft: 10 }}>{count}</b>
      </div>
      <Adaptable.Provider
        gridOptions={gridOptions}
        modules={agGridModules}
        adaptableOptions={adaptableOptions}
        onAdaptableReady={({ adaptableApi }) => {
          // save a reference to adaptable api
          adaptableApiRef.current = adaptableApi;
        }}
      >
        <Adaptable.UI />

        <div style={{ flex: 1 }} className="ag-theme-alpine">
          <Adaptable.AgGridReact />
        </div>
      </Adaptable.Provider>
    </div>
  );
};
