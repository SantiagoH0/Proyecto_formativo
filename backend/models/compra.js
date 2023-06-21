const {Schema, model} = require('mongoose')

const CompraSchema = Schema({
    numeroCompra: {
        type: Number,
        unique: true,
        required: [true, 'El número de la compra es obligatorio'],
        minlength: [3, 'Debe digitar como mínimo 3 números']
    },

    fecha: {
        type: Date,
        default: Date.now
    },

    producto: {
        type: String,
        required: [true, 'El producto es obligatorio']
    },

    proveedor: {
        type: String,
        required: [true, 'El proveedor es obliagtorio']
    },

    cantidad: {
        type: Number,
        min: [1, 'El valor mínimo aceptado es 1'],
        required: [true, 'La cantidad debe ser obligatoria']
    },

    precio: {
        type: Number,
        min: [1],
        required: [true, 'El precio debe ser obligatorio']
    },

    iva: {
        type: Number,
    },

    montoIva:{
        type: Number,
        required: true,
        default: function(){
            return this.precio * (this.iva / 100)
        }
    },

    subtotal:{
        type: Number,
        required: true,
        default: function(){
            return this.cantidad * this.precio
        }
    },

    total:{
        type: Number,
        required: true,
        default: function(){
            return this.subtotal + this.montoIva
        }
    }
})

module.exports = model('Compra', CompraSchema)