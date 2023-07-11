import { create } from 'zustand';

import { GeneralSlice, createGeneralSlice } from './General.slice';

export const useGeneralStore = create<GeneralSlice>()((...general) => ({
  ...createGeneralSlice(...general)
}));
