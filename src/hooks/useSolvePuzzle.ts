import { useMutation } from "@tanstack/react-query";
import { solvePuzzle } from "../utils/puzzleApi";

export function useSolvePuzzle() {
  return useMutation({
    mutationFn: solvePuzzle,
  });
}