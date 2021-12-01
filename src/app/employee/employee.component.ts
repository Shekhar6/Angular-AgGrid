import { AddComponent } from './add/add.component';
import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ApiDataService } from '../Services/api-data.service';
import { MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  //Declaring columns for display in Ag-Grid

  columnDefs: ColDef[] = [
    { field: 'firstName',filter:true,sortable:true,editable:true  },
    { field: 'lastName',filter:true,sortable:true,editable:true },
    { field: 'email',filter:true,sortable:true,editable:true },
    {field:'gender',filter:true,sortable:true,editable:true },
    {field:'address',filter:true,sortable:true,editable:true },
    {field: 'role',editable:true,sortable:true,filter:true },
    {field: 'city',editable:true,sortable:true,filter:true },
];


//Declaring an array for storing row data from api
rowData = [];

  // PROPERTIES
  // Objects like myRowData and myColDefs would be created in your application
gridOptions = {
  
  rowData: this.rowData,
  columnDefs: this.columnDefs,
  rowSelection: 'multiple',
  // CALLBACKS
  getRowHeight: (params) => 50
}

//constructor

constructor(private apiData:ApiDataService,public dialog: MatDialog) {
  
}

//reading data whenever componet rendered
  ngOnInit(): void {
    this.apiData.getData().subscribe(res => {
      this.rowData = res;
    })
  }


//Updating selected cell data
  onCellEditingStarted(event){
    //const dialogRef = this.dialog.open(AddComponent, {width: '500px', data : event.data});
    console.log(event.data);
    this.apiData.postData(event.data).subscribe(e => console.log(e));
  }

//Deleting selected row data in grid 

  OnDeleteRow(agGrid){
    var selectedData = agGrid.api.getSelectedRows();

    agGrid.api.updateRowData({ remove: selectedData });
   // console.log(selectedData);

    this.apiData.deleteData(selectedData[0].id).subscribe(res => {
      //console.log(res);
    })

    
  }

  //Inserting new Data
  OpenDialog(agGrid): void {
    const dialogRef = this.dialog.open(AddComponent, {width: '500px',});

    dialogRef.afterClosed().subscribe(result => 
      {
       //console.log(result);
       this.apiData.postData(result).subscribe(res => console.log('api',res));
       agGrid.api.updateRowData({ add:[result] });
      });
  }
}
