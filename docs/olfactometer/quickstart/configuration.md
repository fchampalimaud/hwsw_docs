---
sidebar_position: 2
sidebar_label: Configuration
description: Description of a basic configuration for flow delivery setup
---

# Configuration

---

## Tubing Connections

### Step 1: Setup Selection
1. Select the appropriate configuration for your setup according to your experimental needs. A few use cases are available in the [Use Cases](../usecases.md) section.
2. Arrange the various components of the setup (vials, manifold, end valves, etc.) within the experimental rig to estimate the required tubing length.
3. Cut the necessary tubing to the appropriate lengths ([Tubing and Vials](../tubing.md)).

### Step 2: Prepare the Odor Vials
1. Prepare the septa glass vials for tubing insertion. For details, refer to [Tubing and Vials](../tubing.md) section.
2. Insert the respective tubing into the vials.

### Step 3: Fitting and Connections
1. Attach fittings to all tubing ends that connect to 1/4''-28 ports.

### Step 4: Odor and Carrier Tubing Setup
1. Connect the tubing ends to the corresponding inlets and outlets.
2. Ensure that all tubing is properly fitted to prevent leaks.

---

## Odors

### Step 1: Fill  the Odor Vials
1. Fill the vials with the corresponding odorant. 
2. Attach the respective septa lid by rotating the vial to secure it.

:::note[Vial headroom]
Make sure to leave enough headroom in the glass vial so that the tubing can be inserted into that space.
:::

:::warning[Do not immerge tubing]
Make sure to not immerge any of the vial tubes in the odor liquid.
:::


---


## Software

Using the available [User Control](../user-control/index.mdx) options, configure the olfactometer.
The following steps correspond to the configuration of an odor delivery system with two odorants, using a manifold to mix both odors.

### Step 1: Configure the Flow Rates
1. For each odor and carrier channel set the corresponding `ChannelxTargetFlow` in mL/min (e.g. `Channel0TargetFlow` = 40, `Channel1TargetFlow` = 60 and `Channel4TargetFlow` = 600)

### Step 2: Configure the Valves
1. Configure the odor valves to trigger an hardware generated pulse by using the `EnableValvePulse` register (e.g. odor valve 0 and 1 - `EnableValvePulse` = 0x0003).
2. Set the pulse duration for odor valve 0 (in milliseconds) by configuring `Valve0PulseDuration` = 500.
3. Set the pulse duration for odor valve 1 (in milliseconds) by configuring `Valve1PulseDuration` = 500.

### Step 3: Enable Flow
1. Enables the olfactometer flow by setting `EnableFlow` register to `Enabled`.

### Step 4: Trigger the Valves
1. Using the `OdorValveState` register, trigger the odor valve pulse by configuring `ValveState` = 0x0003.  
