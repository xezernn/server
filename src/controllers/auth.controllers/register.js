const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');
const { generateAccesToken, generateRefreshToken } = require('./jwt.controller');
const prisma = new PrismaClient();


const register = async (req, res) => {

    try {
        const { login, password } = req.body;
        
        const existingUser = await prisma.user.findUnique({
            where: { login }
        });

        if (existingUser) {
            return res.status(409).json({ error: 'Bu ad artiq movcutdur' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                login,
                password: hashedPassword
            }
        });

        const token = generateAccesToken({ userid: newUser.id })
        const refresh = generateRefreshToken({ userid: newUser.id })

        res.status(201).json({ token, refresh, login });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = register