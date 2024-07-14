class Activity {
  constructor(id, title, description, imgUrl) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imgUrl = imgUrl;
  }
}

class Repository {
  constructor() {
    this.id = 1;
    this.activities = [];
  }

  getAllActivities() {
    return this.activities;
  }

  createActivity(activity) {
    this.id += 1;
    this.activities.push(activity);
  }

  deleteActivity(id) {
    this.activities = this.activities.filter((activity) => activity.id !== id);
  }
}

const actividades = new Repository();

function tarjetas() {
  const contedor = document.getElementById("contenedorTarjetas");

  const propiedades = actividades.getAllActivities();

  const elementosHTLM = propiedades.map((activity) => {
    const { id, title, description, imgUrl } = activity;

    const tarjeta = document.createElement("div");
    tarjeta.classList.add("cardsInput");

    const titulo = document.createElement("h3");
    titulo.textContent = title;
    titulo.classList.add("poppins-regular");
    titulo.classList.add("tituloInput");

    const descripcionElement = document.createElement("p");
    descripcionElement.textContent = description;
    descripcionElement.classList.add("poppins-regular");
    descripcionElement.classList.add("descripcionInput");

    const imagenElemento = document.createElement("img");
    imagenElemento.src = imgUrl;
    imagenElemento.alt = title;
    imagenElemento.classList.add("imgInput");

    const buttonDelete = document.createElement("button");
    buttonDelete.textContent = "Eliminar actividad";
    buttonDelete.classList.add("btnDelete");

    buttonDelete.addEventListener("click", () => {
      actividades.deleteActivity(id);
      tarjetas();
    });

    tarjeta.appendChild(titulo);
    tarjeta.appendChild(descripcionElement);
    tarjeta.appendChild(imagenElemento);
    tarjeta.appendChild(buttonDelete);

    return tarjeta;
  });

  contedor.replaceChildren(...elementosHTLM);
}

const agregarActividad = () => {
  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");
  const imgUrlInput = document.getElementById("imgUrl");

  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const imgUrl = imgUrlInput.value.trim();

  if (!title || !description || !imgUrl) {
    return alert("Complete todos los campos");
  }

  const nuevaActivadad = new Activity(
    actividades.id,
    title,
    description,
    imgUrl
  );
  actividades.createActivity(nuevaActivadad);

  tarjetas();

  titleInput.value = "";
  descriptionInput.value = "";
  imgUrlInput.value = "";
};

const boton = document.getElementById("boton");
boton.addEventListener("click", agregarActividad);
