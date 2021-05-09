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

const { species, employees } = require("./data");
const data = require("./data");

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
console.log(getAnimalsOlderThan("tigers", 20));

function getEmployeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) return {};
  return employees.find(
    (name) => name.firstName === employeeName || name.lastName === employeeName
  );
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
  responsibleFor = []
) {
  // seu código aqui
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(species) {
  // seu código aqui
  if (!species) {
    let allAnimals = {};
    data.species.forEach((animal) => {
      allAnimals[animal.name] = animal.residents.length;
    });

    return allAnimals;
  }

  const searchedAnimal = data.species.find((animal) => animal.name === species);

  return searchedAnimal.residents.length;
}

function calculateEntry(entrants) {
  // seu código aqui
  if (entrants === "" || !entrants) return 0;
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;

  const prices =
    Adult * data.prices.Adult +
    Senior * data.prices.Senior +
    Child * data.prices.Child;

  return prices;
}

console.log(calculateEntry({ Adult: 2, Child: 3, Senior: 1 }));

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
  const employeeAnimals = employees.find((worker) => worker.id === id)
    .responsibleFor[0];

  const whichAnimal = data.species.find(
    (which) => which.id === employeeAnimals
  );

  const theOldest = whichAnimal.residents.reduce((oldestOne, animal) =>
    oldestOne.age > animal.age ? oldestOne : animal
  );

  return [theOldest.name, theOldest.sex, theOldest.age];
}

function increasePrices(percentage) {
  // seu código aqui
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
