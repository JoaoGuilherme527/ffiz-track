const dotenv = require("dotenv")
const express = require("express")
const cors = require("cors")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {prisma} = require("../prisma/prisma")

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

const SECRET_KEY = process.env.SECRET_KEY

app.post("/register", async (req, res) => {
    const {username, email, password} = req.body
    await prisma.$connect()
    if (!username || !email || !password) {
        return res.status(400).json({error: "Missing fields"})
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        })

        res.status(201).json(newUser)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Error creating user"})
    }
})

app.post("/login", async (req, res) => {
    const {email, password} = req.body
    await prisma.$connect()

    try {
        const user = await prisma.user.findUnique({where: {email}})
        if (!user) return res.status(400).json({error: "Usuário não encontrado!"})

        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) return res.status(400).json({error: "Senha inválida!"})

        const token = jwt.sign({userId: user.id}, SECRET_KEY, {expiresIn: "1h"})
        res.json({token})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Erro ao fazer login!"})
    }
})

app.get("/profile", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) return res.status(401).json({error: "Token ausente!"})
    await prisma.$connect()
    try {
        const decoded = jwt.verify(token, SECRET_KEY)
        const user = await prisma.user.findUnique({where: {id: decoded.userId}})
        res.json(user)
    } catch {
        res.status(401).json({error: "Token inválido!"})
    }
})

app.get("/api", async (req, res) => {
    res.json({
        hello: "World!",
    })
})

app.get("/api/users", async (req, res) => {
    await prisma.$connect()
    const users = await prisma.user.findMany() ?? []
    const usersFiltered = users.map((user) => {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
        }
    })
    res.json(usersFiltered)
})

app.listen({
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3333
}, () => {
    console.log("HTTP Server running")
})
