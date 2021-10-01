const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);


app.use(express.json());

app.use(require('./routes/pruebas'));
app.use(require('./routes/asiento'));
app.use(require('./routes/vuelo'));
app.use(require('./routes/boleto'));

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
