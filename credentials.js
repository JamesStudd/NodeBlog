var config = {
    'development': {
        database: '@localhost:27017/node-blog',
        user: '',
        password: '',
        secret: 'secrets'
    },
    'test': {
        database: 'database link',
        user: 'username',
        password: 'password',
        secret: 'secret'
    },
    'production': {
        database: 'database link',
        user: 'username',
        password: 'password',
        secret: 'secret'
    }
}

module.exports = config;