import { PortfolioType } from "../types/portfolios";
import crud from "./crud";

const usePortfolios = crud<PortfolioType>("portfolios");

export default usePortfolios;
