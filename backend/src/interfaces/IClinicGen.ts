interface DoctorInfo {
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
}

interface Med_ServiceInf {
  name: string;
  _doctorId: string;
}

export interface IClinicGen {
  name: string;
  doctorInfo: DoctorInfo;
  med_ServiceInfo: Med_ServiceInf[];
}

