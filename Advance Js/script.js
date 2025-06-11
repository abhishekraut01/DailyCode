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

// This is the simplest way by which we create objects in JavaScript and this is the generic way of creating object and let me tell you one thing this code is not reusable and we can not reuse this code if we want to create more person object like this 
// there is one way but that way just give reference to that object 

const person2 = Object.create(Person)
console.log(person2.fname)
console.log(person2.lname)
console.log(Person.lname)


//The best way to create reusable objects are using function constructor

function CreateUser(username , password){
    this.username = username;
    this.password = password;

    this.getUsername = function(){
        return this.username
    }
}

const user1 = new CreateUser("Abhishek" , "Helloword")
console.log(user1.getUsername())


//this is how you can create reusable objects in javascript and there is one ES6 syntax also

class CreateUserUsingClass{
    constructor(username , password){
        this.username = username;
        this.password = password;
    }

    getName = function(){
        return this.username
    }
}

const firstUserFromClass = new CreateUserUsingClass("sakshi" , "password123")
console.log(firstUserFromClass.getName())