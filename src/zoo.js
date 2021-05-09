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

const { species } = require('./data');
const { employees } = require('./data');
const { hours } = require('./data');
const { prices } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  // seu código aqui
  return ids.map((animalId) => species.find(({ id }) => id === animalId));
}

function getAnimalsOlderThan(animal, animalAge) {
  // seu código aqui
  return species.find(({ name }) => name === animal).residents.every(({ age }) => age > animalAge);
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  return employeeName ? employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName) : {};
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  let { id, firstName, lastName } = personalInfo;
  let { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor
  };
}

function isManager(id) {
  // seu código aqui
  let employer = employees.find((employee) => employee.id === id);
  return (employer.firstName === 'Stephanie' || employer.firstName === 'Ola' || employer.firstName === 'Burl');
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function countAnimals(animal) {
  // seu código aqui
  let animalsCount = {};
  if (animal) return species.find(({ name }) => name === animal).residents.length;
  species.forEach(({ name }, index) => {
    animalsCount[name] = species[index].residents.length;
  });
  return animalsCount;
}

function calculateEntry(entrants = {}) {
  // seu código aqui
  const { Adult, Child, Senior } = entrants;
  const adultPrice = prices.Adult;
  const childPrice = prices.Child;
  const seniorPrice = prices.Senior;
  const adults = (Adult ? Adult * adultPrice : 0);
  const childs = (Child ? Child * childPrice : 0);
  const seniors = (Senior ? Senior * seniorPrice : 0);
  return adults + childs + seniors;
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  let schedule = {};
  let result = {};
  let days = Object.keys(hours);
  days.forEach((day) => {
    if (day === 'Monday') {
      schedule[day] = 'CLOSED';
    } else {
      schedule[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    }
  });
  if (dayName) {
    result[dayName] = schedule[dayName];
    return result;
  }
  result = schedule;
  return result;
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
  const firstAnimalResponsibleId = employees.find((employee) => employee.id === id).responsibleFor[0];
  let animalSelected = species.filter(({ animalId }) => animalId === firstAnimalResponsibleId);
  let [{ residents }] = animalSelected;
  let olderAnimal;
  let biggerAge = 0;
  let result = [];
  residents.forEach((animal) => {
    if (animal.age > biggerAge) {
      biggerAge = animal.age;
      olderAnimal = animal;
    }
  });
  result.push(olderAnimal.name);
  result.push(olderAnimal.sex);
  result.push(olderAnimal.age);
  return result;
}

function increasePrices(percentage) {
  // seu código aqui

}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
  let result = []
  let employeesList = [];
  if (!idOrName) {
    employees.forEach(({ firstName, lastName }) => { employeesList.push(`${firstName} ${lastName}`)});
  } else {
    let employer = employees.find(({ firstName, lastName, id}) => idOrName === firstName || idOrName === lastName || idOrName === id);
    employeesList.push(`${employer.firstName} ${employer.lastName}`);
  }
  employeesList.forEach((employerFromList) => result.push(employees.find((employerFromData) => employerFromList === `${employerFromList.firstName} ${employerFromList.lastName}`)))
  return result
  
  // let employerSelected = employees.filter((employer) => idOrName === employer.id || idOrName === employer.firstName || idOrName === employer.lastName);
  // let [{ firstName , lastName, responsibleFor}] = employerSelected;
  // species.forEach((animal) => {
  //   responsibleFor.forEach((id) => {
  //     if (animal.id === id) {
  //       animals.push(animal.name)   
  //     }
  //   }) 
  // })  
  // result[`${firstName} ${lastName}`] = animals;
  // return result
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
