"use client";

import CharacterCard from "@/components/CharacterCard";
import { useMainPagination } from "@/hooks/useMainPagination";
import { CircularProgress, Pagination } from "@mui/material";
import styles from "../styles/main.module.css";

export default function Home() {
  //Main pagination custom hook
  const { data, isLoading, actualPage, handlePageChange, paginationSize } =
    useMainPagination();

  return (
    <main className={styles.mainCharacters}>
      {isLoading && (
        <section className={styles.mainCharactersContainer}>
          <CircularProgress className={styles.mainCharactersLoading} />
        </section>
      )}
      {!isLoading && data && (
        <>
          <p className={styles.mainCharactersActualPage}>
            Actual Page: {actualPage}
          </p>
          <section className={styles.mainCharactersContainer}>
            {data.results.map((character) => (
              <CharacterCard character={character} />
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
      )}
    </main>
  );
}
