function parseGraph(input: string): Map<string, string[]> {
  const graph = new Map<string, string[]>();
  for (const line of input.trim().split("\n")) {
    if (!line.trim()) continue;
    const [node, neighbors] = line.split(":");
    graph.set(node.trim(), neighbors.trim().split(/\s+/));
  }
  return graph;
}

function countPathsSimple(
  graph: Map<string, string[]>,
  node: string,
  visited: Set<string>,
): number {
  if (node === "out") return 1;
  let count = 0;
  visited.add(node);
  for (const neighbor of graph.get(node) || []) {
    if (!visited.has(neighbor)) {
      count += countPathsSimple(graph, neighbor, visited);
    }
  }
  visited.delete(node);
  return count;
}

export function solve_a(input: string): number {
  const graph = parseGraph(input);
  return countPathsSimple(graph, "you", new Set());
}

function countPathsDacFFT(
  graph: Map<string, string[]>,
  node: string,
  cache: Map<string, number>,
  visited = new Set<string>(),
  daq = false,
  fft = false,
): number {
  const cacheKey = `${node}|${daq ? 1 : 0}|${fft ? 1 : 0}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey) || 0;
  if (node === "dac") daq = true;
  if (node === "fft") fft = true;
  visited.add(node);
  let result: number;
  if (node === "out") {
    result = daq && fft ? 1 : 0;
    visited.delete(node);
    cache.set(cacheKey, result);
    return result;
  }
  result = 0;
  for (const neighbor of graph.get(node) || []) {
    if (!visited.has(neighbor)) {
      result += countPathsDacFFT(graph, neighbor, cache, visited, daq, fft);
    }
  }
  visited.delete(node);
  cache.set(cacheKey, result);
  return result;
}

export function solve_b(input: string): number {
  const graph = parseGraph(input);
  const cache = new Map<string, number>();
  return countPathsDacFFT(graph, "svr", cache);
}
