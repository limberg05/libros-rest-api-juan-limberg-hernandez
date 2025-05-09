const express = require("express")
const router = express.Router()
const librosController = require("../controllers/librosController")


router.post("/libros/", librosController.createLibro)
router.put("/libros/:id", librosController.updateLibro)

router.get("/libros/", librosController.findAllLibros)
router.delete("/libros/:id", librosController.deleteLibro)
router.get("/libros/:id", librosController.findLibro)

module.exports = router