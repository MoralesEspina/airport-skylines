const express = require('express');
const app = express();

app.use(express.json());
app.set('port', process.env.PORT || 3000);

app.use(require('./routes/estado_avion'));
app.use(require('./routes/estado_boleto'));
app.use(require('./routes/estado_vuelo'));
app.use(require('./routes/asiento'));
app.use(require('./routes/boleto'));
app.use(require('./routes/vuelo'));

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
