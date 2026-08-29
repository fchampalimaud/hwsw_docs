---
sidebar_position: 2
---
# Device Registers

---

## Registers

The [Harp protocol](https://harp-tech.org/protocol/BinaryProtocol-8bit.html) relies on registers with specific functionalities and data types, and are essentially used to exchange information with the device.

The Harp FlyPAD Controller registers are declared in the device's `device.yml` file. 
These registers names are the one that are uses by the software and will be described here for an easy digestion.

These register names are used by the software and will be described here according with their functionality, for quick reference and easier understanding.

Some registers support multiple states, by using bit masks, where each bit represents a specific state. In contrast, group masks are typically used for configuration, allowing only one state to be active at a time.

:::note[bit mask]
A bit mask is a binary pattern used to manipulate specific bits within a value. It helps selectively enable, disable, or extract particular bits in the registers.
:::


---

## Acquisition control

Acquisition is disabled after power-up. To start acquiring data in **all** channels, the
`EnableAcquisition` register must be set to `Enabled`; writing `Disabled` stops the acquisition and
the corresponding event stream.

| Value      | Hex  |
|------------|------|
| `Disabled` | 0x00 |
| `Enabled`  | 0x01 |

---

## Capacitance acquisition

While acquisition is enabled, the device polls every connected behavioral arena and publishes the
readings through the `CapacitanceValues` event.

`CapacitanceValues` is an array of **64 unsigned 16 bit values**, corresponding to the analog-to-digital
conversion of the capacitance measured in each channel. Each behavioral arena contributes **two
values**, one per food channel, so a fully populated system reports 32 arenas × 2 channels.

Values are ordered by arena: for arena `n`, the two channels are found at positions `2n` and
`2n + 1` of the array.

:::tip[events]
If no events are received from the `CapacitanceValues` register, ensure that `EnableAcquisition` is
set to `Enabled`.
:::

---

## Digital IOs

Two digital inputs and four digital outputs are available in the device.

### Digital inputs

The state of the digital inputs is reported by the `DigitalInputState` event, which is emitted every
time a transition is detected on an input line. The register uses the following bit mask:

| Name  | Hex mask | Binary mask |
|-------|----------|-------------|
| DI0   | 0x01     | 0b00000001  |
| DI1   | 0x02     | 0b00000010  |

:::tip[events]
If no events are received from the `DigitalInputState` register, ensure that the correspondent bit of
the `EnableEvents` register bit mask is set, specifically `DigitalInputs`(0x1).
:::

### Digital outputs

The digital outputs can be controlled through the registers `DigitalOutputSet`, `DigitalOutputClear`,
`DigitalOutputToggle` and `DigitalOutputState`.

For each one of these registers, you can set the correspondent bit mask for the digital output(s) you
need to configure:

| Name  | Hex mask | Binary mask |
|-------|----------|-------------|
| DO0   | 0x01     | 0b00000001  |
| DO1   | 0x02     | 0b00000010  |
| DO2   | 0x04     | 0b00000100  |
| DO3   | 0x08     | 0b00001000  |

- `DigitalOutputSet`: sets the output lines whose bits are set in the written mask.
- `DigitalOutputClear`: clears the output lines whose bits are set in the written mask.
- `DigitalOutputToggle`: toggles the output lines whose bits are set in the written mask.
- `DigitalOutputState`: writes the state of **all** output lines at once.

:::note[state registers]
State registers enable setting and clearing multiple states simultaneously, which is especially
useful for precise timing, e.g. when the user needs to switch multiple outputs with different states
at the same time.
:::

---

## Events

The events published by the device are configured through the `EnableEvents` register, using the
bit mask below. Only the events whose bit is set are sent by the device.

| Name           | Hex mask | Binary mask |
|----------------|----------|-------------|
| DigitalInputs  | 0x01     | 0b00000001  |

---

## Register summary

| Address | Register              | Access  | Type       | Description                                                      |
|---------|-----------------------|---------|------------|------------------------------------------------------------------|
| 32      | `EnableAcquisition`   | Write   | U8         | Starts or stops the data acquisition in all channels.             |
| 33      | `CapacitanceValues`   | Event   | U16 [64]   | Value of ADC capacitance values for each channel (2 per channel). |
| 34      | `DigitalInputState`   | Event   | U8         | State of the digital inputs.                                      |
| 35      | `DigitalOutputSet`    | Write   | U8         | Set the specified digital output lines.                           |
| 36      | `DigitalOutputClear`  | Write   | U8         | Clears the specified digital output lines.                        |
| 37      | `DigitalOutputToggle` | Write   | U8         | Toggles the specified digital output lines.                       |
| 38      | `DigitalOutputState`  | Write   | U8         | Write the state of all digital output lines.                      |
| 39      | `EnableEvents`        | Write   | U8         | Specifies the active events in the device.                        |
