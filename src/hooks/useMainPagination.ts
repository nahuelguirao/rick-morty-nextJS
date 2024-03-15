import { ChangeEvent, useEffect, useState } from "react";
import { fetchMainPagination } from "@/helpers/fetching/fetchMainPagination";
import { verificatePaginationSize } from "@/helpers/verifications";
import { APIResults } from "@/types/types";

export function useMainPagination() {
  // IsLoading, Data, Actual Page, PagitationSize states
  const [data, setData] = useState<APIResults>();
  const [actualPage, setActualPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paginationSize, setPaginationSize] = useState<boolean>(false);

  //Tries to fetch 'x' page
  const fetchInitialData = async () => {
    setIsLoading(true);
    try {
      const result = await fetchMainPagination(actualPage);
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

  //Executes fetch data each time actualPage change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    fetchInitialData();
  }, [actualPage]);

  return { data, actualPage, isLoading, paginationSize, handlePageChange };
}
