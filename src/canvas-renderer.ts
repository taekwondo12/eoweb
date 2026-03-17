import type { ImageSource, IRenderer } from './renderer';

/**
 * Canvas 2D implementation of IRenderer.
 * Wraps a CanvasRenderingContext2D so the rest of the codebase is decoupled
 * from the raw canvas API. Swap this class for a PixiRenderer (etc.) later
 * without touching any rendering logic.
 */
export class CanvasRenderer implements IRenderer {
  private _measureCtx: CanvasRenderingContext2D;

  constructor(private ctx: CanvasRenderingContext2D) {
    // Dedicated tiny canvas just for native measureText (debug only).
    const mc = document.createElement('canvas');
    this._measureCtx = mc.getContext('2d')!;
  }

  get width(): number {
    return this.ctx.canvas.width;
  }

  get height(): number {
    return this.ctx.canvas.height;
  }

  setAlpha(alpha: number): void {
    this.ctx.globalAlpha = alpha;
  }

  save(): void {
    this.ctx.save();
  }

  restore(): void {
    this.ctx.restore();
  }

  translate(x: number, y: number): void {
    this.ctx.translate(x, y);
  }

  scale(x: number, y: number): void {
    this.ctx.scale(x, y);
  }

  drawImage(source: ImageSource, dx: number, dy: number): void;
  drawImage(
    source: ImageSource,
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    dx: number,
    dy: number,
    dw: number,
    dh: number,
  ): void;
  drawImage(source: ImageSource, ...args: number[]): void {
    if (args.length === 2) {
      this.ctx.drawImage(source as CanvasImageSource, args[0], args[1]);
    } else {
      this.ctx.drawImage(
        source as CanvasImageSource,
        args[0], args[1], args[2], args[3],
        args[4], args[5], args[6], args[7],
      );
    }
  }

  fillRect(color: string, x: number, y: number, w: number, h: number): void {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, w, h);
  }

  strokeRect(color: string, x: number, y: number, w: number, h: number): void {
    this.ctx.strokeStyle = color;
    this.ctx.strokeRect(x, y, w, h);
  }

  measureText(text: string): number {
    return this._measureCtx.measureText(text).width;
  }
}
