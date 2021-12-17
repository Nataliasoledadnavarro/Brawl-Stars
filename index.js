//Sección Principal
const contenedorBrawlers = document.querySelector(
  ".contenedor-tarjetas-brawlers"
);

const traerBrawlers = () => {
  fetch(`https://api.brawlapi.com/v1/brawlers`)
    .then((res) => res.json())
    .then((data) => {
      tarjetasBrawlersHtml(data);
    });
};

traerBrawlers();

const tarjetasBrawlersHtml = (data) => {
  const html = data.list.reduce((acc, curr) => {
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
