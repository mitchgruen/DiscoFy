const User = require('../model/userModel');
const UserController = {}

UserController.createUser = async (req, res, next) => {
  try {
    const body = req.body;
    if (!body.username || !body.password) {
      throw{
        status: 400,
        message: 'Missing username or password in request body',
      };
    }
    const response = await User.create({
      username: body.username,
      password: body.password,
    })
    
    res.locals.newUser = response;
    return next();
  } catch (e) {
    return next(e);
  }
}

module.exports = UserController;

/*
const Student = require('./StudentModel');

const StudentController = {
  // Create a new student in the Database
  // Their information will be sent in the request body
  // This should send the created student
  async createStudent(req, res, next) {
    try {
      //create new student using schema
      const newStudent = await Student.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age
      })
      //send 200 status and the newStudent
      //postman is not posting new students - fix
        //created new schema using raw(JSON) as an object (didnt work)
        //
      res.locals.student = newStudent;
      next();
    }
    catch (err) {
      next({
        log: `createStudent, ${err}`,
        message: `createStudent method could not create students`
      });
    }
    
  },

  // Get a student from the database and send it in the response
  // Their first name will be in the request parameter 'name'
  // This should send the found student
  async getStudent(err, req, res, next) {

      Student.findOne({firstName: req.params.name}, (err, student) => {
        //if statement if there is an error
        //else if no student return no student
        //passes these if, then do if there is a student
      })
      //first name will be in the request parameter 'name' - not sure what this means
      //send the found student
      res.locals.findStudent = student;
      if (student === null) return next(err)
      return next();
    },

  // Get a student from the database and update the student
  // The student's first name will be in the request parameter 'name'
  // The student's new first name will be in the request body
  async updateStudent (req, res, next) {
    //promise finding the student from db and updating all the parameters
      //name = original first nname
      //new first name = req.body.name
      const student = await Student.findOneAndUpdate({firstName: req.params.name}, {firstName: req.body.name}, {new: true});
      res.locals.update = student;
      return next()
  },

  // Delete a student from the database
  // The student's first name will be sent in the request parameter 'name'
  // This should send a success status code
  async deleteStudent(req, res, next) {
    //find the student in db and delete
      //Student.delete
      //use first name
    //res.status(200).delete?
    const student = await Student.findOneAndDelete({firstName: req.params.name});
    res.locals.delete = student;
    return next()
  },
};

module.exports = StudentController;

*/