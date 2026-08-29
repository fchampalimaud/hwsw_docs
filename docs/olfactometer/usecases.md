---
sidebar_position: 5
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';

# Use Cases

---

## Modularity

It is possible to extend the number of odors by adding additional olfactometer devices, which can be time synchronized through a common clock line. The total number of available odor channels depends on the number of devices and if the end valve is utilized. The manifold can also be cascaded to support additional odors.

In general, each added olfactometer allows for up to four more odor lines. For example, an 8-odor setup typically uses two olfactometers: one provides the carrier line for the mixing chamber, while the other supplies the carrier for the end valve. Below are diagrams illustrating different configurations, assuming an 8-port manifold and an end valve for odor delivery.


---

## Single Olfactometer

A single olfactometer with an end valve supports up to three odor channels. Channel 4's carrier line is connected to the manifold, while Channel 3, configured as an auxiliary carrier line, is connected to the end valve. The total carrier flow equals the sum of the auxiliary carrier flow and the combined flow of the odor channels used at each delivery.

<br />

<center>
<ThemedImage
  width="400"
  alt="OLF diagram 1 device"
  sources={{
    light: useBaseUrl('/olf/OLF_diagram_1x_device.svg'),
    dark: useBaseUrl('/olf/OLF_diagram_1x_device_dark.svg'),
  }}
/>
</center>


---

## Two Olfactometers

When using two olfactometers with an end valve, all odor channels become available for use. The Channel 4 carrier line from one olfactometer is connected to the end valve (carrier 0), while the Channel 4 carrier line from the second olfactometer is connected to the manifold (carrier 1). All odor lines are connected through a shared 8-port manifold. The total carrier flow is equals the sum of the auxiliary carrier flow and the combined flow of the odor channels used at each delivery.

<br />

<center>
<ThemedImage
  width="480"
  alt="OLF diagram 2 devices"
  sources={{
    light: useBaseUrl('/olf/OLF_diagram_2x_device.svg'),
    dark: useBaseUrl('/olf/OLF_diagram_2x_device_dark.svg'),
  }}
/>
</center>

---

## Multiple Olfactometers

The modular design of the olfactometer devices allows them to be cascaded to accommodate a large number of odors. Two carrier lines are used - one connected to the first manifold and the other to the end valve. To enable mixing of more than 8 odor, manifolds are cascaded: the output of each manifold is connected to the input of the next, forming a sequential chain. The total carrier flow is equals the sum of the auxiliary carrier flow and the combined flow of the odor channels used at each delivery.

<br />

<center>
<ThemedImage
  width="1000"
  alt="OLF diagram 2+ devices"
  sources={{
    light: useBaseUrl('/olf/OLF_diagram_3x_device.svg'),
    dark: useBaseUrl('/olf/OLF_diagram_3x_device_dark.svg'),
  }}
/>
</center>

