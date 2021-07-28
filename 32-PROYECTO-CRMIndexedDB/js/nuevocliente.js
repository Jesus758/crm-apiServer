(function(){

    let DB;
    const Formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded', () => {

        conectarDB();
        Formulario.addEventListener('submit', validarCliente);

    });

    

    function conectarDB() {
        const abrirConexion = window.indexedDB.open('crm',1)
;
        abrirConexion.onerror = function() {
        console.log("Hubo un error");
        };

        abrirConexion.onsuccess = function() {
            DB = abrirConexion.result;

        };
    }

    function validarCliente(e) {
        e.preventDefault();

        //Leer todos los inputs
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;


        if(nombre === '' || email === '' || telefono === '' || empresa === '') {
            imprimirAlerta('Todos los campos son obligatorios', 'error');

            return;

        }

        const cliente = {
            nombre,
            email,
            telefono,
            empresa,
            id : Date.now()
        };

        console.log(cliente);

        crearNuevoCliente(cliente);
    }

    function imprimirAlerta(mensaje, tipo) {

        const alerta = document.querySelector('.alerta');

        if (!alerta) {
            //Crear Alerta

                const divMensaje = document.createElement('div');
                divMensaje.classList.add('px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center','alerta');

            if (tipo === 'error') {
                divMensaje.classList.add('bg-red-100', 'border-red-100', 'text-red-700');
                } else {
                divMensaje.classList.add('bg-green-100', 'border-green-400', 'text-green-700');
                }

            divMensaje.textContent = mensaje;

            Formulario.appendChild(divMensaje);

            setTimeout( () => {
                divMensaje.remove();}, 3000);

    }};

    function crearNuevoCliente(cliente){
        const transaction = DB.transaction(['crm'], 'readwrite');

        const objectStore = transaction.objectStore('crm');

        objectStore.add(cliente);

        transaction.onerror = function() {
            console.log('Hubo un error');
            imprimirAlerta('El cliente no se pudo agregar');
        }

        transaction.oncomplete = function() {
            console.log('Transacción completada');
            imprimirAlerta('El cliente se agregó correctamente');

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        }
    }
})()