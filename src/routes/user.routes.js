const { register, login, authByGoogle, logout } = require('../controllers/auth.controller');
const { showGoogleAuthPage, redirectUserAfterAuth } = require('../middlewares/googleAuth.middleware');

const router = require('express').Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User authentication and management APIs
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: strongPassword123
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: User already exists or invalid data
 */
router.post('/register', register);
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user with email and password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: strongPassword123
 *     responses:
 *       201:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 msg:
 *                   type: string
 *                   example: ✅User logged in successfully!
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6...
 *       401:
 *         description: Invalid email or password
 */
router.post('/login', login);

router.post('/logout', logout);

/**
 * @swagger
 * /api/users/google:
 *   get:
 *     summary: Redirect user to Google authentication page
 *     tags: [Users]
 *     responses:
 *       302:
 *         description: Redirects to Google login page
 */
// open google auth page
router.get('/google', showGoogleAuthPage);
/**
 * @swagger
 * /api/users/google/redirect:
 *   get:
 *     summary: Handle Google authentication callback
 *     tags: [Users]
 *     responses:
 *       201:
 *         description: User logged in with Google successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 msg:
 *                   type: string
 *                   example: ✅User logged in with google successfully!
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6...
 *       401:
 *         description: Authentication failed
 */
// redirect user after authentication
router.get('/google/redirect', redirectUserAfterAuth, authByGoogle);


module.exports = router;