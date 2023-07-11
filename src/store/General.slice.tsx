import { StateCreator } from 'zustand';
import { ChangeEvent } from 'react';
import moment from 'moment';

import { City, Doctor, DoctorSpeciality, MergedInfoOfDoctors } from '../types';
import { doctorsService } from '../services';

export type GeneralSlice = {
  cities: City[];
  doctorSpecialities: DoctorSpeciality[];
  doctors: Doctor[];
  selectedDoctor: MergedInfoOfDoctors | null;
  selectedCity: string | null;
  specialityName: string;
  selectedGender: string | null;
  cityName: string | null;
  birthdate: string;
  age: number | null;
  speciality: string | null;
  showModal: boolean;
  fetchCities: () => Promise<City[]>;
  fetchDoctorSpecialities: () => Promise<DoctorSpeciality[]>;
  fetchDoctors: () => Promise<Doctor[]>;
  handleBirthdateChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleCityChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSpecialityChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleGenderChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleDoctorChange: (
    event: ChangeEvent<HTMLInputElement>,
    mergedInfoOfDoctors: MergedInfoOfDoctors[]
  ) => void;
  handleModalClose: () => void;
  handlerModal: () => void;
};

export const createGeneralSlice: StateCreator<GeneralSlice> = (set) => ({
  cities: [],
  doctorSpecialities: [],
  doctors: [],
  showModal: false,
  selectedCity: null,
  selectedGender: null,
  selectedDoctor: null,
  cityName: null,
  birthdate: '',
  specialityName: '',
  age: null,
  speciality: null,
  fetchCities: async () => {
    const cities = await doctorsService.getCities();
    set(() => ({ cities }));
    return cities;
  },
  fetchDoctorSpecialities: async () => {
    const doctorSpecialities = await doctorsService.getDoctorSpecialities();
    set(() => ({ doctorSpecialities }));
    return doctorSpecialities;
  },
  fetchDoctors: async () => {
    const doctors = await doctorsService.getDoctors();
    set(() => ({ doctors }));
    return doctors;
  },
  handleBirthdateChange: (event) => {
    const birthdate = event.target.value;
    console.log(birthdate);
    set(() => {
      const today = moment();
      const birthDate = moment(birthdate, 'YYYY-MM-DD');
      const age = today.diff(birthDate, 'years');
      return { birthdate, age };
    });
  },
  handleCityChange: (event) => {
    const selectedCityName = event.target.value;
    set((state) => {
      const city = state.cities.find((city) => city.name === selectedCityName);
      console.log(city);
      const selectedCity = city ? city.id : null;
      const cityName = city?.name;
      return { selectedCity, cityName };
    });
  },
  handleSpecialityChange: (event) => {
    const selectedSpeciality = event.target.value;
    set((state) => {
      const speciality = state.doctorSpecialities.find(
        (speciality) => speciality.name === selectedSpeciality
      );
      const specialityId = speciality ? speciality.id : null;
      const specialityName = speciality?.name;
      return { speciality: specialityId, specialityName };
    });
  },
  handleGenderChange: (event) => {
    const selectedGender = event.target.value;
    set(() => ({ selectedGender }));
  },
  handleDoctorChange: (event, mergedInfoOfDoctors) => {
    const selectedDoctorName = event.target.value;
    const filtered = mergedInfoOfDoctors.filter(
      (doctor) => `${doctor.name}${doctor.surname}` === selectedDoctorName
    );
    set((state) => {
      const selectedDoctor = filtered.length > 0 ? filtered[0] : null;
      return { ...state, selectedDoctor };
    });
  },
  handleModalClose: () => {
    set((state) => ({ ...state, showModal: false, cityName: '' }));
  },
  handlerModal: () => {
    set(() => ({ showModal: true }));
  }
});
