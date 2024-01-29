const jwt = require("jsonwebtoken")
function check(header){
    var h = header.headers.authorization.replace('Bearer ', '')
    var result = false
    jwt.verify(h, process.env.PRIVATE_KEY, function(err, decoded){
        if(err){
            
        }
        else{
            result = true
        } 
    })
    return result    
}
module.exports = check