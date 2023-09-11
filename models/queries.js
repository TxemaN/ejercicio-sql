const querieEntries = {
    byEmail:`SELECT e.title, e.content, e.date, e.category, a.name, a.image
    FROM entries AS e
    INNER JOIN authors AS a
    ON e.id_author = a.id_author
    WHERE a.email = $1
    ORDER BY e.title;`,
    
    byTodas : 'SELECT * FROM entries',

    
    byId : `SELECT * FROM entries WHERE id_entry = $1`,
    
    byActualizar: `UPDATE entries SET title = $1, content = $2 WHERE id_entry = $3`,
    
    byEliminarTodas: `DELETE FROM entries WHERE id_author IN (SELECT id_author FROM authors WHERE email = $1)`,
    
    byEliminarUna: `DELETE FROM entries WHERE id_entry = $1`,
    
    
    
    
    
    
    };
    
    const querieAuthors = {
        byTodas: "SELECT * FROM authors",
        byEmail:"SELECT * FROM authors WHERE email = $1;",
        byNombre: "SELECT * FROM authors WHERE name = $1",
        byCrear: "INSERT INTO authors (name, surname, email, image) VALUES ($1, $2, $3, $4) RETURNING *;",
        byActualizar : `UPDATE authors SET name = $1, surname = $2, email = $3, image = $4 WHERE id_author = $5 RETURNING *;`,
        byDeletar : `DELETE FROM authors WHERE id_author = $1;`
    
    
    
    
    }
    
    module.exports = {querieEntries,querieAuthors}