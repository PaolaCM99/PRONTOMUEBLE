const app = require('./app');

app.listen(app.get('port'), ()=>{
    console.log("Puerto")
})