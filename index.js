//Body
const body = document.querySelector("body");
// Nav
const nav = document.querySelector("nav");
const botonNavBrawlers = document.getElementById("boton-nav-brawlers");
const botonModo = document.getElementById("boton-modo");
//Header
const header = document.querySelector("header");

//Sección Principal
const seccionPrincipal = document.querySelector(".seccion-principal-brawlers");
const contenedorBrawlers = document.querySelector(
  ".contenedor-tarjetas-brawlers"
);

// Paginado
const seccionPaginado = document.querySelector(".paginado");
const botonPrimeraPagina = document.getElementById("boton-primera-pagina");
const botonPaginaAnterior = document.getElementById("boton-pagina-anterior");
const iconoPaginaAnterior = document.querySelector("#boton-pagina-anterior i");
const botonProximaPagina = document.getElementById("boton-proxima-pagina");
const iconoProximaPagina = document.querySelector("#boton-proxima-pagina i");
const botonUltimaPagina = document.getElementById("boton-ultima-pagina");
// Busqueda
const inputBusqueda = document.getElementById("input-busqueda");
const botonBuscar = document.getElementById("boton-buscar");
const seccionBusqueda = document.getElementById("seccion-busqueda");
const formularioBusqueda = document.getElementById("formulario-busqueda");
const selectRarity = document.getElementById("select-rarity");
const selectOrden = document.getElementById("select-orden");

//Modal
const contenedorModalBusqueda = document.getElementById("contenedor-modal");
const botonCerrarModal = document.getElementById("cerrar-modal");

// Sección descripción.
const seccionDescripcion = document.getElementById("descripcion");
const contenedorImagenPrincipalDescripcion = document.querySelector(
  ".contenedor-img-principal-descripcion"
);
const imagenPrincipalDescripcion = document.querySelector(
  ".img-principal-descripcion"
);
const nombreDescripcion = document.getElementById("nombre-descripcion");
const claseNombre = document.getElementById("clase-nombre");
const rarityDescripcion = document.getElementById("rarity-descripcion");
const descripcion = document.getElementById("descripcion-principal");

//star powers
const seccionStarPowers = document.getElementById("seccion-star-powers");
const contenedorItemsStarPowers = document.getElementById(
  "contenedor-items-star-powers"
);
// Gadgets
const seccionGadgets = document.getElementById("seccion-gadgets");
const contenedorItemsGadgets = document.getElementById(
  "contenedor-items-gadgets"
);
//Videos
const seccionVideos = document.getElementById("seccion-videos");
const contenedorVideos = document.getElementById("contenedor-videos");

/*///////////////////////////////////////////////////////////////////////////////////////////////////////
                                           MAQUETADO
///////////////////////////////////////////////////////////////////////////////////////////////////////*/
const arraySecciones = [seccionPrincipal, seccionBusqueda, seccionDescripcion];

const mostrarSeccion = (array, seccion) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] != seccion) {
      array[i].style.display = "none";
    } else if (array[i] === seccion) {
      array[i].style.display = "flex";
    }
  }
};

// NAV
botonNavBrawlers.onclick = (e) => {
  e.preventDefault();
  header.style.display = "block";
  nav.style.display = "flex";
  formularioBusqueda.style.display = "flex";
  botonNavBrawlers.style.display = "none"
  mostrarSeccion(arraySecciones, seccionPrincipal);
};

/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                            MODO CLARO/OSCURO
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
botonModo.onclick = () => {
  body.classList.toggle("oscuro");
  //body.style.backgroundImage = 'url("../imagenes/fondo-oscuro.png")'
};

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                  FETCH PRINCIPAL
/////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
const mostrarBrawlers = () => {
  fetch(`https://api.brawlapi.com/v1/brawlers`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      tarjetasBrawlersHtml(data, paginaActual);
      filtrarRarity(data, selectRarity.value);
      ordenar(data, selectOrden.value);
      traerBrawler();
    });
};

mostrarBrawlers();

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                  PAGINADO
/////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

let paginaActual = 0;

const tarjetasBrawlersHtml = (data, pagina) => {
  const arrayPaginado = data.list.slice(pagina, pagina + 10);
  if (arrayPaginado.length === 0) {
    botonProximaPagina.prev.disabled = true;
    paginaActual = 0;
    mostrarBrawlers();
  }

  const html = arrayPaginado.reduce((acc, curr) => {
    return (
      acc +
      `<article class="tarjeta-brawler" data-id=${curr.id}>
        <img src="${curr.imageUrl}" alt="Imagen del brawler ${curr.name}">
          <h3>${curr.name}</h3>
      </article>`
    );
  }, "");

  contenedorBrawlers.innerHTML = html;
};

botonPrimeraPagina.onclick = () => {
  paginaActual = 0;
  mostrarBrawlers();
};

botonPaginaAnterior.onclick = () => {
  iconoProximaPagina.style.color = "white";
  if (paginaActual === 0) {
    iconoPaginaAnterior.style.color = "grey";
    prev.disabled = true;
  } else {
    iconoProximaPagina.style.color = "white";
  }

  paginaActual = paginaActual - 10;
  mostrarBrawlers();
};

botonProximaPagina.onclick = () => {
  if (paginaActual === 50) {
    iconoProximaPagina.style.color = "grey";
    prev.disabled = true;
  } else {
    iconoPaginaAnterior.style.color = "white";
  }
  paginaActual = paginaActual + 10;
  mostrarBrawlers();
};

botonUltimaPagina.onclick = () => {
  paginaActual = 50;
  mostrarBrawlers();
};
// resolver ultima pagina por si agregan mas brawlers.

