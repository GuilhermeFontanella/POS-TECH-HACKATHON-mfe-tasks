import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface SettingsState {
  fontSize: number;
  lineHeight: number;
  cognitiveAlert: boolean;
  focusMode: boolean;
  summaryMode: boolean;
  complexityLevel: number;
  defaultMode: boolean;
  detailedMode: boolean;
}

const initialState: SettingsState = {
  fontSize: 14,
  lineHeight: 1,
  cognitiveAlert: false,
  focusMode: false,
  summaryMode: false,
  complexityLevel: 1,
  defaultMode: true,
  detailedMode: false
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSetting: (state, action: PayloadAction<Partial<SettingsState>>) => {
      return { ...state, ...action.payload };
    },

    setAllSettings: (state, action: PayloadAction<Partial<SettingsState>>) => {
      return { ...state, ...action.payload };
    }
  }
});

export const { updateSetting, setAllSettings } = settingsSlice.actions;

export default settingsSlice.reducer;