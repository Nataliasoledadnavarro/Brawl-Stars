//Sección Principal
const contenedorBrawlers = document.querySelector(
  ".contenedor-tarjetas-brawlers"
);

// Paginado
const botonPrimeraPagina = document.getElementById("boton-primera-pagina");
const botonPaginaAnterior = document.getElementById("boton-pagina-anterior");
const botonProximaPagina = document.getElementById("boton-proxima-pagina");
const botonUltimaPagina = document.getElementById("boton-ultima-pagina");

const traerBrawlers = () => {
  fetch(`https://api.brawlapi.com/v1/brawlers`)
    .then((res) => res.json())
    .then((data) => {
      tarjetasBrawlersHtml(data, paginaActual);
    });
};

traerBrawlers();

let paginaActual = 0;

const tarjetasBrawlersHtml = (data, pagina) => {
  const arrayPaginado = data.list.slice(pagina, pagina + 10);

  if (arrayPaginado.length === 0) {
    alert("no hay mas brawlers");
    paginaActual = 0;
    traerBrawlers()
  }
  const html = arrayPaginado.reduce((acc, curr) => {
    return (
      acc +
      `<article class="tarjeta-brawler" data.id=${curr.id}>
<img src="${curr.imageUrl}" alt="Imagen del brawler ${curr.name}">
<h3>${curr.name}</h3>
</article>`
    );
  }, "");

  contenedorBrawlers.innerHTML = html;
};

botonPrimeraPagina.onclick = () => {
  paginaActual = 0;
  traerBrawlers();
};

botonPaginaAnterior.onclick = () => {
  if (paginaActual = 0){
    prev.disabled = true
  }
  if (paginaActual = 50){
    prev.disabled = true
  }

  paginaActual = paginaActual - 10;
  traerBrawlers();
};

botonProximaPagina.onclick = () => {
  paginaActual = paginaActual + 10;
  traerBrawlers();
};

botonUltimaPagina.onclick = () => {
  paginaActual = 50;
  traerBrawlers();
};
// resolver ultima pagina por si agregan mas brawlers.
