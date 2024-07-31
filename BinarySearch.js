let arr1 = [3,5,8,1,6,4]

function BinarySearch(arr,target){
    let low = 0;
    let high = arr.length-1
    
    while(low<high){
        let mid = Math.floor((low+high)/2)
        if(arr[mid]<target){
 low = low+1;
}else if (arr[mid]>target){
high = high-1
}
   else {
    return mid 
   }    

    }

    return -1
}
console.log(BinarySearch(arr1,0),"binary search")