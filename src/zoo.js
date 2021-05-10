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

/* console.log(data.species[0].id);
console.log(data.species[1].id);
console.log(data.species[2].id);
console.log(data.species[3].id);
console.log(data.species[4].id);
console.log(data.species[5].id);
console.log(data.species[6].id);
console.log(data.species[7].id);
console.log(data.species[8].id);
 */
/*
  Para imprimir todos os IDs
  for(let index= 0; index < data.species.length; index += 1){
  console.log(data.species[index].id);
} */

function getSpeciesByIds(...ids) {
  // seu código aqui
  // Para caso nenhum parametro seja informado, retorna um array vazio
  if (ids.length === 0) {
    return [];
  }

  const filterID = data.species.filter((value) => {
    let moreOneId = ids.includes(value.id);
    return moreOneId;
  });
  return filterID;
}

// console.log(getSpeciesByIds(data));

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  const forEachAnimal = data.species.find((animals) => animals.name === animal);
  const verifyAge = forEachAnimal.residents.every((value) => value.age >= age);
  return verifyAge;
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) {
    return {};
  }

  const firstAndSecond = data.employees.find((value) => value.firstName === employeeName || value.lastName === employeeName);
  return firstAndSecond;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function countAnimals(species) {
  // seu código aqui
}

function calculateEntry(entrants) {
  // seu código aqui
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
