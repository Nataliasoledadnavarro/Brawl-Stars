//Body
const body = document.querySelector("body");
// Nav
const nav = document.querySelector("nav");
const botonNavBrawlers = document.getElementById("boton-nav-brawlers");
const botonModoOscuro = document.getElementById("boton-modo-oscuro");
const botonModoJuego = document.getElementById("boton-modo-juego");
const botonHamburguesa = document.querySelector(".boton-hamburguesa");
const modalNav = document.querySelector(".modal-menu");
const cerrarModalNav = document.querySelector(".cerrar-modal-nav");

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
// nunca usas esta variable 
const botonBuscar = document.getElementById("boton-buscar");
const seccionBusqueda = document.getElementById("seccion-busqueda");
const formularioBusqueda = document.getElementById("formulario-busqueda");
const selectRarity = document.getElementById("select-rarity");
const selectOrden = document.getElementById("select-orden");

//Modal
const contenedorModalBusqueda = document.getElementById("contenedor-modal");
const botonCerrarModal = document.getElementById("cerrar-modal");

//Sección descripción.
const seccionDescripcion = document.getElementById("descripcion");
// nunca usas esta variable 
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

//Star powers
const seccionStarPowers = document.getElementById("seccion-star-powers");
const contenedorItemsStarPowers = document.getElementById(
  "contenedor-items-star-powers"
);

//Gadgets
const seccionGadgets = document.getElementById("seccion-gadgets");
const contenedorItemsGadgets = document.getElementById(
  "contenedor-items-gadgets"
);

//Videos
const seccionVideos = document.getElementById("seccion-videos");
const contenedorVideos = document.getElementById("contenedor-videos");

//Modos de juego
const seccionModos = document.getElementById("seccion-modos-juego");
const contenedorModos = document.querySelector(".contenedor-modos");
const seccionDescripcionModo = document.querySelector(
  ".seccion-descripcion-modo"
);
const tituloDescripcionModo = document.querySelector(
  ".titulo-descripcion-modo"
);
const descripcionModo = document.querySelector(".descripcion-modo");
const nombreModo = document.querySelector(".nombre-modo");
const iconoModo = document.querySelector(".icono-modo");
const contenedorNombreModo = document.querySelector(".contenedor-nombre-modo");
const tutorialModo = document.querySelector(".tutorial-modo");

//Mapas
const contenedorMapas = document.querySelector(".contenedor-mapas");
const contenedorMapasDisabled = document.querySelector(
  ".contenedor-mapas-disabled"
);
const tituloDisabled = document.querySelector(".titulo-disabled");

/*///////////////////////////////////////////////////////////////////////////////////////////////////////
                                           MAQUETADO
///////////////////////////////////////////////////////////////////////////////////////////////////////*/
const arraySecciones = [
  seccionPrincipal,
  seccionBusqueda,
  seccionDescripcion,
  seccionModos,
  seccionDescripcionModo,
];

const mostrarSeccion = (array, seccion) => {
  // amo esta funcion! 
  for (let i = 0; i < array.length; i++) {
    if (array[i] != seccion) {
      array[i].style.display = "none";
    } else if (array[i] === seccion) {
      array[i].style.display = "flex";
    }
  }
};

/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                    NAV
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

botonHamburguesa.onclick = () => {
  modalNav.style.display = "block";
  botonHamburguesa.style.display = "none";
};
cerrarModalNav.onclick = () => {
  modalNav.style.display = "none";
  botonHamburguesa.style.display = "block";
};
botonNavBrawlers.onclick = (e) => {
  // no es necesario prevenir el default aca, eso solo para formularios
  e.preventDefault();
  header.style.display = "block";
  nav.style.display = "flex";
  formularioBusqueda.style.display = "flex";
  mostrarSeccion(arraySecciones, seccionPrincipal);
};

/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                            MODO CLARO/OSCURO
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
botonModoOscuro.onclick = () => {
  body.classList.toggle("oscuro");
};

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                             FETCH PRINCIPAL
/////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

