import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.scss']
})
export class EmployeeCreateComponent implements OnInit {

  employeeForm: FormGroup

  constructor(private eform: FormBuilder) {

    this.employeeForm =this.eform.group({
      lastName: new FormControl('', [Validators.required]),
      firstName: '',
      gender: new FormControl('',[Validators.required]),
      company: '',
      department: '',
      email: new FormControl('',[Validators.required, Validators.email]),
      phones: this.eform.array([]
              ,new FormControl('', [Validators.required, Validators.minLength(10)])),
      dateOfBirth: new FormControl('',[Validators.required]),
      address: '',
      photoPath:'',
      isActive: '',
    })

  }

  ngOnInit() {

  }




  // saveEmployee(empForm: NgForm): void {
  //   console.log(empForm.value)
  // }

  saveEmployeeFormGroup(){
    console.log(this.employeeForm)
  }


}
