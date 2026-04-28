type SolveRequest = {
  board: string[][];
  movable_tile: string;
  target_board: string[][];
};

type SolveResponse = {
  path: string[][][];
  solvable: boolean;
  steps: number;
};

export async function solvePuzzle(body: SolveRequest): Promise<SolveResponse> {
  const response = await fetch("http://localhost:8080/solve", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(`Server error (${response.statusText})`);
  }

  const data = await response.json();

  if (!data.solvable) {
    throw new Error("Puzzle is not solvable");
  }

  return data;
}