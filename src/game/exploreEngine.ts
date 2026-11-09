import { WORLD_W } from '../data/levels';
import type { ExploreLevel, Platform } from '../data/levels';
import { SHAPE_META } from '../data/shapes';
import type { ShapeKind } from '../data/shapes';

/* ---------- Parameter fisika (satuan: unit dunia, lebar dunia = 360) ---------- */
const GRAVITY = 1500;
const JUMP_VELOCITY = 620; // tinggi lompat ~128 unit; jarak antar platform <= 95
const MAX_FALL = 900;
const MOVE_SPEED = 175;
const COYOTE_TIME = 0.1; // toleransi lompat sesaat setelah meninggalkan tepi
const JUMP_BUFFER = 0.12; // toleransi menekan lompat sesaat sebelum mendarat
const HALF_W = 13;
const BODY_H = 44;
const INVULNERABLE_TIME = 1.1;

// Area sprite maskot yang terlihat di maskot.png (420x594, ada ruang transparan)
const SPRITE = { sx: 29, sy: 139, sw: 381, sh: 403 };

export interface ExploreCallbacks {
  onCollectShape: (kind: ShapeKind, collected: number, total: number) => void;
  onCollectCoin: (total: number) => void;
  onHazard: () => void;
  onCheckpoint: () => void;
  onGoal: () => void;
}

export interface ExploreAssets {
  player: HTMLImageElement;
  background: HTMLImageElement;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

export class ExploreEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private level: ExploreLevel;
  private assets: ExploreAssets;
  private cb: ExploreCallbacks;

  private running = false;
  private paused = false;
  private finished = false;
  private raf = 0;
  private last = 0;
  private time = 0;

  private cssW = 1;
  private cssH = 1;
  private dpr = 1;
  private scale = 1;
  private viewH = 1;
  private camY = 0;

  private px: number;
  private py: number;
  private vx = 0;
  private vy = 0;
  private onGround = false;
  private facing = 1;
  private coyote = 0;
  private jumpBuffer = 0;
  private invulnerable = 0;

  private left = false;
  private right = false;

  private shapeTaken: boolean[];
  private coinTaken: boolean[];
  private shapesCollected = 0;
  private coinsCollected = 0;
  private checkpoint: { x: number; y: number };
  private checkpointActive: boolean[];
  private particles: Particle[] = [];

  constructor(
    canvas: HTMLCanvasElement,
    level: ExploreLevel,
    assets: ExploreAssets,
    callbacks: ExploreCallbacks,
  ) {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D tidak tersedia');
    this.canvas = canvas;
    this.ctx = ctx;
    this.level = level;
    this.assets = assets;
    this.cb = callbacks;

    this.px = level.start.x;
    this.py = level.start.y;
    this.checkpoint = { ...level.start };
    this.shapeTaken = level.shapes.map(() => false);
    this.coinTaken = level.coins.map(() => false);
    this.checkpointActive = level.checkpoints.map(() => false);

    this.resize();
    this.camY = this.targetCam();
  }

  /* ---------- Kontrol dari luar ---------- */

  setLeft(down: boolean) { this.left = down; }
  setRight(down: boolean) { this.right = down; }
  pressJump() { this.jumpBuffer = JUMP_BUFFER; }
  setPaused(value: boolean) { this.paused = value; }

  start() {
    if (this.running) return;
    this.running = true;
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.loop);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  resize() {
    this.cssW = Math.max(1, this.canvas.clientWidth);
    this.cssH = Math.max(1, this.canvas.clientHeight);
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.round(this.cssW * this.dpr);
    this.canvas.height = Math.round(this.cssH * this.dpr);
    this.scale = this.cssW / WORLD_W;
    this.viewH = this.cssH / this.scale;
  }

  /* ---------- Loop ---------- */

  private loop = (now: number) => {
    if (!this.running) return;
    const dt = Math.min((now - this.last) / 1000, 1 / 30);
    this.last = now;
    if (!this.paused && !this.finished) this.step(dt);
    this.render();
    this.raf = requestAnimationFrame(this.loop);
  };

