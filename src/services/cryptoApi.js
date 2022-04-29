import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
  "X-RapidAPI-Key": "064811ba78msh80570e72e5c3709p15de98jsn55229726c265",
};

const baseUrl = "https://coinranking1.p.rapidapi.com/";
// const baseUrl = "https://coinranking1.p.rapidapi.com/coins"; Try this one if doesnt work (dif on yt video)

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
  }),
});

export const { useGetCryptosQuery } = cryptoApi;
