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

// Usar o spread para procurar todos os valores passados
function getSpeciesByIds(...ids) {
  return data.species.filter(({ id }) => ids.includes((id)));
  // Função Filter juntamente com includes para localizar todos os IDS passados nos parâmetros
}

function getAnimalsOlderThan(animal, minAge) {
  const names = data.species.find(({ name }) => name === animal);
  // função Find procura as ocorrências do primeiro parâmetro (a espécie de animal) na base de dados
  return names.residents.every(({ age }) => age >= minAge);
  // retorna true se todos os animais da espécie tem a idade maior que o parâmetro passado.
}

function getEmployeeByName(employeeName) {
  if (employeeName !== undefined) {
    return data.employees.find(({ firstName, lastName }) =>
      employeeName === firstName || employeeName === lastName);
  // Procura o nome e o sobrenome do funcionário na base de dados
  }
  return {};
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return data.employees.some(({ managers }) => managers.includes(id));
}

// Como default, managers e responsibleFor serão arrays vazios
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function countAnimals(...species) {
  if (species.length === 0) {
    const AllSpecies = data.species.map((animal) => animal.name);
    // Captura todas as espécies pelo name, independente da quantidade de residentes
    const counterAnimals = data.species.map((animal) => animal.residents.length);
    // Conta a quantidade de residentes para cada espécie
    const allAnimals = {};
    AllSpecies.forEach((IndividualSpecies, resident) => { allAnimals[IndividualSpecies] = counterAnimals[resident]; });
    // Para cada espécie, o número de residentes
    return allAnimals;
  }
  const typedSpecies = data.species.find((animal) => species.includes(animal.name));
  // Captura a espécie de animal digitada no parâmetro
  return typedSpecies.residents.length;
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
