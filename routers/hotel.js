const {typeByCity, typeByCount, createHotel, updateHotel, deleteHotel, getSignleHotel, getAllHotel} = require("../controllers/hotel.js")
const express = require("express");
const {verifyAdmin} = require('../middleware/verify.js');

const router = express.Router()

router.get('/typeByCity', typeByCity)
router.get('/typeByCount', typeByCount)
router.post('/createHotel', verifyAdmin, createHotel)
router.put('/updateHotel/:id', verifyAdmin, updateHotel)
router.delete('/deleteHotel/:id', verifyAdmin, deleteHotel)
router.get('/getSingleHotel/:id', getSignleHotel)
router.get('/getAllHotel', getAllHotel)

module.exports = router