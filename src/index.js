const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const port = 3000;
app.use(express.json());

/*
GET -> Obtiene info
POST -> envía info
PATCH -> Actualiza info
DELETE -> Borra info

CRUD -> Create, Read, Update & Delete
*/

const pathFile = path.resolve(__dirname, '../data/users.json');

//error first

app.get('/read', (req, res) => {
  fs.readFile(pathFile, (error, data) => {
    if (error) {
      res.send('Error reading file');
    } else {
      const jsonData = JSON.parse(data);
      res.send(jsonData);
    }
  });
});

app.get('/write', (req, res) => {
  const newInfo = req.body;

  fs.readFile(pathFile, (error, data) => {
    if (error) {
      res.send('Error reading file');
    } else {
      const jsonData = JSON.parse(data);
      const newData = [...jsonData, newInfo];
      fs.writeFile(pathFile, JSON.stringify(newData), (error) => {
        if (error) {
          res.send('Error saving info');
        }

        res.send('Data saved OK');
      });
    }
  });
});

app.post('/create', (req, res) => {
  console.log(req.body);
  fs.writeFile(pathFile, JSON.stringify(req.body), (error) => {
    if (error) {
      res.send('Error saving info');
    }

    res.send('Data saved OK');
  });
});

app.patch('/update', (req, res) => {
  const newInfo = { number: 34 };

  fs.readFile(pathFile, (error, data) => {
    if (error) {
      res.send('Error reading file');
    } else {
      const jsonData = JSON.parse(data);
      const newData = [...jsonData, newInfo];
      fs.writeFile(pathFile, JSON.stringify(newData), (error) => {
        if (error) {
          res.send('Error saving info');
        }

        res.send('Data saved OK');
      });
    }
  });
});

app.delete('/delete', (req, res) => {
  console.log(req.body);
  res.end;
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
