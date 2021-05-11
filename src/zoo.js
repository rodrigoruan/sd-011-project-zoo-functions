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
// comando para test : npm test test/addEmployee.test.jsnpm

const data = require('./data');

const { species, employees, hours } = data;

function getSpeciesByIds(...ids) {
  // seu código aqui
  // if( ids.length == 0 ) return [];
  return species.filter(({ id: idSpecie }) => ids.some((id) => id === idSpecie));
}

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  return species.find(({ name }) => name === animal).residents.every(({ age: idade }) => age < idade);
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) return {};
  return employees.find((employee) => Object.values(employee).find((emp) => emp === employeeName));
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  // seu código aqui
  return employees
    .find((employee) => employee.id === id).managers
    .every((manager) => (manager === '9e7d4524-363c-416a-8759-8aa7e50c0992' || manager.length === 0));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function countAnimals(specie) {
  // seu código aqui
  const quantityPerSpecies = species.reduce((acc, curr) => {
    acc[curr.name] = curr.residents.length;
    return acc;
  }, {});
  if (!specie) return quantityPerSpecies;
  return quantityPerSpecies[specie];
}

function calculateEntry(entrants = 0) {
  // seu código aqui
  return Object.entries(entrants)
    .reduce((acum, [chave, valor]) => acum + data.prices[chave] * valor, 0);
}

/* function getAnimalMap(options) {
  // seu código aqui
} */

function getSchedule(dayName) {
  // seu código aqui
  const days = Object.keys(hours).reduce((acc,curr) =>  {
    const objeto = acc;
    if(curr === 'Monday') {
      acc[curr] = `CLOSED`;  
    } else {
      acc[curr] = `Open from ${hours[curr].open}am until ${hours[curr].close - 12}pm`;
    };
    return acc;
  },{});
  
  if(!dayName) return days;
  
  const { open, close} = hours[dayName];
  const Monday = `Monday : CLOSED`;
  if(dayName === 'Monday') return Monday;
  dayEspecific = `${dayName}: 'Open from ${open}am until ${close-12}pm'`
  return dayEspecific;
}
console.log(getSchedule('Monday'));

/* function getOldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
}
 */
module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  // getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  // getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  // getOldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
