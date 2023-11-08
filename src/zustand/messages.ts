import { PortfolioType } from "../types/portfolios";
import crud from "./crud";

const useMessages = crud<PortfolioType>("messages");

export default useMessages;
