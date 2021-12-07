import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ApiDataService } from '../Services/api-data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  isValid : boolean = false;


  gender:any;
  roles:any;
  city:any;

  editData:any;
  
  //Declaring columns for display in Ag-Grid

  columnDefs: ColDef[] = [
    { field: 'firstName',filter:true,sortable:true,editable:true , checkboxSelection: true,cellRenderer:(param) => {return `<a href="details/${param.value}" routerLink="details/${param.value}">`+param.value+`</a>`} },
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
  rowSelection: 'single',
  // CALLBACKS
  getRowHeight: (params) => 50
}

//constructor

constructor(private apiData:ApiDataService,private route: Router) {
  
}

//reading data whenever componet rendered
  ngOnInit(): void {
    this.getData();
    //reading city info
    this.apiData.getCity().subscribe(res => {
      this.city = res;
     
    })
    //reading roles info
    this.apiData.getRoles().subscribe(res => {
      this.roles = res;
     
    })

    //reading gender info
    this.apiData.getGender().subscribe(res => {
      this.gender = res;
      console.log(this.gender)
    })
  }
//getting data
  getData(){
    this.apiData.getData().subscribe(res => {
      this.rowData = res;
      console.log(res);
    })
  }

//Updating selected cell data
  onCellEditingStarted(event){
    console.log("selected",event.data);
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
  OpenDialog(): void {

    this.isValid = !this.isValid
  }

  //Search implementation
    onQuickFilterChanged(grid,event){
    grid.api.setQuickFilter(event.target.value);
  }

  //Editing Data
  edit(agGrid){
    var data = agGrid.api.getSelectedRows();
    this.editData = data;
    this.isValid = !this.isValid;

    console.log(data);
    
  }

  //Adding data 
  addEmployee(data : any){    
    this.apiData.postData(data).subscribe(res =>
      { 
        this.getData();
        console.log(res)
      });
   
  }

  //Updating data
  onUpdate(data:any):void{
    this.apiData.puttData(data).subscribe(res => {
      console.log(res);
    })
    this.getData();
  }

  //Cancel
  cancel(value){
    this.isValid = value;
  }
}

