interface IDoctorInfo {
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  med_Services: string[];
}

export interface IClinicGen {
  name: string;
  doctors: IDoctorInfo[];
}
