const connection = require('../database/connection');

module.exports = {
    async store(req, res) {
        const { id, password } = req.body;

        console.log(id, password);

        const user = await connection('users')
            .where('id', id)
            .select('*')
            .first()
            .catch((err) => { console.log(err) });

        console.log(user);

        if (user) {
            if (user.password === password) {
                return res.status(200).json({name: user.name});
            } else {
                return res.status(400).json({ error: 'Incorrect password' });
            }
        } else {
            return res.status(400).json({ error: 'User not found' });
        }
    },
}