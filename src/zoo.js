// /*
// eslint no-unused-vars: [
//   "error",
//   {
//     "args": "none",
//     "vars": "local",
//     "varsIgnorePattern": "data"
//   }
// ]
// */

// const { create } = require('eslint/lib/rules/*');
const { species, employees, hours, prices } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  // seu código aqui
  if (!ids) return [];
  return ids.map((id) => species.find((animal) => id === animal.id));
}

console.log(getSpeciesByIds());

function getAnimalsOlderThan(animal, age) {
  // seu código aqu
  const animalName = species.find((specie) => specie.name === animal);
  return animalName.residents.every((specie) => specie.age >= age);
}
// Filter retornava o residents como objetcs, por isso não acessava. Com find ele acessa todas as infos.
console.log(getAnimalsOlderThan('tigers', 20));

function getEmployeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) return {};
  return employees.find((name) => name.firstName === employeeName || name.lastName === employeeName);
}

console.log(getEmployeeByName());

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  // seu código aqui
  return employees.some((isThereAny) => isThereAny.managers.includes(id));
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  // seu código aqui
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(animalName) {
  // seu código aqui
  if (!animalName) {
    let allAnimals = {};
    data.species.forEach((animal) => {
      allAnimals[animal.name] = animal.residents.length;
    });

    return allAnimals;
  }

  const searchedAnimal = data.species.find((animal) => animal.name === animalName);

  return searchedAnimal.residents.length;
}

function calculateEntry(entrants) {
  // seu código aqui
  if (entrants === '' || !entrants) return 0;
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;

  const finalPrice = Adult * data.prices.Adult + Senior * data.prices.Senior + Child * data.prices.Child;

  return finalPrice;
}

console.log(calculateEntry({ Adult: 2, Child: 3, Senior: 1 }));

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
  // const fullSchedule = Object.entries(hours);
  // if (!dayName) {
  //   return fullSchedule.reduce((acc, day, index) => {
  //     acc[index] = `Open from ${day.open}am until ${day}`
  //   })
  // }
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
  const employeeAnimals = employees.find((worker) => worker.id === id)
    .responsibleFor[0];

  const whichAnimal = data.species.find((which) => which.id === employeeAnimals);

  const theOldest = whichAnimal.residents.reduce((acc, animal) => (acc.age > animal.age ? acc : animal));

  return [theOldest.name, theOldest.sex, theOldest.age];
}

function increasePrices(percentage) {
  // seu código aqui
  // UTILIZADO PRA FAZER O ARREDONDAMENTO:
  // https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
  Object.keys(data.prices).forEach((value) => { data.prices[value] *= (1 + (percentage / 100)); });
  // Math.round((num + Number.EPSILON) * 100) / 100
  Object.keys(data.prices).forEach((value) => { data.prices[value] = Math.round((data.prices[value] + Number.EPSILON) * 100) / 100; });
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
  let coverage = {};
  if (idOrName === undefined) {
    data.employees.forEach((employee) => {
      coverage[`${employee.firstName} ${employee.lastName}`] = employee.responsibleFor.map((animalId) => data.species.find((itsId) => animalId === itsId.id).name);
    });
    return coverage;
  }
  let findingWhoIs = employees.find((thisEmployee) => thisEmployee.firstName === idOrName || thisEmployee.lastName === idOrName || thisEmployee.id === idOrName);
  coverage[`${findingWhoIs.firstName} ${findingWhoIs.lastName}`] = findingWhoIs.responsibleFor.map((animalId) => data.species.find((itsId) => animalId === itsId.id).name);

  return coverage;
}

console.log(getEmployeeCoverage());

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
