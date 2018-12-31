const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');



let Schema = mongoose.Schema;

//roles validos
let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} No es un rol valido'
}
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'Contraseña es obligatoria'],

    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});
//No retornar password, modificacion del prototipo
usuarioSchema.method.toJSON = function() {
        let user = this;
        let userObject = user.toObject;
        delete userObject.password;
        return userObject;
    }
    //Aplicar plugin al Schema
usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe de ser unico'
});
module.exports = mongoose.model('usuario', usuarioSchema);