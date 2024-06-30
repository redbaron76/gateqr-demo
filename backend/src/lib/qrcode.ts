import QRCode, { type QRCodeBufferType, type QRCodeStringType } from "qrcode";

export const generateVectorQRCode = async (
  code: string,
  type: QRCodeStringType = "svg"
): Promise<string> => {
  return QRCode.toString(code, { type });
};

export const generateImageQRCode = async (
  code: string,
  type: QRCodeBufferType = "png"
): Promise<Buffer> => {
  return QRCode.toBuffer(code, { type });
};
