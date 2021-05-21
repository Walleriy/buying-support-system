const { Router } = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Minimal password length 6 symbols')
            .isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            console.log('Body: ', req.body)
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Невірні дані для входу'
                })
            }

            const {email, password} = req.body

            const candidate = await User.findOne({email: email})

            if (candidate) {
                return res.status(400).json({message: `Користувач з поштою ${email} вже існує`})
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({
                email: email,
                password: hashedPassword
            })

            await user.save()

            res.status(201).json({message: 'Користувач успішно створений'})

        } catch (e) {
            res.status(500).json({message: 'Щось пішло не так, спробуйте пізніше'})
        }
    }
)

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Введіть правильну пошту').normalizeEmail().isEmail(),
        check('password', 'Введіть пароль').exists()
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Неправильні дані для входу'
                })
            }

            const { email, password } = req.body

            const user = await User.findOne({ email })

            if(!user) {
                return res.status(400).json({ message: 'Користувач не знайдений'})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(500).json({ message: 'Неправильний пароль'})
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            res.json({ token, userId: user.id })

        } catch (e) {
            res.status(500).json({message: 'Щось пішло не так, спробуйте пізніше'})
        }
    }
)

module.exports = router
