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

const getSpeciesByIds = (...ids) => data.species.filter((species) => ids.some((id) => species.id === id));

// o Rodolfo Rezende me ajudou nessa turma 11.
function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  return data.species.find(({ name }) => name === animal).residents.every((value) => value.age >= age);
}

// o Rodolfo Rezende  e o Jean ambos da turma 11, me ajudaram nessa.
function getEmployeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName);
}

const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });

const isManager = (id) => data.employees.some((getManager) => getManager.managers.includes(id));

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(specie) {
  const animaisTotal = {};
  if (!specie) {
    data.species.forEach(({ name, residents }) => {
      animaisTotal[name] = residents.length;
    });
    return animaisTotal;
  }
  return data.species.find(({ name }) => specie === name).residents.length;
}

function calculateEntry(entrants) {
  // seu código aqui
  if (!entrants || entrants === {}) return 0;
  return Object.keys(entrants).reduce((acc, value) => acc + (data.prices[value] * entrants[value]), 0);
}

// Rodolfo Resende Turma 11 me ajudou a fazer essa questão
const getNameAnimal = (residents, sorted, sex) => {
  const animalName = residents.reduce((acc, value) => (sex && value.sex !== sex ? acc : acc.concat(value.name)), []);
  return sorted ? animalName.sort() : animalName;
};

function getAnimalMap(options = {}) {
  let objectResult = {};
  let arrayRegions = ['NE', 'NW', 'SE', 'SW'];
  arrayRegions.forEach((regions) => {
    objectResult[regions] = [];
  });
  data.species.map((animal) => (options.includeNames ? objectResult[animal.location].push({ [animal.name]: getNameAnimal(animal.residents, options.sorted, options.sex) }) : objectResult[animal.location].push(animal.name)));
  return objectResult;
}

// o Rodolfo Rezende me ajudou nessa.
function getSchedule(dayName) {
  const result = {};
  if (dayName && dayName !== 'Monday') {
    result[dayName] = `Open from ${data.hours[dayName].open}am until ${data.hours[dayName].close - 12}pm`;
    return result;
  }
  if (dayName === 'Monday') {
    return { Monday: 'CLOSED' };
  }
  return {
    Tuesday: `Open from ${data.hours.Tuesday.open}am until ${data.hours.Tuesday.close - 12}pm`,
    Wednesday: `Open from ${data.hours.Wednesday.open}am until ${data.hours.Wednesday.close - 12}pm`,
    Thursday: `Open from ${data.hours.Thursday.open}am until ${data.hours.Thursday.close - 12}pm`,
    Friday: `Open from ${data.hours.Friday.open}am until ${data.hours.Friday.close - 12}pm`,
    Saturday: `Open from ${data.hours.Saturday.open}am until ${data.hours.Saturday.close - 12}pm`,
    Sunday: `Open from ${data.hours.Sunday.open}am until ${data.hours.Sunday.close - 12}pm`,
    Monday: 'CLOSED',
  };
}

// o Rodolfo Rezende me ajudou nessa.
function getOldestFromFirstSpecies(id) {
  const getId = data.employees.filter((employee) => employee.id === id)[0].responsibleFor[0];
  const getAnimal = data.species.filter((specie) => specie.id === getId)[0].residents;
  const getOldSpecies = getAnimal.reduce((acc, list) => Math.max(acc, list.age), 0);
  const result = getAnimal.find(({ age }) => age === getOldSpecies);
  return [result.name, result.sex, result.age];
}
console.log(getOldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992'));

function increasePrices(percentage) {
  const priceAdult = ((data.prices.Adult / 100) * percentage + data.prices.Adult + 0.001);
  const priceChild = ((data.prices.Child / 100) * percentage + data.prices.Child + 0.001);
  const priceSenior = ((data.prices.Senior / 100) * percentage + data.prices.Senior + 0.001);
  data.prices.Adult = Number(priceAdult.toFixed(2));
  data.prices.Child = Number(priceChild.toFixed(2));
  data.prices.Senior = Number(priceSenior.toFixed(2));
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
  const getAnimalEmployee = {};
  if (!idOrName) {
    data.employees.forEach(({ firstName, lastName, responsibleFor }) => {
      getAnimalEmployee[`${firstName} ${lastName}`] = responsibleFor.map((animalId) => data.species.find(({ id }) => id === animalId).name);
    });
    return getAnimalEmployee;
  }
  data.employees.filter(({ id, firstName, lastName }) => id === idOrName || lastName === idOrName || firstName === idOrName).forEach(({ firstName, lastName, responsibleFor }) => {
    getAnimalEmployee[`${firstName} ${lastName}`] = responsibleFor.map((animalId) => data.species.find(({ id }) => id === animalId).name);
  });
  return getAnimalEmployee;
}
// console.log(getEmployeeCoverage());
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
