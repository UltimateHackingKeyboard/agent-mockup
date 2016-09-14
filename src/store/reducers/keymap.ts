import '@ngrx/core/add/operator/select';
import { Action } from '@ngrx/store';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Keymap } from '../../config-serializer/config-items/Keymap';
import { KeymapActions } from '../actions';
import { AppState } from '../index';

const initialState: Keymap[] = [];

export default function(state = initialState, action: Action): Keymap[] {
    let id: string;

    switch (action.type) {
        case KeymapActions.ADD:
        case KeymapActions.DUPLICATE:
            let newKeymap: Keymap = new Keymap;
            newKeymap = Object.assign(newKeymap, action.payload);

            newKeymap.abbreviation = generateAbbr(state, newKeymap.abbreviation);
            newKeymap.name = generateName(state, newKeymap.name);
            newKeymap.isDefault = false;

            return [...state, newKeymap];

        case KeymapActions.EDIT_TITLE:
            id = action.payload.id;
            let title: string = action.payload.title;

            return Object.values(
                Object.assign({}, state.map(
                    (keymap: Keymap) => {
                        if (keymap.abbreviation === id) {
                            keymap.name = title;
                        }

                        return keymap;
                    }))
            );

        case KeymapActions.EDIT_ABBR:
            id = action.payload.id;
            let abbr: string = action.payload.abbr;

            abbr = generateAbbr(state, abbr);

            return Object.values(
                Object.assign({}, state.map(
                    (keymap: Keymap) => {
                        if (keymap.abbreviation === id) {
                            keymap.abbreviation = abbr;
                        }

                        return keymap;
                    }))
            );

        case KeymapActions.SET_DEFAULT:
            id = action.payload;

            return Object.values(
                Object.assign({}, state.map(
                    (keymap: Keymap) => {
                        keymap.isDefault = (keymap.abbreviation === id) ? true : false;

                        return keymap;
                    }))
            );

        case KeymapActions.REMOVE:
            let isDefault: boolean;
            id = action.payload;

            let filtered: Keymap[] = Object.values(Object.assign({}, state.filter(
                (keymap: Keymap) => {
                    if (keymap.abbreviation === id) {
                        isDefault = keymap.isDefault;
                        return false;
                    }

                    return true;
                }
            )));

            if (isDefault && filtered.length > 0) {
                filtered[0].isDefault = true;
            }

            return filtered;

        default: {
            return state;
        }
    }
}

export function getKeymap(id: string) {
    if (id === undefined) {
        return getDefault();
    }

    return (state$: Observable<AppState>) => state$
        .select(s => s.keymap)
        .map((keymaps: Keymap[]) =>
            keymaps.find((keymap: Keymap) => keymap.abbreviation === id)
        );
}

export function getDefault() {
    return (state$: Observable<AppState>) => state$
        .select(s => s.keymap)
        .map((keymaps: Keymap[]) =>
            keymaps.find((keymap: Keymap) => keymap.isDefault)
        );
}

function generateAbbr(state: Keymap[], abbr: string): string {
    const chars: string[] = '23456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    let position = 0;
    let count: number;

    count = state.filter((keymap: Keymap) => keymap.abbreviation === abbr).length;

    while (count > 0) {
        abbr = abbr.substring(0, abbr.length - 1) + chars[position];
        position++;

        count = state.filter((keymap: Keymap) => keymap.abbreviation === abbr).length;
    }

    return abbr;
}

function generateName(state: Keymap[], name: string) {
    let count: number;
    let suffix = 2;
    const oldName: string = name;

    count = state.filter((keymap: Keymap) => keymap.name === name).length;

    while (count > 0) {
        name = oldName + ` (${suffix})`;
        count = state.filter((keymap: Keymap) => keymap.name === name).length;
        suffix++;
    }

    return name;
}
