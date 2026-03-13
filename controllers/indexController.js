const db = require("../db/queries.js")
const { body, validationResult, matchedData } = require("express-validator")
const colorErr = 'not a valid color'
const bodyErr = 'not a valid body type'
const validateCar = [
    body('make').trim().matches(/^[a-zA-Z0-9\s-]+$/),
    body('model').trim().matches(/^[a-zA-Z0-9\s-]+$/),
    body('year').isInt({min: 1900, max: 2027}).toInt().withMessage('not a valid year'),
    body('kilometres').isInt({min: 0, max:400000}).toInt().withMessage('not a valid value'),
    body('transmission'),
    body('drivetrain'),
    body('body').trim().toLowerCase().isIn(['sedan','suv','coupe', 'convertible', 'minivan','motercycle', 'hatchback', 'wagon','pickup','van']).withMessage(bodyErr),
    body('extcolor').trim().toLowerCase().isIn(['red','blue','yellow','green','white','black','grey','purple','pink','orange','brown']).withMessage(colorErr),
    body('intcolor').trim().toLowerCase().isIn(['red','blue','yellow','green','white','black','grey','purple','pink','orange','brown']).withMessage(colorErr),
    body('description'),
    body('price').isInt({min: 1000}).withMessage('Price is too low').toInt(),
    body('img')
    
]

const validateFilter = [
    body('make').trim(),
    body('minYear').isInt({min: 1900, max: 2027}).toInt().withMessage('not a valid year'),
    body('maxYear').isInt({min: 1900, max: 2027}).toInt().withMessage('not a valid year').custom((value, { req } )=> {
        if(req.body.minYear > req.body.maxYear){
            throw new Error('Min year should be less than max year')
        }
        return true
    }),
    body('minPrice').isInt({min: 0}).toInt().withMessage("Not a valid price"),
    body('maxPrice').isInt({min: 0}).toInt().withMessage("Not a valid price").custom((value, { req } )=> {
        if(req.body.minPrice > req.body.maxPrice){
            throw new Error('Min price should be less than max price')
        }
        return true
    })
    
    



]

exports.listCarsGet = (req,res) => {
    db.listAllCars().then(response => {
        res.render("home", {
            cars: response
        })
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
            console.log(errors.errors)
            res.render("addCar", {
                errors: errors.errors
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
                console.log(error)
            }
           
        }
        

    }
]

exports.filterCarPost = [
    validateFilter,
    (req,res) => {
        const error = validationResult(req)
        if(!error.isEmpty()){
            console.log(error)
            res.redirect("/")
        }
        else {
            db.filterCars(matchedData(req)).then(response=> {
                res.render("home", {
                    cars: response,
                    filter: matchedData(req)
                })
            })
        }
    }
]


exports.viewCarGet = (req,res) => {
    db.getCarByID(req.params.id).then((response)=> {
        res.render("car", {
            car: response[0]
        })
    })
}