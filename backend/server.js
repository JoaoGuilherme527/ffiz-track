const dotenv = require("dotenv")
const express = require("express")
const cors = require("cors")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { prisma } = require("./prisma")

dotenv.config();

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
      console.log(error);
        res.status(500).json({error: "Error creating user"})
    }
})

app.post("/login", async (req, res) => {
    const {email, password} = req.body
    await prisma.$connect()

    const user = await prisma.user.findUnique({where: {email}})
    if (!user) return res.status(400).json({error: "Usuário não encontrado!"})

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) return res.status(400).json({error: "Senha inválida!"})

    const token = jwt.sign({userId: user.id}, SECRET_KEY, {expiresIn: "1h"})
    res.json({token})
})

app.get("/profile", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) return res.status(401).json({error: "Token ausente!"})

    try {
        const decoded = jwt.verify(token, SECRET_KEY)
        const user = await prisma.user.findUnique({where: {id: decoded.userId}})
        res.json(user)
    } catch {
        res.status(401).json({error: "Token inválido!"})
    }
})

app.get("/", async (req, res) => {
    res.json({
        hello: "World!",
    })
})

app.listen(3000, () => console.log("Servidor rodando na porta 3000"))
