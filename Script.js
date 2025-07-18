async function buscar() {
  const fechaInput = document.getElementById('fecha').value;
  const tablaBody = document.querySelector('#tabla-resultados tbody');
  tablaBody.innerHTML = "<tr><td colspan='3'>Cargando...</td></tr>";

  const [year, month, day] = fechaInput.split('-');
  const fecha = `${day}${month}${year}`;

  try {
    const res = await fetch(`/api/buscar?fecha=${fecha}`);
    const data = await res.json();
    const resultados = data.Listado?.slice(0, 5) || [];

    tablaBody.innerHTML = "";
    resultados.forEach(item => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.NombreOC}</td>
        <td>${item.NombreProveedor}</td>
        <td>$${item.MontoTotal}</td>
      `;
      tablaBody.appendChild(row);
    });

    if (resultados.length === 0) {
      tablaBody.innerHTML = "<tr><td colspan='3'>No hay resultados</td></tr>";
    }
  } catch (e) {
    tablaBody.innerHTML = "<tr><td colspan='3'>Error al conectar con la API</td></tr>";
  }
}