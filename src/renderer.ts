export type ImageSource =
  | HTMLImageElement
  | HTMLCanvasElement
  | ImageBitmap
  | OffscreenCanvas;

export interface IRenderer {
  readonly width: number;
  readonly height: number;

  setAlpha(alpha: number): void;
  save(): void;
  restore(): void;
  translate(x: number, y: number): void;
  scale(x: number, y: number): void;

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

  fillRect(color: string, x: number, y: number, w: number, h: number): void;
  strokeRect(color: string, x: number, y: number, w: number, h: number): void;

  /** Returns the pixel width of a native browser text string (debug use only). */
  measureText(text: string): number;
}
