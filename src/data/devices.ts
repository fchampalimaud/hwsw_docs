/**
 * Single source of truth for the devices documented on this site.
 *
 * Used by the homepage device index (`src/pages/index.tsx`) and by the
 * navbar "Devices" dropdown (`docusaurus.config.ts`).
 *
 * To document a new device:
 *  1. create `docs/<id>/` with at least an `overview.md`;
 *  2. add a sidebar for that folder in `sidebars.ts`;
 *  3. add an entry below.
 */

export type DeviceStatus = 'available' | 'in-progress';

/** Theme aware image sources, as site-root absolute paths under `static/`. */
export type DeviceImage = {
  light: string;
  dark: string;
};

/** Artwork shown for devices that do not have their own drawings yet. */
export const placeholderImage: DeviceImage = {
  light: '/img/devices/placeholder.svg',
  dark: '/img/devices/placeholder_dark.svg',
};

export type Device = {
  /** Folder name under `docs/`, also used as the URL segment. */
  id: string;
  /** Full device name. */
  title: string;
  /** Short summary shown on the homepage card. */
  description: string;
  /** Route of the device landing document. */
  docId: string;
  /** Image shown on the homepage card. */
  image: DeviceImage;
  /** Publication state of the documentation. */
  status: DeviceStatus;
  /** Optional link to the device hardware repository. */
  repo?: string;
};

export const devices: Device[] = [
  {
    id: 'olfactometer',
    title: 'Harp Olfactometer',
    description:
      'Modular odor delivery system with up to four independent odor channels, ' +
      'flow regulation in closed loop and low latency odor presentation.',
    docId: 'olfactometer/overview',
    image: {
      light: '/olf/front_panel.svg',
      dark: '/olf/front_panel_dark.svg',
    },
    status: 'available',
    repo: 'https://github.com/harp-tech/device.olfactometer',
  },
  {
    id: 'flypad-controller',
    title: 'Harp FlyPAD Controller',
    description:
      'Acquisition and multiplexing board for the flyPAD system, monitoring ' +
      'feeding behaviour in Drosophila across up to 32 capacitance based arenas.',
    docId: 'flypad-controller/overview',
    image: {
      light: '/img/devices/flypad_controller.png',
      dark: '/img/devices/flypad_controller_dark.png',
    },
    status: 'available',
  },
  {
    id: 'current-driver',
    title: 'Harp Current Driver',
    description:
      'Current driver device for stimulation and actuation applications. ' +
      'Documentation is currently being prepared.',
    docId: 'current-driver/overview',
    image: {
      light: '/img/devices/current_driver.png',
      dark: '/img/devices/current_driver_dark.png',
    },
    status: 'in-progress',
  },
];

/** Convenience helper: the `/docs/...` route of a device landing document. */
export function deviceDocPath(device: Device): string {
  return `/docs/${device.docId}`;
}
