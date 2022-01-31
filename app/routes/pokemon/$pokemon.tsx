import type { LoaderFunction, LinksFunction, MetaFunction } from "remix"

import { api } from "~/services/api"
import style from '~/styles/pokemon-page.css'
import styleMedium from '~/styles/pokemon-page-medium.css'
import evolutionRecursive from '~/utils/evolution-recursive'

export const links: LinksFunction = () => [
  { href: style, rel: 'stylesheet' },
  {
    rel: "stylesheet",
    href: styleMedium,
    media: "print, (max-width: 700px)"
  },
]

export const meta: MetaFunction = ({ data }) => {
  return { title: `Pokedex | ${data.pokemon.name}` };
};

export const loader: LoaderFunction = async({ params }) => {
  const { data: pokemon } = await api.get(`pokemon/${params.pokemon}`)
  
  const {data: { evolution_chain } } = await api.get(`pokemon-species/${params.pokemon}`)
  const evolutionsChain = await fetch(evolution_chain.url).then(res => res.json())
  const evolutions = evolutionRecursive(evolutionsChain.chain, [])
  
  return { pokemon, evolutions }
}


export { default } from '~/containers/Pokemon'