
const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 5000;


// Middleware
app.use(cors());
app.use(express.json());


// Test route
app.get("/", (req, res) => {

    res.json({
        message: "Calculator backend is running"
    });

});


// Calculator API
app.post("/api/calculate", (req, res) => {

    const { expression } = req.body;

    if (!expression) {

        return res.status(400).json({
            success: false,
            message: "Expression is required"
        });

    }

    try {

        // Allow only calculator characters
        if (!/^[0-9+\-*/%.() ]+$/.test(expression)) {

            return res.status(400).json({
                success: false,
                message: "Invalid expression"
            });

        }

        const result = Function(
            `"use strict"; return (${expression})`
        )();

        res.json({
            success: true,
            expression: expression,
            result: result
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: "Invalid calculation"
        });

    }

});


app.listen(PORT, () => {

    console.log(
        `Calculator backend running on http://localhost:${PORT}`
    );

});

