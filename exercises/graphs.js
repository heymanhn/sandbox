/* Path class for shortest path algorithms
 */
 var Path = function(data, dist, next) {
   this.data = data;
   this.dist = dist;
   this.next = next;
 };


/* Very Simple Linked List implementation
 * Used for managing the queue of Paths to be processed in the
 * shortest path algorithms
 */

var LinkedList = function() {
  this.head = null;
};

LinkedList.prototype.add = function(path) {
  var current = this.head;
  if (!current) {
    this.head = path;
  } else {
    var current = this.head;
    while (current) {
      if (!current.next) {
        current.next = path;
        break;
      } else {
        current = current.next;
      }
    }
  }
};

/* Used for priority queue implementations. Assumes that the path passed in
 * has a dist value
 */
LinkedList.prototype.addWithPriority = function(path) {
  debugger;
  var current = this.head;

  if (!current) {
    // Case 1: List is empty
    this.head = path;
  } else if (path.dist < current.dist) {
    // Case 2: Insert before first element
    this.head = path;
    path.next = current;
  } else {
    // Case 3: Insert after first element
    while (current.next) {
      if (path.dist < current.next.dist) {
        break;
      } else {
        current = current.next;
      }
    }

    if (!current.next) {
      current.next = path;
    } else {
      var savedNext = current.next;
      current.next = path;
      path.next = savedNext;
    }
  }
}

LinkedList.prototype.removeFirst = function() {
  if (!this.head) return null;

  var first = this.head;
  this.head = first.next;
  return first;
};

LinkedList.prototype.length = function() {
  var current = this.head;
  if (!current) return 0;

  var count = 1;
  while (current) {
    if (current.next) count++;
    current = current.next;
  }

  return count;
};

/* Graph implementation
 * Borrowed from: https://www.syncano.io/blog/data-structures-in-javascript/
 */

Array.prototype.contains = function(name) {
  var i = this.length;
  while (i--) {
    if (this[i].name === name) {
      return true;
    }
  }

  return false;
};

var GraphEdge = function(end, cost) {
  this.end = end;
  this.cost = cost;
};

var GraphNode = function(name) {
  this.edge_list = [];
  this.name = name;
};

GraphNode.prototype.addEdge = function(edge) {
  this.edge_list.push(edge);
};

var Graph = function() {
  this.node_list = [];
};

Graph.prototype.addEdge = function(start, end, cost) {
  var first = this.node_list.contains(start);
  var second = this.node_list.contains(end);
  if (first) {
    //get start node
    var i = this.node_list.length;
    while (i--) {
      if (this.node_list[i].name === start) {
        this.node_list[i].addEdge(new GraphEdge(end, cost));
        break;
      }
    }
  }

  if ((!first) || (!second)) {
    if (!first) {
      var node = new GraphNode(start);
      node.addEdge(new GraphEdge(end, cost));
      this.node_list.push(node);
    }

    if (!second) {
      var node = new GraphNode(end);
      this.node_list.push(node);
    }
  }
};

Graph.prototype.find = function(name) {
  var returnNode;
  for (var i = 0; i < this.node_list.length; i++) {
    if (this.node_list[i].name === name) {
      returnNode = this.node_list[i];
      break;
    }
  }

  return returnNode;
};

/* For a given start node of the input graph, find the shortest distance from
 * it to every other vertex in the graph
 */
var findShortestPaths = function(graph, start) {
  var queue = new LinkedList();
  var startNode = graph.find(start);
  if (!startNode) return false; // Start doesn't exist in the graph

  startNode.dist = 0;
  queue.add(new Path(startNode));

  while (queue.length() > 0) {
    var currentNode = queue.removeFirst().data;
    console.log(currentNode.name + " distance: " + currentNode.dist);

    currentNode.edge_list.forEach(function(edge) {
      var node = graph.find(edge.end);
      if (!node.dist) {
        node.dist = currentNode.dist + 1;
        queue.add(node);
      }
    });
  }
};

var djikstra = function(graph, start) {
  var queue = new LinkedList();
  var startNode = graph.find(start);
  if (!startNode) return false; // Start doesn't exist in the graph

  startNode.dist = 0;
  queue.addWithPriority(new Path(startNode, 0));

  var nodeCount = 0;
  while (queue.length() > 0 && nodeCount < graph.node_list.length) {
    var path = queue.removeFirst();
    var graphNode = path.data;

    if (graphNode.visited) {
      continue;
    }
    graphNode.visited = true;
    nodeCount++;

    console.log(graphNode.name + " shortest path distance: " + path.dist);
    console.log("shortest path is: " + graphNode.name);
    var curr = graphNode.prev;
    while (curr) {
      console.log("=> " + curr.name);
      if (curr.name === start) {
        break;
      } else {
        curr = curr.prev;
      }
    }

    graphNode.edge_list.forEach(function(edge) {
      var node = graph.find(edge.end);
      var newDist = graphNode.dist + edge.cost;
      if (!node.dist || node.dist > newDist) {
        node.dist = newDist;
        node.prev = graphNode;
      }

      queue.addWithPriority(new Path(node, node.dist));
    });

  }
};


// Test input
var graph = new Graph();
graph.addEdge("1","2", 5);
graph.addEdge("1","3", 2);
graph.addEdge("2","5", 7);
graph.addEdge("3","4", 3);
graph.addEdge("4","5", 3);
graph.addEdge("4","7", 6);
graph.addEdge("4","1", 1);
graph.addEdge("5","2", 8);
graph.addEdge("5","6", 1);
graph.addEdge("6","3", 4);
graph.addEdge("6","8", 2);
graph.addEdge("7","8", 15);

// algorithms; pick one only
// findShortestPaths(graph, "1");
djikstra(graph, "1");
