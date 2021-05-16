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

const { employees, species, hours } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  // seu código aqui
  if (ids.length === 0) {
    return [];
  }
  let animals = ids.map((id) => data.species.find((specie) => specie.id === id));
  return animals;
}

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  let animalAge = data.species.some((specie) => specie.name === animal && specie.residents.every((minimumAge) => minimumAge.age >= age));
  return animalAge;
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) {
    return {};
  }
  const employee = data.employees.find((name) => name.firstName === employeeName || name.lastName === employeeName);
  return employee;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  let newEmployee = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
  return newEmployee;
}

function isManager(id) {
  // seu código aqui
  let manager = data.employees.some((emplyeeManager) => emplyeeManager.managers.includes(id));
  return manager;
}

function addEmployee(newId, newFirstName, newLastName, newManagers = [], newResponsibleFor = []) {
  // seu código aqui
  const newEmployee = {
    id: newId,
    firstName: newFirstName,
    lastName: newLastName,
    managers: newManagers,
    responsibleFor: newResponsibleFor,
  };
  return data.employees.push(newEmployee);
}

function countAnimals(specie) {
  // seu código aqui
  if (specie === undefined) {
    let animalObject = {};
    data.species.forEach((animal) => { animalObject[`${animal.name}`] = animal.residents.length; });
    return animalObject;
  }
  return data.species.find((animals) => animals.name === specie).residents.length;
}

function calculateEntry(entrants) {
  // seu código aqui
  if (entrants === {} || entrants === undefined) {
    return 0;
  }
  let allEntrants = Object.keys(entrants).reduce((accumulator, current) => accumulator + (data.prices[current] * entrants[current]), 0);
  return allEntrants;
}

function animalsByLocation() {
  const animalsLocation = {
    NE: [],
    NW: [],
    SE: [],
    SW: [],
  };
  data.species.forEach((specie) => {
    animalsLocation[specie.location].push(specie.name);
  });
  return animalsLocation;
}

function animalsNames(sorted, sex) {
  const animalsLocation = {
    NE: [],
    NW: [],
    SE: [],
    SW: [],
  };
  species.forEach((specie) => {
    let names;
    if (sex !== undefined) {
      const namesForSex = specie.residents.filter((resident) => resident.sex === sex);
      names = namesForSex.map((resident) => resident.name);
    } else {
      names = specie.residents.map((resident) => resident.name);
    }
    if (sorted === true) {
      names.sort();
    }
    animalsLocation[specie.location].push({ [specie.name]: names });
  });
  return animalsLocation;
}

function getAnimalMap(options) {
  // seu código aqui
  if (options !== undefined && options.includeNames === true) {
    return animalsNames(options.sorted, options.sex);
  }
  return animalsByLocation();
}

function getSchedule(dayName) {
  // FEITO COM AJUDA DA JOICY NO PLANTÃO
  // let keys = Object.keys(data.hours);
  // if (dayName === undefined) {
  //   let objectHours = {};
  //   keys.forEach((value) => {
  //     if (value === 'Monday') {
  //       objectHours[value] = 'CLOSED';
  //     } else {
  //       objectHours[value] = `Open from ${hours[value].open}am until ${hours[value].close - 12}pm`;
  //     }
  //   });
  //   return objectHours;
  // }
  // let dayOpen = {};
  // if (dayName === 'Monday') {
  //   dayOpen[dayName] = 'CLOSED';
  // } else {
  //   dayOpen[dayName] = `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm`;
  // }
  // return dayOpen;

  // REFATORAÇÃO PARA PASSAR NO LINT
  const dayOpen = {};
  if (dayName && dayName !== 'Monday') {
    dayOpen[dayName] = `Open from ${data.hours[dayName].open}am until ${data.hours[dayName].close - 12}pm`;
    return dayOpen;
  }
  if (dayName === 'Monday') {
    return { Monday: 'CLOSED' };
  }
  return {
    Tuesday: `Open from ${data.hours.Tuesday.open}am until ${data.hours.Tuesday.close - 12}pm`,
    Wednesday: `Open from ${data.hours.Wednesday.open}am until ${data.hours.Wednesday.close - 12}pm`,
    Thursday: `Open from ${data.hours.Thursday.open}am until ${data.hours.Thursday.close - 12}pm`,
    Friday: `Open from ${data.hours.Friday.open}am until ${data.hours.Friday.close - 12}pm`,
    Saturday: `Open from ${data.hours.Saturday.open}am until ${data.hours.Saturday.close - 12}pm`,
    Sunday: `Open from ${data.hours.Sunday.open}am until ${data.hours.Sunday.close - 12}pm`,
    Monday: 'CLOSED',
  };
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
  let newPriceAdult = (data.prices.Adult / 100) * percentage + data.prices.Adult + 0.001;
  let newPriceSenior = (data.prices.Senior / 100) * percentage + data.prices.Senior + 0.001;
  let newPriceChild = (data.prices.Child / 100) * percentage + data.prices.Child + 0.001;
  data.prices.Adult = Number(newPriceAdult.toFixed(2));
  data.prices.Senior = Number(newPriceSenior.toFixed(2));
  data.prices.Child = Number(newPriceChild.toFixed(2));
  return data.prices;
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
