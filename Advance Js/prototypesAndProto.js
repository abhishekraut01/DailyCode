const Person = {
    fname:"Abhishek",
    lname:"raut",
    eid:69,

    getname(){
        return this.fname;
    }
}

const Person2 = Object.create(Person)

console.log(Person)
console.log(Person2)

// you can see in output that Person has all the fields and person2 object is empty but let me show you one thing you can access the properties of person using person2 and this is possible let me show you

console.log(Person2.fname)

//but how this is even possible how can i even access the values of Person2 and and and this is because when we crete object sing Object.create(person) we attached Person's __proto__ to Person2 and now we can easily access Properties of person from person2 object

// you can also change the value of person using person2 lets se how

Person2.fname = "Kailash" // ❌
console.log(Person.fname) 

Person2.__proto__.fname = "Kailash" // ✅
console.log(Person.fname) 