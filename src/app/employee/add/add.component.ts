import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiDataService } from 'src/app/Services/api-data.service';

//Declaring interface model
export interface Employee {
  FirstName : string;

  LastName:string;

  Gender:string;

  Email:string;

  Role : string;

  City: string;
  
  Address : string;
  
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent  implements OnInit {

  //Declaring Reactive forms
  form = new FormGroup({
    firstName : new FormControl('',Validators.required),
    lastName : new FormControl('',Validators.required),
    email : new FormControl('',Validators.required),
    gender : new FormControl('',Validators.required),
    city : new FormControl('',Validators.required),
    address : new FormControl('',Validators.required),
    role : new FormControl('',Validators.required),
  });

  //updating data
  UserData :Employee;

   //storing gender info from api
   gender : [];

   //storing city info from api
   city : [];
 
   //storing roles info from api
   roles : [];

  constructor(
    public dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee,private apiData:ApiDataService
  ) {  }
  ngOnInit(): void {

    this.UserData =this.data;
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
    })
  }

//closing dialog 
  onNoClick(): void {
    this.dialogRef.close();
  }

}
