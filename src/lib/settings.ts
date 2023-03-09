import { localStorageGet, localStorageSet } from "./browser";

export interface Settings {
  selectedSummarizer?: string;
  summarizers?: Record<string, any>;
  exporters?: Record<string, any>;
}

export type SettingsActionType =
  | "summarizers/select"
  | "summarizers/notion/setSpaceId"
  | "exporters/orgmode/setTemplate";

export interface SettingsAction {
  type: SettingsActionType;
  payload: any;
}

export const updateSettings = async (
  settings: Settings,
  action: SettingsAction
) => {
  switch (action.type) {
    case "summarizers/select":
      settings = {
        ...settings,
        selectedSummarizer: action.payload as string,
      };
      break;

    case "summarizers/notion/setSpaceId":
      settings = {
        ...settings,
        summarizers: {
          ...settings.summarizers,
          notion: {
            ...settings.summarizers?.notion,
            spaceId: action.payload as string,
          },
        },
      };

      break;
    case "exporters/orgmode/setTemplate":
      settings = {
        ...settings,
        exporters: {
          ...settings.exporters,
          orgmode: {
            ...settings.exporters?.orgmode,
            template: action.payload as string,
          },
        },
      };
      break;
  }

  await saveSettings(settings);
  return settings;
};

export const loadSettings = async (): Promise<Settings> => {
  return (await localStorageGet()) as Settings;
};

const saveSettings = async (settings: Settings) => {
  return localStorageSet(settings);
};
