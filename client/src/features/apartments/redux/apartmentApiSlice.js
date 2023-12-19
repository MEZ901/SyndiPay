import { apiSlice } from "../../../app/api/apiSlice";

export const apartmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllApartments: builder.query({
      query: () => "/apartments",
    }),
    getApartmentById: builder.query({
      query: (id) => `/apartments/${id}`,
    }),
    createApartment: builder.mutation({
      query: (body) => ({
        url: "/apartments",
        method: "POST",
        body,
      }),
    }),
    updateApartment: builder.mutation({
      query: ({ id, body }) => ({
        url: `/apartments/${id}`,
        method: "PATCH",
        body,
      }),
    }),
    deleteApartment: builder.mutation({
      query: (id) => ({
        url: `/apartments/${id}`,
        method: "DELETE",
      }),
    }),
    forceDeleteApartment: builder.mutation({
      query: (id) => ({
        url: `/apartments/force/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllApartmentsQuery,
  useGetApartmentByIdQuery,
  useCreateApartmentMutation,
  useUpdateApartmentMutation,
  useDeleteApartmentMutation,
  useForceDeleteApartmentMutation,
} = apartmentApiSlice;
