export interface IUser {
  name: {
    firstName: string;
    lastName: string;
  };
  role: "student";
  dateOfBirth?: string;
  gender: "male" | "female";
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAdress: string;
}

export interface IUserMethods {
  fullName(): string;
}
