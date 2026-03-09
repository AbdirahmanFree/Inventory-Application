const pool = require("./pool")

async function listAllCars(){
    try{
        const {rows} = await pool.query(`SELECT * FROM car`)
         return rows
    }
    catch(error){
        console.log(error)
        return null
    }
   
}

async function insertCar(car) {
    pool.query(`INSERT INTO car(make,model,year,kilometres,transmission,drivetrain,body,extcolor,intcolor,description,price,img)
                VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,[car.make,car.model,car.year,car.kilometres,car.transmission,car.drivetrain,car.body,car.extcolor,car.intcolor,car.description,car.price, car.img])  
}

module.exports = {
    listAllCars,
    insertCar
}