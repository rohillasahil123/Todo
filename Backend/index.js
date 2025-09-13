const express = require("express");
const mongoose = require("mongoose");
const TodoList = require("./models/Todolist");
const user = require("./models/User_Model")
const Jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const mongoDbConnection = require("./dbconfig");
const cors = require("cors");

const app = express()

app.use(cors())
app.use(express.json())

mongoDbConnection()


app.get("/get", async (req, res) => {
    res.json("work")
})

app.post("/signup", async (req, res) => {
    try {
        const { email, password, name } = req.body
        const hashPassword = await bcrypt.hash(password, 10)
        const response = new user({
            email, password: hashPassword, name
        })

        const result = await response.save()

        if (result) {
            const payload = { id: result._id, email: result.email };
        const token = Jwt.sign(payload, "google", { expiresIn: "1h" })

            return res.status(201).send({ message: "success", data: result, token })
        } else {
            console.log(error)
        }
    } catch (error) {
        res.status(500).json({ message: "internal error", error })
    }
})


app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const User = await user.findOne({ email })
        if (!User) {
            res.status(404).send({ message: "email not found" })
        }
        if (User.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.status(200).json({ message: "success" })

    } catch (error) {
        res.status(500).json({ message: "internal error", error })
    }
})



app.post("/add/todo", async (req, res) => {
    try {
        const { title, description } = req.body
        if (!title) {
            return res.status({ message: "Title is require" })
        }
        const newTodo = new TodoList({
            title, description
        })
        const result = await newTodo.save()
        res.status(201).json({ message: "Todo added successfully", todo: result });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})

app.get("/get/todo", async (req, res) => {
    try {
        const response = await TodoList.find()
        return res.send({ data: response, message: "success" })
    } catch (error) {

        res.status(500).json({ message: "Internal server error" });
    }

})

app.put("/update-task/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { title, description } = req.body
        const updateData = await TodoList.findByIdAndUpdate(id, {
            title, description
        }, { new: true })
        if (!updateData) {
            res.status(400).json({ message: " data not found" })

        }
        res.status(200).json({ message: "success", todo: updateData })

    } catch (error) {
        res.status(500).json({ message: "internal error" })
    }

})


app.delete("/delete/multiple", async (req, res) => {
    try {
        const { ids } = req.body
        if (!ids || !Array.isArray(ids)) {
            return res.status(400).json({ message: "ids array required" });
        }
        const result = await TodoList.deleteMany({ _id: { $in: ids } })
        res.status(200).json({ message: "success", data: result })
    } catch (error) {
        res.status(500).json({ message: "internal error", error: error })
    }
})

app.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id
        const result = await TodoList.deleteOne({ _id: id })
        if (result) {
            return res.status(200).json({ message: "success" })
        }

    } catch (error) {
        return res.status(500).json(error)
    }
})

app.get("/update/todo/:id", async (req, res) => {
    try {
        const id = req.params.id
        const result = await TodoList.findOne({ _id: id })
        if (result) {
            return res.status(200).json({ message: "success", todo: result })
        }
    } catch (error) {
        return res.status(500).json(error)
    }

})


app.listen(5000)
