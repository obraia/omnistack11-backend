const connection = require('../database/connection');

module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query;

        const [count] = await connection('incidents')
            .count();

        console.log(count);

        const incidents = await connection('incidents')
            .join('users', 'user_id', '=', 'incidents.user_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'users.name',
                'users.city',
                'users.uf',
                'users.email',
                'users.whatsapp'
            ]);

        res.header('X-Total-Count', count['count(*)']);

        return res.json(incidents);
    },

    async store(req, res) {
        const { title, description, value } = req.body;
        const user_id = req.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            user_id,
        }).catch((err) => {
            console.log(err);
        });

        return res.json({ id });
    },

    async delete(req, res) {
        const { id } = req.params;
        const user_id = req.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('user_id')
            .first();

        if (incident) {
            if (incident.user_id !== user_id) {
                return res.status(401).json({ error: 'Unauthorized user' });
            }
        } else res.status(404).json({ error: 'Incident not found' });

        await connection('incidents').where('id', id).delete();

        return res.status(204).send();
    },
}