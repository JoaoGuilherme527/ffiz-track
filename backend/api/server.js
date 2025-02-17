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

        const token = jwt.sign({userId: newUser.id}, SECRET_KEY, {expiresIn: "1h"})

        res.status(201).json({...newUser, token})
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
    const token = req.headers.authorization?.replace("Bearer ", "")
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

app.post("/:userId/expenses", async (req, res) => {
    const token = req.headers.authorization?.replace("Bearer ", "")
    if (!token) return res.status(401).json({error: "Token ausente!"})
    const {userId} = req.params
    const {name, amount, type} = req.body
    await prisma.$connect()
    try {
        const newExpense = await prisma.expenseItem.create({
            data: {
                name,
                amount,
                userId,
                type
            },
        })
        res.status(201).json(newExpense)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Error creating expense"})
    }
})

app.get("/:userId/expenses", async (req, res) => {
    const token = req.headers.authorization?.replace("Bearer ", "")
    if (!token) return res.status(401).json({error: "Token ausente!"})
    const {userId} = req.params
    await prisma.$connect()
    const expenses = (await prisma.expenseItem.findMany({where: {userId}})) ?? []
    res.json(expenses)
})

app.delete("/expenses/:id", async (req, res) => {
    const token = req.headers.authorization?.replace("Bearer ", "")
    if (!token) return res.status(401).json({error: "Token ausente!"})
    const {id} = req.params
    await prisma.$connect()
    try {
        const expense = await prisma.expenseItem.findUnique({where: {id}})
        if (expense) {
            const deletedExpense = await prisma.expenseItem.delete({where: {id}})
            res.status(201).json(deletedExpense)
        } else res.status(401).json({error: "Expense does'nt exist!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Error deleting expense"})
    }
})

app.get("/api/users", async (req, res) => {
    await prisma.$connect()
    const users = (await prisma.user.findMany()) ?? []
    const usersFiltered = users.map((user) => {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
        }
    })
    res.json(usersFiltered)
})

app.listen(
    {
        host: "0.0.0.0",
        port: process.env.PORT ? Number(process.env.PORT) : 3333,
    },
    () => {
        console.log("HTTP Server running")
    }
)
