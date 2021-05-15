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

const { employees, hours, species, prices } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  return data.species.filter((specie) => ids.find((specieId) => specieId === specie.id));
}

function getAnimalsOlderThan(animal, age) {
  return data.species.find((specie) => (specie.name === animal)).residents.every((specieAge) => (specieAge.age >= age));
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return data.employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some((manager) => manager.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const NewEmployee = { id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(NewEmployee);
  return employees;
}
// ex. feito com a ajuda da colega Mikaela Braga
function countAnimals(species1) {
  if (!species1) {
    return data.species.reduce((acc, animal) => {
      acc[animal.name] = animal.residents.length;
      return acc;
    }, {}); // vai retornar um objeto com os valores e chaves;
  }
  return data.species.find((specie) => specie.name === species1).residents.length;
}

// * Fonte: https://stackoverflow.com/questions/61311246/how-to-mutliply-two-objects-by-key-and-sum *//
function calculateEntry(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  } const totEnt = Object.keys(entrants).reduce((acc, currentPerson) => acc + entrants[currentPerson] * data.prices[currentPerson], 0);
  return totEnt;
}
function getAnimalMap(options) {
  // seu código aqui
}
// feito com a ajuda da Gabriela Feijó
//* repositório: https://github.com/tryber/sd-011-project-zoo-functions/pull/59/files
function getSchedule(dayName) {
  if (dayName === 'Monday') return { Monday: 'CLOSED' };
  if (dayName === undefined) {
    return Object.keys(hours).reduce((acc, currDay) => {
      acc[currDay] = `Open from ${hours[currDay].open}am until ${hours[currDay].close - 12}pm`; // o acc recebe como chave o currday e como valor a template mostrada
      acc.Monday = 'CLOSED';
      return acc;
    }, {});
  }
  return { [dayName]: `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm` };
}
// feito com a dica da Laura Gusmão
function getOldestFromFirstSpecies(id) {
  const findEmployees = employees.find((employee) => employee.id === id); // encontra o Id utilizado como parâmetro
  const findAnimals = findEmployees.responsibleFor[0]; // acessa a primeira espécie do animal gerenciado pelo funcionário
  const getIdAnimals = species.find((animalsId) => animalsId.id === findAnimals); // dessa forma eu acesso o objeto que tem o id que eu encontrei anteriormente
  const getHighestAge = getIdAnimals.residents.reduce((acc, getAnimalAge) => (acc.age > getAnimalAge.age ? acc : getAnimalAge));
  const justValues = Object.values(getHighestAge);
  return justValues;
}

function increasePrices(percentage) {
  // seu código aqui
  const getPricesKeys = Object.keys(prices); // fazemos deste modo para ter permissão e acessar todas as chaves do objeto
  const getKeys = getPricesKeys.forEach((newPricesKeys) => {
    prices[newPricesKeys] = Math.round(prices[newPricesKeys] * (1 + percentage / 100) * 100) / 100;
  });
  return getKeys;
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
