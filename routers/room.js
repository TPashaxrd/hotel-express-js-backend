const {getAllRoom, getDetailRoom, deleteRoom, updateRoom, createRoom} = require("../controllers/room.js")
const express = require("express")
const router = express.Router();
const {verifyAdmin} = require('../middleware/verify.js');

router.get('/getAllRoom', getAllRoom),
router.get('/getDetailsRoom/:id', getDetailRoom),
router.put('/updateRoom/:id', verifyAdmin, updateRoom),
router.post('/createRoom/:id/:hotelid', verifyAdmin, createRoom),
router.post('/deleteRoom/:id/:hotelid', verifyAdmin, deleteRoom),

module.exports = router