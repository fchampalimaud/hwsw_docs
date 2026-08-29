---
sidebar_position: 1
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';

# Device Overview

---

## Introduction

The Harp Olfactometer is a versatile odor delivery system designed for neuroscience and behavioral research. Its modular system design enables precise multi-odor delivery with multi-channel mixing capability and low odor delivery latency.

The [Harp Standard](https://harp-tech.org/) implementation ensure precise hardware time-stamping, logging of stream events (valves switching, flow rates and more) as well as seamless clock synchronization between Harp devices. It also offers flexible control options via software or external TTL pulses.

Open source design files, available in the [device's repository](https://github.com/harp-tech/device.olfactometer) provide the implementation of the proposed [architecture](#architecture), allowing developers to integrate various valves, flow meters, or mass flow controllers.

This documentation presents one possible implementation of the Harp Olfactometer, aiming to deliver an electromechanical compact, user-friendly, and easily deployable solution.

---

## Architecture


<!-- ![Architecture overview](/olf/EndValveToggle_1_v1.0.svg) -->

The Harp Olfactometer is composed of a main device and an optional odor multi-port mixing chamber and an optional end-valve. The main device has a modular design, supporting up to four independent odor channels and the flexibility to provide either one or two air carrier lines.

An input air inlet is connected to a five-port manifold, which distributes the air flow to individual proportional valves that regulate the air flow. Each proportional valve outlet is connected to a flowmeter (alternatively, a mass flow controller can replace the proportional valve and flowmeter combination). This configuration enables independent odor flow regulation, allowing precise control over odor concentration by adjusting the flow rate.

Three of the proportional valves feature an adjustable rate from 0-100 mL/min, used for the odors flow channels, one proportional valve supports a 0-1000 mL/min range for the carrier line and finally, the remaining valve features a reconfigurable mode, allowing it to operate as a carrier line (0-1000 mL/min) or as an odor line (0-100 mL/min) (this feature is useful when an end valve is used).

The output of the flowmeters (assigned to odor channels) are connected to four three-port odor isolation valves that direct the flow to the outlets. The carrier line does not have any isolation valve.

<br />

<center>
<ThemedImage
  width="700"
  alt="OLF main diagram"
  sources={{
    light: useBaseUrl('/olf/OLF_diagram_main.svg'),
    dark: useBaseUrl('/olf/OLF_diagram_main_dark.svg'),
  }}
/>
</center>

---

## Mode of Operation

When the Harp Olfactometer is enabled, the proportional valves and flowmeters are activated and start operating in a closed loop system. The control signals for each proportional valve are continuously adjusted based on real-time flow readings, ensuring that the output remains stable at a predefined target value. If the target value is modified, the control system responds by adjusting the control signals to achieve the desired flow rate.

The regulated air flows pass through three-port isolation valves, which by default divert airflow to the exhaust. When activated, these valves redirect the corresponding airflows to the olfactometer’s main enclosure air outputs. The fifth flowmeter, dedicated to the carrier channel, is directly connected to the device’s enclosure output.

The odor air outputs from the main device are connected to odor vials, allowing the air to pass through the headspace of the vials before entering a PEEK multi-port mixing chamber. The output carrier line is continuously flowing through this chamber, being mixed with the connected odors (A).

An optional end-valve with two synchronous three-way valves, receives both the output airflow from the mixing chamber and an odor-free carrier line, with the same flow rate of the manifold’s output. The carrier line flow is normally connected to the animals’ hose, while the odor line is diverted to the exhaust. When the end-valve is switched, the carrier line is redirected to the exhaust and the odor line is delivered to the animal - keeping the same flow rate. This minimizes the latency of the odor delivery, ensuring a rapid response between the trigger event and actual odor presentation, with the end-valve placed as close as possible to the experimental rig (B).

<br />

<center>
<ThemedImage
  width="700"
  alt="OLF manifold end valve"
  sources={{
    light: useBaseUrl('/olf/OLF_diagram_manifold_with_endvalve_2x.svg'),
    dark: useBaseUrl('/olf/OLF_diagram_manifold_with_endvalve_2x_dark.svg'),
  }}
/>
</center>

---

## Key Features

- **Carrier Line:** 1x adjustable [0-1000 mL/min]
- **Odor Lines:** 4x adjustable [0-100 mL/min] (one can be reconfigured as a carrier)
- **Odor and Check Control:** Allows to control up to four odor and four check valves (≥v2.0)
- **End Valves Control:** Allows to control up to two end valves
- **TTL Control:** Odor, check and end valves can be controlled externally via TTL
- **Odor Mixture Support:** Allows multiple odor combinations

---

## Connectivity

### Front Panel

<center>
<ThemedImage
  alt="Front Panel"
  sources={{
    light: useBaseUrl('/olf/front_panel.svg'),
    dark: useBaseUrl('/olf/front_panel_dark.svg'),
  }}
/>
</center>
<br />
- **State LED [STATE]**: Green LED Harp status indicator
- **Digital IO [IN0, OUTX]:** 2x BNC Digital 5V outputs and 1x BNC digital 5V tolerant input 
- **LED Indicators [VALVES, ENDVALVE]:** Red LED valve status indicator
- **End/Check Valves Connector [AUX]:** 1x RJ45 connector
- **Carrier Outlet [CARRIER]:** 1x Push-in 3 mm tube
- **Odor Outlets [ODOR X]:** 4x Push-in 3 mm tube

<br />

### Back Panel

<center>
<ThemedImage
  alt="Back Panel"
  sources={{
    light: useBaseUrl('/olf/back_panel.svg'),
    dark: useBaseUrl('/olf/back_panel_dark.svg'),
  }}
/>
</center>
<br />
- **Clock Sync Input [CLK SYNC]:** 1x Stereo jack clock input
- **Computer Interface [USB]:** 1x USB Type-B
- **Power Supply [24V DC]:** 1x 24V barrel jack
- **Air Inlet [AIR IN]:** 1x Push-in 8 mm tube
- **TTL signals [EXT CTRL]:** 1x Screw terminal

<br />


---

## Technical Specifications

| Parameter            | Specification                         |
|----------------------|---------------------------------------|
| Carrier Flow Rate    | 0-1000 ml/min                         |
| Odor Flow Rate       | 0-100 ml/min                          |
| Digital Inputs       | 1x 5V tolerant (BNC)                  |
| Digital Outputs      | 2x 5V (BNC)                           |
| Air Inlet            | 8 mm push-in fitting                  |
| Power Supply         | 24V DC                                |
