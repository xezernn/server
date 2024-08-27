/**
 * @swagger
 * tags:
 *   name: Autentifikasiya
 *   description: İstifadəçi qeydiyyatı, giriş, token doğrulama və token yeniləmə əməliyyatları
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: 
 *       - Autentifikasiya
 *     summary: Yeni istifadəçi qeydiyyatdan keçirin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *                 description: İstifadəçi adı
 *               password:
 *                 type: string
 *                 format: password
 *                 description: İstifadəçi şifrəsi
 *     responses:
 *       201:
 *         description: İstifadəçi uğurla qeydiyyatdan keçdi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Akses token
 *                 refresh:
 *                   type: string
 *                   description: Yeniləmə tokeni
 *                 login:
 *                   type: string
 *                   description: İstifadəçi adı
 *       400:
 *         description: Bu istifadəçi adı artıq mövcuddur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Xətanın açıqlaması
 *       500:
 *         description: Daxili server xətası
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Xətanın açıqlaması
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: 
 *       - Autentifikasiya
 *     summary: İstifadəçi daxil olsun
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *                 description: İstifadəçi adı
 *               password:
 *                 type: string
 *                 format: password
 *                 description: İstifadəçi şifrəsi
 *     responses:
 *       200:
 *         description: İstifadəçi uğurla daxil oldu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Akses token
 *                 refresh:
 *                   type: string
 *                   description: Yeniləmə tokeni
 *                 status:
 *                   type: boolean
 *                   description: Əməliyyatın uğurlu olub-olmaması
 *       401:
 *         description: Yanlış giriş məlumatları
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Xətanın açıqlaması
 *       500:
 *         description: Daxili server xətası
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Xətanın açıqlaması
 */

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     tags: 
 *       - Autentifikasiya
 *     summary: Yeniləmə tokenini yeniləyin
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: Yeniləmə tokeni
 *     responses:
 *       201:
 *         description: Yeniləmə tokeni uğurla yeniləndi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Yeni akses token
 *                 refresh:
 *                   type: string
 *                   description: Yeni yeniləmə tokeni
 *                 status:
 *                   type: boolean
 *                   description: Əməliyyatın uğurlu olub-olmaması
 *       401:
 *         description: Yeniləmə tokeni təqdim edilməyib
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Xətanın açıqlaması
 *       403:
 *         description: Yanlış yeniləmə tokeni
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Xətanın açıqlaması
 */

/**
 * @swagger
 * /auth/verify-token:
 *   get:
 *     tags: 
 *       - Autentifikasiya
 *     summary: Akses tokenini yoxlayın
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token uğurla doğrulandı
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Token düzgündür
 *                 status:
 *                   type: boolean
 *                   description: Əməliyyatın uğurlu olub-olmaması
 *                 user_login:
 *                   type: string
 *                   description: İstifadəçi adı
 *       401:
 *         description: Yanlış və ya keçərsiz token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Xətanın açıqlaması
 */

const express = require('express');
const router = express.Router();

const { register, login, verifyToken, refreshToken } = require('../controllers/auth.controllers');
const auth = require('../middlewares/auth.middleware');
const validator = require('../middlewares/validation.middleware');

const authSchema = require('../schema/auth.schema');

router.post('/register', auth, validator(authSchema), register);
router.post('/login', validator(authSchema), login);
router.post('/refresh-token', refreshToken);
router.get('/verify-token', auth, verifyToken);

module.exports = router;
