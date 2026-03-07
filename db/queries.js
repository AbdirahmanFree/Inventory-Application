const pool = require("./pool")

async function listAllCars(){
    const {rows} = await pool.query(`SELECT * FROM car`)
    return rows
}

function insertCar(car) {
    console.log(car)
    
}

module.exports = {
    listAllCars,
    insertCar
}