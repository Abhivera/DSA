class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}
function search(root, target) {
  if (root == null) {
    return false;
  }
  if (root.val == target) {
    return true;
  } else if (root.val < target) {
    return search(root.right, target);
  } else if (root.val > target) {
    return search(root.left, target);
  }
}

function insertAtTree(root, val) {
  if (root == null) {
    return new TreeNode(val);
  }
  if (root.val < val) root.right = insertAtTree(root.right, val);
  else if (root.val > val) root.left = insertAtTree(root.left, val);
  return root;
}
function minValueNode(root) {
  let curr = root;
  while (curr && curr.left) {
    curr = curr.left;
  }
  return curr;
}
function remove(root,val){
    if (root==null)
    return null;

    if (val>root.val){
    root.right = remove(root.right,val)
   }
    else if (val<root.val){
    root.left = remove(root.left,val)
    }
    else {
        if(root.left==null){
            return root.right;
        }
        else if(root.right==null){
            return root.left;
        }
        else {
            let minNode = minValueNode(root.right)
            root.val = minNode.val
            root.right=remove(root.right,minNode.value)

        }

    }
    return root

}