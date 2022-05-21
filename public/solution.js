import GraphVertex from "./graph/GraphVertex.js";
import GraphEdge from "./graph/GraphEdge.js";
import Graph from "./graph/Graph.js";
import graphBridges from "../graph/graphBridges.js";

function firstGraph() {
  const vertexA = new GraphVertex("A");
  const vertexB = new GraphVertex("B");
  const vertexC = new GraphVertex("C");
  const vertexD = new GraphVertex("D");
  const vertexE = new GraphVertex("E");

  const edgeAB = new GraphEdge(vertexA, vertexB);
  const edgeBD = new GraphEdge(vertexB, vertexD);
  const edgeDE = new GraphEdge(vertexD, vertexE);
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
    .addEdge(edgeCB);

  return graph;
}

function secondGraph() {
  const vertexA = new GraphVertex("A");
  const vertexB = new GraphVertex("B");
  const vertexC = new GraphVertex("C");
  const vertexD = new GraphVertex("D");
  const vertexE = new GraphVertex("E");
  const vertexF = new GraphVertex("F");

  const edgeAB = new GraphEdge(vertexA, vertexB);
  const edgeBE = new GraphEdge(vertexB, vertexE);
  const edgeEC = new GraphEdge(vertexE, vertexC);
  const edgeCD = new GraphEdge(vertexC, vertexD);
  const edgeDE = new GraphEdge(vertexD, vertexE);
  const edgeFE = new GraphEdge(vertexF, vertexE);
  const edgeFD = new GraphEdge(vertexF, vertexD);
  const edgeDA = new GraphEdge(vertexD, vertexA);
  const edgeAC = new GraphEdge(vertexA, vertexC);
  const edgeCB = new GraphEdge(vertexC, vertexB);

  const graph = new Graph();

  graph
    .addEdge(edgeAB)
    .addEdge(edgeBE)
    .addEdge(edgeEC)
    .addEdge(edgeCD)
    .addEdge(edgeDE)
    .addEdge(edgeFE)
    .addEdge(edgeFD)
    .addEdge(edgeDA)
    .addEdge(edgeAC)
    .addEdge(edgeCB);

  return graph;
}

function eulerianPath(graph) {
  const start = performance.now();
  const eulerianPathVertices = [];

  // Set that contains all vertices with even rank (number of neighbors).
  const evenRankVertices = {};

  // Set that contains all vertices with odd rank (number of neighbors).
  const oddRankVertices = {};

  // Set of all not visited edges.
  const notVisitedEdges = {};
  graph.getAllEdges().forEach((vertex) => {
    notVisitedEdges[vertex.getKey()] = vertex;
  });

  // Detect whether graph contains Eulerian Circuit or Eulerian Path or none of them.
  /** @params {GraphVertex} vertex */
  graph.getAllVertices().forEach((vertex) => {
    if (vertex.getDegree() % 2) {
      oddRankVertices[vertex.getKey()] = vertex;
    } else {
      evenRankVertices[vertex.getKey()] = vertex;
    }
  });

  // Check whether we're dealing with Eulerian Circuit or Eulerian Path only.
  // Graph would be an Eulerian Circuit in case if all its vertices has even degree.
  // If not all vertices have even degree then graph must contain only two odd-degree
  // vertices in order to have Euler Path.
  const isCircuit = !Object.values(oddRankVertices).length;

  if (!isCircuit && Object.values(oddRankVertices).length !== 2) {
    throw new Error("Eulerian path must contain two odd-ranked vertices");
  }

  // Pick start vertex for traversal.
  let startVertex = null;

  if (isCircuit) {
    // For Eulerian Circuit it doesn't matter from what vertex to start thus we'll just
    // peek a first node.
    const evenVertexKey = Object.keys(evenRankVertices)[0];
    startVertex = evenRankVertices[evenVertexKey];
  } else {
    // For Eulerian Path we need to start from one of two odd-degree vertices.
    const oddVertexKey = Object.keys(oddRankVertices)[0];
    startVertex = oddRankVertices[oddVertexKey];
  }

  // Start traversing the graph.
  let currentVertex = startVertex;
  while (Object.values(notVisitedEdges).length) {
    // Add current vertex to Eulerian path.
    eulerianPathVertices.push(currentVertex);

    // Detect all bridges in graph.
    // We need to do it in order to not delete bridges if there are other edges
    // exists for deletion.
    const bridges = graphBridges(graph);

    // Peek the next edge to delete from graph.
    const currentEdges = currentVertex.getEdges();
    /** @var {GraphEdge} edgeToDelete */
    let edgeToDelete = null;
    if (currentEdges.length === 1) {
      // If there is only one edge left we need to peek it.
      [edgeToDelete] = currentEdges;
    } else {
      // If there are many edges left then we need to peek any of those except bridges.
      [edgeToDelete] = currentEdges.filter((edge) => !bridges[edge.getKey()]);
    }

    // Detect next current vertex.
    if (currentVertex.getKey() === edgeToDelete.startVertex.getKey()) {
      currentVertex = edgeToDelete.endVertex;
    } else {
      currentVertex = edgeToDelete.startVertex;
    }

    // Delete edge from not visited edges set.
    delete notVisitedEdges[edgeToDelete.getKey()];

    // If last edge were deleted then add finish vertex to Eulerian Path.
    if (Object.values(notVisitedEdges).length === 0) {
      eulerianPathVertices.push(currentVertex);
    }

    // Delete the edge from graph.
    graph.deleteEdge(edgeToDelete);
  }
  const duration = performance.now() - start;
  console.log(`Duration: ${duration}ms`);
  return [eulerianPathVertices, duration];
}

let firstSolution = document.getElementById("firstSolution");
let timeFirstSolution = document.getElementById("timeFirstSolution");
let timeSecondSolution = document.getElementById("timeSecondSolution");
let secondSolution = document.getElementById("secondSolution");
const [firstResult, timeResult] = eulerianPath(firstGraph());
const [secondResult, timeResult2] = eulerianPath(secondGraph());
firstSolution.textContent = `${firstResult}`;
timeFirstSolution.textContent = `Time: ${timeResult.toFixed(2)} ms`;
secondSolution.textContent = `${secondResult}`;
timeSecondSolution.textContent = `Time: ${timeResult2.toFixed(2)} ms`;
