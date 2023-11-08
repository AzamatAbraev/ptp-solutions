import { PortfolioType } from "../types/portfolios";
import crud from "./crud";

const useUsers = crud<PortfolioType>("users");

export default useUsers;
