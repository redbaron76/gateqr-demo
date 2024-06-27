import { BarcodeDetector, Point2D } from "barcode-detector";

export type QrScannerOptions = {
  canvas?: HTMLCanvasElement;
  audio?: HTMLAudioElement;
  scanningInterval?: number;
  detectTimeout?: number;
  detectColor?: string;
  detectEnabled?: boolean;
  detectWidth?: number;
  constraints?: MediaStreamConstraints;
  vibrate?: boolean;
  sound?: boolean;
};

export default class ScannerQR {
  videoEl: HTMLVideoElement;
  onCodeDetected: (value: string) => void;
  options: QrScannerOptions;

  canvasEl?: HTMLCanvasElement;
  sound: boolean = false;

  isRunning: boolean = false;

  scanInterval: Timer | null = null;
  dismissTimeout: Timer | null = null;
  barcodeDetector: BarcodeDetector | null = null;

  constructor(
    videoEl: typeof ScannerQR.prototype.videoEl,
    onCodeDetected: typeof ScannerQR.prototype.onCodeDetected,
    options: typeof ScannerQR.prototype.options
  ) {
    this.videoEl = videoEl;
    this.onCodeDetected = onCodeDetected;
    this.options = options;

    this.canvasEl = options.canvas;
    this.sound = options.sound || false;

    this.initVideo().then(() => {
      this.runScanner();
    });
  }

  async initVideo(): Promise<void> {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Set constraints
      const constraints = this.options.constraints || {
        video: true,
        audio: false,
      };

      // Start video stream
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.videoEl.srcObject = stream;

      // Wait for video metadata to load -> video ready
      return new Promise((resolve) => {
        this.videoEl.onloadedmetadata = () => {
          this.videoEl.play().then(() => {
            console.log("video playing...");
            this.isRunning = true;
            resolve();
          });
        };
      });
    }
  }

  stopScanner(): void {
    if (this.scanInterval) {
      clearInterval(this.scanInterval);
      this.barcodeDetector = null;
      this.scanInterval = null;

      if (this.dismissTimeout) {
        clearTimeout(this.dismissTimeout);
        this.dismissTimeout = null;
      }

      console.log("scanner stopped...");
    }
  }

  runScanner(): void {
    // Initialize barcode detector
    this.barcodeDetector = new BarcodeDetector({ formats: ["qr_code"] });

    // Start scanning for QR codes
    this.scanInterval = setInterval(
      () => this.detectCode(),
      this.options.scanningInterval || 100
    );

    console.log("scanner running...");
  }

  async detectCode(): Promise<void> {
    if (this.barcodeDetector) {
      // Detect QR codes
      const codes = await this.barcodeDetector.detect(this.videoEl);
      // Exit if no codes detected
      if (!codes || codes.length === 0) return;

      const qrcode = codes[0];
      const { rawValue, cornerPoints } = qrcode;

      console.log("QR code value:", rawValue);
      this.onCodeDetected(rawValue);
      this.vibrate();
      this.beep();

      if (this.options.detectEnabled && cornerPoints) {
        this.drawCodePath(cornerPoints);
      }
    }
  }

  drawCodePath(cornerPoints?: [Point2D, Point2D, Point2D, Point2D]): void {
    if (this.canvasEl) {
      const canvas = this.canvasEl;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (cornerPoints) {
          ctx.beginPath();
          ctx.moveTo(cornerPoints[0].x, cornerPoints[0].y);

          for (let i = 1; i < cornerPoints.length; i++) {
            ctx.lineTo(cornerPoints[i].x, cornerPoints[i].y);
          }

          ctx.closePath();
          ctx.lineWidth = this.options.detectWidth || 2;
          ctx.strokeStyle = this.options.detectColor || "red";
          ctx.stroke();
        }
      }

      if (this.dismissTimeout) {
        clearTimeout(this.dismissTimeout);
        this.dismissTimeout = null;
      }

      this.dismissTimeout = setTimeout(() => {
        this.removeCodePath();
      }, this.options.detectTimeout || 2000);
    }
  }

  removeCodePath(): void {
    if (this.canvasEl) {
      const canvas = this.canvasEl;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        console.log("removing code path...");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }

  destroy(): void {
    if (this.isRunning) {
      console.log("destroying scanner...");

      // Stop scanning
      if (this.scanInterval) clearInterval(this.scanInterval);

      // Stop video stream
      const stream = this.videoEl.srcObject as MediaStream;
      const tracks = stream.getTracks();

      // Stop all tracks
      tracks.forEach((track) => {
        track.enabled = false;
        track.stop();
      });

      // Remove video stream
      this.videoEl.srcObject = null;
      this.videoEl.src = "";
      this.isRunning = false;
    }
  }

  beep(): void {
    if (this.sound) {
      this.options.audio?.play();
    }
  }

  toggleSound(): void {
    this.sound = !this.sound;
  }

  vibrate(): void {
    if (navigator.vibrate && this.options.vibrate) {
      navigator.vibrate(100);
    }
  }
}
