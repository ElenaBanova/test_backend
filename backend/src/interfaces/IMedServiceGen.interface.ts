interface DoctorInfo {
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  clinics: string[];
}

export interface IMedServiceGen {
  name: string;
  doctors: DoctorInfo[];
}
