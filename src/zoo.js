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

const { species, employees, hours, prices } = data;
/* requisito 1 */
function getSpeciesByIds(...ids) {
  return species.filter((animal) => ids.some((id) => id === animal.id));
}
/* requisito 2 */
function getAnimalsOlderThan(animal, age) {
  return species.some((obj) => obj.name === animal && obj.residents.every((resident) => resident.age > age));
}

/* pergunta sobre setar o id no paramentro */
/* requisito 3 */
function getEmployeeByName(employeeName) {
  return !employeeName ? {} : employees.filter((funcionario) => funcionario.firstName === employeeName || funcionario.lastName === employeeName)[0];
}
/* requisito 4 */
function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

/* requisito 5 */
function isManager(id) {
  return employees.some((funcionario) => funcionario.managers.includes(id));
}

/* requisito 6 */
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

/* requisito 7 */
function countAnimals(specie) {
  if (!specie) {
    const animais = species.map((animal) => [animal.name, animal.residents.length]);
    return animais.reduce((acc, value) => {
      const [ani, quant] = value;
      acc[ani] = quant;
      return acc;
    }, {});
  }
  return species.find((animal) => animal.name === specie).residents.length;
}

/* requisito 8 */
function calculateEntry(entrants) {
  if (!entrants || entrants === {}) return 0;
  return Object.keys(entrants).reduce((acc, value) => acc + (prices[value] * entrants[value]), 0);
}

/* requisito 9 */
function getAnimalMap(options) {
}
/* requisito 10 */
function getSchedule(dayName) {
  const dia = {};
  if (!dayName) {
    const dias = Object.keys(hours);
    const horas = Object.values(hours);
    for (let index = 0; index < dias.length - 1; index += 1) {
      dia[dias[index]] = `Open from ${horas[index].open}am until ${horas[index].close - 12}pm`;
    }
    dia.Monday = 'CLOSED';
    return dia;
  }
  if (dayName === 'Monday') {
    dia.Monday = 'CLOSED';
    return dia;
  }
  /* alberto */
  dia[dayName] = `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm`;
  return dia;
}

/* requisito 11 */
function getOldestFromFirstSpecies(id) {
  const achaIdAnimal = employees.find((funcionario) => id === funcionario.id).responsibleFor[0];
  const achaAnimal = species.find((animal) => achaIdAnimal === animal.id);
  const achaAnimalVelho = achaAnimal.residents.reduce((acc, value) => {
    if (acc.age < value.age) {
      acc = value;
      return acc;
    }
    return acc;
  });
  const result = [
    achaAnimalVelho.name, achaAnimalVelho.sex, achaAnimalVelho.age,
  ];
  return result;
}

/* requisito 12 */
function increasePrices(percentage) {
  const { Adult, Senior, Child } = prices;
  const porcentagem = percentage / 100;
  const adulto = parseFloat((Adult + porcentagem * Adult + 0.001).toFixed(2));
  const crianca = parseFloat((Child + porcentagem * Child + 0.001).toFixed(2));
  const velho = parseFloat((Senior + porcentagem * Senior + 0.001).toFixed(2));

  prices.Adult = adulto;
  prices.Child = crianca;
  prices.Senior = velho;
}

/* requisito 13 */
function getEmployeeCoverage(idOrName) {
  const animalsAndPerson = employees.reduce((acc, person) => {
    acc[`${person.firstName} ${person.lastName}`] = person.responsibleFor.map((ids) => species.find(({ id }) => id === ids).name);
    return acc;
  }, {});
  if (!idOrName) {
    return animalsAndPerson;
  }
  const functionary = employees.find((funcionario) => idOrName === funcionario.id || idOrName === funcionario.firstName || idOrName === funcionario.lastName);
  const nameFunctionary = `${functionary.firstName} ${functionary.lastName}`;
  const coverages = Object.keys(animalsAndPerson);
  const animaisName = Object.values(animalsAndPerson);
  return coverages.reduce((acc, coverage, index) => {
    if (nameFunctionary === coverage) {
      acc[nameFunctionary] = animaisName[index];
    }
    return acc;
  }, {});
}
console.log(getEmployeeCoverage('Azevado'));

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
