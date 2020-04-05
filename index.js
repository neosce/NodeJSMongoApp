// https://github.com/neosce/NodeJSMongoApp.git

const express = require('express'); // подключение Express
const mongoose = require('mongoose'); // подключаем базу mogoDB
const expressHandlebars = require('express-handlebars'); // подключаем handlebars
const todosRoutes = require('./routes/todos'); // подключаем наш todos из папки route
const path = require('path'); 
const connectionString = require('./config');

const PORT = process.env.PORT || 3000; // порт нашго приложения если он есть то PORT иначе 3000 default
const app = express(); // объект нашего приложения
const hbs = expressHandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine); // движок для рендера страниц
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({extended: true})); // чтобы наше приложение понимало что такое body
app.use(express.static(path.join(__dirname, 'public'))); // подключаем стили 

app.use(todosRoutes);

async function start()
{
    try
    {
        // сначала подключаем базу 
        await mongoose.connect(connectionString.connection(), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        // потом запускаем приложение
        app.listen(PORT, () => {
            console.log('Server has been started...'); // start app Console: npm run dev
        }) // запуск приложения
    } 
    catch (e)
    {
        console.log(e);
    }
}

start(); // теперь вызываем функцию для запуска 