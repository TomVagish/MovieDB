export default function(page){
    return fetch(`https://api.themoviedb.org/3/movie/popular?api_key=65a51587439f13177c0c078aac743a57&language=en-US&page=${page}`)
    .then(response => response.json())
    .then(response => response)
    .catch(e =>{
        console.log(e);
    });
  }