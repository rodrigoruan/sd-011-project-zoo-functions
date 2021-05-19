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
  if (!ids) return [];
  const getSpecieAnimal = data.species.filter((el) => ids.some((id) => id === el.id));
  return getSpecieAnimal;
}

function getAnimalsOlderThan(animal, age) {
  return data.species.find((animalName) => animalName.name === animal).residents.every((el) => el.age > age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find((elemento) => elemento.firstName === employeeName || elemento.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
}

function isManager(id) {
  return data.employees.some((funcionario) => funcionario.managers.some((value) => value === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const employeeNew = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(employeeNew);
  return data.employees;
}

function countAnimals(especie1) {
  if (!especie1) {
    return data.species.reduce((acumulador, valorAtual) => {
      acumulador[valorAtual.name] = valorAtual.residents.length;
      return acumulador;
    }, {});
  }
  return data.species.find((especie) => especie.name === especie1).residents.length;
}

function calculateEntry(entrants) {
  if (typeof entrants === 'undefined') {
    return 0;
  }
  let priceTotal = 0;
  if (entrants.Adult) priceTotal += data.prices.Adult * entrants.Adult;
  if (entrants.Child) priceTotal += data.prices.Child * entrants.Child;
  if (entrants.Senior) priceTotal += data.prices.Senior * entrants.Senior;
  return priceTotal;
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  const calendario = {
    Tuesday: `Open from ${data.hours.Tuesday.open}am until ${data.hours.Tuesday.close}pm`,
    Wednesday: `Open from ${data.hours.Wednesday.open}am until ${data.hours.Wednesday.close}pm`,
    Thursday: `Open from ${data.hours.Thursday.open}am until ${data.hours.Thursday.close}pm`,
    Friday: `Open from ${data.hours.Friday.open}am until ${data.hours.Friday.close}pm`,
    Saturday: `Open from ${data.hours.Saturday.open}am until ${data.hours.Saturday.close}pm`,
    Sunday: `Open from ${data.hours.Sunday.open}am until ${data.hours.Sunday.close}pm`,
    Monday: 'CLOSED',
  };
  if (!dayName) {
    return calendario;
  } return {
    [dayName]: calendario[dayName],
  };
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  const adultPrice = ((data.prices.Adult / 100) * percentage) + data.prices.Adult + 0.001;
  const childPrice = ((data.prices.Child / 100) * percentage) + data.prices.Child + 0.001;
  const seniorPrice = ((data.prices.Senior / 100) * percentage) + data.prices.Senior + 0.001;
  data.prices.Adult = Number(adultPrice.toFixed(2));
  data.prices.Child = Number(childPrice.toFixed(2));
  data.prices.Senior = Number(seniorPrice.toFixed(2));
}

function getEmployeeCoverage(idOrName) {

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
