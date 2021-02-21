const https = require('https');
const request = require('request');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/')); //Serves resources from public folder

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(request, response){
    response.sendFile(__dirname + "/index.html");
})

app.post('/', function(request, response){
    const email = request.body.EMAIL;
    const firstName = request.body.firstName;
    const lastName = request.body.lastName;
    const data = {
        members : [
            {
                email_address: email,
                status:"subscribed",
                merge_fields: {
                    FNAME :  firstName,
                    LNAME : lastName
                }
            }
        ],
    }

    const jsonData = JSON.stringify(data);
    const url = ' https://us1.api.mailchimp.com/3.0/lists/88d6dae0fe'
    const options = {
        method: 'POST',
        auth: 'Uday:99232365835d2938ee11123f7f2b991c-us1'
    }

    var request = https.request(url, options, function(res){
        res.on('data', function(data){
            const myData = JSON.parse(data);
            console.log(myData);
            const error = myData.errors;
            if (error.length === 0){
                response.sendFile(__dirname + '/success.html');
                console.log("Success..!");
            }
            else{
                response.sendFile(__dirname + '/error.html');
                console.log("Error..!");
            }
        })  
    })

    request.write(jsonData);
    request.end();
})

app.listen(3000, function(){
    console.log("Listening at port 3000");
})




//99232365835d2938ee11123f7f2b991c-us1


//88d6dae0fe