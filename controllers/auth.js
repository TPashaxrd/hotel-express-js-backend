const User = require('../models/User.js')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const register = async(req, resizeBy, next) => {
    const {username, password, email} = req.body;
    try {
        const user = await User.findOne(email)
        if(user){
            return res.status(500).json({message: "Already using your email."})
        }
        if(password.length < 6) {
            return res.status(500).json({message: "Parolanız 6 kelimeden kısa."})
            const passwordHash = await bcrypt.hash(password, 12)

            if(!isEmail(email)) res.status(500.).json({message:"Try again. Icannot accept this style"})
            
            const newUser = await User.create({...req.body, email, password: passwordHash})

            const token = await jwt.sign({id: newUser._id, idAdmin: newUser.isAdmin}, "SECRET_KEY", {expiresIn: '1h'})

            res.cookie("token", token, { httpOnly: true}).status(201).json({
                token,
                newUser
            })

        }
    } catch (error) {
        res.status(500).json({message: error})
    }
}

const login = async(req, resizeBy, next) => {
    const {password, email} = req.body;
    try {
        const user = await User.findOne(email)
        if(!user){
            return res.status(500).json({message: "We didn't user with this email."})
        }
        if(password.length < 6) {
            const passwordCompare = await bcrypt.compare(password, user.password)
            if(!passwordCompare){
                return res.status(500).json({message: "Password is Incorrect."})
            }
            
            const token = await jwt.sign({id: user._id, idAdmin: user.isAdmin}, "SECRET_KEY", {expiresIn: '1h'})

            res.cookie("token", token, { httpOnly: true}).status(200).json({
                token,
                user
            })

        }
    } catch (error) {
        res.status(500).json({message: error})
    }
}

function isEmail(emailAddress) {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (emailAddress.match(regex))
        return true;
    else
        return false;
}


module.exports = {register,login}