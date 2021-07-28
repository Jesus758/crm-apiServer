const url = 'http://localhost:4000/clientes';


//Cuando se crea un nuevo cliente

export const nuevoCliente = async cliente => {
    
    try {
            await fetch(url, {
                method: 'POST',
                body: JSON.stringify( cliente ),
                headers: {
                    'content-Type': 'application/json'
                }

            });
            window.location.href = 'index.html';
    } catch (error) {
        console.log(error);
    }
}

// Obtiene todos los clientes y se listan
export const obtenerClientes = async () => {

    try {
            const resultado = await fetch(url);
            const clientes = await resultado.json();
            return clientes;

    } catch (error) {
            
        console.log(error);
    }
}


// Eliminar los registros de la lista de clientes
export const eliminarRegistro = async id => {
    try {
        await fetch(`${url}/${id}`, {
            method: 'DELETE'
        })
    } catch (error) {
        console.log(error);
    }

}

//Obtener un cliente por su ID
export const obtenerCliente = async id => {

    try{
        const resultado = await fetch(`${url}/${id}`);
        const cliente = await resultado.json();
        return cliente;

    } catch (error) {
        console.log(error);
    }
}

// cuando se reinserta un cliente luego de la modificación de algun dato.
export const editarCliente = async cliente => {
    console.log(cliente);

    try {
        await fetch(`${url}/${cliente.id}`, {
            method: 'PUT',
            body: JSON.stringify(cliente),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        window.location.href = 'index.html';
        
    } catch (error) {
        console.log(error);
    }
}
 