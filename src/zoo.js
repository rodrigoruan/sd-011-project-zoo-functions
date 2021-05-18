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

const { prices } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  return data.species.filter((Species) => ids.some((id) => Species.id === id));
}

function getAnimalsOlderThan(animal, age) {
  const findResidents = data.species.find((item) => item.name === animal).residents;
  const ageCheck = findResidents.every((item) => (item.age > age));
  return ageCheck;
}

function getEmployeeByName(employeeName) {
  const findEmployee = data.employees.find((person) => person.firstName === employeeName || person.lastName === employeeName);
  return (employeeName === undefined) ? {} : findEmployee;
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
  return data.employees.some((elements) => elements.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return data.employees.push(newEmployee);
}

function countAnimals(species) {
  if (species === undefined) {
    let animals = {};
    data.species.forEach((animal) => { animals[animal.name] = animal.residents.length; });
    return animals;
  }
  const total = (counter) => counter + 1;
  const animalsReturn = data.species.filter((animal) => animal.name === species);
  const { residents: totalAnimals } = animalsReturn[0];
  return totalAnimals.reduce(total, 0);
}

function calculateEntry(entrants) {
  if (entrants === undefined) {
    return 0;
  }
  return Object.keys(entrants).reduce((previousValue, currentValue) => previousValue + (prices[currentValue] * entrants[currentValue]), 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  /** consultei o repositório do Igor Mendez
   * Link:https://github.com/tryber/sd-011-project-zoo-functions/pull/158/files */
  const dayOfWeek = {
    Tuesday: `Open from ${data.hours.Tuesday.open}am until ${data.hours.Tuesday.close - 12}pm`,
    Wednesday: `Open from ${data.hours.Wednesday.open}am until ${data.hours.Wednesday.close - 12}pm`,
    Thursday: `Open from ${data.hours.Thursday.open}am until ${data.hours.Thursday.close - 12}pm`,
    Friday: `Open from ${data.hours.Friday.open}am until ${data.hours.Friday.close - 12}pm`,
    Saturday: `Open from ${data.hours.Saturday.open}am until ${data.hours.Saturday.close - 12}pm`,
    Sunday: `Open from ${data.hours.Sunday.open}am until ${data.hours.Sunday.close - 12}pm`,
    Monday: 'CLOSED',
  };
  if (!dayName) {
    return dayOfWeek;
  }
  return {
    [dayName]: dayOfWeek[dayName],
  };
}

function getOldestFromFirstSpecies(id) {
  const animal = data.employees.find((factor) => factor.id === id).responsibleFor[0];
  const zooAnimal = data.species.find((factor) => factor.id === animal);
  let older = zooAnimal.residents[0];
  zooAnimal.residents.forEach((element) => {
    if (element.age > older.age) {
      older = element;
    }
  });
  const info = Object.values(older);
  return info;
}

function increasePrices(percentage) {
  let increase = 1 + (percentage / 100);
  data.prices.Child = Math.round(data.prices.Child * increase);
  data.prices.Adult = Math.round(data.prices.Adult * increase);
  data.prices.Senior = Math.round(data.prices.Senior * increase);
  return data.prices;
}

function getEmployeeCoverage(idOrName) {

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
