import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';
import NeuralBackground from '@site/src/components/NeuralBackground';
import {devices, deviceDocPath, type Device} from '@site/src/data/devices';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <NeuralBackground />
      <div className={clsx('container', styles.heroContent)}>
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

function DeviceCard({device}: {device: Device}) {
  const inProgress = device.status === 'in-progress';
  const imageSources = {
    light: useBaseUrl(device.image.light),
    dark: useBaseUrl(device.image.dark),
  };
  return (
    <div className={clsx('col col--4', styles.deviceCol)}>
      <Link
        className={clsx('card', styles.deviceCard, inProgress && styles.deviceCardMuted)}
        to={deviceDocPath(device)}>
        <div className={styles.deviceImageWrapper}>
          <ThemedImage
            className={styles.deviceImage}
            alt={device.title}
            sources={imageSources}
          />
        </div>
        <div className="card__header">
          <Heading as="h3" className={styles.deviceTitle}>
            {device.title}
          </Heading>
          {inProgress && (
            <span className={clsx('badge badge--secondary', styles.deviceBadge)}>
              In preparation
            </span>
          )}
        </div>
        <div className="card__body">
          <p className={styles.deviceDescription}>{device.description}</p>
        </div>
        <div className="card__footer">
          <span className={styles.deviceLink}>
            {inProgress ? 'Preview documentation' : 'Read documentation'} →
          </span>
        </div>
      </Link>
    </div>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Devices"
      description="Documentation for the Harp devices developed at the Hardware and Software Platform of the Champalimaud Foundation">
      <HomepageHeader />
      <main className={styles.main}>
        <section className="container">
          <Heading as="h2" className={styles.sectionTitle}>
            Devices
          </Heading>
          <p className={styles.sectionSubtitle}>
            Select a device to open its documentation.
          </p>
          <div className={clsx('row', styles.deviceRow)}>
            {devices.map((device) => (
              <DeviceCard key={device.id} device={device} />
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
