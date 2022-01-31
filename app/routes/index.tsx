import type { LinksFunction, LoaderFunction } from 'remix';

import { api } from '~/services/api';
import { getPageByUrl } from '~/utils/get-page-by-url';

import homeStyle from '~/styles/home.css'

export const links: LinksFunction = () => [
  { href: homeStyle, rel: 'stylesheet' }
]

export const loader: LoaderFunction = async ({ request }) => {
  const page: number = getPageByUrl(request.url)

  const { data } = await api.get("pokemon", {
    params: {
      limit: 12,
      offset: page * 12
    }
  })

  return {
    pokemons: data.results
  }
}

export { default } from '~/containers/Home'