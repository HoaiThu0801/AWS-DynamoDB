const homeRouter = require('./home')

function route (app)
{
   app.use('/drinks', homeRouter);
}

module.exports = route;