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

/* console.log(data.species[0].id);
console.log(data.species[1].id);
console.log(data.species[2].id);
console.log(data.species[3].id);
console.log(data.species[4].id);
console.log(data.species[5].id);
console.log(data.species[6].id);
console.log(data.species[7].id);
console.log(data.species[8].id);
 */
/*
  Para imprimir todos os IDs
  for(let index= 0; index < data.species.length; index += 1){
  console.log(data.species[index].id);
} */

function getSpeciesByIds(...ids) {
  // seu código aqui
  // Para caso nenhum parametro seja informado, retorna um array vazio
  if (ids.length === 0) {
    return [];
  }

  const filterID = data.species.filter((value) => {
    let moreOneId = ids.includes(value.id);
    return moreOneId;
  });
  return filterID;
}

// console.log(getSpeciesByIds(data));

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  const forEachAnimal = data.species.find((animals) => animals.name === animal);
  const verifyAge = forEachAnimal.residents.every((value) => value.age >= age);
  return verifyAge;
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) {
    return {};
  }

  const firstAndSecond = data.employees.find((value) => value.firstName === employeeName || value.lastName === employeeName);
  return firstAndSecond;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return data.employees.some((value) => value.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
  if (managers === undefined) {
    managers = [];
  }

  if (responsibleFor === undefined) {
    responsibleFor = [];
  }

  const newEmploye = { id, firstName, lastName, managers, responsibleFor };
  return data.employees.push(newEmploye);
}

function countAnimals(species) {
  // seu código aqui
  if (species === undefined) {
    const object = {};
    data.species.forEach((value) => {
      object[value.name] = value.residents.length;
    });
    return object;
  }
  const count = data.species.filter((value) => value.name === species);
  return count[0].residents.length;
}

function calculateEntry(entrants) {
  // seu código aqui
  if (!entrants) {
    return 0;
  }

  if (Object.keys(entrants).length === 0) {
    return 0;
  }

  const accessKey = Object.keys(entrants);
  const partialPrice = (accumulate, current) => (accumulate + (data.prices[current] * entrants[current]));
  const totalPrice = accessKey.reduce(partialPrice, 0);
  return totalPrice;
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
  const key = Object.keys(data.hours);
  const object = {};

  // para o caso sem parametros
  if (!dayName) {
    // Acessar a chave de cada um dos elementos do objeto "hours"
    const schedule = (value) => {
      object[value] = `Open from ${data.hours[value].open}am until ${(data.hours[value].close) - 12}pm`;
      if (value === 'Monday') {
        object[value] = 'CLOSED';
      }
    };

    key.forEach(schedule);
    return object;
  }

  if (dayName === 'Monday') {
    // Adiciona uma nova chave ao obj vazio assim como o valor dela, que seria 'CLOSED'
    object[dayName] = 'CLOSED';
    return object;
  }

  object[dayName] = `Open from ${data.hours[dayName].open}am until ${(data.hours[dayName].close) - 12}pm`;
  return object;
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
  // dentro do objeto "employees" ele busca qual deles possue valor igual
  // ao id passado como parametro
  const employeesInformation = data.employees.find((value) => value.id === id);
  const selectAnimal = data.species.find((value) => employeesInformation.responsibleFor[0] === value.id);
  const oldestAnimal = selectAnimal.residents.reduce((accumulate, current) => {
    if (current.age > accumulate.age) {
      return current;
    }
    return accumulate;
  });
  return [oldestAnimal.name, oldestAnimal.sex, oldestAnimal.age];
}

function increasePrices(percentage) {
  // seu código aqui
  const key = Object.keys(data.prices);
  const object = key.forEach((value) => {
    data.prices[value] = Math.round(data.prices[value] * (percentage / 100 + 1) * 100) / 100;
  });
  return object;
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
