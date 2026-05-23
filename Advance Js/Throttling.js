const apiCall = () =>{
    console.log("api call success :==>")
}

const throttling = (fn , delay)=>{
    let lastCalled = 0;
    return function(...args){
        let now = Date.now()
        if(now - lastCalled > delay){
            fn(...args)
            lastCalled = now
        }
    }
}

const betterFn = throttling(apiCall , 1000)