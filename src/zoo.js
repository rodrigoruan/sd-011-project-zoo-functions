/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const { employees } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  // seu código aqui
  return data.species.filter((specie) => ids.includes(specie.id));
}

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  const getAnimalByName = (specie) => specie.name === animal;
  const [testedAnimal] = data.species.filter(getAnimalByName);
  const checkAge = (resident) => resident.age >= age;
  return testedAnimal.residents.every(checkAge);
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) {
    const emptyObject = {};
    return emptyObject;
  }
  const verifyEmployeeName = (employee) => employee.firstName === employeeName || employee.lastName === employeeName;
  const [employ] = data.employees.filter(verifyEmployeeName);
  return employ;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const employee = { ...personalInfo, ...associatedWith };
  return employee;
}

function isManager(id) {
  // seu código aqui
  return data.employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(employee);
}

function countAnimals(species) {
  // seu código aqui
  if (!species) {
    const numbersOfAnimals = {};
    data.species.forEach((specie) => { numbersOfAnimals[specie.name] = specie.residents.length; });
    return numbersOfAnimals;
  }
  const { residents } = data.species.find((specie) => specie.name === species);
  return residents.length;
}

function calculateEntry(entrants) {
  // seu código aqui
  if (!entrants || entrants === {}) { return 0; }
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  const { Adult: adultPrice, Senior: seniorPrice, Child: childPrice } = data.prices;
  const adultValue = Adult * adultPrice;
  const seniorValue = Senior * seniorPrice;
  const childValue = Child * childPrice;
  return (adultValue + seniorValue + childValue);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
  const text = (day) => {
    const { open, close } = data.hours[day];
    return day === 'Monday' ? 'CLOSED' : `Open from ${open}am until ${close - 12}pm`;
  };
  const schedule = {};
  if (!dayName) {
    Object.keys(data.hours).forEach((dia) => { schedule[dia] = text(dia); });
    return schedule;
  }
  schedule[dayName] = text(dayName);
  return schedule;
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
  const employeeFounded = data.employees.find((employee) => employee.id === id);
  const [idAnimal] = employeeFounded.responsibleFor;
  const specieFounded = data.species.find((specie) => specie.id === idAnimal);
  const { name, sex, age } = specieFounded.residents.reduce((acc, curr) => (acc.age > curr.age ? acc : curr));
  return [name, sex, age];
}

function increasePrices(percentage) {
  // seu código aqui
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
