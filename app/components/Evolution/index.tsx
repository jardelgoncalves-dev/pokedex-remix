import Pokeball from "~/assets/Pokeball";

type EvolutionProps = {
  evolutions: Array<{ name: string, image: string }>
}

export default function Evolution({ evolutions }: EvolutionProps) {
  return (
    <div className="evolution">
      {evolutions?.map(evolution => (
        <div className="evolution__card" key={evolution.name}>
          <Pokeball />
          <img src={evolution.image} alt={evolution.name} />
          <h4>{evolution.name}</h4>
        </div>
      ))}
    </div>
  )
}