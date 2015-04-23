var request = require("request");
 
request({
  uri: "http://warthunder.com/en/community/userinfo/?nick=Nammi_namm",
}, function(error, response, body) {
  console.log(body);
});
