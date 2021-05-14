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

function getSpeciesByIds(...ids) {
  if (!ids) return [];
  const getSpecieAnimal = data.species.filter((el) => ids.some((id) => id === el.id));
  return getSpecieAnimal;
}

function getAnimalsOlderThan(animal, age) {
  data.species.filter((age));
  // seu código aqui
}

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find((elemento) => elemento.firstName === employeeName || elemento.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
}

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function countAnimals(especie1) {
  if (!especie1) {
    return data.species.reduce((acumulador, valorAtual) => {
      acumulador[valorAtual.name] = valorAtual.residents.length;
      return acumulador;
    }, {});
  }
  return data.species.find((especie) => especie.name === especie1).residents.length;
}

function calculateEntry(entrants) {
  if (typeof entrants === 'undefined') {
    return 0;
  }
  let priceTotal = 0;
  if (entrants.Adult) priceTotal += data.prices.Adult * entrants.Adult;
  if (entrants.Child) priceTotal += data.prices.Child * entrants.Child;
  if (entrants.Senior) priceTotal += data.prices.Senior * entrants.Senior;
  return priceTotal;
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
  const adultPrice = ((data.prices.Adult / 100) * percentage) + data.prices.Adult + 0.001;
  const childPrice = ((data.prices.Child / 100) * percentage) + data.prices.Child + 0.001;
  const seniorPrice = ((data.prices.Senior / 100) * percentage) + data.prices.Senior + 0.001;
  data.prices.Adult = Number(adultPrice.toFixed(2));
  data.prices.Child = Number(childPrice.toFixed(2));
  data.prices.Senior = Number(seniorPrice.toFixed(2));
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
