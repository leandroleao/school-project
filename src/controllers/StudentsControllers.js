const StudentsService = require('../services/StudentsService');

module.exports = {
    getAll: async (req, res) => {
        let json = { error: '', result: [] };
        let students = await StudentsService.getAll();

        for (let i in students) {
            json.result.push(students[i]);
        }

        res.json(json);

    },

    insertStudent: async (req, res) => {
        let json = { error: '', result: [] };

        let name = req.body.name;
        let email = req.body.email;
        let ra = req.body.ra;
        let cpf = req.body.cpf;

        if (name) {
            let insertId = await StudentsService.insert(name, email, ra, cpf);
            json.result = {
                id: insertId,
                name,
                email,
                ra,
                cpf,
            };
        } else {
            json.error = 'Não enviado! ';
        }


        res.json(json);

    },

    editStudent: async (req, res) => {
        let json = { error: '', result: [] };

        let id = req.body.id;
        let name = req.body.name;
        let email = req.body.email;

        if (name) {
            await StudentsService.edit(id, name, email);
            json.result = {
                id,
                name,
                email
            };
        } else {
            json.error = 'Não enviado! ';
        }


        res.json(json);

    },

    removeStudent: async (req, res) => {
        let json = { error: '', result: [] };

        let id = req.body.id;

        if (id) {
            await StudentsService.removeItem(id);
            json.result = {
                id
            };
        } else {
            json.error = 'Não enviado! ';
        }


        res.json(json);

    }
}