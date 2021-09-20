//agregar este tema cuando haya pasado la hora establecida
dia_noche_tema = () => {
    let fecha = new Date();
    let hora = fecha = new Date.getHours();
  
    if(hora >= 7 && hora < 19){
      document.body.style.backgroundColor = 'red';
      document.body.style.color = 'black';
    }
    else{
      document.body.style.backgroundColor = 'black';
      document.body.style.color = 'yellow';
    }
  }
// aplicar si se cumple con lo requerido
  window.addEventListener('load', dia_noche_tema);
  
  // cuando presione "enter" me muestre resultados de la api
  document.querySelector("#input").addEventListener("keydown", (event) => {
    if (event.key == "Enter")
      apiRequest();
  });
  
  // me devuelva una respueta
  document.querySelector("#search").addEventListener("click", () => {
      apiRequest();
  });
  
  apiRequest = () => {
    document.querySelector("#grid").textContent = "";
    const url = 'https://api.unsplash.com/search/photos?query='+input.value+'&per_page=30&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo';

    fetch(url)  
    .then(response => {
      if (!response.ok) throw Error(response.statusText);
        return response.json();
     })
     .then(data => {
        cargar_imagenes(data);
     })
  // capturar error
     .catch(error => console.log(error + "  observe cual es el error por favor, puede que escribio mal la url o algo mas...De Nada😉"));   
  }
  
  cargar_imagenes = (data) => {
    for(let i = 0;i < data.results.length;i++){
      let image = document.createElement("div");
      image.className = "img";
      image.style.backgroundImage = "url("+data.results[i].urls.raw + "&w=1366&h=768" +")";
      image.addEventListener("dblclick", function(){
        window.open(data.results[i].links.download, '_blank');
      })
      document.querySelector("#grid").appendChild(image);
    }
  }