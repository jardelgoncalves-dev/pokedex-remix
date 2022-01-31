import { Link, useLoaderData } from 'remix'
import type{ Pokemon } from '~/interfaces/pokemon'
import Pokeball from '~/assets/Pokeball'
import Range from '~/components/Range'
import Evolution from '~/components/Evolution'


type LoaderData = {
  pokemon: Pokemon,
  evolutions: Array<{ name: string, image: string }>
}

export default function PokemonPage() {

  const { pokemon, evolutions }: LoaderData = useLoaderData()
  return (
    <main className={pokemon?.types?.[0]?.type?.name ?? ''}>
      <section className="banner">
        <Link to="/" className='back-button'>Back</Link>
        <div className="container">
          <h1
            className={pokemon?.types?.[0]?.type?.name ? `text-${pokemon?.types?.[0]?.type?.name}` :''}
          >
            {pokemon.name}
          </h1>

          <div className="banner__content">
            <div className="banner__content__image">
              <img src={pokemon?.sprites?.other?.['official-artwork'].front_default} alt={pokemon.name} />
            </div>
            <div className="banner__content__info">
              <p>#{pokemon.id}</p>
              <h2>{pokemon.name}</h2>
            </div>
            <Pokeball />
          </div>
        </div>
      </section>
      <section className="stats">
        <div className="container">
          <h2>Statistics</h2>
          {pokemon.stats.map(statistic => (
            <Range
              key={statistic.stat.name}
              label={statistic.stat.name}
              range={statistic.base_stat}
              type={pokemon?.types?.[0]?.type?.name}
            />
          ))}
        </div>
      </section>
      <section className="evolution-container">
        <div className="container">
          <h2>Evolutions</h2>
          <div className='evolutions'>
            <Evolution evolutions={evolutions} />
          </div>
        </div>
      </section>
    </main>
  )
}