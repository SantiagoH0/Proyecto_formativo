const {response} = require('express')
const Compra = require('../models/compra')

const getCompra = async(req, res = response) => { //Consulta
    let mensaje = ''

    try{ //Consulta en la colección
        const compras = await Compra.find()
        mensaje = compras

    }catch(error){
        mensaje = error
    }

    res.json({
        compras: mensaje
    })
}

const postCompra = async (req, res = response) => {
    const body = req.body;
    let mensaje = '';

    const compra = new Compra(body);
    console.log(body);
    try {
        await compra.save();
        mensaje = 'Compra registrada exitosamente';
        
    } catch (error) {
        mensaje = error
    }

    res.json({
        mensaje
    })
};

const putCompra = async(req, res = response) =>{
    const body = req.body

    console.log(body)

    let mensaje = ''

    try{
        await Compra.updateMany({_id:body._id}, {numeroCompra:body.numeroCompra, fecha:body.fecha, producto:body.producto, proveedor:body.proveedor, cantidad:body.cantidad, precio:body.precio, iva:body.iva })
            
        mensaje = 'Compra modificada exitosamente'

    }catch(error){
        mensaje = error
    }

    res.json({
        mensaje:mensaje
    })
}

const deleteCompra = async(req, res = response) => {
    const body = req.body
    let mensaje = ''

    try{
        await Compra.deleteOne({_id:body._id})
        mensaje = 'Eliminado exitosamente'
    }catch(error) {
        mensaje = error
    }

    res.json({
        mensaje
    })
}

module.exports = {
    getCompra,
    postCompra,
    putCompra,
    deleteCompra
}
