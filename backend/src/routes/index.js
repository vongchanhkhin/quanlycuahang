const UserRouter = require('./user');

const route = (app) => {
    app.use('/user', UserRouter);
}

module.exports = route;