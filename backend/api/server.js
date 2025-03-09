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
        const user = await prisma.user.findFirst({
            where: {
                OR: [{email: email}, {username: email}],
            },
        })
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

app.get("/:userId/data", async (req, res) => {
    const token = req.headers.authorization?.replace("Bearer ", "")
    if (!token) return res.status(401).json({error: "Token ausente!"})
    const {userId} = req.params
    await prisma.$connect()
    try {
        const categoryCount = {}
        const categorySum = {}
        const expenses = await prisma.transactionItem.findMany({where: {AND: {type: "expense", userId}}})
        const profits = await prisma.transactionItem.findMany({where: {AND: {type: "profit", userId}}})

        const sumExpenses = expenses.map(({amount}) => amount).reduce((acc, crr) => acc + crr, 0)
        const sumProfits = profits.map(({amount}) => amount).reduce((acc, crr) => acc + crr, 0)

        expenses.forEach(({category, amount}) => {
            categoryCount[category] = (categoryCount[category] || 0) + 1
            categorySum[category] = (categorySum[category] || 0) + amount
        })

        const mostFrequentCategory = Object.entries(categoryCount).reduce((max, current) => (current[1] > max[1] ? current : max), ["", 0])

        const highestSpendingCategory = Object.entries(categorySum).reduce((max, current) => (current[1] > max[1] ? current : max), ["", 0])

        res.status(201).json({
            balance: sumProfits - sumExpenses,
            mostFrequentCategory: {
                category: mostFrequentCategory[0],
                amount: mostFrequentCategory[1],
            },
            highestSpendingCategory: {
                category: highestSpendingCategory[0],
                amount: highestSpendingCategory[1],
            },
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Error creating card"})
    }
})

app.post("/:userId/card", async (req, res) => {
    const token = req.headers.authorization?.replace("Bearer ", "")
    if (!token) return res.status(401).json({error: "Token ausente!"})
    const {userId} = req.params
    const {available, name, limit, color} = req.body
    await prisma.$connect()
    try {
        const newCard = await prisma.card.create({
            data: {
                available,
                limit,
                name,
                userId,
                color,
            },
        })
        res.status(201).json(newCard)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Error creating card"})
    }
})

app.get("/:userId/card", async (req, res) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ error: "Token ausente!" });

    const { userId } = req.params;
    await prisma.$connect();
    try {
        const cards = await prisma.card.findMany({ where: { userId } });

        const today = new Date();
        const formattedCards = cards.map(card => {
            const expirationDate = new Date(card.expirationDate);
            const isPaymentDay = 
                today.getDate() === expirationDate.getDate() &&
                today.getMonth() === expirationDate.getMonth() &&
                today.getFullYear() === expirationDate.getFullYear();

            return {
                ...card,
                isPaymentDay,
            };
        });

        res.status(200).json({ cards: formattedCards });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error getting card" });
    }
});


app.put("/:userId/card/:cardId", async (req, res) => {
    const token = req.headers.authorization?.replace("Bearer ", "")
    if (!token) return res.status(401).json({error: "Token ausente!"})

    const {cardId} = req.params
    const {available, name, limit, color} = req.body

    await prisma.$connect()
    try {
        const updateData = {}
        if (available !== undefined) updateData.available = available
        if (name !== undefined) updateData.name = name
        if (limit !== undefined) updateData.limit = limit
        if (color !== undefined) updateData.color = color

        if (!Object.keys(updateData).length) {
            return res.status(400).json({error: "Nenhum dado para atualizar foi fornecido."})
        }

        const updatedCard = await prisma.card.update({
            where: {id: cardId},
            data: updateData,
        })

        return res.status(200).json(updatedCard)
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: "Erro ao atualizar o card"})
    }
})

app.post("/:userId/transactions", async (req, res) => {
    const token = req.headers.authorization?.replace("Bearer ", "")
    if (!token) return res.status(401).json({error: "Token ausente!"})
    const {userId} = req.params
    const {name, amount, type, transactionDate, category} = req.body
    await prisma.$connect()
    try {
        const newTransaction = await prisma.transactionItem.create({
            data: {
                name,
                amount,
                userId,
                type,
                category: category ?? "",
                transactionDate,
            },
        })

        if (type !== "expense" && type !== "profit") {
            const card = await prisma.card.findMany({where: {name: type}})

            await prisma.card.update({
                where: {
                    id: card[0].id,
                },
                data: {
                    available: amount + card[0].available,
                },
            })
        }
        res.status(201).json(newTransaction)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Error creating transaction"})
    }
})

app.get("/:userId/transactions/:type?", async (req, res) => {
    const token = req.headers.authorization?.replace("Bearer ", "")
    if (!token) return res.status(401).json({error: "Token ausente!"})
    const {userId, type} = req.params
    await prisma.$connect()
    const transaction =
        (await prisma.transactionItem.findMany({
            where: {
                userId,
                type,
            },
        })) ?? []
    res.status(201).json(transaction)
})

app.delete("/transactions/:id", async (req, res) => {
    const token = req.headers.authorization?.replace("Bearer ", "")
    if (!token) return res.status(401).json({error: "Token ausente!"})
    const {id} = req.params
    await prisma.$connect()
    try {
        const transaction = await prisma.transactionItem.findUnique({where: {id}})
        if (transaction) {
            const deletedTransaction = await prisma.transactionItem.delete({where: {id}})
            res.status(201).json(deletedTransaction)
        } else res.status(401).json({error: "Transaction does'nt exist!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Error deleting transaction"})
    }
})
app.put("/transactions/:id", async (req, res) => {
    const token = req.headers.authorization?.replace("Bearer ", "")
    if (!token) return res.status(401).json({error: "Token ausente!"})
    const {id} = req.params
    const {amount} = req.body
    await prisma.$connect()
    try {
        const transaction = await prisma.transactionItem.findUnique({where: {id}})
        if (transaction) {
            const updateTransaction = await prisma.transactionItem.update({
                where: {id},
                data: {amount},
            })
            res.status(201).json(updateTransaction)
        } else res.status(401).json({error: "Transaction does'nt exist!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Error updating transaction"})
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
