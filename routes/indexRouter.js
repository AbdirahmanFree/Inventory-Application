const { Router } = require("express")
const router = Router()
const controller = require("../controllers/indexController.js")

router.get("/",controller.listCarsGet)
router.get("/new",controller.addCarGet)
router.post("/new",controller.addCarPost)
router.post("/filter",controller.filterCarPost)
router.get("/car/:id",controller.viewCarGet)

module.exports = router