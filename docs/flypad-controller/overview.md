---
sidebar_position: 1
title: Device Overview
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';

# Harp FlyPAD Controller

---

## Introduction

The Harp FlyPAD Controller is a [Harp Standard](https://harp-tech.org/) device developed at the Champalimaud Foundation. It is the acquisition and
multiplexing board of the **flyPAD** (*fly Proboscis and Activity Detector*) system, a
capacitance based method to automatically monitor and quantify feeding behaviour in
*Drosophila*, originally described in
[Itskov *et al.*, Nature Communications 5:4560 (2014)](https://www.nature.com/articles/ncomms5560).

In the original version, the behavioral arenas were multiplexed by an FPGA based board
(a Terasic DE0-Nano carrying an Altera Cyclone IV) which polled the arenas capacitance values and forwarded the
readings to the computer over a serial USB interface. The Harp FlyPAD Controller is the
functional equivalent of that board: it polls the same behavioral arenas, but exposes the data
as a Harp device. This adds hardware time-stamping of every capacitance sample, clock
synchronization with the remaining Harp devices of the rig, and digital inputs and outputs that
can be used to align the feeding data with other events of the experiment, for example.

---

## Architecture

The flyPAD system is organized in two layers: the **behavioral arenas**, which perform the
capacitance measurement, and the **Harp FlyPAD Controller**, which multiplexes and streams the
readings.

The supported arenas are composed by a single board with four independent arenas each one with **two independent food
channels**. Each channel is a pair of concentric electrodes:

- an outer annular *fly* electrode (10 mm outer diameter, 3 mm inner diameter), on which the
  animal stands;
- an inner *food* electrode, a 1.75 mm through-plated via accessed from the bottom of the PCB, on
  which the food is placed.

When the fly touches the food with its proboscis or with a leg, it changes the dielectric constant
between the two electrodes, and therefore the capacitance measured between them. Each arena carries
an **AD7150 capacitance-to-digital converter** (Analog Devices), which digitizes the two channels
at **100 Hz**. 

Up to **32 dual-channel arenas** are connected to the Harp FlyPAD Controller. The controller
addresses each converter simultaneously and time-stamps the resulting set of readings with
the Harp clock, streaming the data to the computer over USB as a single
[`CapacitanceValues`](./registers.md#capacitance-acquisition) event of 64 values
(32 arenas × 2 channels).

---

## Mode of Operation

Acquisition is idle until the [`EnableAcquisition`](./registers.md#acquisition-control) register is
set to `Enabled`. From that moment the controller continuously scans all connected arenas and emits
one `CapacitanceValues` event per acquisition cycle, containing the current reading of every
channel. Setting `EnableAcquisition` back to `Disabled` stops the scan and the event stream.

The two digital inputs and four digital outputs are independent from the acquisition state. Digital
inputs report every transition through the `DigitalInputState` event, which can be used to align the
capacitance traces with external triggers, for example the onset of a trial or an optogenetic
stimulus. Digital outputs are controlled by software and can be used to drive external hardware from
the same time base.

As with every Harp device, all events are time-stamped by the device itself, so the feeding traces
can be aligned offline with the data of any other Harp device sharing the same clock line.

---

## Key Features

- **Capacitance Channels:** up to 64 (32 dual-channel behavioral arenas)
- **Sampling Rate:** 100 Hz per channel
- **Sensitivity:** 1 fF, provided by the AD7150 capacitance-to-digital converter on each arena
- **Two Food Sources per Fly:** each arena monitors two independent food channels, allowing
  preference experiments within a single animal
- **Harp Time-stamping:** every capacitance and digital event is time-stamped by the device and
  synchronized with the remaining Harp devices of the rig
- **Digital IO:** 2x digital inputs and 4x digital outputs for synchronization with external hardware

---

## Connectivity

- **State LED [STATE]**: Green LED Harp status indicator
- **Digital IN/OUT [IN/OUT]** 1x Screw terminal for 2x outputs and 2x inputs (digital 5V tolerant) 
- **Clock Sync Input [CLKIN]:** 1x Stereo jack clock input
- **Computer Interface [USB]:** 1x USB Type-C
- **Arenas Connectors**: 8x IDC connectors for each one of the quad arenas

<br />

<center>
<img
  width="600"
  alt="Harp FlyPAD Controller board"
  src={useBaseUrl('/img/devices/flypad_controller_pcb.png')}
/>
</center>


---

## Technical Specifications

| Parameter               | Specification                                     |
|-------------------------|---------------------------------------------------|
| Behavioral Arenas       | Up to 8 quad flypad boards                        |
| Capacitance Channels    | Up to 64 (2 per arena)                            |
| Sampling Rate           | 100 Hz per channel                                |
| Capacitance Resolution  | 1 fF (AD7150, 12 bit)                             |
| Digital Inputs          | 2x                                                |
| Digital Outputs         | 4x                                                |
| Computer Interface      | USB                                               |
