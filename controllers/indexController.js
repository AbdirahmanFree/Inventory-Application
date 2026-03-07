const db = require("../db/queries.js")
const { body, validationResult, matchedData } = require("express-validator")
const colorErr = 'not a valid color'
const bodyErr = 'not a valid body type'
const validateCar = [
    body('make').trim().matches(/^[a-zA-Z0-9\s]+$/),
    body('model').trim().matches(/^[a-zA-Z0-9\s]+$/),
    body('year').isInt({min: 1900, max: 2027}).toInt().withMessage('not a valid year'),
    body('kilometres').isInt({min: 0, max:400000}).toInt().withMessage('not a valid value'),
    body('transmission'),
    body('drivetrain'),
    body('body').trim().toLowerCase().isIn(['sedan','suv,','coupe', 'convertible', 'minivan','motercycle', 'hatchback', 'wagon','pickup','van']).withMessage(bodyErr),
    body('extcolor').trim().toLowerCase().isIn(['red','blue','yellow','green','white','black','grey','purple','pink','orange','brown']).withMessage(colorErr),
    body('intcolor').trim().toLowerCase().isIn(['red','blue','yellow','green','white','black','grey','purple','pink','orange','brown']).withMessage(colorErr),
    body('description'),
    body('price').isInt({min: 1000}).withMessage('Price is too low').toInt()
    
]

exports.listCarsGet = (req,res) => {
    db.listAllCars().then(response => {
        res.render("home")
    })
}

exports.addCarGet = (req,res) => {
    res.render("addCar")
}

exports.addCarPost = [
    validateCar,
    (req,res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.render("addCar", {
                errors: errors
            })
        }
        else{
            try{
                 db.insertCar(matchedData(req)).then(response=> {
                    res.redirect("/");
                })
                console.log("success")
            }
            catch(error){
                res.render("addCar", {
                    errors: [error]
                })
            }
           
        }
        

    }
]
