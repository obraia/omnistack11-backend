const connection = require('../database/connection');

module.exports = {
    async index(req, res) {
        const users = await connection('users').select('*');
        return res.json(users);
    },

    async store(req, res) {
        const { name, id, password, adress, contact } = req.body;

        await connection('users').insert({
            name,
            id,
            password,
            city: adress.city,
            uf: adress.uf,
            email: contact.email,
            whatsapp: contact.whatsapp,
        }).catch((err) => {
            if (err.errno == 19) return res.status(409).send('CPF já cadastrado');
        });

        return res.status(201).send('success');
    },
    
}