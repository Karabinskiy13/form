export type ParamsOfDoctorSpeciality = {
  gender?: string;
  maxAge?: number;
};

export type City = {
  id: string;
  name: string;
};

export type DoctorSpeciality = {
  id: string;
  name: string;
  params: ParamsOfDoctorSpeciality;
};

export type Doctor = {
  id: string;
  name: string;
  surname: string;
  specialityId: string;
  isPediatrician: boolean;
  cityId: string;
};

export type MergedInfoOfDoctors = {
  id: string;
  name: string;
  surname: string;
  specialityId: string;
  isPediatrician: boolean;
  cityId: string;
  cityData: City;
  doctorSpecialities: DoctorSpeciality;
};
export type ValidResponse = {
  birthdate: string;
  city: string;
  doctor: string;
  email: string;
  mobile: string;
  name: string;
  sex: string;
};
