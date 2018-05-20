import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { HardwareModules, VersionInformation } from 'uhk-common';

import {
    AppState,
    flashFirmwareButtonDisbabled,
    getAgentVersionInfo,
    getHardwareModules,
    xtermLog
} from '../../../store';
import { UpdateFirmwareAction, UpdateFirmwareWithAction } from '../../../store/actions/device';
import { XtermLog } from '../../../models/xterm-log';

@Component({
    selector: 'device-firmware',
    templateUrl: './device-firmware.component.html',
    styleUrls: ['./device-firmware.component.scss'],
    host: {
        'class': 'container-fluid'
    }
})
export class DeviceFirmwareComponent implements OnDestroy {
    flashFirmwareButtonDisbabled$: Observable<boolean>;
    xtermLog$: Observable<Array<XtermLog>>;
    getAgentVersionInfo$: Observable<VersionInformation>;
    hardwareModulesSubscription: Subscription;
    hardwareModules: HardwareModules;

    constructor(private store: Store<AppState>) {
        this.flashFirmwareButtonDisbabled$ = store.select(flashFirmwareButtonDisbabled);
        this.xtermLog$ = store.select(xtermLog);
        this.getAgentVersionInfo$ = store.select(getAgentVersionInfo);
        this.hardwareModulesSubscription = store.select(getHardwareModules).subscribe(data => {
            this.hardwareModules = data;
        });
    }

    ngOnDestroy(): void {
        this.hardwareModulesSubscription.unsubscribe();
    }

    onUpdateFirmware(): void {
        this.store.dispatch(new UpdateFirmwareAction());
    }

    changeFile(event): void {
        const files = event.srcElement.files;

        if (files.length === 0) {
            return;
        }

        const fileReader = new FileReader();
        fileReader.onloadend = function () {
            const arrayBuffer = new Uint8Array(fileReader.result);
            this.store.dispatch(new UpdateFirmwareWithAction(Array.prototype.slice.call(arrayBuffer)));
        }.bind(this);
        fileReader.readAsArrayBuffer(files[0]);
    }
}
