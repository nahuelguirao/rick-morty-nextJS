"use client";

import CharacterCard from "@/components/CharacterCard";
import { useMainPagination } from "@/hooks/useMainPagination";
import { CircularProgress, Pagination, TextField } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import styles from "../styles/main.module.css";

export default function Home() {
  //Main pagination custom hook
  const {
    data,
    isLoading,
    actualPage,
    handlePageChange,
    paginationSize,
    setFilterByName,
  } = useMainPagination();

  return (
    <main className={styles.mainCharacters}>
      <form className={styles.mainCharactersFilterByName}>
        <TextField
          id="filled-basic"
          label="Search by name"
          variant="filled"
          color="secondary"
          onChange={(e) => setFilterByName(e.target.value)}
        />
      </form>
      {isLoading && (
        <section className={styles.mainCharactersContainer}>
          <CircularProgress className={styles.mainCharactersLoading} />
        </section>
      )}
      {!isLoading && data && (
        <>
          {data.results ? (
            <>
              <p className={styles.mainCharactersActualPage}>
                Actual Page: {actualPage}
              </p>
              <section className={styles.mainCharactersContainer}>
                {data.results.map((character) => (
                  <CharacterCard character={character} key={character.id} />
                ))}
              </section>

              <section className={styles.mainCharactersPagination}>
                <Pagination
                  page={actualPage}
                  count={data.info.pages}
                  onChange={handlePageChange}
                  color="primary"
                  size={paginationSize ? "large" : "small"}
                />
              </section>
            </>
          ) : (
            <p className={styles.mainCharactersNotResultsP}>
              <WarningIcon /> No characters found!
            </p>
          )}
        </>
      )}
    </main>
  );
}
