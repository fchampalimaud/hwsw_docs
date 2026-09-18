---
sidebar_position: 1
sidebar_label: Installation
description: Initial hardware and software setup description
---

# Installation

---

## Hardware

### Step 1: Behavioural Arenas Connection
1. Connect each behavioural arena to the corresponding connector of the FlyPAD Controller.
2. Up to **32 dual-channel arenas** can be connected to a single controller. Arenas are addressed
   individually, so unused positions can be left free.

:::note[arena position]
The position where an arena is connected determines the index of its two channels in the
[`CapacitanceValues`](../registers.md#capacitance-acquisition) array. Keep a record of the mapping
between arenas and connectors, as it is needed to identify the animals during the analysis.
:::

### Step 2: Clock Synchronization
1. If using a Harp clock synchronizer board, connect the correspondent audio cable to the
   **clock sync (CLK SYNC)** input.

### Step 3: USB connection
1. Connect the **USB cable** to the back panel USB port and to your computer.
2. The green LED in the front panel must start blinking.

---

## Software

### Bonsai

Bonsai is an open-source visual language for reactive programming. It's lightweight, easy to use and
has a great interoperability with the Harp ecosystem (including the Harp FlyPAD Controller).

#### Bonsai Installation

Before being able to control the Harp FlyPAD Controller through Bonsai, follow the installation steps
for Bonsai and for the necessary packages:
1. Download and install the [Bonsai Installer](https://bonsai-rx.org/docs/articles/installation.html).
2. Install the necessary packages:
    1. Open Bonsai.
    2. Click on `Manage Packages`.
    3. Select `All` in _Package source_.
    4. Search and install the following packages:
        - Bonsai - Starter Pack (ID: Bonsai.StarterPack)
        - Bonsai - Harp Library (ID: Bonsai.Harp)
        - Bonsai - Harp Design Library (ID: Bonsai.Harp.Design)

:::warning[warning]

For the time being, Bonsai is only available for Windows.

:::

:::note[device interface package]
A dedicated `Harp.FlyPad` interface package, exposing each register as a named Bonsai operator, is
not published yet. Until then, the device registers are accessed by address with the generic
operators of the `Bonsai.Harp` package, as shown in the [Example](./example.md) section.

The existing [`Bonsai.FlyPad`](https://www.nuget.org/packages/Bonsai.FlyPad/) package targets the
original FTDI based flyPAD multiplexer and does **not** apply to the Harp FlyPAD Controller.
:::
