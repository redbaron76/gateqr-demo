export type Provider = "gateqr";

export type Guest = {
  _id: string;
  _provider: Provider;
  _checkTime?: string;
} & Record<string, string>;
