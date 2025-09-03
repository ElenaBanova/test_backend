interface ClinicInfo {
  name: string;
  med_Services: string[];
}

export interface IDoctorGen {
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  clinics: ClinicInfo[];
}
