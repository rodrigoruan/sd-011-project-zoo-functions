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

// const { prices } = require('./data');
const data = require('./data'); // DESCOMENTAR ANTES DE PUSH

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

  const people = { // Cria um objeto conforme os parâmetros passados. Talvez coubesse destructuring também aqui, porém mais verboso.
    ...entrants,
  };

  let total = 0;

  function parTest() {
    if (entrants === undefined || entrants === {}) { // Retorna 0 se nenhum argumento for passado ou se um objeto vazio for passado
      return 0;
    }
  }
  function calc() { // Faz os calculos conforme os parâmetros passados
    if (people.Child) {
      total += people.Child * data.prices.Child;
    }
    if (people.Adult) {
      total += people.Adult * data.prices.Adult;
    }
    if (people.Senior) {
      total += people.Senior * data.prices.Senior;
    }
  }

  parTest();
  calc();
  return total;
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
  const choosen = data.employees.find((options) => options.id === id); // Captura o colaborador
  const species = choosen.responsibleFor[0]; // Captura o ID da primeira specie
  const animals = data.species.find((options) => options.id === species); // Captura o Objeto da primeira specie

  const oldestAnimal = animals.residents.reduce((crr, next) => (next.age > crr.age ? next : crr));

  return Object.values(oldestAnimal);
}

function increasePrices(percentage) {
  Object.keys(data.prices).forEach((key) => { // Pega os nomes das keys e jogando-os para um array forEach (temporário, eu acho).
    const value = data.prices[key]; // Pego valor de cada chave, usando como auxilio o nome da variável atual do forEach, a qual está armazenada no parâmetro "key" do forEach().
    const adultResult = value + value * (percentage / 100) + 0.001; // Lógica de calculo de porcentagem conforme parâmetro. Somei 0.001 porque naõ estava arredondando conforme pede os testes.
    data.prices[key] = parseFloat(adultResult.toFixed(2)); // Pega o cáculo feito e armazena como valor na chave, referenciada como auxilio o nome da variável atual do forEach().
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
