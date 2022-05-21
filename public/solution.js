import GraphVertex from './graph/GraphVertex.js';
import GraphEdge from './graph/GraphEdge.js';
import Graph from './graph/Graph.js';
import eulerianPath from './eulerian-path/eulerianPath.js';


function findEulerianPathInNotEulerianGraph() {
    const start = performance.now();
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');
    const vertexE = new GraphVertex('E');
    const vertexF = new GraphVertex('F');
    const vertexG = new GraphVertex('G');
    const vertexH = new GraphVertex('H');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeAC = new GraphEdge(vertexA, vertexC);
    const edgeBD = new GraphEdge(vertexB, vertexD);
    const edgeDC = new GraphEdge(vertexD, vertexC);
    const edgeCE = new GraphEdge(vertexC, vertexE);
    const edgeEF = new GraphEdge(vertexE, vertexF);
    const edgeFH = new GraphEdge(vertexF, vertexH);
    const edgeFG = new GraphEdge(vertexF, vertexG);
    const edgeHG = new GraphEdge(vertexH, vertexG);

    const graph = new Graph();

    graph
      .addEdge(edgeAB)
      .addEdge(edgeAC)
      .addEdge(edgeBD)
      .addEdge(edgeDC)
      .addEdge(edgeCE)
      .addEdge(edgeEF)
      .addEdge(edgeFH)
      .addEdge(edgeFG)
      .addEdge(edgeHG);

    const graphEdgesCount = graph.getAllEdges().length;

    const eulerianPathSet = eulerianPath(graph);
    const duration = performance.now() - start;
    console.log(`Duration: ${duration}ms`);
    return [eulerianPathSet, duration];
  };


let firstSolution = document.getElementById("firstSolution")
let timeFirstSolution = document.getElementById("timeFirstSolution")
let secondSolution = document.getElementById("secondSolution")
const [firstResult, timeResult] = findEulerianPathInNotEulerianGraph();
firstSolution.textContent = `${firstResult}`;
timeFirstSolution.textContent = `Time: ${timeResult.toFixed(2)} ms`;
console.log(timeResult);