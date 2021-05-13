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

function getSpeciesByIds(...ids) {
  // seu código aqui
  return species.filter((specie) => ids.some((id) => id === specie.id));
}
// console.log(getSpeciesByIds('0938aa23-f153-4937-9f88-4858b24d6bce'));

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  return species.find((specie) => specie.name === animal).residents.every((resident) => resident.age > age);
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  if (typeof employeeName === 'undefined') return {};
  return employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(animal) {
  // seu código aqui
  if (typeof animal === 'undefined') {
    const object = {};
    species.forEach((specie) => { object[specie.name] = specie.residents.length; });
    return object;
  }
  return species.find((specie) => specie.name === animal).residents.length;
}

function calculateEntry(entrants) {
  // seu código aqui
  if (typeof entrants === 'undefined' || entrants === {}) return 0;
  return Object.keys(entrants).reduce((acc, ageGroup) => acc + entrants[ageGroup] * prices[ageGroup], 0);
}

function getSpeciesByLocation(locations) {
  const result = {};
  locations.forEach((location) => {
    const speciesFromLocation = species
      .filter((specie) => specie.location === location)
      .map((specie) => specie.name);
    result[location] = speciesFromLocation;
  });
  return result;
}
console.log(getSpeciesByLocation(['NE', 'NW', 'SE', 'SW']));

function getSpeciesAndNamesByLocation(locations, sorted, sex) {
  const result = {};
  locations.forEach((location) => {
    const speciesAndNamesFromLocation = species
      .filter((specie) => specie.location === location)
      .map((specie) => {
        const key = specie.name;
        const value = specie.residents.filter((resident) => (sex ? resident.sex === sex : true)).map((resident) => resident.name);
        if (sorted) value.sort();
        return { [key]: value };
      });
    result[location] = speciesAndNamesFromLocation;
  });
  return result;
}

function getAnimalMap(options) {
  // seu código aqui
  const locations = ['NE', 'NW', 'SE', 'SW'];
  if (!options) {
    return getSpeciesByLocation(locations);
  }
  const { includeNames, sex, sorted } = options;
  if (!includeNames) {
    return getSpeciesByLocation(locations);
  }
  return getSpeciesAndNamesByLocation(locations, sorted, sex);
}
console.log(getAnimalMap({ includeNames: true }));

function getSchedule(dayName) {
  // seu código aqui
  const result = {};
  Object.keys(hours).forEach((day) => {
    if (day !== 'Monday') {
      result[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    } else { result[day] = 'CLOSED'; }
  });
  if (!dayName) return result;
  return { [dayName]: result[dayName] };
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
  const fistSpecieId = employees.find((employee) => employee.id === id).responsibleFor[0];
  const specieResidents = species.find((specie) => specie.id === fistSpecieId).residents;
  const oldestAnimal = specieResidents.reduce((oldest, resident) => (oldest.age > resident.age ? oldest : resident));
  return Object.values(oldestAnimal);
}

function increasePrices(percentage) {
  // seu código aqui
  return Object.keys(prices).forEach((ageGroup) => {
    prices[ageGroup] *= (1 + (percentage / 100));
    prices[ageGroup] = Math.round(prices[ageGroup] * 100) / 100;
  });
}
// Ref: https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary

function getEmployeeCoverage(idOrName) {
  // seu código aqui
  // sem parametro
  if (!idOrName) {
    const result = {};
    const speciesEmployeeResponsable = employees.map((employee) => employee.responsibleFor
      .map((specieId) => species.find((specie) => specie.id === specieId).name));
    // array com o tamanho do array employees, em que cada indice corresponde a outro array contendo strings com os nomes dos animais que o employees[indice] é responsavel por.
    employees.forEach((employee, index) => {
      result[`${employee.firstName} ${employee.lastName}`] = speciesEmployeeResponsable[index];
    });
    return result;
  }
  // com parametro
  const findEmployee = employees.find((employee) => employee.id === idOrName
    || employee.firstName === idOrName || employee.lastName === idOrName);
  return { [`${findEmployee.firstName} ${findEmployee.lastName}`]: findEmployee.responsibleFor
    .map((specieId) => species.find((specie) => specie.id === specieId).name) };
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
