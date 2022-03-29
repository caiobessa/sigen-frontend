// Arquivo para execucao em prod
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, './build')));

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'./build/index.html'));
});

app.listen(PORT, (error) => {
    if (error) {
        return console.log('Error up server', error)
    }

    console.log('App is listening on port' + PORT);
})
