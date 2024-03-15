import { Character } from "@/types/types";
import styles from "../styles/main.module.css";
import { verifyStatusBackgroundColor } from "@/helpers/verifications";

interface Props {
  character: Character;
}

export default function CharacterCard({ character }: Props) {
  return (
    <>
      <div className={styles.mainCharacterCard}>
        <h4>{character.name}</h4>
        <img src={character.image} alt={`${character.name} image`} />
        <p
          style={{
            backgroundColor: verifyStatusBackgroundColor(character.status),
          }}
        >
          {character.status}
        </p>
      </div>
    </>
  );
}
