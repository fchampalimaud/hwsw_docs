import {useEffect, useRef, type ReactNode} from 'react';

import styles from './styles.module.css';

/**
 * Animated "neural network" backdrop, ported from the Hardware and Software Platform
 * website (`index_main.html`, the `bg-canvas` script) to run inside a single element
 * instead of the whole viewport.
 *
 * Neurons drift and slowly rotate, nearby ones are joined by curved axons, and they fire
 * either spontaneously or when the pointer comes close - a spark then travels the axon.
 *
 * The canvas fills its positioned parent, so the parent needs `position: relative` and,
 * to clip the drawing, `overflow: hidden`.
 */

/** Colours are tuned for the CF blue hero gradient: light strokes over a dark blue. */
const COLORS = {
  dendrite: 'rgba(255, 255, 255, 0.18)',
  dendriteFiring: 'rgba(160, 236, 255, 0.75)',
  soma: 'rgba(255, 255, 255, 0.12)',
  somaFiring: 'rgba(160, 236, 255, 0.28)',
  somaStroke: 'rgba(255, 255, 255, 0.3)',
  somaStrokeFiring: 'rgba(190, 243, 255, 0.9)',
  nucleus: 'rgba(255, 255, 255, 0.55)',
  nucleusFiring: '#bef3ff',
};

/** One neuron per this many square pixels of banner, capped so wide screens stay cheap. */
const AREA_PER_NEURON = 9000;
const MAX_NEURONS = 90;
/**
 * Axons are drawn between neurons closer than this. The original derived it from the
 * viewport shape (`width / 10 * height / 10`), which collapses in a short, wide banner:
 * it would fall below the mean neuron spacing of `sqrt(AREA_PER_NEURON)` and leave the
 * network unconnected. A fixed multiple of that spacing keeps the look shape independent.
 */
const CONNECT_DISTANCE = 1.6 * Math.sqrt(AREA_PER_NEURON);
/** Distance within which the pointer excites a neuron. */
const MOUSE_RADIUS = 120;

type Dendrite = {
  angle: number;
  length: number;
  branchAngle: number;
  branchPos: number;
  branchLength: number;
};

