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

const { species, employees, hours, prices } = require('./data');
// const data = require('./data');

// 1. Esta função é responsável pela busca das espécies de animais por id. Ela retorna um array contendo as espécies referentes aos ids passados como parâmetro, podendo receber um ou mais ids.
function getSpeciesByIds(...ids) {
  if (ids !== null && ids !== undefined) {
    return species.filter((animal) => ids.includes(animal.id));
  }
  return [];
}

// 2. Esta função, a partir do nome de uma espécie e uma idade mínima, verifica se todos os animais daquela espécie possuem a idade mínima especificada
function getAnimalsOlderThan(animal, age) {
  return species.find((especieName) => especieName.name === animal)
    .residents.every((animalAge) => animalAge.age >= age);
}

// 3. Esta função é responsável pela busca das pessoas colaboradoras através do primeiro ou do último nome delas
function getEmployeeByName(employeeName) {
  if (employeeName !== null && employeeName !== undefined) {
    return employees.find((name) =>
      name.firstName === employeeName || name.lastName === employeeName);
  }
  return {};
}

// 4. A função, a partir de informações recebidas nos parâmetros, é capaz de criar um objeto equivalente ao de uma pessoa colaboradora, retornando-o
function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

// 5. Verifica se uma pessoa colaboradora, a partir de seu id, ocupa cargo de gerência.
function isManager(id) {
  return employees.some((managerCheck) => managerCheck.managers.includes(id));
}

// 6. A função irá adicionar uma nova pessoa colaboradora ao array employees, presente no arquivo data.js.
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  return employees.push(newEmployee);
}

// 7. Esta função é responsável por contabilizar a quantidade de animais.
function countAnimals(animal) {
  const animaisAndQuantities = {};
  if (animal === null || animal === undefined) {
    species.forEach((specie) => {
      animaisAndQuantities[specie.name] = specie.residents.length;
    });
    return animaisAndQuantities;
  }
  return species.find((specie) => specie.name === animal).residents.length;
}

// 8. A partir da quantidade de visitantes e a faixa etária de cada um, esta função é responsável por retornar o preço total a ser cobrado
function calculateEntry(entrants) {
  if (entrants === undefined) {
    return 0;
  }
  return Object.keys(entrants).reduce((acc, cur) => acc + (prices[cur] * entrants[cur]), 0);
}

// 9. A função é responsável pelo mapeamento geográfico das espécies e seus animais, podendo ainda filtrá-los por ordem alfabética e gênero, por exemplo
function getAnimalMap(options) {
  // seu código aqui
}

// 10. A função é responsável por disponibilizar as informações de horário para uma consulta, que pode querer ter acesso a todo o cronograma da semana ou apenas o cronograma de um dia específico
function getSchedule(dayName) {
  const objectDay = {};
  Object.keys(hours).forEach((day) => {
    const initial = hours[day].open;
    const final = hours[day].close;
    objectDay[day] = `Open from ${initial}am until ${final - 12}pm`;
  });
  objectDay.Monday = 'CLOSED';

  if (dayName) return ({ [dayName]: objectDay[dayName] });

  return objectDay;
}

// 11. A função busca por informações do animal mais velho da primeira espécie gerenciada pela pessoa colaboradora do parâmetro
function getOldestFromFirstSpecies(id) {
  const employeeName = employees.find((employ) => employ.id === id);
  const fistAnimalCare = employeeName.responsibleFor[0];
  const animalInfo = species.filter((animal) => animal.id === fistAnimalCare)[0].residents;
  const animalsInOrder = animalInfo.sort((a, b) => (a.age < b.age ? 1 : -1));
  return Object.values(animalsInOrder[0]);
}

// 12. A função é responsável por aumentar o preço das visitas, com base no valor de aumento recebido no parâmetro, em porcentagem
function increasePrices(percentage) {
  const { Adult, Senior, Child } = prices;
  prices.Adult = Math.ceil(Adult * (percentage + 100)) / 100;
  prices.Senior = Math.ceil(Senior * (percentage + 100)) / 100;
  prices.Child = Math.ceil(Child * (percentage + 100)) / 100;
}

// Requisito 13 desenvolvido com o auxílio dos colegas Julio Filizzola e Nalu Pantoja.
// 13. A função é responsável por consultar as espécies pela qual a pessoa colaborada, recebida no parâmetro através de seu id, firstName ou lastName, é responsável
function getEmployeeCoverage(idOrName) {
  const retorno = {};
  if (idOrName === null || idOrName === undefined) {
    employees.forEach((employ) => {
      retorno[`${employ.firstName} ${employ.lastName}`] = employ.responsibleFor.map((id) => species.find((animals) => animals.id === id).name);
    });
    return retorno;
  }
  employees.filter((emp) => emp.firstName === idOrName || emp.lastName === idOrName || emp.id === idOrName).forEach((employ) => {
    retorno[`${employ.firstName} ${employ.lastName}`] = employ.responsibleFor.map((id) => species.find((animals) => animals.id === id).name);
  });
  return retorno;
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
