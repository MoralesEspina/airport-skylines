const express = require('express');
var cors = require('cors');
const app = express();
app.use(express.json());

app.use(cors());

app.set('port', process.env.PORT || 3000);

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
app.use(require('./routes/ruta'));
app.use(require('./routes/usuario'));
app.use(require('./routes/vuelo'));
app.use(require('./routes/cancelacion_boletos'));
app.use(require('./routes/cancelacion_vuelos'));
app.use(require('./routes/estado_cancelacion'));
app.use(require('./routes/vuelosDisponibles'));
app.use(require('./routes/security'));





app.listen(app.get('port'), () => {
    console.log(`Server en puerto ${app.get('port')}`);
});
