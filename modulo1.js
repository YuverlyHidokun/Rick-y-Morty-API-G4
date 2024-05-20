// modulo1.js

import { consultarPersonaje } from './modulo2.js';

export const crearImagenDesdeLocalStorage = () => {
    const storedData = localStorage.getItem('character');
    
    if (!storedData) {
        console.error("No hay datos guardados en localStorage.");
        return;
    }

    let parsedData;
    try {
        parsedData = JSON.parse(storedData);
    } catch (error) {
        console.error("Error al parsear los datos de localStorage.", error);
        return;
    }

    if (!parsedData.id) {
        console.error("Datos inválidos en localStorage.");
        return;
    }

    const personajeId = parsedData.id;
    consultarPersonaje(personajeId);
};

export const btnEnviar = () => {
    const personajeId = Math.floor(Math.random() * 120) + 1;
    consultarPersonaje(personajeId);
};

export const listaImg = document.getElementById("ListaImg");

export const pintarPersonaje = (data) => {
    if (!data || !data.image || !data.name) {
        console.error("Datos del personaje inválidos.");
        return;
    }

    const imgElement = document.createElement('img');
    imgElement.src = data.image;
    imgElement.alt = data.name;

    const pElement = document.createElement('p');
    pElement.textContent = '¿Quién soy?';
    pElement.style.color = 'white';
    pElement.style.fontSize = '35px';

    listaImg.innerHTML = '';
    listaImg.appendChild(imgElement);
    listaImg.appendChild(pElement);
};

export const btnConsultar = () => {
    const storedData = localStorage.getItem('character');

    if (!storedData) {
        console.error("No hay datos guardados en localStorage.");
        return;
    }

    let parsedData;
    try {
        parsedData = JSON.parse(storedData);
    } catch (error) {
        console.error("Error al parsear los datos de localStorage.", error);
        return;
    }

    const nombreGuardado = parsedData.nombre;
    const boton = document.getElementById('adivina');
    const personaje = boton.value.trim();
    
    if (!personaje) {
        Swal.fire({
            icon: "warning",
            title: "Campo vacío",
            text: "Por favor, ingresa un nombre de personaje."
        });
        return;
    }

    if (personaje === nombreGuardado) {
        Swal.fire({
            icon: "success",
            title: "Correcto",
            text: 'El personaje es: ' + nombreGuardado + '!!!'
        });
        localStorage.removeItem('character');
        btnEnviar();
    } else {
        Swal.fire({
            icon: "error",
            title: "Nombre incorrecto",
            text: 'El nombre correcto es: ' + nombreGuardado
        });
    }
};