export default function NeuralBackground(): ReactNode {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) {
      return undefined;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return undefined;
    }

    let width = 0;
    let height = 0;
    let neurons: Neuron[] = [];
    let frameId: number | null = null;

    // The pointer acts as a stimulus. `null` means "outside the banner".
    const mouse: {x: number | null; y: number | null} = {x: null, y: null};

    class Neuron {
      size: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      rotation: number;
      rotationSpeed: number;
      dendrites: Dendrite[];
      isFiring: boolean;
      fireProgress: number;
      fireCooldown: number;

      constructor() {
        this.size = Math.random() * 1.5 + 1.2;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;

        // Rotation for organic feel
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;

        // Generate random dendrites for this specific neuron
        const numDendrites = Math.floor(Math.random() * 4) + 4; // 4 to 7 dendrites
        this.dendrites = [];
        for (let i = 0; i < numDendrites; i++) {
          const angle =
            (i / numDendrites) * Math.PI * 2 + (Math.random() * 0.5 - 0.25);
          const length = Math.random() * this.size * 6 + this.size * 4;
          // Branching properties for a more organic look
          const branchAngle =
            (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 0.5 + 0.2);
          const branchPos = Math.random() * 0.4 + 0.4; // Where the branch starts
          const branchLength = length * (Math.random() * 0.5 + 0.3);

          this.dendrites.push({angle, length, branchAngle, branchPos, branchLength});
        }

        // Firing logic (action potentials)
        this.isFiring = false;
        this.fireProgress = 0;
        this.fireCooldown = Math.random() * 300 + 100;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        // 1. Dendrites
        ctx.beginPath();
        for (const d of this.dendrites) {
          ctx.moveTo(0, 0);
          const ex = Math.cos(d.angle) * d.length;
          const ey = Math.sin(d.angle) * d.length;
          ctx.lineTo(ex, ey);

          // Secondary branch
          const bx = Math.cos(d.angle) * (d.length * d.branchPos);
          const by = Math.sin(d.angle) * (d.length * d.branchPos);
          const endBx = bx + Math.cos(d.angle + d.branchAngle) * d.branchLength;
          const endBy = by + Math.sin(d.angle + d.branchAngle) * d.branchLength;
          ctx.moveTo(bx, by);
          ctx.lineTo(endBx, endBy);
        }
        ctx.strokeStyle = this.isFiring ? COLORS.dendriteFiring : COLORS.dendrite;
        ctx.lineWidth = 1;
        ctx.stroke();

        // 2. Soma (cell body) - irregular organic shape
        ctx.beginPath();
        for (let i = 0; i <= 6; i++) {
          const a = (i / 6) * Math.PI * 2;
          const r = this.size * 2.5 + Math.sin(a * 3 + this.rotation * 2) * 1.5;
          const px = Math.cos(a) * r;
          const py = Math.sin(a) * r;
          if (i === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.closePath();
        ctx.fillStyle = this.isFiring ? COLORS.somaFiring : COLORS.soma;
        ctx.fill();
        ctx.strokeStyle = this.isFiring ? COLORS.somaStrokeFiring : COLORS.somaStroke;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // 3. Nucleus
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.isFiring ? COLORS.nucleusFiring : COLORS.nucleus;
        ctx.fill();

        ctx.restore();
      }

      update() {
        // Organic drifting movement
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;

        // Bounce off edges
        if (this.x > width || this.x < 0) {
          this.vx *= -1;
        }
        if (this.y > height || this.y < 0) {
          this.vy *= -1;
        }

        // Stimulus from pointer interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < MOUSE_RADIUS && !this.isFiring && this.fireCooldown <= 0) {
            this.isFiring = true;
          }
        }

        // Firing state progression
        if (this.isFiring) {
          this.fireProgress += 0.015; // Speed of the electrical signal
          if (this.fireProgress >= 1) {
            this.isFiring = false;
            this.fireProgress = 0;
            this.fireCooldown = Math.random() * 200 + 100; // Rest period
          }
        } else if (this.fireCooldown > 0) {
          this.fireCooldown -= 1;
        } else if (Math.random() < 0.003) {
          // Spontaneous firing
          this.isFiring = true;
        }

        this.draw();
      }
    }

    function initNeurons() {
      neurons = [];
      const count = Math.min(
        MAX_NEURONS,
        Math.round((width * height) / AREA_PER_NEURON),
      );
      for (let i = 0; i < count; i++) {
        neurons.push(new Neuron());
      }
    }

    const maxDistSq = CONNECT_DISTANCE * CONNECT_DISTANCE;

    function connectNeurons() {
      for (let a = 0; a < neurons.length; a++) {
        for (let b = a + 1; b < neurons.length; b++) {
          const n1 = neurons[a];
          const n2 = neurons[b];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq >= maxDistSq) {
            continue;
          }
          const opacity = 1 - distSq / maxDistSq;

          // Curved connection (dendrite / axon)
          const cx = (n1.x + n2.x) / 2 + (n1.y - n2.y) * 0.15;
          const cy = (n1.y + n2.y) / 2 + (n2.x - n1.x) * 0.15;

          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.quadraticCurveTo(cx, cy, n2.x, n2.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.22})`;
          ctx.lineWidth = opacity * 1.5;
          ctx.stroke();

          // Action potential travelling the axon
          if (n1.isFiring && opacity > 0.1) {
            const progress = n1.fireProgress;
            const invP = 1 - progress;

            // Quadratic bezier point interpolation
            const sigX =
              invP * invP * n1.x + 2 * invP * progress * cx + progress * progress * n2.x;
            const sigY =
              invP * invP * n1.y + 2 * invP * progress * cy + progress * progress * n2.y;

            ctx.beginPath();
            ctx.arc(sigX, sigY, opacity * 2.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(190, 243, 255, ${Math.min(1, opacity + 0.2)})`;
            ctx.fill();
          }
        }
      }
    }

    function drawFrame() {
      ctx.clearRect(0, 0, width, height);
      // Connections first, so they sit behind the somas
      connectNeurons();
      for (const neuron of neurons) {
        neuron.update();
      }
    }

    function animate() {
      frameId = requestAnimationFrame(animate);
      drawFrame();
    }

    // Viewers who ask for reduced motion get a single static frame instead of the loop.
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function start() {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
        frameId = null;
      }
      if (reducedMotion.matches) {
        drawFrame();
      } else {
        animate();
      }
    }

    /** Resize the backing store to the parent's box, accounting for HiDPI screens. */
    function resize() {
      const nextWidth = parent.clientWidth;
      const nextHeight = parent.clientHeight;
      if (nextWidth === width && nextHeight === height) {
        return;
      }
      width = nextWidth;
      height = nextHeight;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initNeurons();
      start();
    }

    function handlePointerMove(event: PointerEvent) {
      const rect = parent.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    }

    function handlePointerLeave() {
      mouse.x = null;
      mouse.y = null;
    }

    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    parent.addEventListener('pointermove', handlePointerMove);
    parent.addEventListener('pointerleave', handlePointerLeave);
    reducedMotion.addEventListener('change', start);

    resize();

    return () => {
      observer.disconnect();
      parent.removeEventListener('pointermove', handlePointerMove);
      parent.removeEventListener('pointerleave', handlePointerLeave);
      reducedMotion.removeEventListener('change', start);
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
