const fetchPets = async () => {
  const url = "http://localhost:5001/test-api-76efe/us-central1/api/pets";
  const response = await fetch(url);
  // transformamos la respuesta json
  // es asincrono
  const json = await response.json();
  console.log(json);

  return json;
};

const darDeBaja = (id) => {
  console.log(id);
};

// vamos a crear una plantilla
// creamos un destructuring
const tableTemplate = ({ _id, name, type, description }) => `
	<tr>
		<td>${name}</td>
		<td><${type}/td>
		<td>${description}</td>
		<td>
			<button onclick="darDeBaja('${_id}')" type="button">
				Dar de baja
			</button>
		</td>
	</tr>
`;

// cuanndo llega al cierra del <html></html>
// la function se va a ejecutar
window.onload = async () => {
  const pets = await fetchPets();
  // en el cadso de hacerlo con map
  // tenemos que juntar todfos los elementos del arreglo con join
  // con el reduce vamos contatenando con el acumulador
  // el reduce recibe dos argumentos
  // primero la accion que se va a ejecutar
  // el segundo es el valor inicial del acumulador
  // pets.reduce((acc, el) => {}, '')

  // retornamos el valor del acumulador
  //  mas tableTemplate con el elemento iterado
  const template = pets.reduce((acc, el) => acc + tableTemplate(el), "");
  const tabla = document.getElementById("tab");

  tabla.innerHTML = template;
};
