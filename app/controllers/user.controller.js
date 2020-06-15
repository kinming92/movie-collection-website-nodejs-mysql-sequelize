const User = require("../models/user.model.js");

//create and save a new Customer
exports.create = (req, res) => {
    if(!req.body){
        res.status.send({
            message: "Content cannot be empty"
        });
    }

    //create a new Customer
    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    })

    User.create(user)
    .then(data => {
        res.send(data);
    })
    .catch( err => {
        res.status(500).send({
            message: err.message || "Some error occured while creating the customer"
        });
    });
};

//retrieve all customers from the database
exports.findAll = (req, res) => {
    Customer.getAll((err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Some error occured while retrieving customers."
            });
        }else{
            res.send(data);
        }
    })
};

//find a single customer with a customerId
exports.findOne = (req, res) => {
    User.findById(req.params.customerId, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.customerId}.`
                });
            }else{
                res.status(500).send({
                    message: "Error retrieving Customer with id " + req.params.customerId
                });
            }
        }else{
            res.send(data);
        }
    });
};

//update a customer identified by the customerId in the requests
exports.update = (req, res) => {
    //validate request
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Customer.updateById(
        req.params.customerId,
        new Customer(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Customer with id ${req.params.customerId}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating Customer with id " + req.params.customerId
              });
            }
          } else res.send(data);
        }
    );
};

//delete a customer with the specified customerId in the request 
exports.delete = (req, res) => {
    Customer.remove(req.params.customerId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.customerId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Customer with id " + req.params.customerId
          });
        }
      } else res.send({ message: `Customer was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Customer.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all customers."
        });
      else res.send({ message: `All Customers were deleted successfully!` });
    });
  };
