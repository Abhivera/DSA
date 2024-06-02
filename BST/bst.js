
class TreeNode {
    constructor(val) {
        this.val = val; 
        this.left = null;
        this.right = null; 
    }
}
function search(root,target){
   if(root==null){
       return false 
   }
   if(root.val==target)
  {  
      return true
  }
   else if(root.val<target){
        return search(root.right,target) 
  }
   else if(root.val>target){
       return search(root.left,target)
  }
    
}

// Example usage:
// Creating the tree
let root = new TreeNode(8);
root.left = new TreeNode(3);
root.right = new TreeNode(10);
root.left.left = new TreeNode(1);
root.left.right = new TreeNode(6);
root.right.right = new TreeNode(14);
root.left.right.left = new TreeNode(4);
root.left.right.right = new TreeNode(7);
root.right.right.left = new TreeNode(13);

// Searching in the tree
console.log(search(root, 6));  // Output: true
console.log(search(root, 13)); // Output: true
console.log(search(root, 2));  // Output: false
