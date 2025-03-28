import * as React from 'react';
import { useMemo } from 'react';
import { LicenseManager, GridOptions } from 'ag-grid-enterprise';
import {
  Adaptable,
  AdaptableApi,
  AdaptableButton,
  AdaptableOptions,
  AdaptableStateFunctionConfig,
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
      theme: 'legacy',
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
              context.adaptableApi.filterApi.gridFilterApi.openUIEditorForGridFilter(
                'CONTAINS([language],"type")'
              );
            },
          },
        ],
      },
      // Typically you will store State remotely; here we simply leverage local storage for convenience
      stateOptions: {
        persistState: (state, adaptableStateFunctionConfig) => {
          localStorage.setItem(
            adaptableStateFunctionConfig.adaptableStateKey,
            JSON.stringify(state)
          );
          return Promise.resolve(true);
        },
        loadState: (config: AdaptableStateFunctionConfig) => {
          return new Promise((resolve) => {
            let state = {};
            try {
              state = JSON.parse(localStorage.getItem(config.adaptableStateKey) as string) || {};
            } catch (err) {
              console.log('Error loading state', err);
            }
            resolve(state);
          });
        },
      },
      initialState: {
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
        Layout: {
          CurrentLayout: 'Basic',
          Layouts: [
            {
              Name: 'Basic',
              TableColumns: [
                'name',
                'language',
                'github_stars',
                'license',
                'week_issue_change',
                'created_at',
                'has_wiki',
                'updated_at',
                'pushed_at',
                'github_watchers',
                'description',
                'open_issues_count',
                'closed_issues_count',
                'open_pr_count',
                'closed_pr_count',
              ],
            },
            {
              Name: 'Sorted',
              TableColumns: [
                'name',
                'language',
                'github_stars',
                'license',
                'open_issues_count',
                'closed_issues_count',
                'open_pr_count',
                'closed_pr_count',
              ],
              ColumnSorts: [
                {
                  ColumnId: 'license',
                  SortOrder: 'Asc',
                },
                {
                  ColumnId: 'language',
                  SortOrder: 'Desc',
                },
              ],
            },
            {
              Name: 'Row Grouped',
              TableColumns: [
                'name',
                'github_stars',
                'open_issues_count',
                'closed_issues_count',
                'open_pr_count',
                'closed_pr_count',
                'open_issues_count',
                'closed_issues_count',
              ],
              RowGroupedColumns: ['license', 'language'],
            },
            {
              Name: 'Pivot',
              PivotColumns: ['language'],
              PivotGroupedColumns: ['license'],
              AggregationColumns: {
                github_stars: 'sum',
              },
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
        adaptableOptions={adaptableOptions}
        modules={[...agGridModules]}
        onAdaptableReady={({ adaptableApi }) => {
          // save a reference to adaptable api
          adaptableApiRef.current = adaptableApi;
        }}
      >
        <div style={{ display: 'flex', flexFlow: 'column', height: '100vh' }}>
          <Adaptable.UI style={{ flex: 'none' }} />
          <Adaptable.AgGridReact className="ag-theme-alpine" />
        </div>
      </Adaptable.Provider>
    </div>
  );
};