const mostrarBrawlers = () => {
  fetch(`https://api.brawlapi.com/v1/brawlers`)
    .then((res) => res.json())
    .then((data) => {
      tarjetasBrawlersHtml(agruparBrawlers(data), paginaActual);
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
let ultimaPagina = 0;

const agruparBrawlers = (data) => {
  // excelente esta funcion
  let contadora = 0;
  const matriz = [];
  for (let i = 0; i < data.list.length; i++) {
    const array = data.list.slice(contadora, contadora + 10);
    if (array.length > 0) {
      matriz.push(array);
    }
    contadora = contadora + 10;
  }
  ultimaPagina = matriz.length - 1;
  return matriz;
};

const tarjetasBrawlersHtml = (matrizBrawlers, pagina) => {
  const brawlers = matrizBrawlers[pagina];
  // aca podés usar retorno implicito
  // const html = brawlers.reduce((acc, curr) => acc +
  const html = brawlers.reduce((acc, curr) => {
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
  // if (!paginaActual)
  if (paginaActual === 0) {
    iconoPaginaAnterior.style.color = "grey";
    botonPaginaAnterior.disabled = true;
  } else {
    iconoProximaPagina.style.color = "white";
    paginaActual = paginaActual - 1;
    mostrarBrawlers();
    botonProximaPagina.disabled = false;
  }
};

botonProximaPagina.onclick = () => {
  if (paginaActual === ultimaPagina) {
    iconoProximaPagina.style.color = "grey";
    botonProximaPagina.disabled = true;
  } else {
    iconoPaginaAnterior.style.color = "white";
    paginaActual = paginaActual + 1;
    mostrarBrawlers();
    botonPaginaAnterior.disabled = false;
  }
};

botonUltimaPagina.onclick = () => {
  paginaActual = ultimaPagina;
  mostrarBrawlers();
};

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
      let resultado = data.list.find((objeto) => {
        return objeto.name === capitalizar(inputBusqueda.value);
      });

      if (
        inputBusqueda.value === "8" ||
        inputBusqueda.value === "8bit" ||
        inputBusqueda.value === "8-bit" ||
        inputBusqueda.value === "8-Bit" ||
        inputBusqueda.value === "8Bit"
      ) {
        const busqueda8Bit = data.list.filter((personaje) => {
          return personaje.id === 16000027;
        });
        resultado = busqueda8Bit[0];
      }

      // if (resultado)
      if (resultado != undefined) {
        const mostrarRestultado = `<article class="tarjeta-brawler" data-id=${resultado.id}>
      <img src="${resultado.imageUrl}" alt="Imagen del brawler ${resultado.name}">
      <h3>${resultado.name}</h3>
      </article>`;
        mostrarSeccion(arraySecciones, seccionBusqueda);
        seccionBusqueda.innerHTML = mostrarRestultado;
        inputBusqueda.value = "";
        traerBrawler();
      }
      // else, o if (!resultado)
      if (resultado === undefined) {
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
      // const id, no modificas la variable en ningun momento. Number(id) no modifica la variable, 
      // sino que retorna la variable convertida en numero:
      // const idANumero = Number(id)
      // De todos modos no es necesario porque si lo usas en la URL, queres que sea un string
      let id = tarjetas[i].dataset.id;
      Number(id);
      fetch(`https://api.brawlapi.com/v1/brawlers/${id}`)
        .then((res) => res.json())
        .then((data) => {
          mostrarDescripcion(data);
          mostrarStarPowers(data);
          mostrarGadgets(data);
          mostrarVideos(data);
        });
    };
  }
};

const mostrarDescripcion = (personaje) => {
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
  } else {
    seccionVideos.style.display = "none";
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
    tarjetasBrawlersHtml(agruparBrawlers(data), paginaActual);
    seccionPaginado.style.display = "flex";
  } else {
    // no es necesario declarar ni index ni data 
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
    tarjetasBrawlersHtml(agruparBrawlers(dataOrdenada), paginaActual);
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
    tarjetasBrawlersHtml(agruparBrawlers(dataOrdenada), paginaActual);
  }

  filtrarRarity(data, selectRarity.value);
};

/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                            MODOS DE JUEGO
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

botonModoJuego.onclick = () => {
  mostrarSeccion(arraySecciones, seccionModos);
  formularioBusqueda.style.display = "none";
  traerModos();
};

const traerModos = () => {
  fetch(`https://api.brawlapi.com/v1/gamemodes`)
    .then((res) => res.json())
    .then((data) => {
      mostrarModos(data);
      buscarModo();
    });
};

const mostrarModos = (data) => {
  const dataFiltrada = data.list.filter((modo) => {
    return modo.name != "Training";
  });
  // Filtro este modo del array porque me rompía el codigo y no entraba para acceder a la información.

  const html = dataFiltrada.reduce((acc, curr) => {
    return (
      acc +
      `<div class="modo" data-id=${curr.id}>
    <p class="nombre-modo" style="color:${curr.color};">${curr.name}"</p>
    <img src="${curr.imageUrl2}" alt="" />
  </div>`
    );
  }, "");

  contenedorModos.innerHTML = html;
};

const buscarModo = () => {
  const modos = document.querySelectorAll(".modo");

  for (let i = 0; i < modos.length - 1; i++) {
    modos[i].onclick = () => {
      let id = modos[i].dataset.id;
      Number(id);
      fetch(`https://api.brawlapi.com/v1/gamemodes/${id}`)
        .then((res) => res.json())
        .then((data) => {
          mostrarDescripcionModo(data);
        });
    };
  }
};

const mostrarDescripcionModo = (data) => {
  mostrarSeccion(arraySecciones, seccionDescripcionModo);
  tituloDescripcionModo.textContent = data.title;
  descripcionModo.textContent = data.description;
  tutorialModo.textContent = data.tutorial;
  iconoModo.src = data.imageUrl;
  nombreModo.textContent = data.name;
  contenedorNombreModo.style.backgroundColor = data.color;
  traerMapas(data);
};

/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                            MAPAS
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

const traerMapas = (dataModo) => {
  fetch(`https://api.brawlapi.com/v1/maps`)
    .then((res) => res.json())
    .then((data) => {
      mostrarMapas(data, dataModo);
    });
};

const mostrarMapas = (mapas, modo) => {
  // excelente
  const mapasDisabledTrue = mapas.list.filter((mapa) => {
    return modo.id === mapa.gameMode.id && mapa.disabled === true;
  });

  const mapasDisabledFalse = mapas.list.filter((mapa) => {
    return modo.id === mapa.gameMode.id && mapa.disabled === false;
  });

  if (mapasDisabledFalse.length > 0) {
    const htmlMapas = mapasDisabledFalse.reduce((acc, curr) => {
      // en un reduce retornás el nuevo valor de la acc, acá estas retornando 
      // la asignacion de un nuevo valor. Sacá el acc = 
      return (acc =
        acc +
        ` <div class="mapa">
        <p>${curr.name}</p>
        <div class="img-mapa">
          <img src="${curr.imageUrl}"/>
        </div>
      </div>`);
    }, "");
    contenedorMapas.innerHTML = htmlMapas;
  } else {
    contenedorMapas.innerHTML = "";
  }
  if (mapasDisabledTrue.length > 0) {
    const htmlMapasDisabled = mapasDisabledTrue.reduce((acc, curr) => {
      return (acc =
        acc +
        ` <div class="mapa">
                  <p>${curr.name}</p>
                  <div class="img-mapa">
                    <img src="${curr.imageUrl}"/>
                  </div>
                </div>`);
    }, "");

    contenedorMapasDisabled.innerHTML = htmlMapasDisabled;
    tituloDisabled.style.backgroundColor = modo.color;
  } else {
    contenedorMapasDisabled.innerHTML = "";
  }
};
