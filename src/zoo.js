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

const data = require('./data');

const { employees, hours, prices } = data;

function getSpeciesByIds(...ids) {
  // seu código aqui
  if (ids === null) return [];
  return (ids.map((id) => data.species.find((animal) => animal.id === id)));
}

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  const rightSpecies = data.species.find((element) => element.name === animal);
  const areAllOlder = rightSpecies.residents.every((animall) => animall.age >= age);
  return areAllOlder;
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) return ({});
  return employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return ({ ...personalInfo, ...associatedWith });
}

function isManager(id) {
  // seu código aqui
  const employeesManagers = employees.map((employee) => employee.managers);
  return employeesManagers.some((managers) => managers.some((manager) => manager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(species) {
  // seu código aqui
  if (species === undefined) {
    const animalsObject = {};
    data.species.forEach((animal) => {
      animalsObject[animal.name] = animal.residents.length;
    });
    return animalsObject;
  }
  const foundAnimal = data.species.find((animal) => animal.name === species);
  return foundAnimal.residents.length;
}

const verifyCases = (entrants) => {
  if (entrants === undefined) return 0;
  if (entrants === {}) return 0;
};
const assign0 = (entrants) => {
  if (entrants.Adult === undefined) entrants.Adult = 0;
  if (entrants.Child === undefined) entrants.Child = 0;
  if (entrants.Senior === undefined) entrants.Senior = 0;
};
function calculateEntry(entrants) {
  // seu código aqui
  if (verifyCases(entrants) === 0) return 0;
  assign0(entrants);
  return (entrants.Adult * prices.Adult + entrants.Child * prices.Child + entrants.Senior * prices.Senior);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
  if (dayName === undefined) {
    const daysObject = {};
    for (let index = 0; index < Object.keys(data.hours).length; index += 1) {
      daysObject[Object.keys(hours)[index]] = `Open from ${hours[Object.keys(hours)[index]].open}am until ${hours[Object.keys(hours)[index]].close - 12}pm`;
    }
    daysObject.Monday = 'CLOSED';
    return daysObject;
  }
  if (dayName === 'Monday') return { [dayName]: 'CLOSED' };
  return { [dayName]: `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm` };
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
  const employeeObject = employees.find((employee) => employee.id === id);
  const animalsArray = data.species.map((animal) => animal.id);
  const animalFound = animalsArray.find((animals) => animals === employeeObject.responsibleFor[0]);
  const animalFound1 = data.species.find((animal) => animal.id === animalFound);
  let animalFound2 = animalFound1.residents[0];
  animalFound1.residents.forEach((animal, index) => {
    if (animal.age > animalFound2.age) {
      animalFound2 = animal;
    }
  });
  // for (let index = 0; index < animalFound1.residents.length; index += 1) {
  //   if (animalFound1.residents[index].age > animalFound2.age) animalFound2 = animalFound1.residents[index];
  // }
  return ([animalFound2.name, animalFound2.sex, animalFound2.age]);
}

function increasePrices(percentage) {
  // seu código aqui
  const aux = (percentage / 100) + 1;
  const newAdultPrice = Math.round((prices.Adult * aux) * 100) / 100;
  const newChildPrice = Math.round((prices.Child * aux) * 100) / 100;
  const newSeniorPrice = Math.round((prices.Senior * aux) * 100) / 100;
  prices.Adult = newAdultPrice;
  prices.Child = newChildPrice;
  prices.Senior = newSeniorPrice;
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
