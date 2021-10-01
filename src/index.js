const express = require('express');
const app = express();

app.use(express.json());
app.set('port', process.env.PORT || 3000);


app.use(require('./routes/persona'));
app.use(require('./routes/usuario'));
app.use(require('./routes/rol'));
app.use(require('./routes/ruta'));
app.use(require('./routes/aeropuerto'));
app.use(require('./routes/modelo'));
app.use(require('./routes/aerolineas'));
app.use(require('./routes/aviones'));

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
