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

const { species, employees } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  const specieById = [];
  if (ids === null) { return specieById; }
  ids.forEach((id, index) => { specieById.push(species.find((specie) => specie.id === ids[index])); });
  return specieById;
}
function getAnimalsOlderThan(animal, age) {
  return species.find((animals) => animals.name === animal).residents.every((residente) => residente.age >= age);
}
function getEmployeeByName(employeeName) {
  if (employeeName === undefined) { return {}; }
  return employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}
function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  let managersArray = [];
  employees.forEach((employee, index) => { managersArray.push(employee.managers[index]); });
  return managersArray.some((man) => man === id);
}
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmploye = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return data.employees.push(newEmploye);
}

function countAnimals(especies) {
  if (especies !== undefined) { return species.find((specie) => specie.name === especies).residents.length; }
  let countObjt = {};
  species.forEach((animal) => { countObjt[animal.name] = animal.residents.length; });
  return countObjt;
}
function calculateEntry(entrants) {
  if (entrants === undefined || entrants === {}) { return 0; }
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const adultsPrice = Adult * data.prices.Adult;
  const childrenPrice = Child * data.prices.Child;
  const seniorsPrice = Senior * data.prices.Senior;
  return adultsPrice + childrenPrice + seniorsPrice;
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  const legible = {
    Tuesday: `Open from ${data.hours.Tuesday.open}am until ${data.hours.Tuesday.close - 12}pm`,
    Wednesday: `Open from ${data.hours.Wednesday.open}am until ${data.hours.Wednesday.close - 12}pm`,
    Thursday: `Open from ${data.hours.Thursday.open}am until ${data.hours.Thursday.close - 12}pm`,
    Friday: `Open from ${data.hours.Friday.open}am until ${data.hours.Friday.close - 12}pm`,
    Saturday: `Open from ${data.hours.Saturday.open}am until ${data.hours.Saturday.close - 12}pm`,
    Sunday: `Open from ${data.hours.Sunday.open}am until ${data.hours.Sunday.close - 12}pm`,
    Monday: 'CLOSED',
  };
  if (dayName === undefined) { return legible; }
  return { [dayName]: legible[dayName] };
}

function getOldestFromFirstSpecies(id) {
  const employee = employees.find((employe) => employe.id === id);
  const firstEspecieName = employee.responsibleFor[0];
  const firstEspecieResidents = getSpeciesByIds(firstEspecieName)[0].residents;
  let oldest = firstEspecieResidents[0];
  firstEspecieResidents.forEach((animal) => {
    if (animal.age > oldest.age) { oldest = animal; }
  });
  return Object.values(oldest);
}
function increasePrices(percentage) {
  const multi = 1 + (percentage / 100);
  const newAdult = data.prices.Adult * multi;
  const newSenior = data.prices.Senior * multi;
  const newChild = data.prices.Child * multi;
  data.prices = {
    Adult: Math.round(newAdult * 100) / 100,
    Senior: Math.round(newSenior * 100) / 100,
    Child: Math.round(newChild * 100) / 100,
  };
  return data.prices;
}
function getEmployeeCoverage(idOrName) {
  const objtcoverage = {};
  if (idOrName === undefined) {
    employees.forEach((employee) => {
      const allEmpRespons = employee.responsibleFor;
      const allEmpName = `${employee.firstName} ${employee.lastName}`;
      const allSpecieArray = [];
      allEmpRespons.forEach((especies) => {
        let speciesresp = getSpeciesByIds(especies)[0].name;
        allSpecieArray.push(speciesresp);
      });
      objtcoverage[allEmpName] = allSpecieArray;
    });
    return objtcoverage;
  }
  const empCover = employees.find((employee) => employee.id === idOrName || employee.firstName === idOrName || employee.lastName === idOrName);
  const empRespons = empCover.responsibleFor;
  const empName = `${empCover.firstName} ${empCover.lastName}`;
  const specieArray = [];
  empRespons.forEach((especies) => {
    let speciesresp = getSpeciesByIds(especies)[0].name;
    specieArray.push(speciesresp);
  });
  return { [empName]: specieArray };
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
