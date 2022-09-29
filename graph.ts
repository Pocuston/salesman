import {Map, Set} from "immutable";
import {Position, possibleMoves} from "./position";

export type Graph = Map<Position, Set<Position>>;

export const extendGraph = (graph: Graph, newPositions: Set<Position>): Graph => {

    //add new positions to graph
    graph = graph.merge(newPositions.map(position => [position, Set<Position>()]));

    //for each new position from which we can move
    //we add edges to its neighbors
    //and from neighbours back to the new position
    newPositions.forEach(p => {

        const currentEdges = graph.get(p);
        const newEdges = possibleMoves(p)
            .filter(move => graph.has(move));

        //TODO cleaner way to update the graph?
        graph = graph.set(p, currentEdges!.union(newEdges));
        newEdges.forEach(edge => {
            const currentEdges = graph.get(edge);
            graph = graph.set(edge, currentEdges!.add(p));
        })
    })

    return graph;
}