const express = require('express')
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '8binf.h.filess.io',
    port: '3307',
    user: 'cinema_chestmuddo',
    password: 'e9e078b75339398205726ce717c06d46bfa9dcca',
    database: 'cinema_chestmuddo',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const app = express();
app.use(express.json());

app.get('/peliculas', async (req, res) => {
    try {
        const [rows] = await pool.query(`SELECT p.id, p.titulo, p.fecha_estreno, p.nacionalidad, c.descripcion, p.director, GROUP_CONCAT(g.nombre) as generos 
            FROM pelicula p JOIN clasificacion c ON p.clasificacion_id = c.id 
            LEFT JOIN pelicula_genero pg ON pg.pelicula_id = p.id 
            LEFT JOIN genero g ON g.id = pg.genero_id
            GROUP BY p.id`);
        res.json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message })
    }

});

app.get('/peliculas/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const [rows] = await pool.query(`SELECT p.id, p.titulo, p.fecha_estreno, p.nacionalidad, c.descripcion, p.director, GROUP_CONCAT(g.nombre) as generos 
            FROM pelicula p JOIN clasificacion c ON p.clasificacion_id = c.id 
            LEFT JOIN pelicula_genero pg ON pg.pelicula_id = p.id 
            LEFT JOIN genero g ON g.id = pg.genero_id
            WHERE p.id = ?
            GROUP BY p.id`, [id]);
        res.json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message })
    }
});

app.post('/peliculas', async(req, res) => {
    const {titulo,fecha_estreno, nacionalidad,clasificacion_id,director,generos}= req.body;
    try {
        const [result] = await pool.query(`INSERT INTO pelicula (titulo, fecha_estreno, nacionalidad, clasificacion_id, director) VALUES
(?, ?, ?, ?, ?)`, [titulo,fecha_estreno,nacionalidad,clasificacion_id,director]);

        if (generos && generos.length > 0) {
            const peliculaId = result.insertId;
            const values = generos.map(generoId => [peliculaId, generoId]);
            await pool.query(
                'INSERT INTO pelicula_genero (pelicula_id, genero_id) VALUES ?',
                [values]
            );
        }

        res.status(201).json({id:result.insertId});
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message })
    }
});

app.put('/peliculas/:id', async(req, res) => {
    const id = req.params.id;
    const { titulo, fecha_estreno, nacionalidad, clasificacion_id, director, generos } = req.body;

    try {
        await pool.query(
            'UPDATE pelicula SET ? WHERE id = ?',
            [{ titulo, fecha_estreno, nacionalidad, clasificacion_id, director }, id]
        );

        // Actualizar géneros
        await pool.query('DELETE FROM pelicula_genero WHERE pelicula_id = ?', [id]);
        if (generos && generos.length > 0) {
            const values = generos.map(generoId => [id, generoId]);
            await pool.query(
                'INSERT INTO pelicula_genero (pelicula_id, genero_id) VALUES ?',
                [values]
            );
        }

        res.json({ success: true });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/peliculas/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const [result] = await pool.query(`DELETE FROM pelicula WHERE id = ?`, [id]);
        res.json({success: true});
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message })
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en el puerto ${PORT}`);
});