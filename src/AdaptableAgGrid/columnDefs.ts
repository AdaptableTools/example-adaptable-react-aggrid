import { ColDef } from 'ag-grid-enterprise';
import { WebFramework } from './rowData';

export const defaultColDef: ColDef = {
  resizable: true,
  sortable: true,
  editable: true,
  filter: true,
  floatingFilter: true,
};

export const columnDefs: ColDef<WebFramework>[] = [
  {
    field: 'id',
    cellDataType: 'number',
    hide: true,
    editable: false,
  },
  {
    field: 'name',
    cellDataType: 'text',
    sortable: true,
  },

  {
    field: 'language',
    cellDataType: 'text',
    enablePivot: true,
    enableRowGroup: true,
  },
  {
    field: 'github_stars',
    headerName: 'GitHub Stars',
    cellDataType: 'number',
    enableValue: true,
  },
  {
    field: 'license',
    cellDataType: 'text',
    editable: false,
    enablePivot: true,
    enableRowGroup: true,
  },
  {
    field: 'week_issue_change',
    headerName: 'Issue Change',
    cellDataType: 'number',
    enableValue: true,
  },
  {
    field: 'created_at',
    headerName: 'Created',
    cellDataType: 'date',
  },
  {
    field: 'has_wiki',
    headerName: 'Has Wiki',
    cellDataType: 'boolean',
    enablePivot: true,
    enableRowGroup: true,
  },
  {
    field: 'updated_at',
    headerName: 'Updated',
    cellDataType: 'date',
  },
  {
    field: 'pushed_at',
    headerName: 'Pushed',
    cellDataType: 'date',
  },
  {
    field: 'github_watchers',
    headerName: 'GitHub Watchers',
    cellDataType: 'number',
    enableValue: true,
  },
  {
    field: 'description',
    cellDataType: 'text',
    sortable: false,
  },
  {
    field: 'open_issues_count',
    headerName: 'Open Issues',
    cellDataType: 'number',
    enableValue: true,
  },
  {
    field: 'closed_issues_count',
    headerName: 'Closed Issues',
    cellDataType: 'number',
    enableValue: true,
  },

  {
    field: 'open_pr_count',
    headerName: 'Open PRs',
    cellDataType: 'number',
    enableValue: true,
  },
  {
    field: 'closed_pr_count',
    headerName: 'Closed PRs',
    cellDataType: 'number',
    enableValue: true,
  },
  { field: 'has_projects', headerName: 'Has Projects', cellDataType: 'boolean' },
  { field: 'has_pages', headerName: 'Has Pages', cellDataType: 'boolean' },
  {
    field: 'topics',
    cellDataType: 'text',
    editable: false,
    sortable: false,
  },
];
