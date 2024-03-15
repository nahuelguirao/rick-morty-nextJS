import { Status } from "@/types/types";

export const verificatePaginationSize = () => window.innerWidth >= 454;

export const verifyStatusBackgroundColor = (status: Status) => {
  switch (status) {
    case "Alive":
      return "green";
    case "Dead":
      return "red";
    default:
      return "black";
  }
};
