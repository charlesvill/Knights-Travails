// knights travails function
//
// adds all possible moves and keeps the legal non negative ones
// attaches the nodes to the graph
// checks the nodes (create edge list) to see if the wanted node is found
// counts each time the add all possible steps fn called
// repeat all steps and return the first edge that is found
// print out the traversal from the origin node to the desired spot
//

const nodeSquare = (coordinates) => {
  let childNodes = [];
  let parentNode = null;
  let visited = false;
  return { coordinates, childNodes, parentNode, visited };
};

function KnightMoves(origin, destination) {
  const root = nodeSquare(origin);
  let currentNode = root;
  const graphBuilder = (currentNode) => {
    const possibleMoves = [
      [2, 1],
      [2, -1],
      [-2, 1],
      [-2, -1],
      [1, 2],
      [1, -2],
      [-1, 2],
      [-1, -2],
    ];
    let legalMoves = [];
    possibleMoves.forEach((move, index) => {
      let resultX = currentNode.coordinates[0] + move[0];
      let resultY = currentNode.coordinates[1] + move[1];
      if (resultX < 0 || resultY < 0 || resultX > 7 || resultY > 7) {
      } else {
        legalMoves.push([resultX, resultY]);
      }
    });
    legalMoves.forEach((coordinate) => {
      const newChild = nodeSquare(coordinate);
      newChild.parentNode = currentNode;
      currentNode.childNodes.push(newChild);
    });
  };
  // breadth first search algo to search the current graph for the dest coordinates
  function BFS(node, queue = []) {
    if (
      node.coordinates[0] === destination[0] &&
      node.coordinates[1] === destination[1]
    ) {
      return node;
    } else if (node.childNodes.length === 0) {
      return null;
    }
    node.childNodes.forEach((child) => {
      queue.push(child);
    });
    while (queue.length > 0) {
      let BFSNode = queue.shift();
      let recurse = BFS(BFSNode, queue);
      if (recurse !== null) {
        return recurse;
      }
    }
  }
  function pathGen(node, printArr = []) {
    // takes a node and will populate an array recursively of the coordinates of the parent nodes until none are left.

    if (node.parentNode === null) {
      return printArr;
    } else if (node === null) {
      return printArr;
    }

    const tempNode = node.parentNode;
    printArr.push(node.coordinates);
    pathGen(tempNode, printArr);
    return printArr;
  }
  function printPath(arr) {
    let count = 0;
    console.log(origin);
    for (let i = arr.length - 1; i >= 0; i--) {
      console.log(arr[i]);
      count++;
    }
    console.log(`Path found in ${count} steps.  `);
  }

  // initializer that builds the first level of the graph
  graphBuilder(currentNode);

  let visitedArr = [];
  let rootQueue = [];
  let found = false;
  // while loop thaat calls the graph builder and checkes the edge list to see if we have the winner
  while (!found) {
    currentNode.childNodes.forEach((node) => {
      // bfs recursion?
      const searchResult = BFS(node);
      if (searchResult !== null && searchResult !== undefined) {
        // trigger the print path function passing the result of the recursive search
        found = true;
        const pathArr = pathGen(searchResult);
        printPath(pathArr);
        return;
      }
      if (node.visited === false) {
        visitedArr.push(node);
        node.visited = true;
      }
    });
    visitedArr.forEach((node) => {
      // build the next level of legal moves
      graphBuilder(node);
      let rootToAdd = visitedArr.shift();
      rootQueue.push(rootToAdd);
    });
    currentNode = rootQueue.shift();
  }
}

KnightMoves([0, 0], [7, 7]);
