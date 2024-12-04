    const express = require('express');
    const mongoose = require('mongoose');
    const cors = require('cors');
    const path = require('path');

    const fileRoutes = require('./routers/uploadRoute'); 
    const dataRoutes = require("./routers/visualizeRoute");
    const app = express();

    app.use(express.json());
    app.use(cors());

    app.use('/api/files', fileRoutes);  
    app.use('/api/visualize',dataRoutes)

    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
    // app.use('/visualize', express.static(path.join(__dirname, 'visualize')));

    mongoose.connect('mongodb://localhost:27017/upload', {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => {
    console.log('Connected to MongoDB');
    })
    .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    });

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    });

    app.use(cors({
        origin: 'http://localhost:3000',  
        methods: ['GET', 'POST','DELETE','PATCH'],  
        allowedHeaders: ['Content-Type']  
    }));