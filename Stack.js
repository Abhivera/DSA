class Node {
    constructure(value){
        this.value = value;
        this.next = null;
    }
}
class Stack{
 constructor(){
this.top = null;
this.size=0;
    }
push(value){
    const newNode = new Node(value);
    if(this.top ===null){
        this.top = newNode;
        }
        else {
            newNode.next = this.top;
            this.top =newNode
        }
  this.size++;
}
pop(){
    if(this.top===null){
        return null;
    }
    const poppedNode = this.top;
    this.top = this.top.next;
    this.size--;
    return poppedNode.value;
}
peek(){
    if(this.top ==null){
        return null
    }
    return this.top.value;
}
isEmpty(){
    return this.size==0;
}
getSize(){
    return this.size;
}

}