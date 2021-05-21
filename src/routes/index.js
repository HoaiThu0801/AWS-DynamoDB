const drinkRouter = require('./drinks')

function route (app)
{
   app.use('/drinks', drinkRouter);
}

module.exports = route;