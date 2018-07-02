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

    
    //Users Routes
        // Retrieve users Notes
        app.get('/users/:loginUserId', verifyToken, users.findAll);

        // Retrieve a single Note with noteId
        app.get('/users/:user Id', users.findOne);

        // Update a Note with noteId
        app.put('/users/:userId', users.update);

        // Delete a Note with noteId
        app.delete('/users/:userId', users.delete);


    //Maintenance Routes
        // check wheather maintenance is paid or not
        app.post('/createmaintenance/:currentUserId', verifyToken, maintenance.createMaintenance);

        //get maintenance of given user
        app.get('/getmaintenance/:currentUserId',verifyToken, maintenance.getMaintenance);

    
     
    //Auth Routes 

        // Create a new Note
        app.post('/signup', upload.single('profilePhoto'), users.create);
        
        //LogIn route
        app.post('/login', verifyToken, users.login);

        //LogOut Route
        app.get('/logout', users.logout);

        //Check token exists or not
        app.get('/me', verifyToken, users.checkToken);

}