import { PortfolioType } from "../types/portfolios";
import crud from "./crud";

const useEducation = crud<PortfolioType>("education");

export default useEducation;
