function getData() {
  let count = 0;
  return function () {
    count++;
    console.log("fetching The data", count);
  };
}

function debounce(fn , delay){
    let timerId;

    return function(...args){
        clearTimeout(timerId)
        timerId = setTimeout(() => {
            fn(...args)
        }, delay);
    }
}


let betterFunction = debounce(getData() , 500)

