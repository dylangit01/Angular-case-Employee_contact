import {Component, OnInit} from '@angular/core';
import {Employee} from '../employee';
import {EmployeeService} from '../service/employee.service';
import {Observable} from 'rxjs';

@Component({
  // selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  errorMsg: string = '';

  searchByName: string;
  searchByDepartment: string;
  searchedEmployee: Employee[] = [];
  emptySearchResult: boolean = false;

  constructor(private employeeService: EmployeeService,
  ) {
    // console.log('employeeList->component loading-222...')
  }

  ngOnInit() {
    // console.log('employeeList->component loading...')
    this.employeeService.getData()
      .subscribe(res => this.employees = res,
        error => this.errorMsg = error.message);
    // console.log(this.employees) //这一行打印是没有东西的，因为系统异步
  }

  searchByNameFn() {
    this.employees.forEach(data => {
      if (data.firstName.toLowerCase() === this.searchByName.toLowerCase()) {
        this.searchedEmployee.push(data);
      }
    });

    if (this.searchedEmployee.length === 0) {
      this.emptySearchResult = true;
    } else {
      this.emptySearchResult = false;
    }
    // clear search result
    this.searchByName = '';
  }


  searchByDepartmentFn() {
    this.searchedEmployee = this.employees;
    this.searchedEmployee = this.employees.filter(list => {
      return (String(list.department.toLowerCase()) === String(this.searchByDepartment.toLowerCase()));
    });

    if (this.searchedEmployee.length === 0) {
      this.emptySearchResult = true;
    } else {
      this.emptySearchResult = false;
    }
    this.searchByName = '';
    this.searchByDepartment = '';
  }

  removeEmployee(index:Employee){
    this.employeeService.deleteData(index).subscribe(data => {
      console.log('Delete Request is successful ', data);
    }, error => {
      console.log('error', error);
    });
    this.employees = this.employees.filter(newList => {
      return newList.id !== index.id;
    });
  }

  onKeypress(event:any){
    console.log(event)
  }



}
