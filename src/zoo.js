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

const { employees } = require('./data');
const data = require('./data');

const { species, hours, prices } = data;

function getSpeciesByIds(...ids) {
  // seu código aqui
  return species.filter((specie) => ids.includes(specie.id));
}

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  const getAnimalByName = (specie) => specie.name === animal;
  const [testedAnimal] = species.filter(getAnimalByName);
  const checkAge = (resident) => resident.age >= age;
  return testedAnimal.residents.every(checkAge);
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) {
    const emptyObject = {};
    return emptyObject;
  }
  const verifyEmployeeName = (employee) => employee.firstName === employeeName || employee.lastName === employeeName;
  const [employ] = employees.filter(verifyEmployeeName);
  return employ;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(employee);
}

function countAnimals(speciees) {
  // seu código aqui
  if (!speciees) {
    const numbersOfAnimals = {};
    species.forEach((specie) => { numbersOfAnimals[specie.name] = specie.residents.length; });
    return numbersOfAnimals;
  }
  const { residents } = species.find((specie) => specie.name === speciees);
  return residents.length;
}

function calculateEntry(entrants) {
  // seu código aqui
  if (!entrants || entrants === {}) { return 0; }
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  const { Adult: adultPrice, Senior: seniorPrice, Child: childPrice } = prices;
  const adultValue = Adult * adultPrice;
  const seniorValue = Senior * seniorPrice;
  const childValue = Child * childPrice;
  return (adultValue + seniorValue + childValue);
}

const animalsLocation = (acc, curr) => {
  const { location } = curr;
  const specieName = curr.name;
  if (!acc[location]) { acc[location] = []; }
  acc[location].push(specieName);
  return acc;
};

const reduceAnimalsLocation = () => (species.reduce(animalsLocation, {}));

const biuldSpecieResidentsArray = (accR, currR) => {
  accR.push(currR.name);
  return accR;
};

const animalsLocationNames = (acc, curr) => {
  const { location } = curr;
  const specieName = curr.name;
  const specieResidents = curr.residents.reduce(biuldSpecieResidentsArray, []);
  const specieResidentsName = { [`${specieName}`]: specieResidents };
  if (!acc[location]) { acc[location] = []; }
  acc[location].push(specieResidentsName);
  return acc;
};

const reduceAnimalsLocationNames = () => (species.reduce(animalsLocationNames, {}));

const biuldSpecieResidentsArraySorted = (accR, currR) => {
  accR.push(currR.name);
  return accR.sort();
};

const animalsLocNamesSorted = (acc, curr) => {
  const { location } = curr;
  const specieName = curr.name;
  const specieResidents = curr.residents.reduce(biuldSpecieResidentsArraySorted, []);
  const specieResidentsName = { [`${specieName}`]: specieResidents };
  if (!acc[location]) { acc[location] = []; }
  acc[location].push(specieResidentsName);
  return acc;
};

const reduceAnimalsLocNamesSorted = () => (species.reduce(animalsLocNamesSorted, {}));

const reduceAnimalsLocationSexNames = (sex) => (species.reduce((acc, curr) => {
  const { location } = curr;
  const specieName = curr.name;
  const specieResidentsGender = curr.residents.reduce((accR, currR) => {
    if (currR.sex === sex) { accR.push(currR.name); }
    return accR;
  }, []);
  const specieResidentsName = { [`${specieName}`]: specieResidentsGender };
  if (!acc[location]) { acc[location] = []; }
  acc[location].push(specieResidentsName);
  return acc;
}, {}));

const reduceAnimalsLocSexNamesSorted = (sex) => (species.reduce((acc, curr) => {
  const { location } = curr;
  const specieName = curr.name;
  const specieResidentsGender = curr.residents.reduce((accR, currR) => {
    if (currR.sex === sex) { accR.push(currR.name); }
    return accR.sort();
  }, []);
  const specieResidentsName = { [`${specieName}`]: specieResidentsGender };
  if (!acc[location]) { acc[location] = []; }
  acc[location].push(specieResidentsName);
  return acc;
}, {}));

function getAnimalMap(options) {
  // seu código aqui
  if (!options || !options.includeNames) {
    return reduceAnimalsLocation();
  }
  if (!options.sorted) {
    if (!options.sex) {
      return reduceAnimalsLocationNames();
    }
    return reduceAnimalsLocationSexNames(options.sex);
  }
  if (!options.sex) {
    return reduceAnimalsLocNamesSorted();
  }
  return reduceAnimalsLocSexNamesSorted(options.sex);
}

function getSchedule(dayName) {
  // seu código aqui
  const text = (day) => {
    const { open, close } = hours[day];
    return day === 'Monday' ? 'CLOSED' : `Open from ${open}am until ${close - 12}pm`;
  };
  const schedule = {};
  if (!dayName) {
    Object.keys(hours).forEach((dia) => { schedule[dia] = text(dia); });
    return schedule;
  }
  schedule[dayName] = text(dayName);
  return schedule;
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
  const employeeFounded = employees.find((employee) => employee.id === id);
  const [idAnimal] = employeeFounded.responsibleFor;
  const specieFounded = species.find((specie) => specie.id === idAnimal);
  const { name, sex, age } = specieFounded.residents.reduce((acc, curr) => (acc.age > curr.age ? acc : curr));
  return [name, sex, age];
}

function increasePrices(percentage) {
  // seu código aqui
  const increment = (1 + (percentage / 100));
  Object.keys(prices).forEach((classification) => {
    prices[classification] *= increment;
    prices[classification] = Math.round(prices[classification] * 100) / 100;
  });
}

const employeeAnimals = (employee) => {
  const animalsIds = employee.responsibleFor;
  const animals = animalsIds.map((animalId) => {
    let speciee = {};
    for (let index in species) {
      if (Object.values(species[index]).includes(animalId)) {
        speciee = species[index];
      }
    }
    return speciee;
  });
  const animalsNames = animals.map((animal) => animal.name);
  const employeeName = `${employee.firstName} ${employee.lastName}`;
  return { [`${employeeName}`]: animalsNames };
};

function getEmployeeCoverage(idOrName) {
  // seu código aqui
  if (!idOrName) {
    return employees.map(employeeAnimals).reduce((acc, curr) => {
      const key = Object.keys(curr)[0];
      const value = Object.values(curr)[0];
      acc[key] = value;
      return acc;
    }, {});
  }
  const [employee] = employees.filter((emplo) => Object.values(emplo).includes(idOrName));
  return employeeAnimals(employee);
}
getEmployeeCoverage();
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
