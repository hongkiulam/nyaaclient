export interface QueryObject {
  q: string;
  page: string;
  user: string;
  sort: string;
  order: string;
  [key: string]: string;
}
