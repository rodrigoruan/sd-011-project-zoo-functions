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

function getSpeciesByIds(...ids) {
  return data.species.filter(({ id }) => ids.includes(id));
}

function getAnimalsOlderThan(animal, ageAnimal) {
  const objectFound = data.species.find(({ name }) => name === animal);
  return objectFound.residents.every(({ age }) => age > ageAnimal);
}

function getEmployeeByName(employeeName) {
  const employeesSheet = data.employees.find(({ firstName, lastName }) => employeeName === firstName || employeeName === lastName);
  if (employeesSheet === undefined) {
    return {};
  }
  return employeesSheet;
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  return data.employees.map(({ managers }) => (managers.includes(id))).reduce(((acc, value) => acc === value), false);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  let newObject = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return data.employees.push(newObject);
}

function countAnimals(species) {
  if (!species) {
    return data.species.reduce((acc, { name, residents }) => {
      acc[name] = residents.length;
      return acc;
    }, {});
  }
  const findAnimal = data.species.find(({ name }) => name === species);
  if (findAnimal) {
    return findAnimal.residents.length;
  }
}

function calculateEntry(entrants) {
  if (!entrants || entrants === {}) {
    return 0;
  }
  const sumFun = ({ Adult = 0, Senior = 0, Child = 0 }) => {
    let sum = (Adult * 49.99) + (Senior * 24.99) + (Child * 20.99);
    return sum;
  };
  return sumFun(entrants);
}

// A constante regiao para obter o array com as regiões foi feito com a ajuda do Vinicius;

const animalTypesFunc = () => {
  const regions = data.species.map(({ location }) => location);
  return regions.reduce((acc, curr, index) => {
    acc[regions[index]] = data.species.filter(({ location }) => location === curr).map((animal) => animal.name);
    return acc;
  }, {});
};

const getSorted = (obj, regioes) => {
  regioes.forEach((regiao) => {
    obj[regiao].forEach((animal) => {
      animal[Object.keys(animal)[0]].sort();
    });
  });
};

const filterSex = (object, regioes, options) => {
  regioes.forEach((regiao) => {
    object[regiao].forEach((animal) => {
      const animalSelected = Object.keys(animal)[0];
      const objectAnimalSelected = data.species.find(({ name }) => name === animalSelected);
      animal[animalSelected] = objectAnimalSelected.residents.filter(({ sex }) => sex === options.sex).map((animalMap) => animalMap.name);
    });
  });
};

const includeNames = (object, options) => {
  const regioes = Object.keys(object);
  regioes.forEach((regiao) => {
    object[regiao] = [];
    data.species.forEach(({ name, location, residents }) => {
      if (location === regiao) {
        object[regiao].push({ [name]: residents.map((resident) => resident.name) });
      }
    });
  });
  if (options.sex) {
    filterSex(object, regioes, options);
  }
  if (options.sorted) {
    getSorted(object, regioes);
  }
  return object;
};

// O requisito 9 foi desenvolvido por mim e pelo Alberto;

function getAnimalMap(options) {
  let result = animalTypesFunc();
  if (!options || !options.includeNames) {
    return result;
  }
  return includeNames(result, options);
}

function getSchedule(dayName) {
  if (!dayName) {
    return Object.keys(data.hours).reduce((acc, day) => {
      acc[day] = `Open from ${data.hours[day].open}am until ${data.hours[day].close - 12}pm`;
      acc.Monday = 'CLOSED';
      return acc;
    }, {});
  }

  if (dayName === 'Monday') return { Monday: 'CLOSED' };
  return { [dayName]: `Open from ${data.hours[dayName].open}am until ${data.hours[dayName].close - 12}pm` };
}

function getOldestFromFirstSpecies(idEmployeer) {
  const getAnimal = data.employees.find(({ id }) => id === idEmployeer).responsibleFor[0];
  const getAniamlObj = data.species.find(({ id }) => id === getAnimal).residents;
  const sortedAnimals = getAniamlObj.sort((value1, value2) => value2.age - value1.age)[0];
  return Object.values(sortedAnimals);
}

function increasePrices(percentage) {
  const price = data.prices;
  const { Adult, Senior, Child } = price;
  const newAdultPrice = ((Adult + (Adult * (percentage / 100))) + 0.001).toFixed(2);
  const newSeniorPrice = ((Senior + (Senior * (percentage / 100))) + 0.001).toFixed(2);
  const newChildPrice = ((Child + (Child * (percentage / 100))) + 0.001).toFixed(2);

  price.Adult = parseFloat(newAdultPrice);
  price.Senior = parseFloat(newSeniorPrice);
  price.Child = parseFloat(newChildPrice);
}

function getEmployeeCoverage(idOrName) {
  const employeerFind = data.employees.find(({ id, lastName, firstName }) => idOrName === id || idOrName === firstName || idOrName === lastName);
  if (!idOrName) {
    return data.employees.reduce((acc, { firstName, lastName, responsibleFor }) => {
      const fullName = `${firstName} ${lastName}`;
      const AnimalListFound = responsibleFor.map((Animal) => data.species.find(({ id }) => id === Animal).name);
      acc[fullName] = AnimalListFound;
      return acc;
    }, {});
  }
  let fullName = `${employeerFind.firstName} ${employeerFind.lastName}`;
  let newObject = {};
  const animalsFound = employeerFind.responsibleFor.map((Animal) => data.species.find(({ id }) => id === Animal).name);
  newObject[fullName] = animalsFound;
  return newObject;
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
