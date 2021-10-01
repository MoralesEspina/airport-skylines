const express = require('express');
const app = express();

app.use(express.json());
app.set('port', process.env.PORT || 3000);

app.use(require('./routes/pruebas'));
app.use(require('./routes/persona'));
app.use(require('./routes/usuario'));
app.use(require('./routes/rol'));



app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
