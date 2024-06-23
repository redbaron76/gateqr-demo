import QRCode, { type QRCodeStringType } from "qrcode";

export const generateVectorQRCode = async (
  code: string,
  type: QRCodeStringType = "svg"
): Promise<string> => {
  return QRCode.toString(code, { type });
};
