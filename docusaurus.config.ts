import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {devices, deviceDocPath} from './src/data/devices';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Devices Docs',
  tagline:
    'Documentation for the Harp devices developed at the Hardware and Software Platform of the Champalimaud Foundation',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://fchampalimaud.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/hwsw_docs',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'fchampalimaud', // Usually your GitHub org/user name.
  projectName: 'hwsw_docs', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    require.resolve('docusaurus-lunr-search')
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          sidebarCollapsible: false,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Devices Docs',
      logo: {
        alt: 'Champalimaud Foundation Logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo_white.svg',
      },
      items: [
        {
          type: 'dropdown',
          label: 'Devices',
          position: 'left',
          // Built from the device registry in `src/data/devices.ts`.
          items: devices.map((device) => ({
            label: device.title,
            to: deviceDocPath(device),
          })),
        },
        {
          href: 'https://github.com/fchampalimaud/hwsw_docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Devices',
          items: devices.map((device) => ({
            label: device.title,
            to: deviceDocPath(device),
          })),
        },
        {
          title: 'More',
          items: [
            {
              label: 'More from us on GitHub',
              href: 'https://github.com/fchampalimaud/',
            },
            {
              label: 'Official site',
              href: 'https://www.cf-hw.org/',
            },
          ],
        },
      ],
      copyright: `© 2024-${new Date().getFullYear()} Hardware and Software Platform, Champalimaud Foundation`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
