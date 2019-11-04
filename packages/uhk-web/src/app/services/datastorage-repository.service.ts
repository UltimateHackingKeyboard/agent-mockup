import { Injectable } from '@angular/core';
import { AutoUpdateSettings, UserConfiguration, UserHistory } from 'uhk-common';

@Injectable()
export class DataStorageRepositoryService {

    getConfig(): UserConfiguration {
        return JSON.parse(localStorage.getItem('config'));
    }

    saveConfig(config: UserConfiguration): void {
        localStorage.setItem('config', JSON.stringify(config.toJsonObject()));
    }

    getAutoUpdateSettings(): AutoUpdateSettings {
        return JSON.parse(localStorage.getItem('auto-update-settings'));
    }

    saveAutoUpdateSettings(settings: AutoUpdateSettings): void {
        localStorage.setItem('auto-update-settings', JSON.stringify(settings));
    }

    getUserHistory(): UserHistory {
        return JSON.parse(localStorage.getItem('user-history'));
    }

    setUserHistory(history: UserHistory): void {
        localStorage.setItem('user-history', JSON.stringify(history));
    }
}
