const { timeStamp } = require('console');
const { Router } = require('express')

const router = Router()

const jwt = require('jsonwebtoken');
const User = require('../models/User');


router.get('/', (req, res) => res.send('Hellooou'))

router.post('/sign', async (req, res) => {
    const { email, password } = req.body;
    const newUser = new User({ email, password });
    await newUser.save();

    const token = jwt.sign({ _id: newUser._id }, 'secretkey')
    res.status(200).json({ token })
    // res.send("testing")
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const userEmail = await User.findOne({ email })
    if (!userEmail) return res.status(401).send("El correo no existe");
    if (userEmail.password !== password) return res.status(401).send("Contraseña erronea")

    const token = jwt.sign({ _id: userEmail._id }, 'secretkey');
    return res.status(200).json({ token })
})

router.get('/tasks', (req, res) => {
    res.json([
        {
            _id: 1,
            name: "task one",
            description: "aaaaaa",
            date: "hoy"
        }
    ])
})

module.exports = router;