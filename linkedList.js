export class Node{
    key;
    value;
    next;

    constructor(key,val){
        this.key=key;
        this.value=val;
        this.next=null;
    }
    set key(k){
        this.key=k;
    }
    get key(){
        return this.key;
    }
    set value(v){
        this.value=v;
    }
    set next(n){
        this.next=n;
    }
    get value(){
        return this.value;
    }
    get next(){
        return this.next;
    }
}

export class LinkedList{
    head;
    length=0;

    constructor(){
        this.head=null;
    }

    append(key,val){
        let node = new Node(key,val);

        if (this.length===0){
            this.head=node;
        }else{
            this.tail.next=node;
        }
        node.next=null;
        this.length++;
    }

    prepend(key,val){
        let node=new Node(key,val);

        if (this.length===0){
            node.next=null;
            this.head=node;
            this.length++;
            return;
        }

        node.next=this.head;
        this.head=node;
        this.length++;

    }

    size(){
        return this.length;
    }

    get head(){
        return this.head;
    }

    get tail(){
        let tmp=this.head;
        while (tmp.next !== null){
            tmp=tmp.next;
        }
        return tmp;
    }

    at(index){
        let tmp=this.head;
        let counter=0;
        while(tmp!==null){
            if(counter===index){
                return tmp;
            }
            counter++;
            tmp=tmp.next;
        }
    }

    pop(){
        let oldTail=this.tail;
        let newTail= this.at(this.length-1);
        newTail.next=null;
        this.tail=newTail;
        this.length--;
        return oldTail;
    }

    contains(key){
        let tmp=this.head;
        for(let i =0;i<this.length;i++){
            if(tmp.key === key){
                return true;
            }
            else{
                tmp=tmp.next;
            }
        }
        return false;
    }

    find(key){
        let tmp=this.head;
        console.log(tmp);
        for(let i=0;i<this.length;i++){
            if (tmp.key===key)
                return i;
            else{
                tmp=tmp.next;
            }
        }
        return null;
    }

    toString(){
        let tmp=this.head;
        let str=""
        for(let i=0;i<this.length;i++){            
            str+=('( '+tmp.key+' ) -> ');
            if(tmp.next===null){
                str+='( null )';
            }else{
            tmp=tmp.next;
            }
        }
        return str;
    }

    insertAt(idx,key,val){
        if(idx>this.length){
            this.append(key,val);
            return;
        }
        if(idx===0){
            this.prepend(key,val);
            return;
        }
        let old=this.at(idx);
        let newNode=new Node();
        newNode.key=key;
        newNode.value=val;
        newNode.next=old.next;
        old.next=newNode;
        this.length++;
    }
    removeAt(idx){
        if(idx>this.length){
            console.log('Index out of bound. Current list length: '+this.length);
        }
        if(this.length ===1){
            this.head=null;
            this.length=0;
        }else{
            let before=this.at(idx-1);
            let after=this.at(idx+1);
            before.next=after;
            this.length--;
        }

    }
}


