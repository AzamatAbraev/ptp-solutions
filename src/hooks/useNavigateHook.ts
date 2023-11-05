import { useNavigate } from "react-router-dom";

export function useNavigateHook() {
  const navigate = useNavigate();

  return {
    navigate,
  };
}
