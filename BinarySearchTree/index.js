class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function insertAtTree(root, value) {
  if (root === null) {
    return new TreeNode(value);
  }
  if (value > root.value) {
    root.right = insertAtTree(root.right, value);
  } else if (value < root.value) {
    root.left = insertAtTree(root.left, value);
  }
  return root;
}

function search(root, target) {
  if (root === null) {
    return false;
  }
  if (target === root.value) {
    return true;
  } else if (target > root.value) {
    return search(root.right, target);
  } else {
    return search(root.left, target);
  }
}

function minValueNode(root) {
  let curr = root;
  while (curr !== null && curr.left !== null) {
    curr = curr.left;
  }
  return curr;
}

function remove(root, value) {
  if (root === null) {
    return null;
  }

  if (value < root.value) {
    root.left = remove(root.left, value);
  } else if (value > root.value) {
    root.right = remove(root.right, value);
  } else {
    // Node with only one child or no child
    if (root.left === null) {
      return root.right;// in case of no child return null
    } else if (root.right === null) {
      return root.left;
    }

    // Node with two children: Get the inorder successor (smallest in the right subtree)
    let minNode = minValueNode(root.right);
    root.value = minNode.value;

    // Delete the inorder successor
    root.right = remove(root.right, minNode.value);
  }
  return root;
}

// Depth First Traversal

function preOrderTraversal(root, result = []) {
  if (root !== null) {
    result.push(root.value);
    preOrderTraversal(root.left, result);
    preOrderTraversal(root.right, result);
  }
  return result;
}

function inOrderTraversal(root, result = []) {
  if (root !== null) {
    inOrderTraversal(root.left, result);
    result.push(root.value);
    inOrderTraversal(root.right, result);
  }
  return result;
}

function postOrderTraversal(root, result = []) {
  if (root !== null) {
    postOrderTraversal(root.left, result);
    postOrderTraversal(root.right, result);
    result.push(root.value);
  }
  return result;
}

// Breadth First Traversal

function levelOrderTraversal(root) {
  if (root === null) {
    return [];
  }
  let queue = [];
  queue.push(root);
  let result = [];
  while (queue.length > 0) {
    let levelSize = queue.length;
    let currentLevel = [];
    for (let i = 0; i < levelSize; i++) {
      let current = queue.shift();
      currentLevel.push(current.value);
      if (current.left !== null) {
        queue.push(current.left);
      }
      if (current.right !== null) {
        queue.push(current.right);
      }
    }
    result.push(currentLevel);
  }
  return result;
}

function treeHeight(root) {
  if (root === null) {
    return 0;
  }
  return 1 + Math.max(treeHeight(root.left), treeHeight(root.right));
}

function countNodes(root) {
  if (root === null) {
    return 0;
  }
  return 1 + countNodes(root.left) + countNodes(root.right);
}
