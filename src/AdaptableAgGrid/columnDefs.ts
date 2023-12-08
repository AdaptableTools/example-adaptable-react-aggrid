import { ColDef } from '@ag-grid-community/core';
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
    type: 'abColDefNumber',
    hide: true,
    editable: false,
  },
  {
    field: 'name',
    type: 'abColDefString',
    sortable: true,
  },

  {
    field: 'language',
    type: 'abColDefString',
    enablePivot: true,
    enableRowGroup: true,
  },
  {
    field: 'github_stars',
    headerName: 'GitHub Stars',
    type: 'abColDefNumber',
    enableValue: true,
  },
  {
    field: 'license',
    type: 'abColDefString',
    editable: false,
    enablePivot: true,
    enableRowGroup: true,
  },
  {
    field: 'week_issue_change',
    headerName: 'Issue Change',
    type: 'abColDefNumber',
    enableValue: true,
  },
  {
    field: 'created_at',
    headerName: 'Created',
    type: 'abColDefDate',
  },
  {
    field: 'has_wiki',
    headerName: 'Has Wiki',
    type: 'abColDefBoolean',
    enablePivot: true,
    enableRowGroup: true,
  },
  {
    field: 'updated_at',
    headerName: 'Updated',
    type: 'abColDefDate',
  },
  {
    field: 'pushed_at',
    headerName: 'Pushed',
    type: 'abColDefDate',
  },
  {
    field: 'github_watchers',
    headerName: 'GitHub Watchers',
    type: 'abColDefNumber',
    enableValue: true,
  },
  {
    field: 'description',
    type: 'abColDefString',
    sortable: false,
  },
  {
    field: 'open_issues_count',
    headerName: 'Open Issues',
    type: 'abColDefNumber',
    enableValue: true,
  },
  {
    field: 'closed_issues_count',
    headerName: 'Closed Issues',
    type: 'abColDefNumber',
    enableValue: true,
  },

  {
    field: 'open_pr_count',
    headerName: 'Open PRs',
    type: 'abColDefNumber',
    enableValue: true,
  },
  {
    field: 'closed_pr_count',
    headerName: 'Closed PRs',
    type: 'abColDefNumber',
    enableValue: true,
  },
  { field: 'has_projects', headerName: 'Has Projects', type: 'abColDefBoolean' },
  { field: 'has_pages', headerName: 'Has Pages', type: 'abColDefBoolean' },
  {
    field: 'topics',
    type: 'abColDefString',
    editable: false,
    sortable: false,
  },
];
