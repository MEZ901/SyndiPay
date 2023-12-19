import { apiSlice } from "../../../app/api/apiSlice";

export const residentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllResidents: builder.query({
      query: () => "/residents",
    }),
    getResidentById: builder.query({
      query: (id) => `/residents/${id}`,
    }),
    createResident: builder.mutation({
      query: (body) => ({
        url: "/residents",
        method: "POST",
        body,
      }),
    }),
    updateResident: builder.mutation({
      query: ({ id, body }) => ({
        url: `/residents/${id}`,
        method: "PATCH",
        body,
      }),
    }),
    deleteResident: builder.mutation({
      query: (id) => ({
        url: `/residents/${id}`,
        method: "DELETE",
      }),
    }),
    forceDeleteResident: builder.mutation({
      query: (id) => ({
        url: `/residents/force/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllResidentsQuery,
  useGetResidentByIdQuery,
  useCreateResidentMutation,
  useUpdateResidentMutation,
  useDeleteResidentMutation,
  useForceDeleteResidentMutation,
} = residentApiSlice;
