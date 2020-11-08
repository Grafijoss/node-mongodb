const url = "http://localhost:5001/test-api-76efe/us-central1/api/pets";

// fetch
const fetchPets = async () => {
  const response = await fetch(url);
  // transformamos la respuesta json
  // es asincrono
  const json = await response.json();
  console.log(json);

  return json;
};

// dar de baja
const darDeBaja = async (id) => {
  event.target.parentElement.parentElement.remove();
  await fetch(`${url}/${id}/daralta`);
};

// handleSubmit
const handleSubmit = async (e) => {
  e.preventDefault();
  // desctructuring
  const { name, type, description } = e.target;

  const data = {
    name: name.value,
    type: type.value,
    description: description.value,
  };

  name.value = "";
  type.value = "";
  description.value = "";

  const response = await fetch(url, {
    // tenemos que pasarle el metodo
    method: "POST",
    // debe ser un string
    body: JSON.stringify(data),
  });

  const json = await response.json();
  // tenemos que cambiar la respuesta del POST
  // para que nos retorne el _id
  // como enviamos un string
  // debemos cambiar el request a JSOn desde el servicio

  // creamos un nuevo template
  const template = tableTemplate({
    ...data,
    _id: json,
  });

  // lo añadimos al final de tab
  const tabla = document.getElementById("tab");
  tabla.insertAdjacentHTML("beforeend", template);
};

// vamos a crear una plantilla
// creamos un destructuring
const tableTemplate = ({ _id, name, type, description }) => `
	<tr>
		<td>${name}</td>
		<td>${type}</td>
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
  // declaramos una variable para el formulario
  const petForm = document.getElementById("pet-form");
  petForm.onsubmit = handleSubmit;
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
