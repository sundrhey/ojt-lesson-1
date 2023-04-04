const { id } = require('ethers/lib/utils');
var member = require('./models/member')
var _ = require('lodash')

function memberctlr(){

    this.getmember = function (id, res) 
    {
        member.findOne({member_id:id})
        .exec(function(err, result) {
            
            if (err) {
               res.status(500).send(err);
            } else {
               if (result && result.fname) {
                  res.send(result.fname);

               } else {
                  res.status(404).send("member not foundss.");
               }
               
            }

            
         });
        
    }
        
    this.addmember = function (body, res){

        var newM = {
            member_id: body.member_id,  
            fname: body.fname,
            lname: body.lname,
            mname: body.mname
        }

        var newmember = member(newM);
        newmember.save((err,result)=>{
            res.send("Success!")
        });
    }


    this.update = function(body, res) {
        var newM = {
          member_id : body.member_id,
          fname : body.fname,
          lname: body.lname,
          mname: body.mname
          
        };
        
        member.findOneAndUpdate({ member_id: body.member_id }, newM, { new: true, upsert: true }, function(err) {
          if (err) {
            res.send(err);
          } else {
            res.send("success");
          }
        });
      };


    this.delete = function (id, res) 
    {
        member.findOneAndDelete({member_id:id})
        .exec(function(err, result) {
            
            if (err) {
               res.status(500).send(err);
            } else {
               if (result && result.fname) {
                  res.send("delete completed");

               } else {
                  res.status(404).send("Member not found.");
               }
               
            }

            
         });
        
    }
}


module.exports = new memberctlr()
