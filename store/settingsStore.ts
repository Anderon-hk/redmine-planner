import { create } from 'zustand';

export const SETTINGS_STORAGE_KEY = 'redmine_planner_settings';

// no need to save querying url and token here
export type Setting = {
  redmineHost: string;
  weeklyHourUpperWarning?: number;
  weeklyHourLowerWarning?: number;
}

type SettingsStore = {
  settings: Setting,
  setHost: (url: string) => void
  setWeeklyHourUpperWarning: (threshold: number|undefined) => void
  setWeeklyHourLowerWarning: (threshold: number|undefined) => void
  updateStorage: () => void
  setSettings: (settings: Setting) => void
}

const getInitialSettings = (): Setting => {
  const oredSettings = localStorage?.getItem(SETTINGS_STORAGE_KEY);
  return oredSettings ? JSON.parse(oredSettings) : {
    redmineHost: '',
    weeklyHourUpperWarning: undefined,
    weeklyHourLowerWarning: undefined
  };
}

export const useSettingStore = create<SettingsStore>((set, get) => ({
  settings: getInitialSettings(),
  setHost: (url: string) => {
    let origin = ''
    try{
      const urlObj = new URL(url);
      origin = urlObj.origin
    }catch(e) {}

    set(state => (
      { ...state, redmineHost: origin }
    ))
    get().updateStorage()
  },
  setWeeklyHourLowerWarning: (threshold: number|undefined) => {
    set(state => (
      { ...state, weeklyHourLowerWarning: threshold }
    ))
    get().updateStorage()
  },
  setWeeklyHourUpperWarning: (threshold: number|undefined) => {
    set(state => (
      { ...state, weeklyHourUpperWarning: threshold }
    ))
    get().updateStorage()
  },
  updateStorage: () => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(get().settings));
  },
  setSettings: function(settings: Setting) {
    set(state => ({...state, settings}))
    get().updateStorage()
  }
}));

export const settingStore = useSettingStore