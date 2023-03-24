const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');

const app = express();
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(cors({origin: true, credentials: true}));

const contacts = [
    {
        id: 1,
        name: 'Artur Ostapuk',
        phoneNumber: '+48664272426',
        email: 'ostapuk54@gmail.com'
    },
    {
        id: 2,
        name: 'Jan Kowalski',
        phoneNumber: '+48123456789',
        email: 'jakol@gmail.com'
    },
    {
        id: 3,
        name: 'John Smith',
        phoneNumber: '+48234567890',
        email: 'jsmith@gmail.com'
    },
    {
        id: 4,
        name: 'Ala Makota',
        phoneNumber: '+48345678901',
        email: 'akota@gmail.com'
    },
];

app.get('/contacts', async (req, res, next) => {
    try{
        res.status(200).json({contacts});
    }catch(error){
        next(error);
    }
});
app.get('/contacts/:id', async (req, res, next) => {
    try{
        res.status(200).json(contacts.find(c => c.id === req.params['id']));
    }catch(error){
        next(error);
    }
});
app.post('/contacts', async (req, res, next) => {
    try{
        console.log(req.body)
        const newId = contacts[contacts.length - 1].id + 1;
        contacts.push({...req.body, id: newid})
        res.status(200).json(newId);
    }catch(error){
        next(error);
    }
});
app.put('/contacts', async (req, res, next) => {
    try{
        console.log(req.body)
        contacts.splice(contacts.findIndex(c => c.id === req.params['id']), 1, req.body);
        res.status(200).json(true);
    }catch(error){
        next(error);
    }
});
app.delete('/contacts/:id', async (req, res, next) => {
    try{
        contacts.splice(contacts.findIndex(c => c.id === req.params['id']), 1);
        res.status(200).json(true);
    }catch(error){
        next(error);
    }
});

app.listen(4242, () => {console.log('app is on 4242');})