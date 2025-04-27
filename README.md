DataStructure and Algorithm in JavaScript 


JavaScript  templates  for 

DFS / BFS

Binary Search

Sliding Window

Perfect — you want **JavaScript templates** for the **most important patterns**:  
✅ DFS / BFS  
✅ Binary Search  
✅ Sliding Window  
✅ Heap



# 1. 📚 **DFS Template (Recursive for Tree/Graph)**

```javascript
function dfs(node, visited = new Set()) {
    if (!node || visited.has(node)) return;

    visited.add(node);
    // Do something with node here
    console.log(node.val);

    for (let neighbor of node.neighbors) {
        dfs(neighbor, visited);
    }
}
```
> ✅ Good for: trees, graphs, backtracking.

---

# 2. 🌊 **BFS Template (Queue for Graph/Tree)**

```javascript
function bfs(start) {
    let queue = [start];
    let visited = new Set();
    visited.add(start);

    while (queue.length > 0) {
        let node = queue.shift();
        // Do something with node
        console.log(node.val);

        for (let neighbor of node.neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
}
```
> ✅ Good for: level order traversal, shortest path.

---

# 3. 🧠 **Binary Search Template**

```javascript
function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1; // not found
}
```
> ✅ Good for: sorted arrays, optimization problems ("find minimum", etc).

---

# 4. 🚀 **Sliding Window Template (Variable Size)**

```javascript
function slidingWindow(arr, k) {
    let left = 0, sum = 0, maxSum = -Infinity;

    for (let right = 0; right < arr.length; right++) {
        sum += arr[right];

        while (right - left + 1 > k) { // Shrink window
            sum -= arr[left];
            left++;
        }

        if (right - left + 1 === k) {
            maxSum = Math.max(maxSum, sum);
        }
    }
    return maxSum;
}
```
> ✅ Good for: fixed-size window, longest substring, min subarray problems.

---

# 5. 🏗️ **Heap (Priority Queue) Template using MinHeap**

```javascript
class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(val) {
        this.heap.push(val);
        this.bubbleUp();
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex] <= this.heap[index]) break;
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    extractMin() {
        if (this.heap.length === 1) return this.heap.pop();
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        return min;
    }

    bubbleDown() {
        let index = 0;
        const length = this.heap.length;

        while (true) {
            let left = 2 * index + 1;
            let right = 2 * index + 2;
            let smallest = index;

            if (left < length && this.heap[left] < this.heap[smallest]) smallest = left;
            if (right < length && this.heap[right] < this.heap[smallest]) smallest = right;

            if (smallest === index) break;

            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
}
```
> ✅ Good for: top K elements, merging sorted lists, shortest path.

---

# 🔥 Bonus: Faster heap shortcut in interviews:
You can also use a simple array + `sort()` for small heap problems:

```javascript
let heap = [];
heap.push(5);
heap.push(2);
heap.push(8);
heap.sort((a, b) => a - b); // Min Heap behavior
let smallest = heap.shift(); // Pop smallest
```
*(⚡ Not true O(log n), but acceptable if constraints are small.)*

---

# 🚀 Quick Summary:
| Pattern | Focus | Code Speed |
|:---|:---|:---|
| DFS | Tree/Graph traversal | Fast |
| BFS | Shortest Path, Level Order | Fast |
| Binary Search | Sorted Arrays, Answer Optimization | Ultra Fast |
| Sliding Window | Subarrays/Substrings | Fast |
| Heap | Top K, Priority Scheduling | Medium |

