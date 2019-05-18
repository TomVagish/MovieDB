
export default function(searchData){
    return fetch(`https://api.themoviedb.org/3/search/multi?api_key=65a51587439f13177c0c078aac743a57&language=en-US&query=${searchData}&page=1&include_adult=false`)
    .then(response => response.json())
    .then(response => response)
    .catch(e =>{
        console.log(e);
    });
  }