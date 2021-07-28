(function() {


            let DB;
            let idCliente;

            const nombreInput = document.querySelector('#nombre');
            const emailInput = document.querySelector('#email');
            const telefonoInput = document.querySelector('#telefono');
            const empresaInput = document.querySelector('#empresa');

            const formulario = document.querySelector('#formulario');
            
    document.addEventListener('DOMContentLoaded', () => {

        conectarDB();

        // Actualiza el registro
        formulario.addEventListener('submit', actualizarCliente);

        //Verificar la ID de la URL
        const parametrosURL = new URLSearchParams(window.location.search);
        idCliente = parametrosURL.get('id');

        if(idCliente) {

            setTimeout( () => {
                obtenerCliente(idCliente);
            }, 3000);
            
        }

    });

    function obtenerCliente(id) {
        console.log(id);

        const transaction =  DB.transaction(['crm'], 'readwrite');
        const objectStore =  transaction.objectStore('crm');

        const cliente = objectStore.openCursor();
            cliente.onsuccess = function(e) {
                const cursor = e.target.result;
                if(cursor) {
                    console.log(cursor.value);
                    if(cursor.value.id === Number(id)) {
                        llenarFormulario(cursor.value);
                    }
                    cursor.continue();
                    }
            }
    }

    function conectarDB() {
        const abrirConexion = window.indexedDB.open('crm',1);
        //este paso siempre es obligatorio, porque es la llamada de la función

        abrirConexion.onerror = function() {
            console.log('Hubo un error');
        };

        abrirConexion.onsuccess = function() {
            DB = abrirConexion.result;
    }
    }

    function llenarFormulario(datosCliente) {
            const { nombre, email, telefono, empresa } = datosCliente;

            nombreInput.value = nombre;
            emailInput.value = email;
            telefonoInput.value = telefono;
            empresaInput.value = empresa;

    }

    function actualizarCliente(e) {
        e.preventDefault();

        if(nombreInput === '' || emailInput === '' || telefonoInput === '' || empresaInput ==='') {
            imprimirAlerta('Todos los campos son obligatorios');

            return;
        }

        // Actualizar cliente

        const clienteActualizado = {
            nombre : nombreInput.value,
            email : emailInput.value,
            empresa: empresaInput.value,
            telefono: telefonoInput.value,
            id: Number(idCliente)
        }

        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');

        objectStore.put(clienteActualizado);

        transaction.oncomplete = function() {
            imprimirAlerta('Editado correctamente');

            setTimeout(()=> {
                window.location.href='index.html'
            }, 3000);
        }

        transaction.onerror = function() {
            imprimirAlerta('Hubo un error', 'error');
            
        }

        console.log(clienteActualizado);
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

            formulario.appendChild(divMensaje);

            setTimeout( () => {
                divMensaje.remove();}, 3000);

    }};
})();