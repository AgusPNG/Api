function AjaxRequest(){
    var url = "https://pokeapi.co/api/v2/pokemon/"
    let card = document.querySelector("#PokeName")
    var objXMLHttpRequest = new XMLHttpRequest()
  
    objXMLHttpRequest.onreadystatechange = function(){
      if(objXMLHttpRequest.readyState === 4){
        if(objXMLHttpRequest.status === 200){
          let json = JSON.parse(objXMLHttpRequest.responseText)
          card.data = json
          for(let i=0; i<json.results.length; i++){
            SearchbyURL(json.results[i].url)
          }
        }
        else{
          alert("Error Code: " + objXMLHttpRequest.status)
          alert("Error Message: " + objXMLHttpRequest.statusText)
        }
      }
    }
    objXMLHttpRequest.open("get", url)
    objXMLHttpRequest.send()
  }
  
  function SearchbyURL(urlPokemon){
    var objXMLHttpRequest = new XMLHttpRequest()

    objXMLHttpRequest.onreadystatechange = function(){
      let div = document.querySelector(".container")
      if(objXMLHttpRequest.readyState === 4){
        if(objXMLHttpRequest.status === 200){
          let json = JSON.parse(objXMLHttpRequest.responseText)
          let types = json.types[0].type.name.toUpperCase()
          for(let i=1; i<json.types.length; i++){
            if(i < json.types.length)
                types = (types + ", " +json.types[i].type.name.toUpperCase())
          }
          let name = json.name.toUpperCase()
          let img = json.sprites.other.home.front_default
          let html =
          `<h4 class="container_name">${name}</h4>
          <img src="${img}" alt="pokemon" style="width:60%; height:60%;">
          <h4 class="container_types">${types}</h4>`
          div.innerHTML = html
        }
        else{
          alert("Error Code: " + objXMLHttpRequest.status)
          alert("Error Message: " + objXMLHttpRequest.statusText)
        }
      }
    }
    objXMLHttpRequest.open("get", urlPokemon)
    objXMLHttpRequest.send()
  }
  
function Search(){
  let card = document.querySelector(".container")
  var data = document.querySelector("#PokeName").data
  var search = document.querySelector("#PokeName").value

  for(let i=0; i<data.results.length; i++){
        if(data.results[i].name == search.toLowerCase())
            var url = data.results[i].url
  }
  if(url !== undefined){
    var objXMLHttpRequest = new XMLHttpRequest()

    objXMLHttpRequest.onreadystatechange = function(){
      if(objXMLHttpRequest.readyState === 4){
        if(objXMLHttpRequest.status === 200){
          let json = JSON.parse(objXMLHttpRequest.responseText)
          let types = json.types[0].type.name.toUpperCase()
          for(let i=1; i<json.types.length; i++){
              if(i<json.types.length)
                  types = (types + ", " +json.types[i].type.name.toUpperCase())
          }
          let name = json.name.toUpperCase()
          let img = json.sprites.other.home.front_default
          let html =
          `<h4 class="container_name">${name}</h4>
          <img src="${img}" alt="pokemon" style="width:60%; height:60%;">
          <h4 class="container_types">${types}</h4>`
          card.innerHTML = html
        }
        else{
          alert("Error Code: " + objXMLHttpRequest.status)
          alert("Error Message: " + objXMLHttpRequest.statusText);
        }
      }
    }
    objXMLHttpRequest.open("get", url)
    objXMLHttpRequest.send()
  }
  else{
    let html = `<h4 style="font-size: 20px; color: white;"> Pokemon no encontrado :( </h4> <img src="https://st4.depositphotos.com/4967103/22006/v/1600/depositphotos_220068534-stock-illustration-404-error-found-tee-print.jpg" alt="notfound" style="width:50%; height:50%; border-radius: 10px;">`
    card.innerHTML = html
  }
}  