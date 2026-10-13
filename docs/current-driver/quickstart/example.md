---
sidebar_position: 2
sidebar_label: Example
description: A first stimulation protocol with pulses and ramps
---

# Example

---

The examples below list the register writes needed for common stimulation protocols. In Bonsai,
each write can be sent to the device with a `CreateMessage` operator (from `Bonsai.Harp`), using the
register address and type shown in the [register summary](../registers.md#register-summary), connected
to the `Device` operator.

## Constant current

Drive the LED connected to `LED0` with a constant current of **200 mA**:

| Step | Register         | Address | Type  | Value |
|------|------------------|---------|-------|-------|
| 1    | `Led0MaxCurrent` | 44      | Float | 250   |
| 2    | `LedEnable`      | 41      | U8    | 0x01  |
| 3    | `Led0Current`    | 37      | Float | 200   |

To turn the LED off, write `0` to `Led0Current`, or write `0x01` to `LedDisable` (address 42) to
switch off the driver while keeping the configured current.

## Pulse train

Drive the LED connected to `LED0` with a **20 Hz**, **10 %** duty cycle pulse train at **200 mA**:

| Step | Register             | Address | Type  | Value | Notes                                |
|------|----------------------|---------|-------|-------|--------------------------------------|
| 1    | `PulseFrequencyLed0` | 49      | U8    | 20    | 20 Hz                                |
| 2    | `PulseDutyCycleLed0` | 47      | U8    | 10    | 10 % (5 ms on per 50 ms period)      |
| 3    | `Dac0Voltage`        | 39      | Float | 1000  | 1000 mV / 5 = 200 mA                 |
| 4    | `PulseEnable`        | 46      | U8    | 0x01  | Start the pulse train in channel 0    |

To stop the pulse train, write `0x00` to `PulseEnable`.

:::note
Pulses act on the value of the `Dac0Voltage` register, which is why the current is configured in mV
in step 3. See [DAC voltage](../registers.md#dac-voltage) for details.
:::

## Ramp

Ramp the LED connected to `LED0` up to **200 mA** over **2 s**, and back down to 0 mA over **500 ms**:

| Step | Register      | Address | Type  | Value | Notes                                      |
|------|---------------|---------|-------|-------|--------------------------------------------|
| 1    | `PulseEnable` | 46      | U8    | 0x00  | Ramps only work with pulses disabled        |
| 2    | `RampConfig`  | 53      | U8    | 0x03  | `LED0_UP` and `LED0_DOWN`                   |
| 3    | `RampLed0`    | 51      | U16   | 2000  | 2000 ms                                    |
| 4    | `Dac0Voltage` | 39      | Float | 1000  | Ramp up to 200 mA                          |
| 5    | `RampLed0`    | 51      | U16   | 500   | 500 ms                                     |
| 6    | `Dac0Voltage` | 39      | Float | 0     | Ramp down to 0 mA, after the ramp up ends  |
