const path = require('path');
const fs = require('fs');
const pathFile = path.resolve(__dirname, '../../data/users.json');
const usersController = {};

// READ (get) -> Obtener info de usuarios

usersController.getAllUsers = (req, res) => {
  fs.readFile(pathFile, (error, data) => {
    if (error) {
      return res.status(500).json({ error: 'Error reading file' });
      //send (sustituyendo a json) -> sirve para mandar información en cualquier formato
      //json -> sirve para mandar información en formato objeto
    }
    const jsonData = JSON.parse(data);
    return res.status(200).json(jsonData);
  });
};

usersController.getUserById = (req, res) => {
  const userId = req.params.id;
  fs.readFile(pathFile, (error, data) => {
    if (error) {
      return res.status(500).json({ error: 'Error reading file' });
    }
    const jsonData = JSON.parse(data);
    const userFound = jsonData.find((user) => user.userId === userId);
    if (userFound) {
      res.status(200).json(userFound);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });
};

// CREATE (post) -> Crear un usuario

usersController.createNewUser = (req, res) => {
  const toCreate = req.body;

  fs.readFile(pathFile, (error, data) => {
    if (error) {
      return res.status(500).json({ error: 'Error reading file' });
    }
    const jsonData = JSON.parse(data);
    const newData = [...jsonData, toCreate];
    fs.writeFile(pathFile, JSON.stringify(newData), (error) => {
      if (error) {
        res.status(409).json({ error: 'Error creating user' });
      }

      res.status(200).send('Data saved OK');
    });
  });
};

// UPDATE (patch) -> Actualizar info de usuarios

usersController.updateUser = (req, res) => {
  const userId = req.params.id;
  const info = req.body;
  fs.readFile(pathFile, (error, data) => {
    if (error) {
      return res.status(500).json({ error: 'Error reading file' });
    }
    const jsonData = JSON.parse(data);
    const userFound = jsonData.find((user) => user.userId === userId);

    if (info.name) {
      userFound.name = info.name;
    }
    if (info.email) {
      userFound.email = info.email;
    }

    fs.writeFile(pathFile, JSON.stringify(jsonData), (error) => {
      if (error) {
        res.status(404).json({ error: 'User not found' });
      }

      res.status(200).send('Data saved OK');
    });
  });
};

// DELETE (delete) -> Eliminar usuarios

usersController.deleteUser = (req, res) => {
  const userId = req.params.id;
  fs.readFile(pathFile, (error, data) => {
    if (error) {
      return res.status(500).json({ error: 'Error reading file' });
    }
    const jsonData = JSON.parse(data);
    const newData = jsonData.filter((item) => item.userId !== userId);
    fs.writeFile(pathFile, JSON.stringify(newData), (error) => {
      if (error) {
        res.status(404).json({ error: 'User not found' });
      }

      res.status(200).send('Data saved OK');
    });
  });
};

module.exports = usersController;
