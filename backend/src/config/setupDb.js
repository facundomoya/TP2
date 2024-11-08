const { Sequelize } = require('sequelize');

let seqInstance = null;

const createInstance = async () => {
    const instance = new Sequelize(
        'institute', // nombre de base de datos
        'root', // user
        '1234', // pass
        {
            host: 'localhost',
            dialect: 'mysql',
            pool: {
                max: 3
            }
        }
    );

    try {
        await instance.authenticate();
        console.log('Conexion lograda');
        return instance;
    } catch (error) {
        throw new Error('Error en la conexión');
    }
};

const getSeqInstance = async () => {
    if (!seqInstance) {
        seqInstance = await createInstance();
    }

    return seqInstance;
};

module.exports = {
    getSeqInstance
};
