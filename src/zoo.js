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

const { species } = data;
const { employees } = data;

const getSpeciesByIds = (...ids) => (ids ? species.filter((animal) => [...ids].includes(animal.id)) : []);

const getAnimalsOlderThan = (animal, age) => species.find((animalName) => animalName.name === animal).residents.every((animals) => animals.age >= age);

const getEmployeeByName = (employee) => (employee ? employees.find((name) => name.firstName === employee || name.lastName === employee) : {});

const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });

const isManager = (id) => employees.some((worker) => worker.managers.includes(id));

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => employees.push({ id,
  firstName,
  lastName,
  managers,
  responsibleFor,
});

const countAnimals = (specie) => (specie ? species.find((animal) => animal.name === specie).residents.length : Object.fromEntries(species.map((animal) => [animal.name, animal.residents.length])));

const calculateEntry = (entrants = 0) => (Object.entries(entrants).length ? Object.entries(entrants).reduce((acc, curr) => acc + data.prices[curr[0]] * curr[1], 0) : 0);

const animalsName = (...args) => {
  const nameOfAnimals = args[0].reduce((acc, curr) => (args[2] && curr.sex !== args[2] ? acc : acc.concat(curr.name)), []); return args[1] ? nameOfAnimals.sort() : nameOfAnimals;
};

const getAnimalMap = (options = {}) => {
  let obj = {}; const names = ['NE', 'NW', 'SE', 'SW']; for (let i of names) {
    obj[i] = [];
  } species.map((animal) => (options.includeNames ? obj[animal.location].push({ [animal.name]: animalsName(animal.residents, options.sorted, options.sex) }) : obj[animal.location].push(animal.name))); return obj;
};

const daysOfWeek = {
  Tuesday: 'Open from 8am until 6pm',
  Wednesday: 'Open from 8am until 6pm',
  Thursday: 'Open from 10am until 8pm',
  Friday: 'Open from 10am until 8pm',
  Saturday: 'Open from 8am until 10pm',
  Sunday: 'Open from 8am until 8pm',
  Monday: 'CLOSED',
};

const getSchedule = (day) => (day ? Object.fromEntries([[day, daysOfWeek[day]]]) : daysOfWeek);

const getOldestFromFirstSpecies = (id) => Object.values(species.find((animal) => animal.id === employees.find((person) => person.id === id).responsibleFor[0]).residents.sort((animal1, animal2) => animal2.age - animal1.age)[0]);

const addPercentage = (peop, percentage) => Math.round((peop + peop * (percentage / 100)) * 100) / 100;

const increasePrices = (percent) => {
  const { prices } = data; const { Adult, Child, Senior } = prices; prices.Adult = addPercentage(Adult, percent); prices.Child = addPercentage(Child, percent); prices.Senior = addPercentage(Senior, percent);
};

const employeeWithId = (idOrName) => {
  const person = employees.find((people) => people.id === idOrName || people.firstName === idOrName || people.lastName === idOrName);
  const personFullName = `${person.firstName} ${person.lastName}`; const animalName = person.responsibleFor.map((id) => species.find((animal) => animal.id === id)).map((animal) => animal.name);
  let obj = {}; obj[personFullName] = animalName; return obj;
};

const employeeWithoutId = () => {
  let arrOfEmployees = employees.map((person) => person.firstName); let obj = {}; for (let i of arrOfEmployees) {
    Object.assign(obj, employeeWithId(i));
  } return obj;
};

const getEmployeeCoverage = (idOrName) => (idOrName ? employeeWithId(idOrName) : employeeWithoutId());

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
