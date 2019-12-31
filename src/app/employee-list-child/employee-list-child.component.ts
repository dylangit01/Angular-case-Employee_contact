import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Employee} from '../employee';
import {Router} from '@angular/router';
import {EmployeeService} from '../service/employee.service';

@Component({
  selector: 'app-employee-list-child',
  templateUrl: './employee-list-child.component.html',
  styleUrls: ['./employee-list-child.component.scss']
})
export class EmployeeListChildComponent implements OnInit {
  employees: Employee[] = [];

  @Input() forEmployee: Employee;
  @Output() deleteEmployee: EventEmitter<Employee>;

  constructor(private router: Router,
              private employeeService: EmployeeService) {
    this.deleteEmployee = new EventEmitter<Employee>();

  }

  ngOnInit() {
    this.employeeService.getData()
      .subscribe(res => this.employees = res,
        error => console.log(error));
  }

  viewEmployee(index: Employee) {
    // console.log(index.id)
    this.router.navigate(['/employee', index.id]);
  }

// delete 函数在child 页面执行后，页面不自动刷新了？
// Answer: have to use Output to achieve it, as it's the child component
  deleteEmployeeFn() {
    this.deleteEmployee.emit(this.forEmployee);
  }

  editEmployee(index: Employee) {
    this.router.navigate(['/edit', index.id]);
    // [{'editOrCreate': 1}]) 在navigate里面再添加需要修改的值，然后再搜索如何用service实现通信

  }

}
