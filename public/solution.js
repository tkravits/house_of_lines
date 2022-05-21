import GraphVertex from './graph/GraphVertex.js';
import GraphEdge from './graph/GraphEdge.js';
import Graph from './graph/Graph.js';
import eulerianPath from './eulerian-path/eulerianPath.js';


function findEulerianPathFirst() {
    const start = performance.now();
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');
    const vertexE = new GraphVertex('E');


    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeBD = new GraphEdge(vertexB, vertexD);
    const edgeDE= new GraphEdge(vertexD, vertexE);
    const edgeEC = new GraphEdge(vertexE, vertexC);
    const edgeCA = new GraphEdge(vertexC, vertexA);
    const edgeAD = new GraphEdge(vertexA, vertexD);
    const edgeDC = new GraphEdge(vertexD, vertexC);
    const edgeCB = new GraphEdge(vertexC, vertexB);


    const graph = new Graph();

    graph
      .addEdge(edgeAB)
      .addEdge(edgeBD)
      .addEdge(edgeDE)
      .addEdge(edgeEC)
      .addEdge(edgeCA)
      .addEdge(edgeAD)
      .addEdge(edgeDC)
      .addEdge(edgeCB)

    const graphEdgesCount = graph.getAllEdges().length;

    const eulerianPathSet = eulerianPath(graph);
    const duration = performance.now() - start;
    console.log(`Duration: ${duration}ms`);
    return [eulerianPathSet, duration];
  };

  function findEulerianPathSecond() {
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
let timeSecondSolution = document.getElementById("timeSecondSolution")
let secondSolution = document.getElementById("secondSolution")
const [firstResult, timeResult] = findEulerianPathFirst();
const [secondResult, timeResult2] = findEulerianPathSecond();
firstSolution.textContent = `${firstResult}`;
timeFirstSolution.textContent = `Time: ${timeResult.toFixed(2)} ms`;
secondSolution.textContent = `${secondResult}`;
timeSecondSolution.textContent = `Time: ${timeResult2.toFixed(2)} ms`;