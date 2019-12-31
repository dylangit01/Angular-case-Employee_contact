import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EmployeeService} from '../service/employee.service';
import {Employee} from '../employee';


@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Employee;
  private employees: Employee[];
  private id: number;

  constructor(private route: ActivatedRoute,
              private employeeService: EmployeeService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id');//-->"+"change to number type
      // console.log('id', this.id);
      this.employeeService.getData(this.id).subscribe(res => this.employee = <Employee> res,
        error => console.log('Error occurred>', error));
    });

    //this is for viewNextEmployee function to get employees array's length
    this.employeeService.getData().subscribe(res => this.employees =res)
  }

  viewNextEmployee() {
    // debugger
    if(this.id >= this.employees.length){
      this.id = 0
    }
    this.id = this.id + 1  //why "++" not working?
    this.router.navigate(['/employee', this.id]);
    // console.log(this.id)
  }
}
