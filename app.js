const express = require('express');
const app = express();
const port = 3000;
const bodyParser=require("body-parser");
const request = require('request');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname+"/index.html");
})

app.post("/",function (req,res) {
var firstname= req.body.fn;
var lastname= req.body.ln;
var email=  req.body.email;
//console.log(firstname,lastname,mail);

var data={
  //https://mailchimp.com/developer/marketing/api/list-activity/
members :[
  {email_address: email,
  status:"subscribed",
  merge_fields: {
	FNAME: firstname,
	LNAME: lastname}}]};

var jsonData= JSON.stringify(data);

var options = { //object
url: "https://us14.api.mailchimp.com/3.0/lists/66796be8b7",
  method: "POST",
headers: {
  "Authorization": "om 043eef7fe2c4f9bb4b2cb27c3c129770-us14"
},
//https://www.npmjs.com/package/request#requestoptions-callback
json: true
};

  //console.log(req.body.cry);
  request(options, function (error, response, body) {
if (error) {
  console.log(error);
}else {
  console.log(response.statusCode);
}});
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
//API Key
//043eef7fe2c4f9bb4b2cb27c3c129770-us14

//list id
//66796be8b7
