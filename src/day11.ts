function parseGraph(input: string): Map<string, string[]> {
    const graph = new Map<string, string[]>();
    for (const line of input.trim().split("\n")) {
        if (!line.trim()) continue;
        const [node, neighbors] = line.split(":");
        graph.set(node.trim(), neighbors.trim().split(/\s+/));
    }
    return graph;
}

export function solve_a(input: string): number {
    const graph = parseGraph(input);

    function dfs(node: string, visited: Set<string>): number {
        if (node === "out") return 1;
        let count = 0;
        visited.add(node);
        for (const neighbor of graph.get(node) || []) {
            if (!visited.has(neighbor)) {
                count += dfs(neighbor, visited);
            }
        }
        visited.delete(node);
        return count;
    }

    return dfs("you", new Set());
}

export function solve_b(input: string): number {
    return 0;
}
