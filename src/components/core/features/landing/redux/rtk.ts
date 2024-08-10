import { mainApi } from "@/components/core/rtk-query";

export const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getPokemon: build.query<any, void>({
      query: () => "https://pokeapi.co/api/v2/pokemon/ditto",
      transformResponse: (response) => {
        console.log("this is the response", response);
        return response;
      },
    }),
    //just an example of mutations
    postPokemon: build.mutation({
      query: (data) => ({
        url: "https://jsonplaceholder.typicode.com/posts",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetPokemonQuery, usePostPokemonMutation } = extendedApi;
