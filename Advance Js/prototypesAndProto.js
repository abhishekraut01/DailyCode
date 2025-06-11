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



//------------------------------------------------------------------------
// Lets talk about prototype inheritance and all 

const simpleString = "Abhishek"
console.log(simpleString.charAt(2))
// tell me one thing name is simple string not a complex data structure so how can i use methods using name. and all methods come uppercase lowercase and all
//see let me tell you one thing what js do under the hood is it wrap under wrapper class see exaple below


const name2 = new String("Abhishek2")
// what this does it name2.__proto__ -> points to String class 


//lets have one more example for clarity

const p1 ={
    ayushname:"ayush is inside p1",
    age:20
}

const p2 ={
    piyushname:"piyush is inside p2",
    age:20,
    __proto__ : p1
}

const p3 ={
    jayushname:"jayush is inside p3",
    age:20,
    __proto__ : p2
}

console.log(p3.jayushname)
console.log(p3.piyushname)
console.log(p3.ayushname)

//in this exaple we set the prototype chain see js engine firsly check hey ayushname are you inside p3 noo , again hey ayushname are you inside p2 noo and here we go again hey are you inside p1 yessssssssss

//at last main __proto__ -> object refers to object and fukin yes that object's __proto__ points to null