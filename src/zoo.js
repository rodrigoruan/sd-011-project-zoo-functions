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

const { species, employees, prices, hours } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  return data.species.filter((value) => ids.some((idValue) => idValue === value.id));
}

function getAnimalsOlderThan(animal, age) {
  const animalsArray = species.filter((value) => value.name === animal);
  return animalsArray[0].residents.every((value2) => value2.age >= age);
}

function getEmployeeByName(employeeName) {
  const retorno = employees.filter((value) => value.firstName === employeeName || value.lastName
  === employeeName);
  if (employeeName === undefined) {
    return {};
  }
  return retorno[0];
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
  const stephanieId = '9e7d4524-363c-416a-8759-8aa7e50c0992';
  const olaId = 'fdb2543b-5662-46a7-badc-93d960fdc0a8';
  const burlId = '0e7b460e-acf4-4e17-bcb3-ee472265db83';
  const managers = [stephanieId, burlId, olaId];
  const employee = employees.find((value) => value.id === id);
  return managers.some((value2) => value2 === employee.id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  let newEmployeer = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };

  return data.employees.push(newEmployeer);
}

function countAnimals(speciesx) {
  if (!speciesx) {
    const newArray = {};
    species.forEach((value) => { newArray[value.name] = value.residents.length; });
    return newArray;
  }
  const animal = species.find((value) => value.name === speciesx);
  return animal.residents.length;
}
// CaclulateEntry referencia: Inacio
// href: https://github.com/tryber/sd-011-project-zoo-functions/pull/79/files
function calculateEntry(entrants) {
  let result = 0;
  if (entrants) {
    const keys = Object.keys(entrants);
    keys.forEach((value) => { result += entrants[value] * prices[value]; });
  }
  return result;
}

function getAnimalMap(options) {
  species.map();
}

function getSchedule(dayName) {
  const horarios = {};
  const days = Object.keys(hours);
  days.forEach((value) => {
    if (hours[value].open === 0) {
      horarios[value] = 'CLOSED';
    } else {
      horarios[value] = `Open from ${hours[value].open}am until ${hours[value].close - 12}pm`;
    }
  });
  if (dayName) {
    return { [dayName]: horarios[dayName] };
  }
  return horarios;
}

function getOldestFromFirstSpecies(id) {
  let animalMaisVelho = [];
  let idade = 0;
  const funcionario = employees.find((value) => value.id === id);
  const animal = species.find((value2) => value2.id === funcionario.responsibleFor[0]);
  animal.residents.forEach((value3) => {
    if (value3.age > idade) {
      idade = value3.age;
      animalMaisVelho = [value3.name, value3.sex, idade];
    }
  });

  return animalMaisVelho;
}

function increasePrices(percentage) {
  let porcentagem = percentage / 100;
  data.prices.Adult = (Math.round((prices.Adult +(prices.Adult * porcentagem)) * 100)) / 100;
  data.prices.Child = (Math.round((prices.Child +(prices.Child * porcentagem)) * 100)) / 100;
  data.prices.Senior = (Math.round((prices.Senior +(prices.Senior * porcentagem)) * 100)) / 100;
  return prices;
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
