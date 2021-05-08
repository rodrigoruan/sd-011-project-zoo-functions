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

// const { species } = require('./data');
// const { employees } = require('./data');
const data = require('./data');

// Requisito 1
const getSpeciesByIds = (...ids) => data.species.filter((specie) => ids.find((id) => specie.id === id));

// Requisito 2
const getAnimalsOlderThan = (animal, age) => data.species.some((specie) => specie.name === animal && specie.residents.every((spc) => spc.age > age));

// Requisito 3
const getEmployeeByName = (employeeName) => (!employeeName ? {} : data.employees.find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName));

// Requisito 4
const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });

// Requisito 5
const isManager = (id) => data.employees.some((employee) => employee.managers.includes(id));

// Requisito 6
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

// Requisito 7
function countAnimals(species) {
  if (!species) {
    return data.species.reduce((acc, { name, residents }) => {
      acc[name] = residents.length;
      return acc;
    }, {});
  }
  return data.species.find((specie) => specie.name === species).residents.length;
}

// Requisito 8
function calculateEntry(entrants) {
  if (!entrants) return 0;
  const { Adult, Child, Senior } = entrants;
  let sum = 0;
  if (Adult) sum += data.prices.Adult * Adult;
  if (Child) sum += data.prices.Child * Child;
  if (Senior) sum += data.prices.Senior * Senior;
  return sum;
}

function getAnimalMap(options) {
  // seu código aqui
}

// Requisito 10
function getSchedule(dayName) {
  if (!dayName) {
    return {
      Tuesday: `Open from ${data.hours.Tuesday.open}am until ${data.hours.Tuesday.close - 12}pm`,
      Wednesday: `Open from ${data.hours.Wednesday.open}am until ${data.hours.Wednesday.close - 12}pm`,
      Thursday: `Open from ${data.hours.Thursday.open}am until ${data.hours.Thursday.close - 12}pm`,
      Friday: `Open from ${data.hours.Friday.open}am until ${data.hours.Friday.close - 12}pm`,
      Saturday: `Open from ${data.hours.Saturday.open}am until ${data.hours.Saturday.close - 12}pm`,
      Sunday: `Open from ${data.hours.Sunday.open}am until ${data.hours.Sunday.close - 12}pm`,
      Monday: 'CLOSED',
    };
  }
  if (dayName === 'Monday') return { Monday: 'CLOSED' };
  let myObj = {};
  myObj[dayName] = `Open from ${data.hours[dayName].open}am until ${data.hours[dayName].close - 12}pm`;
  return myObj;
}

console.log(getSchedule());
console.log(getSchedule('Monday'));

// Requisito 11
function getOldestFromFirstSpecies(id) {
  const species = data.employees.find((employee) => employee.id === id).responsibleFor[0];
  const resident = data.species.find((specie) => specie.id === species).residents.sort((resident1, resident2) => resident2.age - resident1.age)[0];
  const { name, sex, age } = resident;
  return [name, sex, age];
}

// console.log(getOldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992'));
// console.log(getOldestFromFirstSpecies('4b40a139-d4dc-4f09-822d-ec25e819a5ad'));

function increasePrices(percentage) {
  const { Adult, Child, Senior } = data.prices;

  const Adult2 = (Adult + ((percentage / 100) * Adult + 0.001)).toFixed(2);
  const Child2 = (Child + ((percentage / 100) * Child + 0.001)).toFixed(2);
  const Senior2 = (Senior + ((percentage / 100) * Senior + 0.001)).toFixed(2);

  data.prices.Adult = parseFloat(Adult2);
  data.prices.Child = parseFloat(Child2);
  data.prices.Senior = parseFloat(Senior2);
}

// Requisito 13
function getEmployeeCoverage(idOrName) {
  // const employee = data.employees.find((employee) => employee.id === idOrName || employee.firstName === idOrName || employee.lastName === idOrName);
  // const nameEmployee = `${employee.firstName} ${employee.lastName}`;
  // let myObj = {};
  // let responsibleFor =
  // myObj[nameEmployee] = ;
  // return myObj;
}

console.log(getEmployeeCoverage('4b40a139-d4dc-4f09-822d-ec25e819a5ad'));
console.log(getEmployeeCoverage('Stephanie'));

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
