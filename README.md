## Solution to following assignment:

The traveling salesman problems abide by a salesman and a set of cities. The salesman has to visit every one of the cities starting from a certain one (e.g., the hometown) and to return to the same city. We want the salesman to be as fresh (and as rich) as possible in the end of his trip.

The task is another variation of the traveling salesman problem that is in general solvable by using the graph theory.

### Salesman world rules
There is a random m x n grid (i.e. 30 x 20), consists from 1 x 1 square cells. This is salesman’s world.

Salesman has no map when he appears in the world. That means he doesn’t know about the cities and walls location in advance and has to explore the map at first

Salesman is allowed to travel one cell at time - up, down, left and right. Not diagonally.
Anyway, Salesman can see what is in the all the adjacent cells around him, including diagonal ones.

Cell represents either the road (grass), the city, or the wall.
Salesman cannot hit the wall, god mode is not allowed :)

Salesman will appear in random city at the start.

### Objectives:
1. Explore the whole map from the entry city to explore the whole world in the most effective way possible - by this, I mean to make sure every cell is visited.
2. When the exploration step is completed, find the shortest path back to the very first city where the salesman appeared.
3. When the salesman is back, the ultimate goal is to evaluate all costs (distance) permutations and pick the cheapest one so the salesman can save as much time as possible during his next trip, while visiting all cities again. EACH CITY CAN BE VISITED EXACTLY ONCE.

## Implementation
- Exploration algorithm is a combination of [depth-first graph search](https://en.wikipedia.org/wiki/Depth-first_search) (with some heuristics) and [A* path finding algorithm](https://cs.wikipedia.org/wiki/A*).
- Finding the shortest path back to the hometown is done by using the A* algorithm as well.
- Finding the cheapest path permutation is done by using the [brute force approach to the salesman problem](https://www.geeksforgeeks.org/travelling-salesman-problem-set-1/). 
  - Therefore, there is a limitation to about **11** cities, otherwise the algorithm will take too long to finish.
  - Even on 10 cities, there is a noticeable lag after the salesman returns to the hometown and the algorithm starts to find the cheapest path permutation.
- Map rendering via [react-pixi](https://reactpixi.org/).
- Jest snapshot tests are used to verify every algorithm step and avoid regression.

## Performance
- Exploring 30x20 test map configuration with 11 cities in 756 steps takes about 100 ms on MacBook Pro M1.
  - Rendering in UI is slowed down to visualize the exploration. You can change the speed in the `index.tsx`.
- Solving the salesman problem with 11 cities using brute force (11! = 3628800) takes about 2000 ms on the same machine.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


