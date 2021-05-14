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

const { employees, species, prices, hours } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  return species.filter((specie) => ids.some((value) => value === specie.id));
}

function getAnimalsOlderThan(animal, age) {
  return species.find((specie) => specie.name === animal)
    .residents
    .every((resident) => resident.age > age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return employees.find((employee) => (employee.firstName === employeeName || employee.lastName === employeeName));
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(Species) {
  if (!Species) {
    const speciesTotals = {};
    const criaObjeto = (animal) => {
      speciesTotals[animal.name] = animal.residents.length;
    };
    species.forEach(criaObjeto);
    return speciesTotals;
  }
  return species.find((specie) => specie.name === Species).residents.length;
}

function calculateEntry(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
}
// PRICES NÂO È ARRAY
//   const Total = (acc, person) => {
//     acc = prices[person] * entrants[person];
//     return acc;
//   };
//   const getNumbers = ({ entrants }) => entrants;
//   return entrants.map(getNumbers); //.reduce(Total)
// }
// console.log(calculateEntry({ Adult: 2, Child: 3, Senior: 1 }));

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  let week = Object.entries(hours); // HOURS NÃO È ARRAY
  if (dayName) {
    week = week.filter((item) => item[0] === dayName);
  }
  const schedWriter = (acc, cur) => {
    let text = '';
    if (cur[0] !== 'Monday') {
      text = `Open from ${cur[1].open}am until ${cur[1].close - 12}pm`;
    } else text = 'CLOSED';
    acc[cur[0]] = text;
    return acc;
  };
  return week.reduce(schedWriter, { });
}

function getOldestFromFirstSpecies(id) {
  const firstSpecieId = employees.find((employee) => employee.id === id).responsibleFor[0];
  const specieResidents = species.find((specie) => specie.id === firstSpecieId).residents;
  const oldest = specieResidents.sort((a, b) => (b.age > a.age ? 1 : -1))[0];
  const { name, sex, age } = oldest;
  return [name, sex, age];
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
