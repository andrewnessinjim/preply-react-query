import { useQuery } from "@tanstack/react-query";

export default function usePokemon(id: number) {
  const {
    data: pokemon,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pokemon", id],
    queryFn: () =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
        res.json(),
      ),
  });

  return { pokemon, isLoading, error };
}
