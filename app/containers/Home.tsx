import { useEffect, useState } from 'react';
import { useFetcher, useLoaderData } from 'remix';
import PokemonCard from '~/components/PokemonCard';

type PokemonItem = {
  name: string
  url: string
}

export default function Home() {
  const { pokemons } = useLoaderData<{ pokemons:  PokemonItem[]}>()
  const fetcher = useFetcher()
  const [data, setData] = useState<PokemonItem[] | null>(pokemons);
  const [page, setPage] = useState(1);

  function handleMore() {
    fetcher.load(`/?page=${page + 1}`)
    setPage(page + 1)
  }

  useEffect(() => {
    if (fetcher.data) {
      console.log(fetcher.data)
      setData(oldValues => [
        ...oldValues as PokemonItem[],
        ...fetcher.data.pokemons as PokemonItem[]
      ]);
    }
  }, [fetcher.data]);


  return (
    <main>
      <div className="logo-container">
        <h1>
          <img src="/logo.png" alt="Logo Pokedex" />
        </h1>
      </div>
      {
        (data || pokemons)?.map(pokemon => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            url={pokemon.url}
          />
        ))
      }

      <div className="wrap-button">
        <button type='button' onClick={handleMore}>More</button>
      </div>
    </main>
  );
}
