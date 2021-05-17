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
  const arrSpecies = species.filter((specie) => ids.includes(specie.id));
  return arrSpecies;
}

function getAnimalsOlderThan(animal, age) {
  const animalsArr = species.filter((specie) => specie.name === animal)[0].residents;
  return animalsArr.every((animal1) => animal1.age > age);
}

function getEmployeeByName(employeeName) {
  if (employeeName) {
    return data.employees.filter((employee) => employeeName === employee.firstName || employeeName === employee.lastName)[0];
  }
  return {};
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(name) {
  if (name) {
    const specieName = species.filter((specie) => specie.name === name);
    return specieName[0].residents.length;
  }
  const allAnimals = {};
  for (let animal of species) {
    allAnimals[animal.name] = animal.residents.length;
  }
  return allAnimals;
}

function calculateEntry(entrants) {
  if (entrants === undefined || Object.values(entrants).length === 0) {
    return 0;
  }
  let value = 0;
  for (let key of Object.keys(entrants)) {
    value += data.prices[key] * entrants[key];
  }
  return value;
}

function getAnimalMap() {
}

function getSchedule(day) {
  const days = {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED',
  };
  if (day) {
    const dictTemp = {};
    dictTemp[day] = days[day];
    return dictTemp;
  }
  return days;
}

function getOldestFromFirstSpecies(id1) {
  const animalId = data.employees.find((employee) => employee.id === id1).responsibleFor[0]; // busca o primeiro animal do funcionario
  const oldestAnimal = species.filter((animal) => animal.id === animalId)[0].residents.sort((resident1, resident2) => resident2.age - resident1.age)[0]; // KAKSJDASKDJASKJD 1 to passando um filtro pra buscar o animal do id, depois to dando um sort nos residents pra pegar o mais velho
  return [oldestAnimal.name, oldestAnimal.sex, oldestAnimal.age];
}

function increasePrices(percentage) {
  data.prices.Adult = Number((data.prices.Adult + data.prices.Adult * (percentage / 100) + 0.001).toFixed(2));
  data.prices.Senior = Number((data.prices.Senior + data.prices.Senior * (percentage / 100) + 0.001).toFixed(2));
  data.prices.Child = Number((data.prices.Child + data.prices.Child * (percentage / 100) + 0.001).toFixed(2));
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
