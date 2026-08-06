import styles from "./PokemonCard.module.css";

interface PokemonType {
  slot: number;
  type: { name: string; url: string };
}

interface PokemonStat {
  base_stat: number;
  stat: { name: string };
}

interface PokemonAbility {
  ability: { name: string };
}

interface PokemonData {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
    other?: {
      "official-artwork"?: { front_default: string | null };
    };
  };
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
}

interface Props {
  isLoading: boolean;
  data: PokemonData | undefined;
  error: unknown;
}

const TYPE_COLORS: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

function formatId(id: number) {
  return `#${String(id).padStart(3, "0")}`;
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function PokemonCard({ isLoading, data, error }: Props) {
  if (isLoading) {
    return (
      <div className={styles.card}>
        <div className={styles.screen}>
          <p className={styles.message}>Searching...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.card}>
        <div className={styles.screen}>
          <p className={styles.message}>No data found</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const image =
    data.sprites.other?.["official-artwork"]?.front_default ??
    data.sprites.front_default;

  return (
    <div className={styles.card}>
      <div className={styles.screen}>
        <div className={styles.header}>
          <span className={styles.name}>{capitalize(data.name)}</span>
          <span className={styles.id}>{formatId(data.id)}</span>
        </div>

        <div className={styles.imageWrap}>
          {image ? (
            <img className={styles.image} src={image} alt={data.name} />
          ) : (
            <div className={styles.imagePlaceholder}>?</div>
          )}
        </div>

        <div className={styles.types}>
          {data.types.map(({ type }) => (
            <span
              key={type.name}
              className={styles.type}
              style={{ backgroundColor: TYPE_COLORS[type.name] ?? "#777" }}
            >
              {type.name}
            </span>
          ))}
        </div>

        <div className={styles.measurements}>
          <div className={styles.measurement}>
            <span className={styles.label}>Height</span>
            <span>{data.height / 10} m</span>
          </div>
          <div className={styles.measurement}>
            <span className={styles.label}>Weight</span>
            <span>{data.weight / 10} kg</span>
          </div>
        </div>

        <ul className={styles.stats}>
          {data.stats.map(({ stat, base_stat }) => (
            <li key={stat.name} className={styles.stat}>
              <span className={styles.statLabel}>
                {stat.name.replace("-", " ")}
              </span>
              <div className={styles.statBar}>
                <div
                  className={styles.statFill}
                  style={{ width: `${Math.min(base_stat, 100)}%` }}
                />
              </div>
              <span className={styles.statValue}>{base_stat}</span>
            </li>
          ))}
        </ul>

        <div className={styles.abilities}>
          {data.abilities.map(({ ability }) => (
            <span key={ability.name} className={styles.ability}>
              {ability.name.replace("-", " ")}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
