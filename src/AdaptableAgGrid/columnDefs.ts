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
    type: 'number',
    hide: true,
    editable: false,
  },
  {
    field: 'name',
    type: 'text',
    sortable: true,
  },

  {
    field: 'language',
    type: 'text',
    enablePivot: true,
    enableRowGroup: true,
  },
  {
    field: 'github_stars',
    headerName: 'GitHub Stars',
    type: 'number',
    enableValue: true,
  },
  {
    field: 'license',
    type: 'text',
    editable: false,
    enablePivot: true,
    enableRowGroup: true,
  },
  {
    field: 'week_issue_change',
    headerName: 'Issue Change',
    type: 'number',
    enableValue: true,
  },
  {
    field: 'created_at',
    headerName: 'Created',
    type: 'date',
  },
  {
    field: 'has_wiki',
    headerName: 'Has Wiki',
    type: 'boolean',
    enablePivot: true,
    enableRowGroup: true,
  },
  {
    field: 'updated_at',
    headerName: 'Updated',
    type: 'date',
  },
  {
    field: 'pushed_at',
    headerName: 'Pushed',
    type: 'date',
  },
  {
    field: 'github_watchers',
    headerName: 'GitHub Watchers',
    type: 'number',
    enableValue: true,
  },
  {
    field: 'description',
    type: 'text',
    sortable: false,
  },
  {
    field: 'open_issues_count',
    headerName: 'Open Issues',
    type: 'number',
    enableValue: true,
  },
  {
    field: 'closed_issues_count',
    headerName: 'Closed Issues',
    type: 'number',
    enableValue: true,
  },

  {
    field: 'open_pr_count',
    headerName: 'Open PRs',
    type: 'number',
    enableValue: true,
  },
  {
    field: 'closed_pr_count',
    headerName: 'Closed PRs',
    type: 'number',
    enableValue: true,
  },
  { field: 'has_projects', headerName: 'Has Projects', type: 'boolean' },
  { field: 'has_pages', headerName: 'Has Pages', type: 'boolean' },
  {
    field: 'topics',
    type: 'text',
    editable: false,
    sortable: false,
  },
];
