export type Dataset = { 
  id: number; 
  name?: string; 
  created_at: string; 
  row_count?: number 
};

export type Position = {
  id: number; 
  dataset_id: number; 
  trade_id: string; 
  trade_date: string;
  portfolio: string; 
  isin: string; 
  issuer: string; 
  asset_class: string;
  qty: number; 
  price: number; 
  notional: number; 
  currency: string;
};
