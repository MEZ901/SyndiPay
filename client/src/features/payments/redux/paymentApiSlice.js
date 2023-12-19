import { apiSlice } from "../../../app/api/apiSlice";

export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPayments: builder.query({
      query: () => "/payments",
    }),
    getPaymentById: builder.query({
      query: (id) => `/payments/${id}`,
    }),
    createPayment: builder.mutation({
      query: (body) => ({
        url: "/payments",
        method: "POST",
        body,
      }),
    }),
    updatePayment: builder.mutation({
      query: ({ id, body }) => ({
        url: `/payments/${id}`,
        method: "PATCH",
        body,
      }),
    }),
    deletePayment: builder.mutation({
      query: (id) => ({
        url: `/payments/${id}`,
        method: "DELETE",
      }),
    }),
    forceDeletePayment: builder.mutation({
      query: (id) => ({
        url: `/payments/force/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllPaymentsQuery,
  useGetPaymentByIdQuery,
  useCreatePaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
  useForceDeletePaymentMutation,
} = paymentApiSlice;
