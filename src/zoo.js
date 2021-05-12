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
const { species, employees, prices, hours } = require('./data');

function getSpeciesByIds(...ids) {
  return species.filter((filterid, index) => filterid.id === ids[index]);
}

function getAnimalsOlderThan(animal, age) {
  const anm = species.find((animall) => animall.name === animal);
  const result = anm.residents.every((elem) => elem.age > age);
  return result;
}

function getEmployeeByName(employeeName) {
  let result = employees.find((name) => name.firstName === employeeName || name.lastName === employeeName);
  if (result === undefined) return {};
  return result;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(() => id === '0e7b460e-acf4-4e17-bcb3-ee472265db83');
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(speciess) {
  let resultFilt = species.find((especie) => especie.name === speciess);
  if (resultFilt === undefined) {
    return species.reduce((ac, { name, residents }) => {
      ac[name] = residents.length;
      return ac;
    }, {});
  }
  return resultFilt.residents.length;
}

function calculateEntry(entrants = 0) {
  let { Adult = 0, Child = 0, Senior = 0 } = entrants;
  return Adult * prices.Adult + Child * prices.Child + Senior * prices.Senior;
}

// Rodolfo Resende & Julio Filizzola Turma 11 me ajudou a fazer essa questão
const getNameAnimal = (residents, sorted, sex) => {
  // Essa função vai filtrar o animal pelo seguintes parametros (residents, sorted, sex)
  const animalName = residents.reduce((acc, value) => (sex && value.sex !== sex ? acc : acc.concat(value.name)), []);
  // O alternario vai verificar se meu 'value.sex' e igual ao meu parametro 'sex' se for ele vai adicionar ao acumalador 'acc'
  // o nome do animal de acordo com o sexo dentro de uma array, Caso ao contrario ele vai inserir todos independente do sexo
  return sorted ? animalName.sort() : animalName;
  // Se o paramentro do meu sort for true ele vai ordenar minha array em ordem Alfabética
};

function getAnimalMap(options = {}) {
  let objectResult = {};
  let arrayRegions = ['NE', 'NW', 'SE', 'SW'];
  // Vai inserir no meu objeto vazio 'objectResult' um ChaveKey de arrayRegions com uma array vazia
  arrayRegions.forEach((regions) => {
    objectResult[regions] = [];
  });
  // O map vai inserir e vericar se o nome do animal é coresponde ao seu local residente se sim ele vai inserir o objeto contendo o nome do animal corespondente ao sua Região caso ao contrario ele vai inserir somente a especie do anomal
  species.map((animal) => (options.includeNames ? objectResult[animal.location].push({
    [animal.name]: getNameAnimal(animal.residents, options.sorted, options.sex),
  }) : objectResult[animal.location].push(animal.name)));
  return objectResult;
}

const options = {
  includeNames: true,
  sex: 'female',
  sorted: true,
};

getAnimalMap(options);

function getSchedule(dayName) {
  let result = {};
  let { Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday, Monday } = hours;
  if (dayName === undefined) {
    result = {
      Tuesday: `Open from ${Tuesday.open}am until ${Tuesday.close - 12}pm`,
      Wednesday: `Open from ${Wednesday.open}am until ${Wednesday.close - 12}pm`,
      Thursday: `Open from ${Thursday.open}am until ${Thursday.close - 12}pm`,
      Friday: `Open from ${Friday.open}am until ${Friday.close - 12}pm`,
      Saturday: `Open from ${Saturday.open}am until ${Saturday.close - 12}pm`,
      Sunday: `Open from ${Sunday.open}am until ${Sunday.close - 12}pm`,
      Monday: `${Monday.open === 0 ? 'CLOSED' : `Open from ${Monday.open}am until ${Sunday.Monday - 12}pm`}`,
    };
  }
  if (dayName === 'Monday') {
    return { Monday: 'CLOSED' };
  }
  if (hours[dayName]) {
    result[dayName] = `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm`;
  }
  return result;
}

function getOldestFromFirstSpecies(id) {
  let result = [];
  result = employees.find((userId) => userId.id === id).responsibleFor;
  const animal = species
    .find((animalId) => animalId.id === result[0])
    .residents.sort((a, b) => b.age - a.age)[0];
  return Object.values(animal);
}

function increasePrices(percentage) {
  let { Adult, Senior, Child } = prices;
  prices.Adult = parseFloat(((Adult / 100) * percentage + Adult + 0.001).toFixed(2));
  prices.Senior = parseFloat(((Senior / 100) * percentage + Senior + 0.001).toFixed(2));
  prices.Child = parseFloat(((Child / 100) * percentage + Child + 0.001).toFixed(2));
}

function getEmployeeCoverage(idOrName) {
  let result = {};
  if (idOrName === undefined) {
    employees.forEach(({ firstName, lastName, responsibleFor }) => {
      result[`${firstName} ${lastName}`] = responsibleFor.map(
        (ids) => species.find((spec) => spec.id === ids).name,
      );
    });
  }
  let func = employees.filter((nameResp) => nameResp.id === idOrName || nameResp.firstName === idOrName || nameResp.lastName === idOrName);
  func.forEach(({ firstName, lastName, responsibleFor }) => {
    result[`${firstName} ${lastName}`] = responsibleFor.map((ids) => species.find((spec) => spec.id === ids).name);
  });
  return result;
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
