const { check } = require('express-validator') //TODO <---
const { validateResult } = require('../helpers/validateHelpers')

const validateCreate = [ //TODO:name, age, email
    check('nombre')
        .exists()
        .not()
        .isEmpty(),
    check('apellido')
    .exists()
    .not()
    .isEmpty(),
    ,
    check('tipo_doc')
    .exists()
    .not()
    .isEmpty(),
   
    check('numero_doc')
    .exists()
    .not()
    .isNumeric()
    .isEmpty(),

    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateCreate }