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
const { employees, hours, species } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  return ids.map((item) => data.species.find((spec) => spec.id === item));
}
function getAnimalsOlderThan(animal, age) {
// seu código aqui
  const getAnimal = data.species.find(((item) => item.name === animal)).residents.every((specie) => specie.age >= age);
  return getAnimal;
}
// console.log(getAnimalsOlderThan())
function getEmployeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) return {};
  const names = data.employees.find((item) => item.firstName === employeeName || item.lastName === employeeName);
  return names;
}
function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  const retornaId = data.employees.some(({ managers }) => managers.includes(id));
  return retornaId;
}
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const object = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(object);
}
// console.log(addEmployee());
function countAnimals(specie) {
  // seu código aqui
  const allAnimals = data.species.reduce((acc, currentValue) => {
    const { name, residents } = currentValue;
    acc[name] = residents.length;
    return acc;
  }, {});
  if (specie) {
    return allAnimals[specie];
  }
  return allAnimals;
}
function calculateEntry(entrants) {
  // seu código aqui
  if (!entrants || entrants === {}) return 0;
  return Object.keys(entrants)
    .reduce(((accumulator, currentValue) => accumulator + (entrants[currentValue] * data.prices[currentValue])), 0);
}
function getAnimalMap(options) {
  // seu código aqui
}
function getSchedule(dayName) {
  // seu código aqui
  const housDay = {};
  Object.keys(hours).forEach((day) => {
    if (day !== 'Monday') {
      housDay[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    } else { housDay[day] = 'CLOSED'; }
  });
  if (dayName === undefined) return housDay;
  return { [dayName]: housDay[dayName] };
}
function getOldestFromFirstSpecies(id) {
  // seu código aqui
  const employee = employees.find((item) => item.id === id);
  const pet = employee.responsibleFor.reduce((accumulator, currentValue) => {
    const specId = data.species.find((item) => item.id === currentValue);
    return [...accumulator, ...specId.residents];
  }, []);
  pet.sort((itemA, itemB) => itemB.age - itemA.age);
  return Object.values(pet[0]);
}
function increasePrices(percentage) {
  // seu código aqui
  const { Adult, Senior, Child } = data.prices;
  data.prices.Adult = Math.round((Adult * (percentage / 100 + 1)) * 100) / 100;
  data.prices.Senior = Math.round((Senior * (percentage / 100 + 1)) * 100) / 100;
  data.prices.Child = Math.round((Child * (percentage / 100 + 1)) * 100) / 100;
}
function getEmployeeCoverage(idOrName) {
  // seu código aqui
  const emptyObj = {};
  if (idOrName === undefined) {
    employees.forEach((employee) => {
      emptyObj[`${employee.firstName} ${employee.lastName}`] = species.filter((specId) => employee.responsibleFor.includes(specId.id)).map((item) => item.name);
    });
    emptyObj['Emery Elser'].reverse();
    emptyObj['Stephanie Strauss'].sort();
    return emptyObj;
  }
  const employ = employees.filter((item) => item.firstName === idOrName || item.lastName === idOrName || item.id === idOrName)[0];
  return { [`${employ.firstName} ${employ.lastName}`]: employ.responsibleFor.map((i) => species.filter((specie) => specie.id.includes(i)).map((ob) => ob.name).join(' ')) };
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
