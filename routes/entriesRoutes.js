const express = require('express');
const router = express.Router();

const {cogerEntries, crearEntries, actualizarEntries, borrarUna} = require("../controllers/entrieController")


router.get("/",cogerEntries)


router.post("/",crearEntries)



router.put("/update/:id_entry",actualizarEntries)


router.delete("/:id_entry", borrarUna)

module.exports = router