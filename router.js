var express = require('express');
var controller = require('./controller');
var memberctlr = require('./memberctlr');
const member = require('./models/member');

var routes = express.Router();

routes.get('/get-test', function(req, res) {
	controller.getTest(res);
});

routes.get('/getmember/:id', function(req, res){
	memberctlr.getmember(req.params.id, res);
	}
);

routes.post('/addmember', function(req, res){
	memberctlr.addmember(req.body,res);
})

routes.post('/update/:id', function(req, res){
	memberctlr.update(req.body, res);

})

routes.delete('/delete/:id', function(req, res){
	memberctlr.delete(req.params.id, res);

})




module.exports =  routes