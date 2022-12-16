const sha256 = require('js-sha256');

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {

  constructor(capacity, count = 0,data = []) {
    // Your code here
    this.capacity = capacity;
    this.count = count;
    this.data = data;
    for(let i = 0; i <  capacity; i++){
      data.push(null);
    }
  }

  hash(key) {
    // Your code here
    let theDecimalNumbers = 0;
    let sha256Code = sha256(key);
    sha256Code = sha256Code.slice(0,8);
    for(let i = 0; i < 64; i += 8){
    theDecimalNumbers = parseInt(sha256Code , 16);
    }
    return theDecimalNumbers;
  }

  hashMod(key) {
    // Your code here
    return this.hash(key) % this.capacity;
  }

  insertNoCollisions(key, value) {
    // Your code here
    let newPair = new KeyValuePair(key,value);
    let Index = this.hashMod(key);
    if(this.data[Index] !== null){
      throw new Error('hash collision or same key/value pair already exists!');
    }
    this.data[Index] = newPair;
    this.count++;
  }

  insertWithHashCollisions(key, value) {
    // Your code here
    let newPair = new KeyValuePair(key,value);
    let Index = this.hashMod(key);
    if(this.data[Index] !== null){
      newPair.next = this.data[Index];
      this.data[Index] = newPair;
      this.count++;
    }
    else{
    this.data[Index] = newPair;
    this.count++;
    }
  }
  

  insert(key, value) {
    // Your code here
    let newPair = new KeyValuePair(key,value);
    let Index = this.hashMod(key);
    if(this.data[Index] !== null){
      let current = this.data[Index];
      while(current){
        if(current.key == key){
          current.value = value;
          return;
        }
        current = current.next;
      }
      newPair.next = this.data[Index];
      this.data[Index] = newPair;
      this.count++;
    }
    else{
    this.data[Index] = newPair;
    this.count++;
    }
  }

  }


module.exports = HashTable;