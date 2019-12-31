interface Phone {
  area:string,
  prefix:string,
  line:string
}

export interface Employee {
  id: number;
  lastName: string;
  firstName: string;
  gender: string;
  company: string;
  department: string;
  email: string;
  phones: Phone[];
  dateOfBirth: Date | 'yMMMMdd';
  address: string;
  photoPath: string;
  isActive: boolean;
}
