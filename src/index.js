const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const port = 3000;
app.use(express.json());
const pathFile = path.resolve(__dirname, '../data/users.json');

/*
GET -> Obtiene info
POST -> envía info
PATCH -> Actualiza info
DELETE -> Borra info

CRUD -> Create, Read, Update & Delete
*/

// EJERCICIO: Realizar cada acción pasando solo el id en el body

// CREATE (post) -> Crear un usuario

app.post('/create', (req, res) => {
  const toCreate = req.body;

  fs.readFile(pathFile, (error, data) => {
    if (error) {
      res.send('Error reading file');
    } else {
      const jsonData = JSON.parse(data);
      const newData = [...jsonData, toCreate];
      fs.writeFile(pathFile, JSON.stringify(newData), (error) => {
        if (error) {
          res.send('Error saving info');
        }

        res.send(`Data saved OK and user ${toCreate.name} has been created`);
      });
    }
  });
});

// READ (get) -> Obtener info de usuarios

app.get('/read', (req, res) => {
  const toFind = req.body;
  fs.readFile(pathFile, (error, data) => {
    if (error) {
      res.send('Error reading file');
    } else {
      const jsonData = JSON.parse(data);
      const userFound = jsonData.find((item) => item.userId === toFind.userId);
      res.send(`El nombre es ${userFound.name} y el mail ${userFound.email}`);
    }
  });
});

// UPDATE (patch) -> Actualizar info de usuarios

app.patch('/update', (req, res) => {
  const toUpdate = req.body;
  fs.readFile(pathFile, (error, data) => {
    if (error) {
      res.send('Error reading file');
    } else {
      const jsonData = JSON.parse(data);
      const userFound = jsonData.find(
        (item) => item.userId === toUpdate.userId
      );
      if (toUpdate.name) {
        userFound.name = toUpdate.name;
      }
      if (toUpdate.email) {
        userFound.email = toUpdate.email;
      }
      fs.writeFile(pathFile, JSON.stringify(jsonData), (error) => {
        if (error) {
          res.send('Error saving info');
        }

        res.send(`Data saved OK and user ${userFound.name} has been updated`);
      });
    }
  });
});

// DELETE (delete) -> Eliminar usuarios

app.delete('/delete', (req, res) => {
  const toDelete = req.body;
  fs.readFile(pathFile, (error, data) => {
    if (error) {
      res.send('Error reading file');
    } else {
      const jsonData = JSON.parse(data);
      const newData = jsonData.filter(
        (item) => item.userId !== toDelete.userId
      );
      fs.writeFile(pathFile, JSON.stringify(newData), (error) => {
        if (error) {
          res.send('Error saving info');
        }

        res.send(`Data saved OK and the user has been deleted`);
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
