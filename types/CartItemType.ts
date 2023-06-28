export type CartItemType = {
  name: string;
  image: string;
  id: string;
  quantity?: number | 1;
  unit_amount: number | null;
};
