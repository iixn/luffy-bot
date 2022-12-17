const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://iiaaannn:Otakus2.0@luffy.zuntpii.mongodb.net/?retryWrites=true&w=majority', function (err) {
    console.log(err);
})

mongoose.connection.on('open', _ => {
    console.log("Database conectada");
})
