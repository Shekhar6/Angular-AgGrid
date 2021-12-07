import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  //input  decorators for getting data from root component
  @Input() addItem;
  @Input() gender;
  @Input() roles;
  @Input() city;

//sending data to root component
  @Output() closeForm =new  EventEmitter<boolean>();

  @Output() addData = new EventEmitter<any>();

  @Output() updateData = new EventEmitter<any>();

  //formGroup
  form:any;

  //flag
  flag:boolean=true;

  ngOnInit(): void {
    
    if(this.addItem === undefined){
      this.flag = true;
    this.form = new FormGroup({
      FirstName: new FormControl('',Validators.required),
      LastName: new FormControl('',Validators.required),
      Role: new FormControl('',Validators.required),
      Gender:new FormControl('',Validators.required),
      Address:new FormControl('',Validators.required),
      City:new FormControl('',Validators.required),
      Email:new FormControl('',Validators.required)
    })
  }
  else {
    this.flag = false;
    console.log("flag",this.flag)
    this.form = new FormGroup({
      FirstName: new FormControl(this.addItem[0].firstName,Validators.required),
      LastName: new FormControl(this.addItem[0].lastName,Validators.required),
      Role: new FormControl(this.addItem[0].role,Validators.required),
      Gender:new FormControl(this.addItem[0].gender,Validators.required),
      Address:new FormControl(this.addItem[0].address,Validators.required),
      City:new FormControl(this.addItem[0].city,Validators.required),
      Email:new FormControl(this.addItem[0].email,Validators.required),
      id:new FormControl(this.addItem[0].id,)
    })

    /**firstName: 'shekhar', lastName: 'Patel', role: 'HR', gender: 'Male' */
  }
    
  }
  //adding data 
  onSubmit(){
    this.addData.emit(this.form.value);
    this.closeForm.emit(false);
  }
//toggle event
  close(){
    this.closeForm.emit(false);
  }

  //update
  onUpdate(){
    this.updateData.emit(this.form.value);
    this.form.reset();
    this.close();
  }
  
}
