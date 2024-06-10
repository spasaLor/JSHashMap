import { LinkedList } from "./linkedList.js";

class HashMap{
    size;
    buckets;
    loadFactor;

    constructor(size=16,loadFactor=0.75){
        this.size=size;
        this.buckets = Array(this.size);
        this.loadFactor=loadFactor;
        for(let i =0; i<this.buckets.length;i++){
            this.buckets[i] = new LinkedList();
        }
    }

    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
          hashCode = hashCode % this.size;
        }
     
        return hashCode;
      } 
     
    set(key,value){
        let hash = this.hash(key);
        let bucket = this.buckets[hash];

        bucket.append(key,value);
        this.checkOccupation();

    }

    get(key){
        let index = this.hash(key);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
          }
        let bucket = this.buckets[index];
        let node= bucket.at(bucket.find(key));
          console.log(bucket.find(key));
        if(node!==null){
            return node.value;
        }
        else {
            return null;
        }
    }

    has(key){
        let index = this.hash(key);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
          }
        let bucket = this.buckets[index];
        return bucket.contains(key);
    }

    remove(key){
        let index = this.hash(key);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
          }
        let bucket = this.buckets[index];
        let nodeIdx= bucket.find(key);
        if(nodeIdx!==null){
            bucket.removeAt(nodeIdx);
            return true;
        }
        else{
            return false;
        }
    }

    length(){
        let sum=0;
        for(let i =0;i<this.buckets.length;i++){
            sum+=this.buckets[i].size();
        }
        return sum;
    }

    clear(){
        for(let i =0; i<this.buckets.length;i++){
            this.buckets[i] = new LinkedList();
        }
    }

    keys(){
        let keyList=[];
        for(let i =0; i<this.buckets.length;i++){
            if(this.buckets[i].size() === 0){
                continue;
            }else{
                let tmp=this.buckets[i].head;
                while(tmp !== null){
                    keyList.push(tmp.key);
                    tmp=tmp.next;
                }
            }
        }
        return keyList;
    }

    values(){
        let valueList=[];
        for(let elem of this.keys()){
            valueList.push(this.get(elem));
        }
        return valueList;
    }

    entries(){
        let pairs=[];
        for(let elem of this.keys()){
            pairs.push([elem,this.get(elem)]);
        }
        return pairs;
    }

    checkOccupation(){
        if(this.length() / this.size >=this.loadFactor){
            let oldBuckets=this.buckets;
            this.size=this.size*2;
            this.buckets = Array(this.size);
            for(let i =0;i<this.buckets.length;i++){
                this.buckets[i]=oldBuckets[i];
                if (i>=oldBuckets.length){
                    this.buckets[i]=new LinkedList();
                }
            }
        }
    }
}


