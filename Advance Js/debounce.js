function apiCall(){
    console.log("API called");
}

function debounce(fn , delay){
  let timer;
  return function(...args){
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay);
  }
}

const betterApiCall = debounce(apiCall , 500) 