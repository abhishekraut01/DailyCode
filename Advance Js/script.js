// What are Objects in javascript

const Person = {
    fname:"Abhishek",
    lname:"raut",
    eid:69,

    getFname: function(){
        return this.fname;
    }
}

const fname = Person.getFname()
console.log(fname)

