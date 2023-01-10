import { ChainId } from '../../interfaces/connection-config.interface';

export interface PresaleStaticData {
  address: string;
  logo: string;
  website: string;
  github: string;
  twitter: string;
  reddit: string;
  telegram: string;
  discord: string;
  linkAudit: string;
  description: string;
}

export interface PresalePostData {
  logo?: string;
  website?: string;
  github?: string;
  twitter?: string;
  reddit?: string;
  telegram?: string;
  discord?: string;
  linkAudit?: string;
  description?: string;
  address: string;
  signature: string;
  chainId: ChainId;
}

export interface PresalePreviewData {
  logo?: string;
  linkAudit?: string;
}

export interface PresalePreviewsStaticData {
  [address: string]: PresalePreviewData;
}
