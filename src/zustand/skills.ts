import { PortfolioType } from "../types/portfolios";
import crud from "./crud";

const useSkills = crud<PortfolioType>("skills");

export default useSkills;
