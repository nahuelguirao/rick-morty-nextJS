import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import { fetchMainPagination } from "@/helpers/fetching/fetchMainPagination";
import { verificatePaginationSize } from "@/helpers/verifications";
import { APIResults } from "@/types/types";

export function useMainPagination() {
  // IsLoading, Data, Actual Page, PagitationSize and filter states
  const [filterByName, setFilterByName] = useState<string | undefined>("");
  const [data, setData] = useState<APIResults>();
  const [actualPage, setActualPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paginationSize, setPaginationSize] = useState<boolean>(false);

  //Tries to fetch 'x' page
  const fetchInitialData = async () => {
    setIsLoading(true);
    try {
      const result = await fetchMainPagination(actualPage, filterByName);
      setData(result);
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching main data.");
    } finally {
      setIsLoading(false);
    }
  };

  //Manage pagination change
  const handlePageChange = (e: ChangeEvent<unknown>, page: number) => {
    setActualPage(page);
  };

  //Verifies once window width (for MUI Pagination component)
  useEffect(() => {
    setPaginationSize(verificatePaginationSize());
  }, []);

  useEffect(() => {
    if (actualPage > 1) {
      setActualPage(1);
    }
  }, [filterByName]);

  //Debounce 500ms delay filterbyname
  const filterByNameDebounced = useDebounce(filterByName);

  //Executes fetch data each time actualPage || filteredByNameDebounced change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    fetchInitialData();
  }, [actualPage, filterByNameDebounced]);

  return {
    data,
    actualPage,
    isLoading,
    paginationSize,
    handlePageChange,
    setFilterByName,
  };
}
