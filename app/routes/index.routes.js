module.exports = (app) => {
    const users = require('../controller/index.controller.js');
    const maintenance = require('../controller/maintenance.controller');


       // check wheather maintenance is paid or not
       app.post('/users/maintenance', maintenance.createMaintenance);

    // Create a new Note
    app.post('/users', users.create);

    // Retrieve users Notes
    app.get('/users', users.findAll);
    
 

    // Retrieve a single Note with noteId
    app.get('/users/:userId', users.findOne);

    // Update a Note with noteId
    app.put('/users/:userId', users.update);

    // Delete a Note with noteId
    app.delete('/users/:userId', users.delete);

}