  private step(dt: number) {
    this.time += dt;
    this.invulnerable = Math.max(0, this.invulnerable - dt);

    // Gerak horizontal dengan percepatan halus
    const dir = (this.right ? 1 : 0) - (this.left ? 1 : 0);
    if (dir !== 0) this.facing = dir;
    this.vx += (dir * MOVE_SPEED - this.vx) * Math.min(1, (dir !== 0 ? 14 : 18) * dt);

    // Lompat (coyote time + jump buffer)
    this.coyote = this.onGround ? COYOTE_TIME : this.coyote - dt;
    this.jumpBuffer -= dt;
    if (this.jumpBuffer > 0 && this.coyote > 0) {
      this.vy = -JUMP_VELOCITY;
      this.onGround = false;
      this.coyote = 0;
      this.jumpBuffer = 0;
    }

    this.vy = Math.min(MAX_FALL, this.vy + GRAVITY * dt);

    const prevFeet = this.py;
    this.px = Math.min(WORLD_W - HALF_W, Math.max(HALF_W, this.px + this.vx * dt));
    this.py += this.vy * dt;

    // Platform satu arah: hanya mendarat dari atas
    this.onGround = false;
    if (this.vy >= 0) {
      for (const p of this.level.platforms) {
        if (this.landsOn(p, prevFeet)) {
          this.py = p.y;
          this.vy = 0;
          this.onGround = true;
          break;
        }
      }
    }

    this.checkCollectibles();
    this.checkHazards();
    this.checkCheckpoints();
    this.checkGoal();
    this.updateParticles(dt);

    // Kamera mengikuti pemain (halus)
    this.camY += (this.targetCam() - this.camY) * Math.min(1, 6 * dt);
  }

  private landsOn(p: Platform, prevFeet: number) {
    return (
      prevFeet <= p.y + 1 &&
      this.py >= p.y &&
      this.px + HALF_W > p.x &&
      this.px - HALF_W < p.x + p.w
    );
  }

  private overlapsBox(cx: number, cy: number, halfW: number, halfH: number) {
    return (
      Math.abs(this.px - cx) < HALF_W + halfW &&
      this.py > cy - halfH &&
      this.py - BODY_H < cy + halfH
    );
  }

  /* ---------- Interaksi ---------- */

  private checkCollectibles() {
    this.level.shapes.forEach((s, i) => {
      if (this.shapeTaken[i] || !this.overlapsBox(s.x, s.y, 14, 14)) return;
      this.shapeTaken[i] = true;
      this.shapesCollected += 1;
      this.burst(s.x, s.y, SHAPE_META[s.kind].fill);
      this.cb.onCollectShape(s.kind, this.shapesCollected, this.level.shapes.length);
    });
    this.level.coins.forEach((c, i) => {
      if (this.coinTaken[i] || !this.overlapsBox(c.x, c.y, 10, 10)) return;
      this.coinTaken[i] = true;
      this.coinsCollected += 1;
      this.burst(c.x, c.y, '#ffd84a');
      this.cb.onCollectCoin(this.coinsCollected);
    });
  }

  private checkHazards() {
    if (this.invulnerable > 0) return;
    for (const s of this.level.spikes) {
      const hit =
        this.px + HALF_W - 6 > s.x &&
        this.px - HALF_W + 6 < s.x + s.w &&
        this.py > s.y - 8 && // hitbox dibuat longgar: cukup melompati duri
        this.py - BODY_H < s.y;
      if (hit) {
        // Tanpa hukuman permanen: kembali ke checkpoint terakhir
        this.px = this.checkpoint.x;
        this.py = this.checkpoint.y;
        this.vx = 0;
        this.vy = 0;
        this.invulnerable = INVULNERABLE_TIME;
        this.burst(s.x + s.w / 2, s.y - 8, '#ff5a5f');
        this.cb.onHazard();
        return;
      }
    }
  }

  private checkCheckpoints() {
    this.level.checkpoints.forEach((c, i) => {
      if (this.checkpointActive[i]) return;
      if (Math.abs(this.px - c.x) < 26 && Math.abs(this.py - c.y) < 6) {
        this.checkpointActive[i] = true;
        this.checkpoint = { x: c.x, y: c.y };
        this.burst(c.x, c.y - 30, '#5be37d');
        this.cb.onCheckpoint();
      }
    });
  }