/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                            BUSQUEDA DE BRAWLERS
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

const capitalizar = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const mostrarBusqueda = () => {
  fetch(`https://api.brawlapi.com/v1/brawlers`)
    .then((res) => res.json())
    .then((data) => {
      const resultado = data.list.find((objeto) => {
        return objeto.name === capitalizar(inputBusqueda.value);
      });
      if (resultado != undefined) {
        const mostrarRestultado = `<article class="tarjeta-brawler" data-id=${resultado.id}>
      <img src="${resultado.imageUrl}" alt="Imagen del brawler ${resultado.name}">
      <h3>${resultado.name}</h3>
      </article>`;
        mostrarSeccion(arraySecciones, seccionBusqueda);
        seccionBusqueda.innerHTML = mostrarRestultado;
        inputBusqueda.value = "";
        traerBrawler();
      } else {
        contenedorModalBusqueda.style.display = "flex";
      }
    });
};

formularioBusqueda.onsubmit = (event) => {
  event.preventDefault();
  mostrarBusqueda();
};

botonCerrarModal.onclick = () => {
  contenedorModalBusqueda.style.display = "none";
  mostrarSeccion(arraySecciones, seccionPrincipal);
};

/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                            SECCIÓN DESCRIPCIÓN
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

const traerBrawler = () => {
  const tarjetas = document.querySelectorAll(".tarjeta-brawler");

  for (let i = 0; i < tarjetas.length; i++) {
    tarjetas[i].onclick = () => {
      let id = tarjetas[i].dataset.id;
      Number(id);
      fetch(`https://api.brawlapi.com/v1/brawlers/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          mostrarDescripcion(data);
          mostrarStarPowers(data);
          mostrarGadgets(data);
          mostrarVideos(data);
        });
    };
  }
};

const mostrarDescripcion = (personaje) => {
  botonNavBrawlers.style.display = "block"
  header.style.display = "none";
  formularioBusqueda.style.display = "none";
  mostrarSeccion(arraySecciones, seccionDescripcion);
  imagenPrincipalDescripcion.src = personaje.imageUrl;
  nombreDescripcion.textContent = personaje.name;
  claseNombre.textContent = personaje.class.name;
  rarityDescripcion.textContent = personaje.rarity.name;
  rarityDescripcion.style.color = personaje.rarity.color;
  descripcion.textContent = personaje.description;
};

const mostrarStarPowers = (personaje) => {
  const array = personaje.starPowers;
  if (array.length > 0) {
    seccionStarPowers.style.display = "flex";
    const html = array.reduce((acc, curr) => {
      return (
        acc +
        `<div class="item">
      <div>
        <div class="img-item">
          <img src="${curr.imageUrl}" alt="icono Star Power">
        </div>
        <p class="nombre-item">${curr.name}</p>
      </div>
      <p class="descripcion-item">${curr.description}</p> </div>`
      );
    }, "");
    contenedorItemsStarPowers.innerHTML = html;
  }
};

const mostrarGadgets = (personaje) => {
  const array = personaje.gadgets;
  if (array.length > 0) {
    seccionGadgets.style.display = "flex";
    const html = array.reduce((acc, curr) => {
      return (
        acc +
        `<div class="item">
      <div>
        <div class="img-item">
          <img src="${curr.imageUrl}" alt="icono Star Power">
        </div>
        <p class="nombre-item">${curr.name}</p>
      </div>
      <p class="descripcion-item">${curr.description}</p> </div>`
      );
    }, "");
    contenedorItemsGadgets.innerHTML = html;
  }
};

const mostrarVideos = (personaje) => {
  const array = personaje.videos;
  if (array.length > 0) {
    seccionVideos.style.display = "flex";
    const html = array.reduce((acc, curr) => {
      return (
        acc +
        `<div class="item">
      <div>
        <div class="video-item">
          <video controls poster="${curr.previewUrl}">
            <source src="${curr.videoUrl}" type="video/mp4"/>
          </video>
        </div>
        <p class="nombre-item">${curr.name}</p>
      </div>
      <p class="descripcion-item">${curr.description}</p> </div>`
      );
    }, "");
    contenedorVideos.innerHTML = html;
  }
};

/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                            SELECT RARITY 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
selectRarity.onchange = () => {
  mostrarBrawlers();
};

const filtrarRarity = (data, value) => {
  if (value === "Todos") {
    tarjetasBrawlersHtml(data, paginaActual);
    seccionPaginado.style.display = "flex";
  } else {
    const arrayFiltrado = data.list.filter((personaje, index, data) => {
      return personaje.rarity.name === value;
    });
    const html = arrayFiltrado.reduce((acc, curr) => {
      return (
        acc +
        `<article class="tarjeta-brawler" data-id=${curr.id}>
        <img src="${curr.imageUrl}" alt="Imagen del brawler ${curr.name}">
          <h3>${curr.name}</h3>
      </article>`
      );
    }, "");

    contenedorBrawlers.innerHTML = html;
    seccionPaginado.style.display = "none";
  }
  //ordenar(data, selectOrden.value);

};

/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                            SELECT A-Z Z-A
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
selectOrden.onchange = () => {
  mostrarBrawlers();
};

const ordenar = (data, value) => {
  if (value === "a-z") {
    const ordenarData = data.list.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    const dataOrdenada = { list: ordenarData };
    tarjetasBrawlersHtml(dataOrdenada, paginaActual);
  }

  if (value === "z-a") {
    const ordenarData = data.list.sort((a, b) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    const dataOrdenada = { list: ordenarData };
    tarjetasBrawlersHtml(dataOrdenada, paginaActual);
  }
  
  filtrarRarity(data, selectRarity.value);
};
