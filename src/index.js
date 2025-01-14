const express = require('express');
const app = express();
const port = 3000;

const usersRoutes = require('./routes/users.routes');

app.use(express.json());
app.use('/api/users', usersRoutes); // si tenemos mas rutas habrá que crear un archivo especifico dentro de routes para llamarlo

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
