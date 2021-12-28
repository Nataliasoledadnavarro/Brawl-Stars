// Nav
const nav = document.querySelector("nav")
const botonNavBrawlers = document.getElementById("boton-nav-brawlers");
//Header
const header = document.querySelector("header")

//Sección Principal
const seccionPrincipal = document.querySelector(".seccion-principal-brawlers");
const contenedorBrawlers = document.querySelector(
  ".contenedor-tarjetas-brawlers"
);

// Paginado
const botonPrimeraPagina = document.getElementById("boton-primera-pagina");
const botonPaginaAnterior = document.getElementById("boton-pagina-anterior");
const botonProximaPagina = document.getElementById("boton-proxima-pagina");
const botonUltimaPagina = document.getElementById("boton-ultima-pagina");

// Busqueda
const inputBusqueda = document.getElementById("input-busqueda");
const botonBuscar = document.getElementById("boton-buscar");
const seccionBusqueda = document.getElementById("seccion-busqueda");
const formularioBusqueda = document.getElementById("formulario-busqueda");

//Modal
const contenedorModalBusqueda = document.getElementById("contenedor-modal")
const botonCerrarModal = document.getElementById("cerrar-modal")

// Sección descripción.
const seccionDescripcion = document.getElementById("seccion-descripcion")


/*///////////////////////////////////////////////////////////////////////////////////////////////////////
                                           MAQUETADO
///////////////////////////////////////////////////////////////////////////////////////////////////////*/
const arraySecciones = [
  seccionPrincipal,
  seccionBusqueda,
  seccionDescripcion,
];

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
botonNavBrawlers.onclick = (e) =>{
  e.preventDefault()
  header.style.display = "block";
  nav.style.display = "flex";
  formularioBusqueda.style.display = "flex"
  mostrarSeccion(arraySecciones,seccionPrincipal)
}


/*////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                  FETCH PRINCIPAL
/////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
const mostrarBrawlers = () => {
  fetch(`https://api.brawlapi.com/v1/brawlers`)
    .then((res) => res.json())
    .then((data) => {
      tarjetasBrawlersHtml(data, paginaActual);
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
  if (paginaActual === 0) {
    prev.disabled = true;
  }

  paginaActual = paginaActual - 10;
  mostrarBrawlers();
};

botonProximaPagina.onclick = () => {
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
        mostrarSeccion(arraySecciones,seccionBusqueda)
        seccionBusqueda.innerHTML = mostrarRestultado;
        inputBusqueda.value = ""
        traerBrawler()
      } else {
        contenedorModalBusqueda.style.display = "flex"
      }
    });
};

formularioBusqueda.onsubmit = (event) => {
  event.preventDefault();
  mostrarBusqueda();
};

botonCerrarModal.onclick = () =>{
  contenedorModalBusqueda.style.display = "none"
  mostrarSeccion(arraySecciones,seccionPrincipal)
}

/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                            SECCIÓN DESCRIPCIÓN
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/


const traerBrawler = () => {

  const tarjetas = document.querySelectorAll(".tarjeta-brawler")

  for (let i = 0; i < tarjetas.length; i++) {
    tarjetas[i].onclick = () =>{
      let id = tarjetas[i].dataset.id 
      Number(id)
      fetch(`https://api.brawlapi.com/v1/brawlers/${id}`)
      .then((res) => res.json())
      .then((data) => {
        mostrarDescripcion(data)
      });
    }
  }  
};


const mostrarDescripcion = personaje => {
header.style.display = "none"
formularioBusqueda.style.display = "none"
mostrarSeccion(arraySecciones,seccionDescripcion)
}

