let list =[90,30,79,50,20,15]
function InsertionSort(arr){
    
    for(let i=1;i<arr.length;i++){
        let key = arr[i];
        let j = i-1;
while(j>=0 && arr[j]>key){
    arr[j+1]=arr[j] 
    j= j-1;
        }
arr[j+1]= key 

    }

    return arr
}
console.log(InsertionSort(list))