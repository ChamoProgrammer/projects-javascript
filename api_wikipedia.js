const wikilinks = document.getElementsByClassName("wikilinks")[0];
const buscar_esto = document.getElementById("input");
let array_imagenes = [];

buscar_esto.addEventListener("keydown", function(event){
  if(event.key === 'Enter')
    request();
})

function request(){
  removeItems();
  const url = 'https://en.wikipedia.org/w/api.php?action=query&origin=*&pilicense=any&prop=pageimages&pithumbsize=250&format=json&gsrlimit=100&generator=search&gsrsearch='+buscar_esto.value+'';
// api fetch
  fetch(url)

  .then(response =>{
    if(response.ok)
      return response.json();
    else
      alert(response.status);
  })

  .then(data => {
    console.log(data);
    cargar_links(data);
  });  
}

function cargar_links(data){
  for (var ID_pagina in data.query.pages) {
    if (data.query.pages.hasOwnProperty(ID_pagina)) {
      var div = document.createElement('div');
      div.className = 'link';
      try{
        div.innerHTML = '<img src='+data.query.pages[ID_pagina].thumbnail.source+'>' + 
                        '<h3>'+data.query.pages[ID_pagina].title+'</h3>' +
                        '<div class="middle">' +
                          '<div>' +
                            '<i class="fab fa-wikipedia-w"></i>' +
                          '</div>' +
                        '</div>';
        wikilinks.appendChild(div);
        array_imagenes.push('https://en.wikipedia.org/?curid=' + ID_pagina);
      }
      catch(err){
       div.innerHTML = '<h3>'+data.query.pages[ID_pagina].title+'</h3>' +
                       '<div class="middle">' +
                          '<div>' +
                            '<i class="fab fa-wikipedia-w"></i>' +
                          '</div>' +
                        '</div>';
        wikilinks.appendChild(div);
        array_imagenes.push('https://en.wikipedia.org/?curid=' + ID_pagina);
      }     
              
    }
  }
  addEvents();
}

function addEvents(){
  for(let i = 0;i < 100;i++){
    document.getElementsByClassName("link")[i].addEventListener('click', function(){
      window.open(array_imagenes[i]);
    });
  }
}

function removeItems(){
  wikilinks.innerHTML = '';
  array_imagenes = [];
}