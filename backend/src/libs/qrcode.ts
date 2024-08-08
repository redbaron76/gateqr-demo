import QRCode, { type QRCodeBufferType, type QRCodeStringType } from "qrcode";

export const generateVectorQRCode = async (
  code: string,
  type: QRCodeStringType = "svg"
): Promise<string> => {
  return QRCode.toString(code, { type });
};

export const BufferToArrayBuffer = (buffer: Buffer): ArrayBuffer => {
  const arrayBuffer = new ArrayBuffer(buffer.length);
  const view = new Uint8Array(arrayBuffer);
  view.set(buffer);
  return arrayBuffer;
};

export const BufferToBlob = (buffer: Buffer, type: string): Blob => {
  return new Blob([buffer], { type });
};

export const generateImageQRCode = async (
  code: string,
  type: QRCodeBufferType = "png"
): Promise<Blob> => {
  const imageBuffer = await QRCode.toBuffer(code, {
    type,
    width: 500,
    margin: 10,
  });
  // return BufferToArrayBuffer(imageBuffer);
  return BufferToBlob(imageBuffer, "image/png");
};
