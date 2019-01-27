import { assertUInt8, assertUInt16 } from '../assert';
import { UhkBuffer } from '../uhk-buffer';

export class ModuleConfiguration {
    /*
     * module id enumeration is a separate story
     */

    @assertUInt8
    id: number;

    @assertUInt8
    pointerMode: number;

    @assertUInt8
    deceleratedPointerSpeedMultiplier: number;

    @assertUInt8
    basePointerSpeedMultiplier: number;

    @assertUInt8
    acceleratedPointerSpeedMultiplier: number;

    @assertUInt16
    angularShift: number;

    @assertUInt8
    modLayerPointerFunction: number;

    @assertUInt8
    fnLayerPointerFunction: number;

    @assertUInt8
    mouseLayerPointerFunction: number;

    fromJsonObject(jsonObject: any): ModuleConfiguration {
        this.id = jsonObject.id;
        this.pointerMode = jsonObject.pointerMode;
        this.deceleratedPointerSpeedMultiplier = jsonObject.deceleratedPointerSpeedMultiplier;
        this.basePointerSpeedMultiplier = jsonObject.basePointerSpeedMultiplier;
        this.acceleratedPointerSpeedMultiplier = jsonObject.acceleratedPointerSpeedMultiplier;
        this.angularShift = jsonObject.angularShift;
        this.modLayerPointerFunction = jsonObject.modLayerPointerFunction;
        this.fnLayerPointerFunction = jsonObject.fnLayerPointerFunction;
        this.mouseLayerPointerFunction = jsonObject.mouseLayerPointerFunction;

        return this;
    }

    fromBinary(buffer: UhkBuffer): ModuleConfiguration {
        this.id = buffer.readUInt8();
        this.pointerMode = buffer.readInt8();
        this.deceleratedPointerSpeedMultiplier = buffer.readUInt8();
        this.basePointerSpeedMultiplier = buffer.readUInt8();
        this.acceleratedPointerSpeedMultiplier = buffer.readUInt8();
        this.angularShift = buffer.readUInt16();
        this.modLayerPointerFunction = buffer.readUInt8();
        this.fnLayerPointerFunction = buffer.readUInt8();
        this.mouseLayerPointerFunction = buffer.readUInt8();
        return this;
    }

    toJsonObject(): any {
        return {
            id: this.id,
            pointerMode: this.pointerMode,
            deceleratedPointerSpeedMultiplier: this.deceleratedPointerSpeedMultiplier,
            basePointerSpeedMultiplier: this.basePointerSpeedMultiplier,
            acceleratedPointerSpeedMultiplier: this.acceleratedPointerSpeedMultiplier,
            angularShift: this.angularShift,
            modeLayerPointerFunction: this.modLayerPointerFunction,
            fnLayerPointerFunction: this.fnLayerPointerFunction,
            mouseLayerPointerFunction: this.mouseLayerPointerFunction
        };
    }

    toBinary(buffer: UhkBuffer): void {
        buffer.writeUInt8(this.id);
        buffer.writeUInt8(this.pointerMode);
        buffer.writeUInt8(this.deceleratedPointerSpeedMultiplier);
        buffer.writeUInt8(this.basePointerSpeedMultiplier);
        buffer.writeUInt8(this.acceleratedPointerSpeedMultiplier);
        buffer.writeUInt16(this.angularShift);
        buffer.writeUInt8(this.modLayerPointerFunction);
        buffer.writeUInt8(this.fnLayerPointerFunction);
        buffer.writeUInt8(this.mouseLayerPointerFunction);
    }

    toString(): string {
        return `<ModuleConfiguration id="${this.id}" >`;
    }
}
