const express = require('express');
const app = express();
var cors = require('cors')

app.use(express.json());
app.set('port', process.env.PORT || 3000);

app.use(cors());
app.use(require('./routes/aerolineas'));
app.use(require('./routes/aeropuerto'));
app.use(require('./routes/asiento'));
app.use(require('./routes/aviones'));
app.use(require('./routes/boleto'));
app.use(require('./routes/clase'));
app.use(require('./routes/estado_avion'));
app.use(require('./routes/estado_boleto'));
app.use(require('./routes/estado_vuelo'));
app.use(require('./routes/modelo'));
app.use(require('./routes/pago'));
app.use(require('./routes/pasajero'));
app.use(require('./routes/persona'));
app.use(require('./routes/rol'));
app.use(require('./routes/ruta'));
app.use(require('./routes/usuario'));
app.use(require('./routes/vuelo'));
app.use(require('./routes/cancelacion_boletos'));
app.use(require('./routes/cancelacion_vuelos'));
app.use(require('./routes/estado_cancelacion'));
app.use(require('./routes/disponible'));


app.listen(app.get('port'), () => {
    console.log(`Server en puerto ${app.get('port')}`);
});
