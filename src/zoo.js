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

function getSpeciesByIds(...idCode) {
  // Ela retorna um array contendo as espécies referentes aos ids passados como parâmetro, podendo receber um ou mais ids.
  if (!idCode) {
    return [];
  }
  return data.species.filter((specie) => specie.id === idCode);
}

function getAnimalsOlderThan(animal, age) {
  // A partir do nome de uma espécie e uma idade mínima, 
  // verifica se todos os animais daquela espécie possuem a idade mínima especificada.
  return data.species.find((specie) => specie.name === animal).every((resident) => resident.age >= age);
}

function getEmployeeByName(employeeName) {
  // Busca das pessoas colaboradoras através do primeiro ou do último nome delas.
  if (!employeeName) {
    return {};
  }
  return data.employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // const ({ id, firstName, lastName } = personalInfo);
  // Capaz de criar um objeto equivalente ao de uma pessoa colaboradora, a partir de informações recebidas nos parâmetros.
  // const employeePersonalInfo = data.employees.map((personalInfo) => ({ id: personalInfo.id, firstName: personalInfo.firstName, lastName: personalInfo.lastName }));
  // const employeeAssociatedWith = data.employees.map((associatedWith) => ({ managers: associatedWith.managers, responsibleFor: associatedWith.responsibleFor }));

  // return employeePersonalInfo;
}

function isManager(id) {
  // Verifica se uma pessoa colaboradora, a partir de seu id, ocupa cargo de gerência.
  return data.employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function countAnimals(species) {
  // seu código aqui
}

function calculateEntry(entrants) {
  // seu código aqui
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
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
