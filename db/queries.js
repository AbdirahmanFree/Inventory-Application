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

async function filterCars(filter){
    console.log(filter)
    if(filter.make == 'All'){
        const {rows} = await pool.query(`SELECT * FROM car
                    WHERE year >= $1 AND year <= $2 AND price >= $3 AND price <= $4`,
                    [filter.minYear,filter.maxYear,filter.minPrice,filter.maxPrice])
                    return rows
    }
    else{
        const {rows} = await pool.query(`SELECT * FROM car
                    WHERE  make = $1 AND year >= $2 AND year <= $3 AND price >= $4 AND price <= $5`,
                    [filter.make,filter.minYear,filter.maxYear,filter.minPrice,filter.maxPrice])
                    return rows
    }
    
}

async function getCarByID(id){
    
    try{
        const {rows} = await pool.query(`SELECT * FROM car
                                    WHERE id = $1`,[id])
                                    
        return rows
    }
    catch(error){
        console.log(error)
        return null;
    }
}

module.exports = {
    listAllCars,
    insertCar,
    filterCars,
    getCarByID
}