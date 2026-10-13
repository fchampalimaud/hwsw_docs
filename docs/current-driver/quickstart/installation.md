---
sidebar_position: 1
sidebar_label: Installation
description: Initial hardware and software setup description
---

# Installation

---

## Hardware

### Step 1: LED Connection
1. Connect the **anode** of the LED to the positive pin of the **LED0** (or **LED1**) screw terminal and the **cathode** to
   the negative **LED0** (or **LED1**) screw terminal.
2. If an external LED driver is used instead, connect its analog input to the **DAC0** (or **DAC1**)
   screw terminal.

:::warning[LED ratings]
Check the maximum current of the LED in its datasheet before enabling the output, and configure the
`Led0MaxCurrent`/`Led1MaxCurrent` registers accordingly. See [Device Registers](../registers.md#led-current).
:::

### Step 2: Clock Synchronization
1. If using a Harp clock synchronizer board, connect the correspondent audio cable to the
   **clock sync (CLKIN)** input.

### Step 3: Power Connection
1. Plug the **9–12 V DC power adapter** into the barrel connector.

:::tip[supply voltage]
The voltage that is not dropped on the LED is dissipated by the device. Use the lowest supply voltage
that still covers the forward voltage of the LED plus ~1.5 V of headroom (e.g. the **9 V** option for
IR or red LEDs), to keep the device cool.
:::

### Step 4: USB connection
1. Connect the **USB cable** to the USB port and to your computer.
2. The green LED must start blinking.

---

## Software

### Bonsai

Bonsai is an open-source visual language for reactive programming. It's lightweight, easy to use and
has a great interoperability with the Harp ecosystem (including the Harp Current Driver).

#### Bonsai Installation

Before being able to control the Harp Current Driver through Bonsai, follow the installation steps
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
A dedicated `Harp.CurrentDriver` interface package, exposing each register as a named Bonsai
operator, is available in the [device repository](https://github.com/fchampalimaud/device.currentdriver/tree/main/Interface)
but is not published in NuGet yet. Until then, the device registers can be accessed by address with
the generic operators of the `Bonsai.Harp` package, as shown in the [Example](./example.md) section.
:::
