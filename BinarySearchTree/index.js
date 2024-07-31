class TreeNode{
  constructor(value){
      this.value = value;
      this.left = null;
      this.right = null;
  }
}
function  insertAtTree(root,value){
  if(root==null){
      return new TreeNode(value)
  }
  if(value>root.value){
      root.right = Insert(root.right,value)
  }
  else if(value<root.value){
      root.left = Insert(root.left,value)
  }
  return root;
}

function search(root,target){
  if(root == null){
      return false;
  }
  if(target == root.value){
      return true;
  }
  else if(target>root.value){
      return search(root.right,target)
  }
  else if(target<root.value){
      return search(root.left,target)
  }
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