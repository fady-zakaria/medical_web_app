import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

export default function Table(props) {
    
  return (
        <DataGrid
        rows={props.rows}
        columns={props.columns}
        pageSize={8}
        checkboxSelection
        disableSelectionOnClick
      />
   
  );
}
