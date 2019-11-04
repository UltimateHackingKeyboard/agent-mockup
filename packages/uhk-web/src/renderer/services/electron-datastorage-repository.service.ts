import * as storage from 'electron-settings';

import { AutoUpdateSettings, UserConfiguration, UserHistory } from 'uhk-common';
import { DataStorageRepositoryService } from '../../app/services/datastorage-repository.service';

export class ElectronDataStorageRepositoryService implements DataStorageRepositoryService {
    static getValue(key: string): any {
        const value = storage.get(key);
        if (!value) {
            return null;
        }

        return JSON.parse(<string>value);
    }

    static saveValue(key: string, value: any) {
        storage.set(key, JSON.stringify(value));
    }

    // TODO: Throw error when read user config from electron datastore
    // Agent-electron should always read the configuration from the UHK over USB which will be implemented later.
    // If implemented the feature should have to throw an error to prevent unwanted side effects.
    getConfig(): UserConfiguration {
        return null;
    }

    // TODO: Throw error when save user config from electron-datastore
    // Agent-electron should always read the configuration from the UHK over USB which will be implemented later.
    // If implemented the feature should have to throw an error to prevent unwanted side effects.
    saveConfig(config: UserConfiguration): void {

    }

    getAutoUpdateSettings(): AutoUpdateSettings {
        return ElectronDataStorageRepositoryService.getValue('auto-update-settings');
    }

    saveAutoUpdateSettings(settings: AutoUpdateSettings): void {
        ElectronDataStorageRepositoryService.saveValue('auto-update-settings', settings);
    }

    getUserHistory(): UserHistory {
        return ElectronDataStorageRepositoryService.getValue('user-history');
    }

    setUserHistory(history: UserHistory): void {
        ElectronDataStorageRepositoryService.saveValue('user-history', JSON.stringify(history));
    }
}
