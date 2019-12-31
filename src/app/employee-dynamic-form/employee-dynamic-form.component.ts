import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Employee} from '../employee';
import {EmployeeService} from '../service/employee.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-employee-dynamic-form',
  templateUrl: './employee-dynamic-form.component.html',
  styleUrls: ['./employee-dynamic-form.component.scss']
})
export class EmployeeDynamicFormComponent implements OnInit {

  employeeDynamicForm: FormGroup;
  employeeList: Employee[] = []; //为OnInit：函数里刷新页面而设置的
  employee: Employee;
  // mockData: string;
  private id: number;
  updateStatus: boolean = false;

  private url = 'http://localhost:3000/employee';

  constructor(private eDynamicForm: FormBuilder,
              private employeeService: EmployeeService,
              private route: ActivatedRoute) {

    this.employeeDynamicForm = this.eDynamicForm.group({
        id: 0,
        lastName: new FormControl('', [Validators.required]),
        firstName: '',
        gender: new FormControl('', [Validators.required]),
        company: '',
        department: '',
        email: new FormControl('', [Validators.required, Validators.email]),
        //如何validate phones？
        phones: this.eDynamicForm.array([],
          new FormControl('', [Validators.required, Validators.minLength(10)])),
        dateOfBirth: new FormControl('', [Validators.required]),
        address: '',
        photoPath: '',
        isActive: '',
      });
    //how to get database array object like below from service?
    // this.mockData = '{"lastName":"Linx","firstName":"Apple","gender":"Male","company":"Mark2win","department":"IT","email":"123@mark.com","phones":[{"area":"001","prefix":"647","line":"3849056"},{"area":"001","prefix":"416","line":"3845620"}],"dateOfBirth":"","address":"123 Toronto Rd","photoPath":"","isActive":"false"}';
  }

  ngOnInit() {
    //这里即便是在ngOnInit里面，console.log()也是打印不出来的，这就是异步的执行方式，
    // 系统在执行getData后，立刻执行了console.log，然后回头再去找数据
    this.employeeService.getData()
      .subscribe(res => this.employeeList = res,
        error => console.log(error));
    // console.log(this.employeeList);


    // let employeeObj: Employee = JSON.parse(this.mockData) as Employee;
    // console.log('json parse', employeeObj);
    //
    // this.employeeDynamicForm.patchValue(employeeObj);
    //
    // employeeObj.phones.forEach(items => {
    //   const {area, prefix, line} = items;
    //   let phone = this.eDynamicForm.group({
    //     area,
    //     prefix,
    //     line,
    //   });
    //   this.phonesControl.push(phone);
    // });

    //展示如何点击Edit后找到对应的Id, 并且把对应的数据显示在Form里面，
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id');//-->"+"change to number type
      // console.log('id', this.id);
      this.employeeService.getData(this.id).subscribe(res => {
          //那我要怎么样才能patch进employee的值啊？ answer: 要写在subscribe里面！！！！！！
          this.employee = <Employee> res;
          this.employeeDynamicForm.patchValue(this.employee);
        },
        error => console.log('Error occurred>', error));
    });


  }


  // replace ngFor for phoneList in view:
  get phonesControl() {
    // return this.employeeDynamicForm.get('phones') as FormArray  // (same as below)
    return <FormArray> this.employeeDynamicForm.get('phones');
  }

  addPhones() {
    let phoneValue = this.eDynamicForm.group({
      area: '',
      prefix: '',
      line: ''
    });
    this.phonesControl.push(phoneValue);
  }

  deletePhones(index: number) {
    this.phonesControl.removeAt(index);
  }

  // createNewEmployeeWithoutService() {
  // if(this.employeeDynamicForm.valid) {
  //   this.httpEmployee.post(`${this.url}`, this.employeeDynamicForm.value).subscribe(data => {
  //     console.log('Post request succeed', data);
  //   }, error => {
  //     console.log(error);
  //   });
  // }

  //括号里传入的是dynamic Form 的 value，不是整个表
  createNewEmployee(newEmployee: any) {
    console.log(this.employeeDynamicForm);
    this.employeeService.createData(newEmployee.value).subscribe(data => {
      console.log('Post request succeed', data);
    }, error => {
      console.log(error);
    });
    this.employeeList.push(newEmployee.value);
  }

  updateEmployeeFn(updatedEmployee: any) {
    this.employeeService.updateData(updatedEmployee.value).subscribe(data => {
      console.log('Update request succeed', data);
    }, error => console.log(error));
    this.employeeList.push(updatedEmployee.value);
  }

  updateAvailable() {
    this.updateStatus = !this.updateStatus
  }


}









