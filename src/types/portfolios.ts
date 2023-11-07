export interface PortfolioType {
  data: DataType[];
  pagination: { limit: number; page: number; next: number; total: number };
}

export interface DataType {
  photo: PhotoType;
  name: string;
  description: string;
  id: string;
  url: string;
  user: object;
  __v: number;
}

export interface PaginationType {
  limit: number;
  page: number;
  next: number;
  total: number;
}

export interface PhotoType {
  _id: string;
  name: string;
  user: string;
  __v: number;
}

export interface DataType {
  data: [];
  pagination: object;
}
