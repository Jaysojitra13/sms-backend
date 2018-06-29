module.exports = (app) => {
    const path = require('path');
    const users = require('../controller/index.controller.js');
    const maintenance = require('../controller/maintenance.controller');
    const multer = require('multer');
    const verifyToken = require('../controller/verifytoken.middleware.js');

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads')
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    });
    const upload = multer({storage: storage});

    

    // Retrieve users Notes
    app.get('/users', users.findAll);

    // Retrieve a single Note with noteId
    app.get('/users/:userId', users.findOne);

    // Update a Note with noteId
    app.put('/users/:userId', users.update);

    // Delete a Note with noteId
    app.delete('/users/:userId', users.delete);

     // check wheather maintenance is paid or not
     app.post('/users/maintenance', maintenance.createMaintenance);

    
    //Auth Routes 
     // Create a new Note
    app.post('/signup', upload.single('profilePhoto'), users.create);
    
    //LogIn route
    app.post('/login', users.login);

    //LogOut Route
    app.get('/logout', users.logout);

     //Check token exists or not
     app.get('/me', verifyToken, users.checkToken);

}