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
const data = require('./data');

function getSpeciesByIds(...ids) {
  return species.filter((speciesId) => ids.some((id) => id === speciesId.id));
}

function getAnimalsOlderThan(animal, age) {
  const filteredSpecies = species.filter((sp) => sp.name === animal)[0].residents;
  return filteredSpecies.every((ele) => ele.age > age);
}

function getEmployeeByName(employeeName) {
  const find = (ele) => ele.firstName === employeeName || ele.lastName === employeeName;
  return (employeeName === undefined) ? {} : employees.find(find);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.filter((func) => func.managers.length === 1).some((name) => name.id === id);
}

function addEmployee(id = [], firstName = [], lastName = [], managers = [], responsibleFor = []) {
  const obj = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employees.push(obj);
}

function countAnimals(speciesItem) {
  const reduceFunction = () => species.reduce((acc, curr) => {
    acc[curr.name] = curr.residents.length;
    return acc;
  }, {});

  const filterLength = () => species.filter((el) => el.name === speciesItem)[0].residents.length;
  return (speciesItem === undefined) ? reduceFunction() : filterLength();
}

function calculateEntry(entrants = {}) {
  const value = [];
  const price = Object.entries(prices);
  const entries = Object.entries(entrants);
  entries.forEach((entr) => price.forEach((pric) => {
    const result = (entr[0] === pric[0]) ? value.push(entr[1] * pric[1]) : null;
    return result;
  }));
  return value.reduce((acc, curr) => acc + curr, 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // const days = Object.values(hours);
  // const returned = days.map((ele) => `Open from ${ele.open}am until ${ele.close}pm`)
  // console.log(returned);
  // const getDays = () => hours.reduce((acc, curr) => {
  //   acc[curr] = curr
  // })

  // const getDay = () => {
  //   zoo.getSchedule()
  // }
  // return (dayName === undefined)? getDays() : getDay()
}
// console.log(getSchedule());

function getOldestFromFirstSpecies(id) {
  const getAnimalId = employees.filter((ele) => ele.id === id)[0].responsibleFor[0];
  const getSpecies = species.filter((el) => el.id === getAnimalId)[0].residents;
  let max = getSpecies[0].age;
  getSpecies.forEach((elem) => {
    const calc = elem.age > max ? max = elem.age : null;
  });
  const result = getSpecies.filter((eleme) => eleme.age === max);
  return [result[0].name, result[0].sex, result[0].age];
}

function increasePrices(percentage) {
  const keys = Object.keys(prices);
  keys.forEach((key) => {
    prices[key] = Math.round((prices[key] * ((percentage / 100) + 1)) * 100) / 100;
  });
}

function getSingleEmployeeCoverage(idOrName) {
  const getEmployee = employees.find((pers) => idOrName === pers.id || idOrName === pers.firstName || idOrName === pers.lastName);
  const fullName = `${getEmployee.firstName} ${getEmployee.lastName}`;
  const animals = [];
  const getAnimals = getEmployee.responsibleFor.forEach((id) => animals.push(species.find((anim) => id === anim.id).name));
  return { [fullName]: animals };
}

function getEmployeeCoverage(idOrName) {
  const getCoverage = () => employees.reduce((acc, empl) => Object.assign(acc, getSingleEmployeeCoverage(empl.id)), {});
  return (idOrName === undefined) ? getCoverage() : getSingleEmployeeCoverage(idOrName);
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
