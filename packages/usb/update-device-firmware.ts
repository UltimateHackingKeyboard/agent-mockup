#!/usr/bin/env ../../node_modules/.bin/ts-node-script

import Uhk, { errorHandler, yargs } from './src';
import { existsSync } from 'fs';

(async () => {
    try {
        const argv = yargs
            .scriptName('./update-device-firmware')
            .usage('Usage: $0 <firmware path>')
            .demandCommand(1, 'Firmware path is required')
            .argv as any;

        const firmwarePath = argv._[0];

        if (!existsSync(firmwarePath)) {
            console.log('Firmware path does not exists.');
            process.exit(1);
        }

        const { operations } = Uhk(argv);
        console.log(`Updating right firmware from ${firmwarePath} ...`);
        await operations.updateRightFirmwareWithKboot(firmwarePath);
        console.log('Firmware updated.');
        console.log('Reenumerating device...');

    } catch (error) {
        errorHandler(error);
    }
})();
