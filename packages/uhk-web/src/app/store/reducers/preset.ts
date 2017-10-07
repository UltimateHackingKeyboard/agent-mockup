import { Keymap } from 'uhk-common';

import { KeymapAction, KeymapActions } from '../actions';

const initialState: Keymap[] = [];

export default function(state = initialState, action: KeymapAction): Keymap[] {
    switch (action.type) {
        case KeymapActions.LOAD_KEYMAPS_SUCCESS: {
            return action.payload;
        }

        default:
            return state;
    }
}
