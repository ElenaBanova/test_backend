interface DoctorInfo {
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
}

interface Med_ServiceInf {
  name: string;
}

export interface IMedServiceGen {
  name: string;
  doctorInfo: DoctorInfo;
  clinicInfo: Med_ServiceInf[];
}
