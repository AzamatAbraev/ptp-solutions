import { PortfolioType } from "../types/portfolios";
import crud from "./crud";

const useExperience = crud<PortfolioType>("experiences");

export default useExperience;
