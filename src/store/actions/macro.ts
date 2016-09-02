import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class MacroActions {
    static GET_ALL = '[Macro] Get all macros';
    getAll(): Action {
        return {
            type: MacroActions.GET_ALL
        };
    }
}
