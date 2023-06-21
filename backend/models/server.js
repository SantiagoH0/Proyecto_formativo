
const express = require('express')
const cors = require('cors') //Implementar seguridad
const bodyParser = require('body-parser') //Recibir de formularios html

const dbConection = require('../database/config') //Instalar el paquete dotenv

class server{

    constructor (){
        this.app = express()

        this.port = process.env.PORT 

        this.compraPath = '/api/compra' //Ruta pública de la API

        this.middlewares() //Seguridad

        this.routes()

        this.dbConectar()
    }

    middlewares(){ //Directorio público
        this.app.use(express.static(__dirname + "/public"))

        this.app.use(cors())

        this.app.use(bodyParser.json())
    } 

    routes(){
        this.app.use(this.compraPath, require('../routes/compras'))
    }

    async dbConectar(){
        await dbConection()
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Escuchando por el puerto ${this.port}`)
        })
    }
}

module.exports = server