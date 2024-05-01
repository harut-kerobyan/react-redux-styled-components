import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { FilterProps, Offer, OffersState } from "./types";

const initialState: OffersState = {
  offers: [],
  isLoading: false,
  error: null,
  search: "",
  count: 0,
  page: 1,
  status: undefined,
  order: undefined,
  orderBy: undefined,
};

export const fetchOffers = createAsyncThunk<Offer[], FilterProps>(
  "offers/fetchOffers",
  async ({ page, search, status, order, orderBy }) => {
    const response = await axios.get<Offer[]>(
      "https://662e1b56a7dda1fa378c131b.mockapi.io/Offers",
      {
        params: {
          page,
          search,
          status,
          limit: 6,
          order,
          orderBy,
        },
      },
    );

    return response.data;
  },
);

export const fetchOffersCount = createAsyncThunk<number, FilterProps>(
  "offers/fetchOffersCount",
  async ({ page, search, status }) => {
    const response = await axios.get<Offer[]>(
      "https://662e1b56a7dda1fa378c131b.mockapi.io/Offers",
      {
        params: {
          page,
          search,
          status,
        },
      },
    );

    return response.data.length;
  },
);

export const offersSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload.search;
    },
    setPage: (state, action) => {
      state.page = action.payload.page;
    },
    setOrder: (state, action) => {
      state.order = action.payload.order;
    },
    setOrderBy: (state, action) => {
      state.orderBy = action.payload.orderBy;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOffers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOffers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.offers = action.payload;
    });
    builder.addCase(fetchOffersCount.fulfilled, (state, action) => {
      state.count = action.payload;
    });
    builder.addCase(fetchOffers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Fetching offers failed";
    });
  },
});
export const { setSearch, setPage, setOrder, setOrderBy } = offersSlice.actions;
export default offersSlice.reducer;
