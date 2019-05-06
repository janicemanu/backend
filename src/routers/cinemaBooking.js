const router= require('express').Router()
// const bycrypt= require('bcryptjs')
// const isEmail = require('validator/lib/isEmail')
// const multer=require('multer')
const conn= require('../connection/connection')

// MOVIES
// 1. Add Movies
router.post('/addmovie/', (req, res) => {
    const sql = `INSERT INTO movies set ?;`
    const sql2 = `SELECT * FROM movies;`
    const data = req.body

    conn.query(sql,data,(err, result) => {
        if (err) return res.send(err.sqlMessage)
        res.send(result)
        conn.query(sql2,(err,res)=>{
            if (err) return res.send(err.sqlMessage)
            res.send(result) 
        })
        
    })
})
// 2. Edit Movies
router.patch('/editmov/:id', (req, res) => {
    const sql = `UPDATE movies set ? WHERE id= ?;`
    const data = [req.body,req.params.id]

    conn.query(sql,data,(err, result) => {
        if (err) return res.send(err.sqlMessage)
        res.send(result)  
    })
})

// 3. Delete Movies
router.delete('/delmov', function (req, res) {
    console.log(req.body);
    conn.query('DELETE FROM `movies` WHERE `id`=?', [req.body.id], function (error, results) {
       if (error) throw error;
       res.end('Movies has been deleted!');
     });
 });



// 4. Show All Movies
router.get('/allmov/', (req, res) => {
    const sql = `SELECT * FROM ujianbackend.movies`
    conn.query(sql,(err, result) => {
        if (err) return res.send(err.sqlMessage)
        res.send(result)
    })
})


// Categories
// 1. Add Categories
router.post('/addcat/', (req, res) => {
    const sql = `INSERT into categories set ?;`
    const sql2 = `SELECT * FROM categories;`
    const data = req.body

    conn.query(sql,data,(err, result) => {
        if (err) return res.send(err.sqlMessage)
        res.send(result)
        conn.query(sql2,(err,res)=>{
            if (err) return res.send(err.sqlMessage)
            res.send(result) 
        })
        
    })
})

// 2. Edit Categories
router.patch('/editcat/:id', (req, res) => {
    const sql = `UPDATE categories set ? WHERE id= ?;`
    const data = [req.body,req.params.id]

    conn.query(sql,data,(err, result) => {
        if (err) return res.send(err.sqlMessage)
        res.send(result)  
    })
});

// 3. Delete Categories
router.delete('/deletecat', function (req, res) {
    console.log(req.body);
    conn.query('DELETE FROM `categories` WHERE `id`=?', [req.body.id], function (error, results) {
       if (error) throw error;
       res.end('Categories has been deleted!');
     });
 });

// 4. Show All Categories
router.get('/categories/', (req, res) => {
    const sql = `SELECT * FROM ujianbackend.categories`
    conn.query(sql,(err, result) => {
        if (err) return res.send(err.sqlMessage)
        res.send(result)
    })
})

// Movcat
// 1. Add Connection
router.post('/addconn/', (req, res) => {
    const data = req.body
    const sql = `INSERT into movcat set ?;`
    const sql2 = `select m.nama as Judul_film, c.nama as Kategori from movies m
    join movcat mo on m.id = mo.movie_id
    join categories c on c.id = mo.category_id;`

    conn.query(sql,data,(err, result) => {
        if (err) return res.send(err.sqlMessage)
        res.send(result)
        conn.query(sql2,data,(err,res)=>{
            if (err) return res.send(err.sqlMessage)
            res.send(result) 
        })
        
    })
})


// 2. Delete Connection
router.delete('/deleteconn/:id',(req, res)=> {
    const id=req.params.id
    const sql = `DELETE from movcat where id=?;`
    const sql2 = `select m.nama as nama_film, c.nama as nama_kategori from movies m
    join movcat mo on m.id = mo.movie_id
    join categories c on c.id = mo.category_id`
    conn.query(sql,id,(err,res)=>{
        if(err) return res.send(err.sqlMessage)

        conn.query(sql2,id,(err,result)=>{
            if(err) return res.send(err.sqlMessage)

            res.end("Sudah terhapus!")
        })
    })
})









module.exports = router