import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { faCog } from '@fortawesome/free-solid-svg-icons';

import { AppTheme } from 'uhk-common';
import { AppState, appUpdateSettingsState, getAnimationEnabled, getAppTheme } from '../../../store';
import { State as UpdateSettingsState } from '../../../store/reducers/auto-update-settings';
import {
    CheckForUpdateNowAction,
    ToggleCheckForUpdateOnStartupAction
} from '../../../store/actions/auto-update-settings';
import { SetAppThemeAction, ToggleAnimationEnabledAction } from '../../../store/actions/app';

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    host: {
        'class': 'container-fluid'
    }
})
export class SettingsComponent {
    updateSettingsState$: Observable<UpdateSettingsState>;
    animationEnabled$: Observable<boolean>;
    appTheme$: Observable<AppTheme>;
    faCog = faCog;
    themes = [
        { id: AppTheme.Auto, text: 'System default' },
        { id: AppTheme.Light, text: 'Light' },
        { id: AppTheme.Dark, text: 'Dark' }
    ];

    constructor(private store: Store<AppState>) {
        this.updateSettingsState$ = store.select(appUpdateSettingsState);
        this.animationEnabled$ = store.select(getAnimationEnabled);
        this.appTheme$ = store.select(getAppTheme);
    }

    toggleCheckForUpdateOnStartUp(value: boolean) {
        this.store.dispatch(new ToggleCheckForUpdateOnStartupAction(value));
    }

    checkForUpdate(allowPrerelease: boolean): void {
        this.store.dispatch(new CheckForUpdateNowAction(allowPrerelease));
    }

    toggleAnimationEnabled(enabled: boolean): void {
        this.store.dispatch(new ToggleAnimationEnabledAction(enabled));
    }

    selectTheme(value: AppTheme) {
        this.store.dispatch(new SetAppThemeAction(value));
    }
}
