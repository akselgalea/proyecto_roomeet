//Developed by ⠁⠭⠑⠇

const express = require('express')
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const router = express.Router()

// MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'roomeet'
});

// Check Connection
connection.connect(err => {
    if(err) throw err;
    console.log('Database server ON!');
})

function verifyToken(req, res, next) {
    if(!req.headers.authorization) return res.status(401).send('Unauthorized request');

    let token = req.headers.authorization.split(' ')[1];
    console.log(token);
    if(token === 'null') return res.status(401).send('Unauthorized request');

    let payload = jwt.verify(token, 'secretKey');
    console.log(payload);
    if(!payload) return res.status(401).send('Unauthorized request');

    req.userId = payload.subject;
    next()
}

router.get('/', (req, res) => {
    res.send('From API route');
})

router.post('/auth/login', (req, res) => {
    const query = `SELECT * FROM usuario WHERE username = '${req.body.username}'`;
    
    connection.query(query, (error, results) => {
        if(error) throw error;
        if(results.length > 0) {
            if(results[0].password == req.body.password) {
                let payload = { subject: results[0].id }
                let token = jwt.sign(payload, 'secretKey');
                res.send({status: 200, body: 'Sesion iniciada correctamente', token});
            } else {
                res.send({status: 500, body: 'Contraseña incorrecta'});
            }
        } else {
            res.send({status: 500, body: 'Este usuario no existe'});
        }
    })
})

router.post('/auth/register', (req, res) => {
    const query = `INSERT INTO usuario (username, password, email, estado) VALUES ('${req.body.username}', '${req.body.password}', '${req.body.email}',  '0')`;

    connection.query(query, (error, results) => {
        if(error) {
            if(error.sqlMessage.includes('email')) res.send({status: 500, body: 'Este correo electronico ya esta en uso'});
            if(error.sqlMessage.includes('username')) res.send({status: 500, body: 'Este nombre de usuario ya esta en uso'});
        } else {
            let user = connection.query(`SELECT * FROM usuario WHERE username = '${req.body.username}'`);
            let payload = { subject: user.id };
            let token = jwt.sign(payload, 'secretKey')
            res.send({status: 200, body: 'Usuario registrado correctamente', token});
        }
    })
})

router.get('/profile', verifyToken, (req, res) => {
    const query = `SELECT * FROM usuario WHERE id = '${req.userId}'`;

    connection.query(query, (error, results) => {
        if(error) {
            console.log(error)
        } else {
            res.send({status: 200, body: results[0]});
        }
    })
})

router.get('/profile/:id', verifyToken, (req, res) => {
    const query = `SELECT * FROM usuario WHERE id = '${req.params.id}'`;

    connection.query(query, (error, results) => {
        if(error) {
            console.log(error)
        } else {
            res.send({status: 200, body: results[0]});
        }
    })
})

router.get('/allUsers', verifyToken, (req, res) => {
    const query = `SELECT * FROM usuario`;
    
    connection.query(query, (error, results) => {
        if(error) {
            console.log(error)
        } else {
            res.send(results);
        }
    })
})


module.exports = router