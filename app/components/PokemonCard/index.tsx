import { useEffect, useState } from "react"
import { Link } from "remix"

import Pokeball from '~/assets/Pokeball'

import { Pokemon } from "~/interfaces/pokemon"

type PokemonCardProps = {
  name: string
  url: string
  to: string
}

export default function PokemonCard(props: PokemonCardProps) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)

  useEffect(() => {
    fetch(props.url)
      .then(res => res.json())
      .then(data => {
        setPokemon(data)
      })
  }, [props.url])

  return (
    <Link to={props.to} className={`pokemon-card ${pokemon?.types?.[0]?.type?.name ?? ''}`}>
      <Pokeball />
      <div className="pokemon-card__content">
        <p>#{pokemon?.id}</p>
        <h2>{props.name}</h2>
        {pokemon?.types?.map(type => (
          <span className={type?.type.name ?? ''}>{type.type.name}</span>
        ))}

      </div>
      {!!pokemon?.sprites?.other?.['official-artwork'] && (
        <img src={pokemon?.sprites?.other?.['official-artwork'].front_default} alt={props.name} />
      )}
    </Link>
  )
}