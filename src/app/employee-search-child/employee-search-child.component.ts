import {Component, Input, OnInit} from '@angular/core';
import {Employee} from '../employee';
import {EmployeeService} from '../service/employee.service';

@Component({
  selector: 'app-employee-search-child',
  templateUrl: './employee-search-child.component.html',
  styleUrls: ['./employee-search-child.component.scss']
})
export class EmployeeSearchChildComponent implements OnInit {
  @Input() searched: Employee

  employees: Employee[]=[];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    debugger
    this.employeeService.getData()
      .subscribe(res => this.employees = res,
        error => console.log(error));
  }

  editEmployee(index) {
    this.employeeService.updateData(index)
  }

}
