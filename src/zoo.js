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

const getSpeciesByIds = (...ids) => ids.map((element) => data.species.find((animal) => animal.id === element)); // seu código aqui

const getAnimalsOlderThan = (animal, number) => data.species.find((element) => element.name === animal).residents.every((object) => object.age >= number); // seu código aqui

const getEmployeeByName = (employeeName) => data.employees.find((worker) => worker.firstName === employeeName || worker.lastName === employeeName) || {}; // seu código aqui

const createEmployee = ({ id, firstName, lastName }, { managers, responsibleFor }) => ({ id, firstName, lastName, managers, responsibleFor }); // seu código aqui

const isManager = (id) => data.employees.some((element) => element.managers.includes(id)); // seu código aqui

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => data.employees.push({ id, firstName, lastName, managers, responsibleFor }); // seu código aqui

const countAnimals = (animal) => {
  // seu código aqui
  if (animal) {
    return data.species.find((element) => element.name === animal).residents.length;
  }
  let result = {};
  data.species.forEach((bicho) => {
    result[bicho.name] = bicho.residents.length;
  });
  return result;
};

const calculateEntry = (entrants = {}) => {
  // seu código aqui
  const valueOfAdult = entrants.Adult * data.prices.Adult || 0;
  const valueOfSenior = entrants.Senior * data.prices.Senior || 0;
  const valueOfChild = entrants.Child * data.prices.Child || 0;
  return valueOfAdult + valueOfSenior + valueOfChild;
};

function getAnimalMap(options = {}) {
  // seu código aqui
  /* const { includeNames = true, sex, sorted } = options;
  let result = {};
  data.species.forEach((bicho) => result[bicho.location] += ' ' + bicho.name);
  Object.keys(result).forEach(key => {
    result[key] = result[key].split(' ').filter(element => element!== 'undefined');
  })
  if (includeNames === true) {
    Object.keys(result).forEach((element) => {
      console.log(result[element].map((bichinhos) => {
        let nomeDosAnimais = data.species.find((x) => x.residents)
        ({bichinhos: });
      })
    });
  }
  console.log(Object.keys(result));
  return result; */
}
/* console.log(getAnimalMap()); */

const getSchedule = (dayName) => {
  let result = {};
  const arrayOfSchedule = Object.entries(data.hours).map((day) => `${day[0]}: Open from ${day[1].open}am until ${day[1].close - 12}pm`);
  arrayOfSchedule.splice(6, 1, 'Monday: CLOSED');
  const scheduleDays = arrayOfSchedule.map((element) => element.split(': '));
  if (dayName === undefined) {
    scheduleDays.forEach((weekDay) => {
      result[`${weekDay[0]}`] = `${weekDay[1]}`;
    });
    return result;
  }
  const dayOfWeek = arrayOfSchedule.filter((element) => element.substring(0, 2) === dayName.substring(0, 2));
  const schDay = dayOfWeek[0].split(': ');
  result[`${schDay[0]}`] = `${schDay[1]}`;
  return result;
};

const getOldestFromFirstSpecies = (id) => {
  const firstAnimal = data.employees.find((worker) => worker.id === id).responsibleFor[0]; // seu código aqui
  const resultAnimal = data.species.find((animal) => animal.id === firstAnimal).residents.sort((a, b) => b.age - a.age)[0];
  return [resultAnimal.name, resultAnimal.sex, resultAnimal.age];
};

const increasePrices = (percentage) => {
  Object.keys(data.prices).forEach((price) => {
    const raise = data.prices[price] + (data.prices[price] * percentage) / 100; // seu código aqui
    data.prices[price] = Math.round(raise * 100) / 100;
  });
  return data.prices;
};

/* console.log(increasePrices(50));
console.log(increasePrices(30));
console.log(data.prices.Adult); */
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
