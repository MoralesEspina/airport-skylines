const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);


app.use(express.json());

app.use(require('./routes/cancelacion_boletos'));
app.use(require('./routes/cancelacion_vuelos'));
app.use(require('./routes/estado_cancelacion'));

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
