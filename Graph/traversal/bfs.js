class Graph{
    constructor(){
            this.adjacencyList = new Map();
    }
    addVertex(vertex){
        this.adjacencyList.set(vertex,[]);
    }
    
    addEdge(source,destination){
     if(!this.adjacencyList.has(source)){
        this.addVertex(source)
     }
     
     if(!this.adjacencyList.has(destination))
     {
        this.addVertex(destination)
     }
     this.adjacencyList.get(source).push(destination);
     this.adjacencyList.get(destination).push(source);//undirected graph
    
    }
    
    removeEdge(source,destination){
        if(this.adjacencyList.has(source)){
        this.adjacencyList.get(source) = this.adjacencyList.get(source).filter((vertex)=>vertex !==destination)
        }
        if(this.adjacencyList.has(destination)){
        this.adjacencyList.get(destination) = this.adjacencyList.get(destination).filter((vertex)=>vertex!==source)
        }
    }
    removeVertex(vertex){
        if(this.adjacencyList.has(vertex)){
            for(let adjacentVertex of this.adjacencyList.get(vertex)){
                this.removeEdge(adjacentVertex,vertex)
            }
            this.adjacencyList.delete(vertex)
        }
    }

bfs_traversal(startVertex){
const visited = new Set();
const queue = [startVertex];
const result = [];
while(queue.length >0){
const currentVertex = queue.shift();
if(!visited.has(currentVertex)){
    visited.add(currentVertex)
    result.push(currentVertex)
    this.adjacencyList.get(currentVertex).forEach((neighbor)=>{ queue.push(neighbor);
    
    })

}
}
return result 
    }



    }
    const graph = new Graph();

    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addVertex('E');
    graph.addVertex('F');
    
    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('B', 'D');
    graph.addEdge('B', 'E');
    graph.addEdge('C', 'F');
    
    const bfsResult = graph.bfs('A');
    console.log(bfsResult); // Output: ['A', 'B', 'C', 'D', 'E', 'F']
