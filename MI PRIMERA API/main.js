const url = 'https://spotify23.p.rapidapi.com/search/?q=%3CREQUIRED%3E&type=multi&offset=0&limit=10&numberOfTopResults=5';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'cf3582655cmsh0909cce7ea082b7p1a7ecfjsne99f02fc6e2d',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}
};
fetch(url, options)
.then(res => res.json())
.then(data => {
    const items = data.albums.items;
    const resultadoscontainer = document.getElementById('container');

    for (let i = 0; i < items.length; i++) {
        const nombre = items[i].data.artists.items[0].profile.name;
        const imagen = items[i].data.coverArt.sources[0].url;
        const fecha = items[i].data.date.year;
        const disco= items[i].data.name;
        const uri= items[i].data.uri;
        const total = [nombre, imagen, fecha, disco, uri];

        // Crear un enlace para cada elemento
        const enlace = document.createElement('a');
        enlace.href = uri;
        enlace.target = "_blank"; // Abre el enlance en una nueva pestaña
        resultadoscontainer.appendChild(enlace);
        
        // Crear una imagen y establecer su atributo src
        const imgElement = document.createElement('img');
        imgElement.src = imagen;
        imgElement.alt = nombre; // Puedes establecer un atributo alt si es relevante

        // Agregar un event listener para abrir el enlace al hacer clic en la imagen
        imgElement.addEventListener('click', function() {
            window.open(uri, '_blank');
        });

        enlace.appendChild(imgElement);

        // Crear un parrafo para mostrar el nombre y la fecha
        const paragraph = document.createElement('p');
        paragraph.textContent =`Nombre: ${nombre}, Fecha: ${fecha}`;
        enlace.appendChild(paragraph);

    }
})
.catch(error => console.error(error)); 



// Paginacion


document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("container");
    const pagination = document.querySelector(".pagination ul");
  
    const itemsPerPage = 4; // Cantidad de elementos por página
    let currentPage = 1;
  
    // Contenido que se paginará
    const items = ["Contenido 1", "Contenido 2", "Contenido 3", "Contenido 4", "Contenido 5", "Contenido 6", "Contenido 7", "Contenido 8", "Contenido 9", "Contenido 10", /* ... Agrega más elementos según sea necesario ... */];
  
    // Función para mostrar elementos en la página actual
    function showItems(pageNumber) {
      container.innerHTML = "";
      const startIndex = (pageNumber - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const displayedItems = items.slice(startIndex, endIndex);
  
      displayedItems.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("item");
        div.textContent = item;
        container.appendChild(div);
      });
    }
  
    // Función para actualizar la paginación
    function updatePagination() {
      const totalPages = Math.ceil(items.length / itemsPerPage);
      pagination.innerHTML = "";
  
      for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement("li");
        li.innerHTML = `<a href="#" data-page="${i}">${i}</a>`;
        pagination.appendChild(li);
      }
  
      // Agrega un event listener a cada enlace de paginación
      pagination.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          currentPage = parseInt(e.target.dataset.page);
          showItems(currentPage);
          updatePagination();
        });
      });
    }
  
    // Muestra los elementos de la primera página al cargar la página
    showItems(currentPage);
  
    // Actualiza la paginación inicialmente
    updatePagination();
  });
  