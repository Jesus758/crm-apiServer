import { mostrarAlerta, validar } from './funciones.js';
import { obtenerCliente, editarCliente } from './API.js';



(function() {

    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const empresaInput = document.querySelector('#empresa');
    const telefonoInput = document.querySelector('#telefono');
    const idInput = document.querySelector('#id');

    document.addEventListener('DOMContentLoaded',  async () => {

        //Idntificando el id del cliente a editar
            const parametrosURL = new URLSearchParams(window.location.search);
            const idCliente = parseInt( parametrosURL.get('id'));
            console.log(idCliente);

        //Obteniendo el cliente que se va a hacer ça edición
            const cliente = await obtenerCliente(idCliente);
            console.log(cliente);

        // Mostrar el cliente en el formulario
            mostrarCliente(cliente);

        //Subir la información del formulario a la API/BD
            const formulario = document.querySelector('#formulario');
            formulario.addEventListener('submit', validarCliente);
    });

    function mostrarCliente(cliente) {
       const { nombre, empresa, email, telefono, id } = cliente;

       nombreInput.value = nombre;
       empresaInput.value = empresa;
       emailInput.value = email;
       telefonoInput.value = telefono;
       idInput.value = id;

    }

    function validarCliente(e) {
        e.preventDefault();

           const cliente = {
            nombre: nombreInput.value,
            email: emailInput.value,
            telefono: telefonoInput.value,
            empresa: empresaInput.value,
            id: parseInt(idInput.value)
        }

        console.log(cliente);

        if( !validar(cliente) ) {
            // Mostrar mensaje
            mostrarAlerta('Todos los campos son obligatorios');
            return;
        }

        //Reescribe el objeto en la BD
        editarCliente(cliente);
    }
})();