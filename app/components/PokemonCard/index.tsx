import { useEffect, useState } from "react"
import { Link } from "remix"

import Pokeball from '~/assets/Pokeball'

import { Pokemon } from "~/interfaces/pokemon"

type PokemonCardProps = {
  name: string
  url: string
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
    <Link to={"#"} className={`pokemon-card ${pokemon?.types?.[0]?.type?.name ?? ''}`}>
      <Pokeball />
      <div className="pokemon-card__content">
        <span>#{pokemon?.id}</span>
        <h2>{props.name}</h2>
      </div>
      {!!pokemon?.sprites?.other?.['official-artwork'] && (
        <img src={pokemon?.sprites?.other?.['official-artwork'].front_default} alt={props.name} />
      )}
    </Link>
  )
}