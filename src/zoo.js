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
  return data.species.filter((animal) => ids.some((id) => id === animal.id));
}

function getAnimalsOlderThan(animal, age) {
  return data.species.find((animalName) => animalName.name === animal).residents.every((val) => val.age >= age);
}

function getEmployeeByName(employeeName) {
  return !employeeName ? {} : data.employees.find((person) => person.firstName === employeeName || person.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // Método 1
  // return {
  // id,
  // firstName,
  // lastName,
  // managers,
  // responsibleFor,
  // }

  // Método 2
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some((person) => person.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(specie) {
  const result = data.species.reduce((acc, curr) => {
    acc[curr.name] = curr.residents.length;
    return acc;
  }, {});

  return (!specie) ? result : result[specie];
}

function calculateEntry(entrants) {
  if (!entrants || entrants === {}) return 0;
  return Object.keys(entrants).reduce((sum, atual) => sum + (data.prices[atual] * entrants[atual]), 0);
}

// Requisito 9
function sorted(result, regions) {
  regions.forEach((region) => {
    result[region].forEach((animal) => {
      let singleAnimal = Object.keys(animal)[0];
      animal[singleAnimal].sort();
    });
  });
}

function filterSex(result, regions, options) {
  regions.forEach((region) => {
    result[region] = [];
    result[region] = data.species
      .reduce((acc, { name, location, residents }) => (location === region ? acc
        .concat({ [name]: residents
          .filter(({ sex }) => options.sex === sex)
          .map((specie) => specie.name) }) : acc), []);
  });
}

function includeNames(result, options, regions) {
  regions.forEach((region) => {
    result[region] = [];
    result[region] = data.species
      .reduce((acc, { name, location, residents }) => (location === region ? acc
        .concat({ [name]: residents
          .map((specie) => specie.name) }) : acc), []);
  });

  if (options.sex) {
    filterSex(result, regions, options);
  }
  if (options.sorted) {
    sorted(result, regions);
  }
  return result;
}

function animalsByRegion() {
  const regions = data.species.map((region) => region.location);
  const result = regions.reduce((acc, curr, index) => {
    acc[regions[index]] = data.species.filter((animal) => animal.location === curr).map((animals) => animals.name);
    return acc;
  }, {});
  return result;
}
function getAnimalMap(options) {
  let result = animalsByRegion();
  const regions = Object.keys(result);

  if (!options || !options.includeNames) {
    return result;
  }

  return includeNames(result, options, regions);
}
console.log(getAnimalMap({ includeNames: true, sex: 'female', sorted: true }));

function getSchedule(dayName) {
  // Array com objetos com todos os horários e dias da semana, que indicam abertura
  // e fechamento do zoológico.
  const hours = Object.values(data.hours);
  let weekDays;
  if (!dayName) {
    weekDays = Object.keys(data.hours);
  } else {
    weekDays = [dayName];
  }

  const result = weekDays.reduce((acc, curr, index) => {
    acc[curr] = `Open from ${hours[index].open}am until ${hours[index].close - 12}pm`;
    return acc;
  }, {});

  if (result.Monday) {
    result.Monday = 'CLOSED';
  }
  return result;
}

function getOldestFromFirstSpecies(id) {
  // Parte responsável por capturar o ID do primeiro animal, na qual a pessoa funcionárioa abaixo é responsável.
  const animalId = Object.entries(data.employees).find((person) => person[1].id === id)[1].responsibleFor[0];

  // Retorna a maior idade do animal requisitado!
  const oldAnimal = data.species.find((animal) => animal.id === animalId).residents.reduce((acc, curr) => Math.max(acc, curr.age), 0);

  // Exibe informações do animal mais velho informado no parâmetro da função getOldestFromFirstSpecies.
  const result = data.species.find((animal) => animalId === animal.id).residents.reduce((acc, curr) => {
    if (curr.age === oldAnimal) {
      acc.push(curr.name);
      acc.push(curr.sex);
      acc.push(curr.age);
    }
    return acc;
  }, []);

  return result;
}

function increasePrices(percentage) {
  const adultPrice = parseFloat(data.prices.Adult + (data.prices.Adult * (percentage / 100)) + 0.001).toFixed(2);
  const seniorPrice = parseFloat(data.prices.Senior + (data.prices.Senior * (percentage / 100)) + 0.001).toFixed(2);
  const childPrice = parseFloat(data.prices.Child + (data.prices.Child * (percentage / 100)) + 0.001).toFixed(2);
  data.prices.Adult = Number(adultPrice);
  data.prices.Senior = Number(seniorPrice);
  data.prices.Child = Number(childPrice);
}

function getEmployeeCoverage(idOrName) {
  // Função responsável por retornar todos os funcionários e seus respectivos animais!
  const result = data.employees.reduce((acc, curr) => {
    acc[`${curr.firstName} ${curr.lastName}`] = curr.responsibleFor.map((animalId) => data.species.find(({ id }) => id === animalId).name);
    return acc;
  }, {});

  // Verifica se a função tem ou não um parâmetro!
  if (!idOrName) {
    return result;
  }

  /** Retorna o objeto completo com o funcinário passado por parâmetro. */
  const functionary = data.employees.find((person) => (idOrName === person.firstName || idOrName === person.lastName || idOrName === person.id));

  /** Variável com o nome completo que é usada para comparação */
  const functionaryName = `${functionary.firstName} ${functionary.lastName}`;
  /** Variáveis abaixo são responsáveis por armazenar o nome dos funcionarios e seus respectivos animais e
   * estes resultados foram originados do result, criado lá em cima. */
  const animals = Object.values(result);
  const animalsCare = Object.keys(result);

  /** Retorna o objeto de acordo com o parâmetro passado */
  return animalsCare.reduce((acc, curr, index) => {
    if (functionaryName === curr) {
      acc[curr] = animals[index];
    }
    return acc;
  }, {});
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
