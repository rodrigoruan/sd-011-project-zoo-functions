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

const { species, employees } = require('./data');
const data = require('./data');

const getSpeciesByIds = (...ids) => data.species.filter((value) => ids.includes(value.id));

const getAnimalsOlderThan = (animal, age) => data.species.find(((value) => value.name === animal)).residents.every((value) => value.age >= age);

const getEmployeeByName = (employeeName) => ((!employeeName)
  ? {}
  : data.employees.find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName));

const createEmployee = (typealInfo, associatedWith) => ({ ...typealInfo, ...associatedWith });

const isManager = (id) => data.employees.some(({ managers }) => managers.includes(id));

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => data.employees.push({ id, firstName, lastName, managers, responsibleFor });

const countAnimals = (specie) => ((specie)
  ? data.species.find(({ name }) => name === specie).residents.length
  : data.species.reduce((acc, curr) => {
    acc[curr.name] = curr.residents.length;
  }, {}));

const calculateEntry = (entrants) => data.prices.reduce((acc, curr) => acc + curr * entrants[curr], 0);

const getAnimalMap = (options) => {
  // seu código aqui
};

/*
A função é responsável por disponibilizar as informações de horário para uma consulta, que pode querer ter acesso a todo o cronograma da semana ou apenas o cronograma de um dia específico

Observações técnicas

Analise o teste unitário para entender os retornos que são esperados para esta função
O que será avaliado

Sem parâmetros, retorna um cronograma legível para humanos
Se um único dia for passado, retorna somente este dia em um formato legível para humanos
*/
const getSchedule = (dayName) => {
  const schedule = data.hours;
  
  if (schedule[dayName].close > 12) schedule[dayName] -= 12;

  if (dayName) return {[dayName]: schedule[dayName]};

  for (let day in schedule) {
    schedule[day] = ((schedule[day].close - schedule[day].open <= 0)
    ? 'CLOSED'
    : `Open from ${schedule[day].open}am until ${schedule[day].close}pm`);
  }

  return schedule;
};

const getOldestFromFirstSpecies = (id) => {
  // seu código aqui
};

const increasePrices = (percentage) => {
  // seu código aqui
};

const getEmployeeCoverage = (idOrName) => {
  // seu código aqui
};

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
