const {Router} = require('express');
const router = Router();
const Todo = require('../models/Todo');

router.get('/', async (req, res) => { // делаем async потому что будем отправлять запрос к БД
    
    const todos = await Todo.find({}).lean();
    
    res.render('index', {
        title: 'Todos list',
        isIndex: true, // флаги для navbar чтобы показывать на какой странице сейчас user
        todos
    })
});

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create todo',
        isCreate: true
    })
})

router.post('/create', async (req, res) => {
    const todo = new Todo({
        title: req.body.title
    });

    await todo.save();
    res.redirect('/');

});

router.post('/complete', async (req, res) => {
    const todo = await Todo.findById(req.body.id) // определяем конкретно с каким todo мы сейчас работаем id - потому что у нас input он также назван

    todo.completed = !!req.body.completed
    await todo.save();

    res.redirect('/');
});

module.exports = router;