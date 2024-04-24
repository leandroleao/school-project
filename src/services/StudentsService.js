const db = require('../db');

module.exports = {
    getAll: () => {
        return new Promise((accept, reject) => {
            db.query('SELECT * FROM students', (error, results) =>{
                if(error) { reject(error); return; }
                accept(results);
            });
        });
    },
    
    insert: (name, email, ra, cpf) => {
        
         return new Promise((accept, reject) => {
             db.query('INSERT INTO students (name, email, ra, cpf) VALUES (?, ?, ?, ?)',
             [name, email, ra, cpf], 
             (error, results) =>{
                 if(error) { reject(error); return; }
                 accept(results.insertId);
             });
         });
    },
    
    edit: (id, name, email) => {
        
         return new Promise((accept, reject) => {
             db.query('UPDATE students SET name = ?, email = ? WHERE id = ?',
             [name, email, id], 
             (error, results) =>{
                 if(error) { reject(error); return; }
                 accept(results.insertId);
             });
         });
    },
    
    removeItem: (id) => {
        
         return new Promise((accept, reject) => {
             db.query('DELETE FROM students WHERE id = ?',
             [id], 
             (error, results) =>{
                 if(error) { reject(error); return; }
                 accept(results.insertId);
             });
         });
    },
};