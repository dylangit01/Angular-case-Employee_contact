import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Employee} from '../employee';
import {Observable} from 'rxjs';


const url_Employee = `http://localhost:3000/employee`;

@Injectable()
export class EmployeeService {

  constructor(private httpEmployee: HttpClient) {
  }

//getData 括号里的"？" 是指safety property operator
  // get 不能指定具体的函数，因为返回值既有可能是数列，也有可能是数列里面的object
  getData(id?: number): Observable<any> {//这里Observable<>里不能填写"Employee"这个object，否则在list页面套用这个函数时，会出错，因为list页得出的是Employee List。
    let serviceURL = url_Employee; //这一步很重要，不然会更改基本的url
    if (id && id >= 0) {
      serviceURL = `${url_Employee}/${id}`;  //string interpolation
    }
    // let err = new Error();
    // console.log(err.stack);//一种显示错误信息的方式
    return this.httpEmployee.get(`${serviceURL}`) as Observable<Employee>;
  }

  createData(newEmployee: Employee): Observable<Employee> {
    return this.httpEmployee.post(`${url_Employee}`, newEmployee) as Observable<Employee>;
  }

  updateData(updatedEmployee: Employee): Observable<Employee> {
    return this.httpEmployee.put(`${url_Employee}/${updatedEmployee.id}`, updatedEmployee) as Observable<Employee>;
  }

  //在设置delete函数的时候，要看好括号里传入的参数是什么及它的类型：
  deleteData(deletedEmployee): Observable<Employee> {
    return this.httpEmployee.delete(`${url_Employee}/${deletedEmployee.id}`) as Observable<Employee>;
  }


  // createNewlist() {
  //   // 这里如何先拿到playlist的length？answer: 没必要写，系统会自动加上
  //   if (this.newSong.artist !== '' && this.newSong.track !== '') {
  //     // this.newSong.id = this.playList.length + 1;
  //     this.http.post(`${this.url}`, this.newSong).subscribe(data => {
  //         console.log('Post request succeed', data);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  //   } else {
  //     alert('artist & track fields are required');
  //   }
  //   this.playList.push(this.newSong);
  // }


}
