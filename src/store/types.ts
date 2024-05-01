export type Offer = {
  user: string;
  status: "approved" | "pending" | "declined";
  email: string;
  case: string;
  reason: string;
  submissionDate: string;
};

export type OffersState = {
  offers: Offer[];
  isLoading: boolean;
  error: string | null;
  search: string;
  count: number;
  page: number;
  status: string | undefined;
  order: string | undefined;
  orderBy: string | undefined;
};

export type FilterProps = {
  page: number;
  search: string;
  status: string | undefined;
  order: string | undefined;
  orderBy: string | undefined;
};

export type OfferState = {
  offer: OffersState;
};

export type columnsState = {
  title: string;
  dataIndex: keyof Offer;
};
