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
  return species.filter((specie) => ids.some((id) => specie.id === id));
}

function getAnimalsOlderThan(animal, age) {
  return species
    .find((specie) => specie.name === animal)
    .residents.every((specie) => specie.age >= age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return employees.find(
    (employee) => employee.firstName === employeeName || employee.lastName === employeeName,
  );
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function countAnimals(animal) {
  const countForSpecies = species.reduce((count, specie) => {
    count[specie.name] = specie.residents.length;
    return count;
  }, {});
  if (animal !== undefined) {
    return countForSpecies[animal];
  }
  return countForSpecies;
}

function calculateEntry(entrants) {
  if (typeof entrants !== 'object' || Object.keys(entrants).length === 0) return 0;
  return Object.keys(entrants).reduce(
    (acc, key) => acc + entrants[key] * prices[key], 0,
  );
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  const agenda = {};

  Object.keys(hours).forEach((day) => {
    if (day !== 'Monday') {
      agenda[day] = `Open from ${hours[day].open}am until ${
        hours[day].close - 12
      }pm`;
    } else agenda[day] = 'CLOSED';
  });
  if (dayName) {
    return { [dayName]: agenda[dayName] };
  }
  return agenda;
}

function getOldestFromFirstSpecies(id) {
  // localizar o funcionario pelo id e buscar o primeiro animal que ele é responsável: retorna somente o id do animal
  const employeeResponsive = employees.find((employee) => employee.id === id).responsibleFor[0];
  // localizar a especie pertencente ao id: retorna um objeto com as informações do animal que aquele funcionário é responsável
  const firstSpecie = species.find((specie) => specie.id === employeeResponsive);
  // Procurar o animal mais velho e retornar o array com as informações: name, sex e age.
  return Object.values(firstSpecie.residents.reduce((OldAnimal, animalAtual) => (OldAnimal.age > animalAtual.age ? OldAnimal : animalAtual)));
}

function increasePrices(percentage) {
  const calcPercentage = percentage / 100;
  const adult = parseFloat((prices.Adult + ((prices.Adult) * calcPercentage)) * 100).toPrecision(4) / 100;
  const senior = parseFloat((prices.Senior + ((prices.Senior) * calcPercentage)) * 100).toPrecision(4) / 100;
  const child = parseFloat((data.prices.Child + ((data.prices.Child) * calcPercentage)) * 100).toPrecision(4) / 100;
  prices.Adult = adult;
  prices.Senior = senior;
  prices.Child = child;
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
