const EMAIL_SECRET = 'asdf1093KMnzxcvnkljvasdu09123nlasdasdf';


var Sendgrid = require("sendgrid-web");
var sendgrid = new Sendgrid({
  user: "oanaplopeanu11@gmail.com",//provide the login credentials
  key:"Plopeanu11*"
});

 module.exports = {EMAIL_SECRET, sendgrid};
