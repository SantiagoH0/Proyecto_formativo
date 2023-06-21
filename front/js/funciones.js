
const url = 'http://localhost:8088/api/compra'

const listarCompras = async () => {
    let body = document.getElementById('contenido')

    if (body) {
        let mensaje = ''

        fetch(url)
            .then(res => res.json())
            .then(function (data) {
                let listarCompras = data.compras
                listarCompras.map((compra) => {
                    mensaje +=
                        `<tr>
                   <td>${compra.numeroCompra}</td>
                   <td>${compra.fecha}</td>
                   <td>${compra.producto}</td>
                   <td>${compra.proveedor}</td>
                   <td>${compra.cantidad}</td>
                   <td>${compra.precio}</td>
                   <td>${compra.iva}</td>
                   <td>${compra.total}</td>
                   <td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(compra)})'>Editar</a>
                   <a class="btn btn-danger" href="#" onclick='eliminar("${compra._id}")'>Eliminar</a>
                   </td>
                </tr>`
                    body.innerHTML = mensaje
                })
            })
    }
}

listarCompras()

const registrarCompra = async () => {
    try {
        let numeroCompra = document.getElementById('numeroCompra').value
        let producto = document.getElementById('producto').value
        let proveedor = document.getElementById('proveedor').value
        let cantidad = document.getElementById('cantidad').value
        let precio = document.getElementById('precio').value
        let iva = document.getElementById('iva').value

        let compra = {
            numeroCompra: numeroCompra,
            producto: producto,
            proveedor: proveedor,
            cantidad: cantidad,
            precio: precio,
            iva: iva
        }

        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(compra),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })

        const json = await response.json()
        alert(json.mensaje)

        window.location.href = '/valisoft/consumirAPI/listarCompras.html'

    }catch(error){
        console.log(error)
    }
}

const editar = (compra) => {
    document.getElementById('_id').value = ''
    document.getElementById('numeroCompra').value = ''
    document.getElementById('producto').value = ''
    document.getElementById('proveedor').value = ''
    document.getElementById('cantidad').value = ''
    document.getElementById('precio').value = ''
    document.getElementById('iva').value = ''

    document.getElementById('_id').value = compra._id
    document.getElementById('numeroCompra').value = compra.numeroCompra
    document.getElementById('producto').value = compra.producto
    document.getElementById('proveedor').value = compra.proveedor
    document.getElementById('cantidad').value = compra.cantidad
    document.getElementById('precio').value = compra.precio
    document.getElementById('iva').value = compra.iva

}

const actualizarCompra = async () => {
    let numeroCompra = document.getElementById('numeroCompra').value
    let producto = document.getElementById('producto').value
    let proveedor = document.getElementById('proveedor').value
    let cantidad = document.getElementById('cantidad').value
    let precio = document.getElementById('precio').value
    let iva = document.getElementById('iva').value

    let compra = {
        _id: document.getElementById('_id').value,
        numeroCompra: numeroCompra,
        producto: producto,
        proveedor: proveedor,
        cantidad: cantidad,
        precio: precio,
        iva: iva
    }

    fetch(url, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(compra),
        headers: { "Content-type": "application/json; charset=UTF-8" }

    })

        .then(response => response.json())
        .then(json => {
            alert(json.mensaje)
        })
}

const eliminar = (_id) => {
    if (confirm('¿Está seguro de eliminar la compra?') == true) {
        let compra = {
            _id: _id
        }

        fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            body: JSON.stringify(compra),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })

            .then(response => response.json())
            .then(json => {
                alert(json.mensaje)
            })
    }

}

if (document.querySelector('#registrar')) {
    document.querySelector('#registrar')
        .addEventListener('click', registrarCompra)
}

if (document.querySelector('#actualizar')) {
    document.querySelector('#actualizar')
        .addEventListener('click', actualizarCompra)
}