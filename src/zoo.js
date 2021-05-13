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
  // seu código aqui
  const animais = data.species.filter((animal) => ids.find((id) => id === animal.id));
  return animais;
}

function getAnimalsOlderThan(animal, age) { // Fonte: Trybe Course + Lógica
  // seu código aqui
  const choosen = data.species.find((options) => options.name === animal);
  return choosen.residents.every((spec) => spec.age >= age);
}

function getEmployeeByName(employeeName) { // Fonte: Trybe Course + Lógica
  // seu código aqui
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find((option) => (option.firstName === employeeName || option.lastName === employeeName));
}

function createEmployee(personalInfo, associatedWith) { // Fonte: Trybe Course + Lógica
  // seu código aqui
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) { // Fonte: Trybe Course + Lógica
  // seu código aqui
  // return data.employees.some((options) => Object.values(options.managers).some((manager) => manager === id));
  return data.employees.some((options) => options.managers.some((manager) => manager === id)); // Também funcionaria da forma acima
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) { // Fonte: Trybe Course + Lógica
  // seu código aqui
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(newEmployee);
}

function countAnimals(species) {
  // seu código aqui:
  const animalAndQtd = {}; // Poderia já passar as entradas esperadas aqui, mas acho que não seria um forma muito ideal (digo: ética) ;-)

  data.species.forEach((type) => { // Cria as entradas do objeto (animalAndQtd) de forma dinâmica: buscando direito em data.js
    animalAndQtd[type.name] = type.residents.length;
  });
  if (species === undefined) { // Retorna o objeto caso não seja passado parâmetro para a função:
    return animalAndQtd;
  }

  // Retorna dinamicamente a quantidade de animais relacionada ao parâmetro (species) passado. Busca direto em data.js.
  const match = data.species.find((type) => type.name === species);
  return match.residents.length;
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
