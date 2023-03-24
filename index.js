const express = require('express');
const bodyparser = require('body-parser');

const app = express();
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());


app.get('/contacts', async (req, res, next) => {
    try{
        res.status(200).json({
            contacts: [
                {
                    id: 1,
                    name: 'Artur Ostapuk',
                    phoneNumber: '+48664272426',
                    email: 'ostapuk54@gmail.com'
                }
            ]
        });
    }catch(error){
        next(error);
    }
});

app.listen(4242, () => {console.log('app is on 4242');})