  private checkGoal() {
    const g = this.level.goal;
    const near = Math.abs(this.px - g.x) < 24 && this.py > g.y - 80 && this.py < g.y + 30;
    if (!near) return;
    this.finished = true;
    this.burst(g.x, g.y - 60, '#ffd84a');
    this.cb.onGoal();
  }

  /* ---------- Partikel ---------- */

  private burst(x: number, y: number, color: string) {
    for (let i = 0; i < 10; i++) {
      const a = (Math.PI * 2 * i) / 10;
      const sp = 60 + Math.random() * 80;
      this.particles.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 40, life: 0.6, color });
    }
  }

  private updateParticles(dt: number) {
    this.particles = this.particles.filter((p) => (p.life -= dt) > 0);
    for (const p of this.particles) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += 300 * dt;
    }
  }

  /* ---------- Render ---------- */

  private targetCam() {
    const maxCam = Math.max(0, this.level.worldHeight - this.viewH);
    return Math.min(maxCam, Math.max(0, this.py - this.viewH * 0.6));
  }

  private render() {
    const { ctx, dpr, scale } = this;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, this.cssW, this.cssH);
    this.drawBackground();

    ctx.setTransform(dpr * scale, 0, 0, dpr * scale, 0, -this.camY * dpr * scale);
    this.level.platforms.forEach((p, i) => this.drawPlatform(p, i === 0));
    this.level.spikes.forEach((s) => this.drawSpikes(s.x, s.y, s.w));
    this.level.checkpoints.forEach((c, i) => this.drawCheckpoint(c.x, c.y, this.checkpointActive[i]));
    this.drawGoal();
    this.level.coins.forEach((c, i) => {
      if (!this.coinTaken[i]) this.drawCoin(c.x, c.y + Math.sin(this.time * 3 + i) * 2);
    });
    this.level.shapes.forEach((s, i) => {
      if (!this.shapeTaken[i]) this.drawShape(s.kind, s.x, s.y + Math.sin(this.time * 2.4 + i * 1.3) * 3);
    });
    this.drawPlayer();
    this.drawParticles();
  }

  private drawBackground() {
    const { ctx, assets } = this;
    const img = assets.background;
    const w = this.cssW;
    const h = this.cssH;
    const s = Math.max(w / img.naturalWidth, h / img.naturalHeight) * 1.15;
    const bw = img.naturalWidth * s;
    const bh = img.naturalHeight * s;
    const maxCam = Math.max(1, this.level.worldHeight - this.viewH);
    const t = Math.min(1, Math.max(0, this.camY / maxCam)); // 0 = puncak, 1 = dasar
    ctx.drawImage(img, (w - bw) / 2, -(bh - h) * t, bw, bh);
  }

  private roundRect(x: number, y: number, w: number, h: number, r: number) {
    const { ctx } = this;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  private drawPlatform(p: Platform, ground: boolean) {
    const { ctx } = this;
    const depth = ground ? 600 : 40;
    ctx.save();

    // Badan tanah
    const body = ctx.createLinearGradient(0, p.y, 0, p.y + Math.min(depth, 90));
    body.addColorStop(0, '#c98d55');
    body.addColorStop(1, '#8a5a33');
    ctx.fillStyle = body;
    ctx.strokeStyle = '#6b4224';
    ctx.lineWidth = 2;
    ctx.beginPath();
    if (ground) {
      ctx.rect(p.x - 4, p.y + 4, p.w + 8, depth);
    } else {
      ctx.moveTo(p.x + 2, p.y + 4);
      ctx.lineTo(p.x + p.w - 2, p.y + 4);
      ctx.lineTo(p.x + p.w - 14, p.y + depth * 0.65);
      ctx.lineTo(p.x + p.w / 2 + 6, p.y + depth);
      ctx.lineTo(p.x + 14, p.y + depth * 0.62);
      ctx.closePath();
    }
    ctx.fill();
    ctx.stroke();

    // Rumput
    this.roundRect(p.x - 3, p.y - 5, p.w + 6, 16, 8);
    const grass = ctx.createLinearGradient(0, p.y - 5, 0, p.y + 11);
    grass.addColorStop(0, '#86ea5a');
    grass.addColorStop(1, '#45b83a');
    ctx.fillStyle = grass;
    ctx.fill();
    ctx.strokeStyle = '#2f8a2a';
    ctx.stroke();
    ctx.restore();
  }

  private drawSpikes(x: number, y: number, w: number) {
    const { ctx } = this;
    const n = Math.max(2, Math.round(w / 12));
    const sw = w / n;
    ctx.save();
    ctx.fillStyle = '#ff5a5f';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    for (let i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.moveTo(x + i * sw, y);
      ctx.lineTo(x + i * sw + sw / 2, y - 18);
      ctx.lineTo(x + (i + 1) * sw, y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }

  private drawCheckpoint(x: number, y: number, active: boolean) {
    const { ctx } = this;
    ctx.save();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - 36);
    ctx.stroke();
    ctx.fillStyle = active ? '#3fd86a' : '#aab7c4';
    ctx.beginPath();
    ctx.moveTo(x, y - 36);
    ctx.lineTo(x + 18, y - 30);
    ctx.lineTo(x, y - 22);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  private drawGoal() {
    const { ctx } = this;
    const g = this.level.goal;
    ctx.save();
    const glow = ctx.createRadialGradient(g.x, g.y - 50, 4, g.x, g.y - 50, 48);
    glow.addColorStop(0, 'rgba(255,230,120,0.75)');
    glow.addColorStop(1, 'rgba(255,230,120,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(g.x - 50, g.y - 100, 100, 100);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(g.x, g.y);
    ctx.lineTo(g.x, g.y - 78);
    ctx.stroke();
    const wave = Math.sin(this.time * 5) * 3;
    ctx.fillStyle = '#ef3d4a';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(g.x, g.y - 78);
    ctx.quadraticCurveTo(g.x + 20, g.y - 76 + wave, g.x + 36, g.y - 66);
    ctx.quadraticCurveTo(g.x + 20, g.y - 62 - wave, g.x, g.y - 52);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  private drawCoin(x: number, y: number) {
    const { ctx } = this;
    ctx.save();
    ctx.fillStyle = '#ffd23f';
    ctx.strokeStyle = '#c98f00';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(x, y, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = '#fff1a8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  private drawShape(kind: ShapeKind, x: number, y: number) {
    const { ctx } = this;
    const meta = SHAPE_META[kind];
    ctx.save();
    const glow = ctx.createRadialGradient(x, y, 2, x, y, 26);
    glow.addColorStop(0, 'rgba(255,255,255,0.85)');
    glow.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = meta.fill;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.beginPath();
    if (kind === 'segitiga') {
      ctx.moveTo(x, y - 15);
      ctx.lineTo(x + 15, y + 12);
      ctx.lineTo(x - 15, y + 12);
      ctx.closePath();
    } else if (kind === 'persegi') {
      this.roundRect(x - 12, y - 12, 24, 24, 4);
    } else if (kind === 'persegi-panjang') {
      this.roundRect(x - 17, y - 10, 34, 20, 4);
    } else {
      ctx.arc(x, y, 13, 0, Math.PI * 2);
    }
    ctx.stroke();
    ctx.fill();
    ctx.restore();
  }

  private drawPlayer() {
    const { ctx, assets } = this;
    if (this.invulnerable > 0 && Math.floor(this.time * 14) % 2 === 0) return; // berkedip
    const sw = 46;
    const sh = (sw * SPRITE.sh) / SPRITE.sw;
    const walking = this.onGround && Math.abs(this.vx) > 25;
    const bob = walking ? Math.abs(Math.sin(this.time * 16)) * -2 : 0;
    ctx.save();

    // Bayangan di bawah kaki
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.beginPath();
    ctx.ellipse(this.px, this.py + 1, 14, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.translate(this.px, this.py + 3);
    ctx.rotate((this.vx / MOVE_SPEED) * 0.07);
    ctx.scale(this.facing, 1);
    ctx.drawImage(assets.player, SPRITE.sx, SPRITE.sy, SPRITE.sw, SPRITE.sh, -sw / 2, -sh + bob, sw, sh);
    ctx.restore();
  }

  private drawParticles() {
    const { ctx } = this;
    for (const p of this.particles) {
      ctx.globalAlpha = Math.max(0, p.life / 0.6);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
}
