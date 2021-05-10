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
const { species, prices, hours } = require('./data');

function getSpeciesByIds(...ids) {
  return ids.map((id) => species.find((animal) => animal.id === id));
}

function getAnimalsOlderThan(animal, age) {
  const selectedSpecie = species.find((specie) => specie.name === animal);
  const ageAnimal = selectedSpecie.residents.every((animals) => animals.age >= age);
  return ageAnimal;
}

const { employees } = require('./data');

function getEmployeeByName(employeeName) {
  const employerByFirstName = employees.find((employer) => employer.firstName === employeeName);
  const employerByLastName = employees.find((employer) => employer.lastName === employeeName);
  return employerByFirstName || employerByLastName || {};
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some((employer) => employer.managers.some(((idManager) => idManager === id)));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function countAnimals(speciess) {
  if (speciess) {
    const animal = species.find((animall) => animall.name === speciess);
    return animal.residents.length;
  }
  if (!speciess) {
    const allAnimal = species.map((element) => {
      const { name, residents } = element;
      return { [`${name}`]: residents.length };
    });
    return Object.assign({}, ...allAnimal);
  }
}

// Ex feito com apoio dos colegas Mauricio e Rodolfo T11- Salve salve Sala A
function calculateEntry(entrants) {
  if (!entrants) return 0;
  const valuesTotal = [];
  Object.entries(entrants).forEach((elementObj) => {
    const keyAndValue = Object.entries(prices).find((priceObj) => priceObj[0] === elementObj[0]);
    const result = keyAndValue[1] * elementObj[1];
    valuesTotal.push(result);
  });
  return valuesTotal.reduce((acc, value) => acc + value, 0);
}

// EX 09
function getAnimalMap(options) {
  // seu código aqui
}

// USAR REDUCE PARA criar o objeto e rest
function getSchedule(dayName) {
  const daysWeekHoursArray = Object.entries(hours);
  const agendaReturn = {};
  if (!dayName) {
    daysWeekHoursArray.forEach((dayWeek) => {
      const dayString = dayWeek[0];
      const dayObj = dayWeek[1];
      agendaReturn[dayString] = `Open from ${dayObj.open}am until ${dayObj.close - 12}pm`;
      if (dayObj.close === dayObj.open) {
        agendaReturn[dayString] = 'CLOSED';
      }
    });
    return agendaReturn;
  }
  const hoursDayWord = daysWeekHoursArray.find((dayWeek) => dayName === dayWeek[0]);
  const dayString = hoursDayWord[0];
  const dayObj = hoursDayWord[1];
  agendaReturn[dayString] = `Open from ${dayObj.open}am until ${dayObj.close - 12}pm`;
  if (dayObj.close === dayObj.open) {
    agendaReturn[dayString] = 'CLOSED';
  }
  return agendaReturn;
}

function getOldestFromFirstSpecies(id) {
  const manager = employees.find((employer) => employer.id === id);
  const firstSpecie = species.find((specie) => specie.id === manager.responsibleFor[0]);
  const animalsResidents = firstSpecie.residents.sort((a, b) => b.age - a.age);
  const { name, sex, age } = animalsResidents[0];
  return [name, sex, age];
}

// Cheguei ate o numero mas não estava conseguindo trabalhar o valor como numero. Estava tendo saidas inesperadas. Foi então que vi co os colegas  de turma como eles trabalharam o valor e aprendi o uso do Number, solucionando o problema decimal. PR Tales Coelho
function increasePrices(percentage) {
  let { Adult, Senior, Child } = prices;
  Adult = Number(Adult);
  Senior = Number(Senior);
  Child = Number(Child);

  Adult += (prices.Adult * percentage) / 100 + 0.001;
  Senior += (prices.Senior * percentage) / 100 + 0.001;
  Child += (prices.Child * percentage) / 100 + 0.001;

  prices.Adult = Number(Adult.toFixed(2));
  prices.Senior = Number(Senior.toFixed(2));
  prices.Child = Number(Child.toFixed(2));
  return prices;
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
