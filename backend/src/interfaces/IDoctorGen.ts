interface ClinicInfo {
  name: string;
}

interface Med_ServiceInf {
  name: string;
}

export interface IDoctorGen {
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  clinicInfo: ClinicInfo;
  med_ServiceInfo: Med_ServiceInf[];
}
