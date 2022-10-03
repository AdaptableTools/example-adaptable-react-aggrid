# AdapTable React Example App

This example app shows a demo instance of [AdapTable React](https://docs.adaptabletools.com/guide/react-overview).

## Versions and Dependencies

The demo is built using these key packages:

- [React](https://github.com/facebook/react) version 18.x
- [Adaptable](https://docs.adaptabletools.com/) version 13.x
- [AG Grid](https://www.ag-grid.com) version 28.x

## AdapTable React Custom Components

The main benefit of using AdapTable React is that it allows you to supply custom components in AdapTable in a React-friendly way.

> For full information on how to install and use AdapTable React see the [AdapTable Documentation](https://docs.adaptabletools.com/guide/react-overview).

This demo showcases 3 React-specific features of AdapTable:

### Settings Panel

The demo illustrates how to pass custom React components to the [Settings Panel](https://docs.adaptabletools.com/guide/ui-settings-panel):

```ts
const adaptableOptions: AdaptableOptions = {
    // ...
    settingsPanelOptions: {
        customSettingsPanels: [
            {
                // CUSTOM SETTINGS PANEL COMPONENT
                frameworkComponent: CustomSettingsPanel,
                name: 'Custom Settings',
            }
        ]
    }
    // ...
}
```

### Tool Panel

The demo illustrates how to pass custom React components to the [Tool Panel](https://docs.adaptabletools.com/guide/ui-tool-panel):

```tsx
const adaptableOptions: AdaptableOptions = {
    // ...
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
            }]
    }
    // ...
}
```

### Custom Toolbar
The demo illustrates how to pass custom React components to the [Dashboard Toolbar](https://docs.adaptabletools.com/learn/ui-dashboard#tabs-and-toolbars):

```tsx
const adaptableOptions: AdaptableOptions = {
    // ...
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
    }
    // ...
}
```

> For more information on how to use React Components in AdapTable see the [AdapTable Documentation](https://docs.adaptabletools.com/guide/react-custom-components).

### Installation

Run `npm install` (or `yarn`), depending on what tool you're using.

### Running for development

Execute the following command

```sh
$ npm run start
```

## Licences

A licence for AdapTable provides access to all product features as well as quarterly updates and enhancements through the lifetime of the licence, comprehensive support, and access to all 3rd party libraries.

We can make a trial licence available for a short period of time to allow you to try out AdapTable for yourself.

Please contact [`sales@adaptabletools.com`](mailto:sales@adaptabletools.com) or read the [Licence Documentation](https://docs.adaptabletools.com/guide/licensing) for more information.

## Demo

To see AdapTable React in action visit [Adaptable Documentation](https://docs.adaptabletools.com/) which contains a large number of small demos each showing a different feature, function or option in AdapTable React (using dummy data sets).

Additionally, there is a page with larger 'recipe-type' Demos at the [Adaptable Tools website](https://www.adaptabletools.com/demos).

## Help

Developers can learn how to access AdapTable React programmatically at [AdapTable Documentation](https://docs.adaptabletools.com).

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com)

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a Support Ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
