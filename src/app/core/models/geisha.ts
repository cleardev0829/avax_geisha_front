export interface Geisha {
  id?: number;
  tokenURI?: string;
  tokenId?: string;
  isMinted?: boolean;
  price?: number;
  transfers?: number;
  isForSale?: boolean;
  mintedBy?: string;
  currentOwner?: string;
  background: string;
  body: string;
  face: string;
  hair: string;
  accessories: string;
  aura: string;
}
