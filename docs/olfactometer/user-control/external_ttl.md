---
sidebar_position: 3
sidebar_label: External TTL
description: Description of the external TTL valve control interface
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';

# External TTL
---

# TTL Inputs

The olfactometer is able to receive digital input signals, allowing external control of all odor, check and end valves via TTL pulses when the corresponding mode is enabled. This external valve control interface overrides the software-based control, enabling integration with widely used open-source development boards like Arduino or Raspberry Pi. These boards can interface with the olfactometer to regulate valve operation, either independently or in conjunction with the GUI and other software-based control methods.

---

## Screw Terminal

A eight pin screw terminal is available at the back panel of the olfactometer device (below in blue) <!--(for v3.x a eleven pin screw terminal is available).-->

<br />

<center>
<ThemedImage
  alt="Back panel external connector"
  sources={{
    light: useBaseUrl('/olf/back_panel_ext_ctrl.svg'),
    dark: useBaseUrl('/olf/back_panel_ext_ctrl_dark.svg'),
  }}
/>
</center>

<br />
<br />


The available pins can be used to control the odor valves inside the olfactometer, as well as the end valve, flush valve and the check valves (≥v2.0).

A 3.3 V or 5 V digital signal can be used to control these valves. A logic HIGH value opens the valve, while a logic LOW value closes it. 

<br />
<!--
| Pin  | Function (v2.x)       | Function (v1.x)   |
|------|-----------------------|-------------------|
| 1    | Ground                | Ground            |
| 2    | Flush valve control   | -                 |
| 3    | End valve control     | End valve control |
| 4    | Valve 3 control       | Valve 3 control   |
| 5    | Valve 2 control       | Valve 2 control   |
| 6    | Valve 1 control       | Valve 1 control   |
| 7    | Valve 0 control       | Valve 0 control   |
| 8    | Check valve 3 control | Ground            |
| 9    | Check valve 2 control | NA                | 
| 10   | Check valve 1 control | NA                | 
| 11   | Check valve 0 control | NA                |
-->
| Pin  | Function              |
|------|-----------------------|
| 1    | Ground                |
| 2    | -                     |
| 3    | End valve control     |
| 4    | Odor valve 3 control  |
| 5    | Odor valve 2 control  |
| 6    | Odor valve 1 control  |
| 7    | Odor valve 0 control  |
| 8    | Ground                |

---

## Control

### Step 1: External Configuration
1. Set the `EnableValveExternalControl` register to `Enabled`.


### Step 2: Sending TTL Signals
1. A **HIGH (3.3-5V)** signal activates the valve.
2. A **LOW (0V)** signal deactivates the valve.


:::tip[Ground connection]
Ensure that the Ground pin is also connected to the external controller.
:::