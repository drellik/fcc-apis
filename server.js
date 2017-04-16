var express = require('express')
var app = express()

//Get any parameter passed to the API (not a query)
app.get('/\*', function (req, res) {
    //temp holds the integer value passed as a parameter.
    var temp = parseInt(req.params[0])
    var myDate;
    
    //try getting the parameter as a date
    myDate = new Date(req.params[0]);
    
    //if its a date good otherwise try converting it from a Unix timestamp number
    if (myDate != 'Invalid Date')
    {
        myDate = new Date(req.params[0]);
    }
    else myDate = new Date(temp*1000);

    //If the date is not a date or Unix timestamp save them as null, otherwise save them as a Natural language date and Unix timestamp.
    var natDate;
    var uDate;
    if (myDate == 'Invalid Date' || isNaN(myDate)) 
    {
        natDate = null; 
        uDate = null;
    }
    else
    {
        natDate = myDate.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'});
        uDate = (Date.UTC(myDate.getFullYear(), myDate.getMonth(), myDate.getDate(), myDate.getHours(), myDate.getMinutes(), myDate.getSeconds(), myDate.getMilliseconds())/1000).toString();
    }

  //print out the results.
  //We could make a JSON object to send instead, but the challange doesn't call for that.
  res.send("Natural Language: "+natDate+"<br>UNIX timestamp: "+uDate);
})

app.listen(8080);