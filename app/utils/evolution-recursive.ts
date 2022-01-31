import { Chain } from "~/interfaces/evolution-chain";
import { ARTWORK_IMAGE } from "./constants";

type Specie = {
  name: string
  image: string
}

function getIdByUrl(url: string) {
  const parts = url.split('/')
  return parts[parts.length -2]
}

export default function evolutionRecursive(chainParent: Chain | Chain[], species: Specie[] = []): Specie[] {
  const chain = Array.isArray(chainParent) ? chainParent[0] : chainParent
  const envolveTo = chain.evolves_to

  if (!species.length) {
    species.push({
      name: chain.species.name,
      image: `${ARTWORK_IMAGE}/${getIdByUrl(chain.species.url)}.png`
    })

    return evolutionRecursive(envolveTo, species)
  }

  species.push({
    name: chain.species.name,
    image: `${ARTWORK_IMAGE}/${getIdByUrl(chain.species.url)}.png`
  })

  if (!envolveTo || !envolveTo.length) {
    return species
  }

  return evolutionRecursive(envolveTo, species)
}