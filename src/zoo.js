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
  let animalsIds = [];

  data.species.forEach((animalById) => {
    if (ids.includes(animalById.id)) {
      animalsIds.push(animalById);
    }
  });
  return animalsIds;
}

function getAnimalsOlderThan(animal, age) {
  return data.species.find((animal2) => animal2.name === animal).residents.every((age2) => age2.age >= age);
}

function getEmployeeByName(employeeName) {
  let empregadoProcurado;
  if (employeeName === undefined) {
    empregadoProcurado = {};
  } else {
    empregadoProcurado = data.employees.find((procura) => procura.firstName === employeeName || procura.lastName === employeeName);
  }
  return empregadoProcurado;
}

function createEmployee(personalInfo, associatedWith) {
  let newEmployee = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
  return newEmployee;
}

function isManager(id) {
  return data.employees.some((gerente) => gerente.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const novoEmpregado = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(novoEmpregado);
  return data.employees;
}

function countAnimals(species) {
  let quantidadeAnimal = {};
  if (species === null || species === undefined) {
    data.species.forEach((specie) => {
      quantidadeAnimal[specie.name] = specie.residents.length;
    });
    return quantidadeAnimal;
  }
  return data.species.find((specie) => specie.name === species).residents.length;
}

function calculateEntry(entrants) {
  if (entrants === {} || entrants === undefined || entrants === null) {
    return 0;
  }
  return Object.keys(entrants).reduce((accumulator, valor) => accumulator + (data.prices[valor] * entrants[valor]), 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  const schedule = {
    Tuesday: `Open from ${data.hours.Tuesday.open}am until ${data.hours.Tuesday.close - 12}pm`,
    Wednesday: `Open from ${data.hours.Wednesday.open}am until ${data.hours.Wednesday.close - 12}pm`,
    Thursday: `Open from ${data.hours.Thursday.open}am until ${data.hours.Thursday.close - 12}pm`,
    Friday: `Open from ${data.hours.Friday.open}am until ${data.hours.Friday.close - 12}pm`,
    Saturday: `Open from ${data.hours.Saturday.open}am until ${data.hours.Saturday.close - 12}pm`,
    Sunday: `Open from ${data.hours.Sunday.open}am until ${data.hours.Sunday.close - 12}pm`,
    Monday: 'CLOSED',
  };

  if (dayName === undefined || dayName === null) {
    return schedule;
  }
  return {
    [dayName]: schedule[dayName],
  };
}

function getOldestFromFirstSpecies(id) {
  const empregados = data.employees.find((foundEmployees) => foundEmployees.id === id).responsibleFor[0];
  return Object.values(data.species
    .find((foundSpecie) => foundSpecie.id === empregados)
    .residents.sort((age1, age2) => age2.age - age1.age)[0]);
}

function increasePrices(percentage) {
  const raise = 1 + (percentage / 100);
  data.prices.Adult = Math.round(data.prices.Adult * raise * 100) / 100;
  data.prices.Senior = Math.round(data.prices.Senior * raise * 100) / 100;
  data.prices.Child = Math.round(data.prices.Child * raise * 100) / 100;

  return data.prices;
}

function getEmployeeCoverage(idOrName) {
  const retorno = {};
  if (idOrName === null || idOrName === undefined) {
    data.employees.forEach((empregado) => {
      retorno[`${empregado.firstName} ${empregado.lastName}`] = empregado.responsibleFor.map((id) => data.species.find((animals) => animals.id === id).name);
    });
    return retorno;
  }
  data.employees.filter((empregado) => empregado.firstName === idOrName || empregado.lastName === idOrName || empregado.id === idOrName).forEach((empregadoForEach) => {
    retorno[`${empregadoForEach.firstName} ${empregadoForEach.lastName}`] = empregadoForEach.responsibleFor.map((id) => data.species.find((animals) => animals.id === id).name);
  });
  return retorno;
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
