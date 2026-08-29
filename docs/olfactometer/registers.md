---
sidebar_position: 4
---
# Device Registers

---

## Registers


The [Harp protocol](https://harp-tech.org/protocol/BinaryProtocol-8bit.html) relies on registers with specific functionalities and data types, and are essentially used to exchange information with the device.

The Harp Olfactometer device registers can be found on this [yaml file](https://github.com/harp-tech/device.olfactometer/blob/main/device.yml). 
These registers names are the one that are uses by the software and will be described here for an easy digestion.

These register names are used by the [software](./user-control/software.md) and will be described here according with their functionality, for quick reference and easier understanding.

Some registers support multiple states, by using bit masks, where each bit represents a specific state. In contrast, group masks are typically used for configuration, allowing only one state to be active at a time.

:::note[bit mask]
A bit mask is a binary pattern used to manipulate specific bits within a value. It helps selectively enable, disable, or extract particular bits in the registers.
:::

---

## Flow rate configuration

To start flow in all the channels, the olfactometer's `EnableFlow` register must be set to `Enabled`.

Each channel’s flow rate is configured using the registers `Channel0TargetFlow`, `Channel1TargetFlow`, `Channel2TargetFlow`, `Channel3TargetFlow`, and `Channel4TargetFlow`, with values specified in mL/min. Alternatively, to set the target flow rates simultaneously across all channels, the `ChannelsTargetFlow` register can be used.

The olfactometer continuously measures the flow in each channel using a dedicated analog-to-digital converter and transmits events for each channel through the `Flowmeter` register.


The registers `Channel0ActualFlow`, `Channel1ActualFlow`, `Channel2ActualFlow`, `Channel3ActualFlow` and `Channel4ActualFlow` provide the actual flow for each channel. 
These values corresponds to the flow in mL/min after interpolation of the calibration values and temperature compensation.


:::tip[events]
If no events are received from the `ChannelActualFlow` and/or `Flowmeter` registers, ensure that the correspondent bits of the `OlfactometerEvents` register bit mask are set, specifically the `Flowmeter`(0x1) and `ChannelActualFlow`(0x4).
:::

---

## Valves control

There are essentially three types of valves that can be configure through the Harp Olfactometer:
- Odor valves - Up to four odor valves can be controlled. These valves are housed within the device and direct the flow to the odor output channels.
- Check valves - Up to four odor valves can be controlled. Typically located before the mixing manifold and after the odor vials (available only on hardware versions 2.x).
- End valves - A maximum of two end valves can be controlled. Positioned as close as possible to the final odor release, these valves minimize odor delivery latency.



### Valves bit mask

The bit mask for all the valves is common across all the valves registers. Below are the available bit states that can be configured in the valve registers:

| Name          | Hex mask  | Binary mask     |
|---------------| ----------|-----------------|
| Valve0        | 0x01      | 0b00000001      |
| Valve1        | 0x02      | 0b00000010      |
| Valve2        | 0x04      | 0b00000100      |
| Valve3        | 0x08      | 0b00001000      |
| EndValve0     | 0x10      | 0b00010000      |
| EndValve1     | 0x20      | 0b00100000      |
| CheckValve0   | 0x0100    | 0b000100000000  |
| CheckValve1   | 0x0200    | 0b001000000000  |
| CheckValve2   | 0x0400    | 0b010000000000  |
| CheckValve3   | 0x0800    | 0b100000000000  |



### Odor valves

The odor valves can be controlled through the registers `ValveSet`, `ValveClear`,`ValveToggle`,`ValveState` and `OdorValveState`.

For each one of these registers, you can set the correspondent [bit mask](#valves-bit-mask) for the valve(s) you need to configure. 

:::note[state registers]
State registers enable setting and clearing multiple states simultaneously, which is especially useful for precise timing, e.g. when the user needs to switch multiple valves with different states at the same time.
:::

### Check valves

The check valves can be controlled through the registers `ValveSet`, `ValveClear`,`ValveToggle`,`ValveState` and `CheckValveState`.

For each one of these registers, you can set the correspondent [bit mask](#valves-bit-mask) for the valve(s) you need to configure. 

### End valves

The end valves can be controlled through the registers `ValveSet`, `ValveClear`,`ValveToggle`,`ValveState` and `EndValveState`.

For each one of these registers, you can set the correspondent [bit mask](#valves-bit-mask) for the valve(s) you need to configure. 


### Pulse mode

A hardware-generated pulse can be pre-set for each valve and will be triggered when the valve is activated. The pulse duration can be configured from 1 and 65355 ms in the following  registers:
- Odor valves: `Valve0PulseDuration`, `Valve1PulseDuration`, `Valve2PulseDuration`, `Valve3PulseDuration` and `Valve4PulseDuration`.
- End valves: `EndValve0PulseDuration` and `EndValve1PulseDuration`.
- Check valves: `CheckValve0DelayPulseDuration`, `CheckValve1DelayPulseDuration`, `CheckValve2DelayPulseDuration`, `CheckValve3DelayPulseDuration` and `CheckValve4DelayPulseDuration`.

To enable this functionality, the corresponding valve must be configured using the valves [bit mask](#valves-bit-mask) through the `EnableValvePulse` register.

In addition to pulse mode configuration, check valves (≥v2.0) can also be configured to toggle simultaneously with the corresponding odor valves. To enable this mode, set the corresponding valve using `EnableCheckValveSync`.

You can find the available valve configuration options and their expected behavior in the table below:


| Valves           | EnableCheckValveSync   | EnableValvePulse   | Behavior                                                                |
|------------------|------------------------|--------------------|-------------------------------------------------------------------------|
| Odor             | X                      | `Enabled`          | A pulse is triggered with the value of `ValvexPulseDuration`            |
| End              | X                      | `Enabled`          | A pulse is triggered with the value of `EndValvexPulseDuration`         |
| Odor and End     | X                      | `Disabled`         | Triggered by software                                                   |
| Check valves     | `Disabled`             | `Enabled`          | A pulse is triggered with the value of `CheckValvexDelayPulseDuration`  |
| Check valves     | `Disabled`             | `Disabled`         | Triggered by software                                                  |
| Check valves     | `Enabled`              | X                  | Synced with odor valve with a delay of `CheckValvexDelayPulseDuration`  |                                               |


<br />

:::note[pulse and sync simultaneously]
The check valves can also be synced when the correspondent odor valve is in pulse modes and the additional delay can also be added. 
:::

:::info[pulse duration > delay]
In sync mode and with odor valve in pulse mode, the pulse duration must be higher than the check valve delay. 
:::

---

## Digital IOs

Two digital outputs and one digital input are available in the front panel BNCs. 

### Digital outputs

The digital outputs valves can be controlled through the registers `DigitalOutputSet`, `DigitalOutputClear`,`DigitalOutputToggle` and `DigitalOutputState`.

For each one of these registers, you can set the correspondent bit mask for the digital output(s) you need to configure: 

| Name       | Hex mask  | Binary mask     |
|------------| ----------|-----------------|
| DO0        | 0x01      | 0b00000001      |
| DO1        | 0x02      | 0b00000010      |


### Digital input

The digital input can be configured using the `DI0TriggerConfig` register with the following options:
- `Sync`: An event is generated and stored in the `DI0State` register each time a rising or falling edge is detected in the input signal.
- `EnableFlowWhileHigh`: The input signal controls the flow enable state. When the signal is high, the flow is enabled; when low, the flow is disabled.
- `ValveToggle`: It allows to control the toggling of end valve 0.


:::tip[events]
If no events are received from the `DI0State` register, ensure that the correspondent bit of the `OlfactometerEvents` register bit mask is set, specifically the `DI0Trigger`(0x2).
:::

### Mimic 

Mimic register allow users to route the internal electrical valve control signals to the digital outputs, e.g. for synchronization with PID readings.

Each valve control signal has a corresponding mimic register: `MimicValve0`, `MimicValve1`, `MimicValve2`, `MimicValve3`, `MimicCheckValve0`, `MimicCheckValve1`, `MimicCheckValve2`, `MimicCheckValve3`, `MimicEndValve0` and `MimicEndValve1`with the following bit mask:

| Name       | Hex mask  | Binary mask     |
|------------| ----------|-----------------|
| None       | 0x00      | 0b00000000      |
| DO0        | 0x01      | 0b00000001      |
| DO1        | 0x02      | 0b00000010      |

---

## Calibration

The proportional valves and corresponding flow meters or the digital mass flow controllers, are factory calibrated, with calibration parameters stored in the device's internal EEPROM.

However, the user have the option to override this calibration, which will modify the interpolation values used to calculate the flow output.


### User calibration

To activate the user calibration, the register `EnableUserCalibration` must be set to `Enabled`. 

Each channel has an 11-position register array for storing calibration values: `Channel0UserCalibration`, `Channel1UserCalibration`, `Channel2UserCalibration`, `Channel3UserCalibration` and `Channel4UserCalibration`.

<!-- For detailed calibration procedures, refer to the [calibration](./calibration.md) section. -->

<!-- :::note :::tip   :::info :::warning :::danger -->





  

