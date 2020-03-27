const connection = require('../database/connection');

module.exports = {
    async store(req, res) {
        const { id, password } = req.body;

        const user = await connection('users')
            .where('id', id)
            .select('*')
            .first()
            .catch((err) => { });

        if (user) {
            if (user.password === password) {

            } else {
                return res.status(400).json({ error: 'Incorrect password' });
            }
        } else {
            return res.status(400).json({ error: 'User not found' });
        }

        return res.json(user.id);
    },
}