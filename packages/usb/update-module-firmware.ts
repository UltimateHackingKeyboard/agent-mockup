#!/usr/bin/env ts-node-script

import * as fs from 'fs';
import { ModuleSlotToI2cAddress, ModuleSlotToId } from 'uhk-usb';
import Uhk, { errorHandler, yargs } from './src';

(async () => {
    try {
        const argv = yargs
            .scriptName('./update-module-firmware.ts')
            .usage('Usage: $0 <moduleSlot> <firmwarePath>')
            .demandCommand(2, 'moduleSlot and firmwarePath are required')
            .argv as any;

        const module = argv._[0];
        const firmwarePath = argv._[1];

        if (!fs.existsSync(firmwarePath)) {
            console.error('Firmware path not found');
            process.exit(1);
        }

        if (!Object.values(ModuleSlotToId).includes(module)) {
            const keys = Object.keys(ModuleSlotToId)
                .filter((key: any) => isNaN(key))
                .join(', ');
            console.error(`The specified module does not exist. Specify one of ${keys}`);
            process.exit(1);
        }

        const { operations } = Uhk(argv);
        await operations.updateModuleWithKboot(
            firmwarePath,
            ModuleSlotToI2cAddress[module],
            ModuleSlotToId[module] as any
        );

    } catch (error) {
        errorHandler(error);
    }
})();