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
  if (entrants === undefined || entrants === {}) {
    return 0;
  }
  const allPublic = Object.keys(entrants);
  return allPublic.reduce((total, ageCategory) => total + entrants[ageCategory] * data.prices[ageCategory], 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  if (!dayName) {
    return {
      Tuesday: 'Open from 8am until 6pm',
      Wednesday: 'Open from 8am until 6pm',
      Thursday: 'Open from 10am until 8pm',
      Friday: 'Open from 10am until 8pm',
      Saturday: 'Open from 8am until 10pm',
      Sunday: 'Open from 8am until 8pm',
      Monday: 'CLOSED',
    };
  }
  if (dayName === 'Monday') {
    return { Monday: 'CLOSED' };
  }
  const { open, close } = data.hours[dayName];
  return { [dayName]: `Open from ${open}am until ${close - 12}pm` };
}

function getOldestFromFirstSpecies(id) {
  const employee = data.employees.find((worker) => worker.id === id);
  const firstSpecies = employee.responsibleFor[0];
  const resident = data.species.find((animals) => animals.id === firstSpecies).residents;
  const oldestAnimal = resident.reduce((firstAnimal, secondAnimal) =>
    (firstAnimal.age > secondAnimal.age ? firstAnimal : secondAnimal));
  return ([oldestAnimal.name, oldestAnimal.sex, oldestAnimal.age]);
}

function increasePrices(percentage) {
  const priceCategories = Object.keys(data.prices);
  priceCategories.forEach((category) => {
    let newPrice = data.prices[category] * (1 + (percentage / 100));
    newPrice = Math.round(newPrice * 100) / 100;
    data.prices[category] = newPrice;
  });
  return data.prices;
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
