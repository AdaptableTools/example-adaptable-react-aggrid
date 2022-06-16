import * as React from 'react';
import { Ref,  forwardRef} from 'react';
import {AgGridReact, AgGridReactProps} from "@ag-grid-community/react";
import {AllEnterpriseModules} from "@ag-grid-enterprise/all-modules";

export interface AgGridProps extends AgGridReactProps{
    gridRef?: Ref<AgGridReact>;
};

const modules = [...AllEnterpriseModules];

const AgGrid = forwardRef(({gridRef,gridOptions,...props}:AgGridProps,ref: Ref<HTMLDivElement>)=>{
    return (
        <div
            className="ag-theme-alpine" style={{ flex: 1 }}
            ref={ref}
        >
            <AgGridReact
                {...props}
                gridOptions={gridOptions}
                ref={gridRef}
                modules={modules}
            />
        </div>
    );
})

export {AgGrid};