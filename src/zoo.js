const { prices } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  const { species } = data;
  return ids.map((id) => species.find((animal) => animal.id === id));
}

function getAnimalsOlderThan(animal, age) {
  const { species } = data;
  return species.find((specieName) => specieName.name === animal).residents.every((resident) => resident.age >= age);
}

function getEmployeeByName(employeeName) {
  const { employees } = data;
  if (!employeeName) return {};
  return employees.find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const CE = {};
  return Object.assign(CE, personalInfo, associatedWith);
}

function isManager(id) {
  // consulta em https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
  const { employees } = data;
  return employees.some((people) => people.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const { employees } = data;
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(species) {
  const numberOfAnimals = data.species.reduce((acc, animal) => {
    acc[animal.name] = animal.residents.length;
    return acc;
  }, {});
  if (species) {
    return numberOfAnimals[species];
  }
  return numberOfAnimals;
}

function calculateEntry(entrants) {
  // seu código aqui
  if (!entrants) return 0;
  return Object.keys(entrants).reduce((totalPrice, entries) => totalPrice + (prices[entries] * entrants[entries]), 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  const keyhour = Object.keys(data.hours);
  if (!dayName) {
    return keyhour.reduce((acc,day) => {
      acc[day] = `Open from ${data.hours[day].open}am until ${(data.hours[day].close) - 12}pm`;
      acc.Monday = 'CLOSED';
      return acc;
    }, {});
  }
  if (dayName === 'Monday') return { Monday: 'CLOSED' };
  return { [dayName]: `Open from ${data.hours[dayName].open}am until ${data.hours[dayName].close - 12}pm` };
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  const entriesPrices = Object.entries(prices);
  const multiplier = 1 + (percentage / 100);
  entriesPrices.forEach(([type, price]) => {
    prices[type] = Math.ceil((price * multiplier) * 100) / 100;
  });
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
