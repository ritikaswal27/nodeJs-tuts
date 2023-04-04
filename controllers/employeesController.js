const Employees = require("../model/Employee");

const getAllEmployees = async (req, res) => {
  const result = await Employees.find();
  if (!result) return res.status(204).json({ message: "No employee found." });
  res.json(result);
};

const createNewEmployee = async (req, res) => {
  // console.log(Employees.length);
  // const count = await Employees.estimatedDocumentCount().exec();
  // console.log(count);

  // const latestAdditions = await Employees.find()
  //   .sort({ _id: -1 })
  //   .limit(3)
  //   .exec();
  // console.log(latestAdditions);

  if (!req?.body?.firstname || !req?.body?.lastname) {
    return res
      .status(400)
      .json({ message: "First and last names are required." });
  }
  /*
  const newEmployee = new Employees({
    firstName: req.body.firstname,
    lastName: req.body.lastname,
  });
  newEmployee.save();
  */
  // console.log(newEmployee);
  // console.log(newEmployee.firstName);
  // console.log(newEmployee.firstName);

  try {
    const result = await Employees.create({
      firstName: req.body.firstname,
      lastName: req.body.lastname,
    });

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
};

const updateEmployee = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }

  const employee = await Employees.findOne({ _id: req.body.id }).exec();

  if (!employee)
    return res
      .status(204)
      .json({ message: `No employee matches ID ${req.body.id}.` });

  if (req.body?.firstname) employee.firstName = req.body.firstname;
  if (req.body?.lastname) employee.lastName = req.body.lastname;
  const result = await employee.save();
  res.json(result);
};

const deleteEmployee = async (req, res) => {
  if (!req.body?.id)
    return res.status(400).json({ message: "Employee id required." });

  const employee = await Employees.findOne({ _id: req.body.id }).exec();
  if (!employee)
    return res
      .status(400)
      .json({ message: `No Employee id matches ID ${req.body.id}.` });

  const result = await Employees.deleteOne({ _id: req.body.id });
  res.json(result);
};

const getEmployee = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Employee id required." });

  const employee = await Employees.findOne({ _id: req.params.id });
  if (!employee) {
    return res
      .status(204)
      .json({ message: `No employee id matches ID ${req.params.id}` });

    res.json(employee);
  }
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
