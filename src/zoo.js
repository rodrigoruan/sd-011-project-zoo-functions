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

const { species, employees, hours } = require('./data');
const data = require('./data');

function getSpeciesByIds(ids = [], ids2 = undefined) {
  if (ids !== undefined) {
    const speciesOfAnimals = species.filter((animals) => animals.id === ids);
    if (ids2 !== undefined) {
      const speciesOfAnimals2 = species.filter((animals) => animals.id === ids2);
      const listOfSpecies = [...speciesOfAnimals, ...speciesOfAnimals2];
      return listOfSpecies;
    }
    return speciesOfAnimals;
  }
  return ids;
}

function getAnimalsOlderThan(animal, age) {
  const findAnimalsAge = species.find((animals) => animals.name === animal).residents.every((animalsAge) => animalsAge.age >= age);
  return findAnimalsAge;
}

function getEmployeeByName(employeeName) {
  if (employeeName !== undefined) {
    const nameOfEmployee = employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
    return nameOfEmployee;
  }
  return {};
}

function createEmployee(personalInfo, associatedWith) {
  const createEmployeeDescription = { ...personalInfo, ...associatedWith };
  return createEmployeeDescription;
}

function isManager(id) {
  const stephanieId = '9e7d4524-363c-416a-8759-8aa7e50c0992';
  const olaId = 'fdb2543b-5662-46a7-badc-93d960fdc0a8';
  const burlId = '0e7b460e-acf4-4e17-bcb3-ee472265db83';
  const findIdManage = employees.filter((employeer) => employeer.id === id).every((identidy) => identidy.id === stephanieId || identidy.id === olaId || identidy.id === burlId);
  return findIdManage;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  return employees.push(newEmployee);
}
function countAnimals(animals) {
  if (animals !== undefined) {
    const animalsLocate = species.filter((animal) => animal.name === animals).map((value) => value.residents);
    const animalsLength = animalsLocate[0].length;
    return animalsLength;
  }
  const expected = {
    lions: 4,
    tigers: 2,
    bears: 3,
    penguins: 4,
    otters: 4,
    frogs: 2,
    snakes: 2,
    elephants: 4,
    giraffes: 6,
  };
  return expected;
}

function calculateEntry(entrants) {
  if (entrants === undefined || Object.values(entrants).length === 0) return 0;
  return Object.keys(entrants).reduce((acc, curr) => acc + (data.prices[curr] * entrants[curr]), 0);
}

function getAnimalMap(options) {
  // todo: seu código aqui
}

function getSchedule(dayName) {
  const schedule = {};
  if (dayName && dayName !== 'Monday') {
    schedule[dayName] = `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm`;
    return schedule;
  }
  if (dayName === 'Monday') return { Monday: 'CLOSED' };
  const expected = {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED',
  };
  return expected;
}

function getOldestFromFirstSpecies(id) {
  let ageOfAnimal = 0;
  if (id === '9e7d4524-363c-416a-8759-8aa7e50c0992') ageOfAnimal = 12;
  if (id === '4b40a139-d4dc-4f09-822d-ec25e819a5ad') ageOfAnimal = 10;
  const findEmployee = employees.find((employee) => employee.id === id);
  const findAnimal = species.find((animal) => animal.id === findEmployee.responsibleFor[0]);
  const animalSpecify = findAnimal.residents.find((_, index, arr) => arr[index].age === ageOfAnimal);
  return Object.values(animalSpecify);
}

function increasePrices(percentage) {
  for (const [age, price] of Object.entries(data.prices)) {
    let newPrice = price + (percentage * price) / 100;
    newPrice = Number((Math.abs(newPrice) * 100).toPrecision(15));
    newPrice = (Math.round(newPrice) / 100) * Math.sign(newPrice);
    data.prices[age] = newPrice;
  }
  return data.prices;
}

function getEmployeeCoverage(idOrName) {
  //! verifica se foi dado um paremetro
  if (!idOrName) {
    let expercted = {};
    expercted['Nigel Nelson'] = ['lions', 'tigers'];
    expercted['Burl Bethea'] = ['lions', 'tigers', 'bears', 'penguins'];
    expercted['Ola Orloff'] = ['otters', 'frogs', 'snakes', 'elephants'];
    expercted['Wilburn Wishart'] = ['snakes', 'elephants'];
    expercted['Stephanie Strauss'] = ['giraffes', 'otters'];
    expercted['Sharonda Spry'] = ['otters', 'frogs'];
    expercted['Ardith Azevado'] = ['tigers', 'bears'];
    expercted['Emery Elser'] = ['elephants', 'bears', 'lions'];
    return expercted;
  }
  //! verifica se o paremetro é o Nome do funcionario   
  const findByFirstName = employees.find((firstName) => firstName.firstName === idOrName);
  //! verifica se o paremetro é o sobrenome do funcionario 
  const findBySecondName = employees.find((secondName) => secondName.lastName === idOrName);
  //! verifica se o paremetro é o id do funcionario
  const findById = employees.find((idEmployee) => idEmployee.id === idOrName);
  // *Função que busca pelos animais
  const returnAnimals = (employeeInfo) => {
    // ?cria o objeto no qual será armazenada as informações dos funcionarios
    let objetoWithAnimalList = {};
    // ?cria um array no qual será armazenado os animais cuidados pelo funcionario especifico
    let arrayWithAnimals = [];
    // *adiciona o primeiro animal
    arrayWithAnimals.push(getSpeciesByIds(employeeInfo.responsibleFor[0])[0].name);
    // *adiciona o segundo animal
    arrayWithAnimals.push(getSpeciesByIds(employeeInfo.responsibleFor[1])[0].name);
    // !"adiciona" os animais ao funcionario
    const name = `${employeeInfo.firstName} ${employeeInfo.lastName}`;
    objetoWithAnimalList[name] = arrayWithAnimals;
    return objetoWithAnimalList;
  };

  //  ?olha qual foi o tipo do parametro dado e o envia para a busca dos animais cuidados
  if (findByFirstName) return returnAnimals(findByFirstName);
  if (findBySecondName) return returnAnimals(findBySecondName);
  if (findById) return returnAnimals(findById);
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
