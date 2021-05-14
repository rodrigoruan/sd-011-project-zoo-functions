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
// console.log(species.length);
const { species: animalNames } = require('./data');
// console.log(...animalNames);
const { employees } = require('./data');
// console.log(employees);
const { hours } = require('./data');
// console.log(hours);
const { prices } = require('./data');
// console.log(prices);

// Esta função é responsável pela busca das espécies de animais por id. Ela retorna um array contendo as espécies referentes aos ids passados como parâmetro, podendo receber um ou mais ids.
// Caso receba nenhum parâmetro, necessário retornar um array vazio
// Ao receber como parâmetro um único id, retorna um array com a espécie referente à esse id
// Ao receber mais de um id, retorna um array com as espécies referentes aos ids
const getSpeciesByIds = (...ids) => ids.map((id) => data.species.find(({ id: animalId }) => animalId === id));

// Esta função, a partir do nome de uma espécie e uma idade mínima, verifica se todos os animais daquela espécie possuem a idade mínima especificada
// Ao passar o nome de uma espécie e uma idade, testa se todos os animais desta espécie possuem a idade mínima especificada (>=)
// retorna um valor booleano
const getAnimalsOlderThan = (animal, age) => animalNames.find((animals) => animals.name === animal).residents.every((resident) => resident.age >= age);

// Esta função é responsável pela busca das pessoas colaboradoras através do primeiro ou do último nome delas
// Sem parâmetros, retorna um objeto vazio
// Quando provido o primeiro nome do funcionário, retorna o objeto do funcionário
// Quando provido o último nome do funcionário, retorna o objeto do funcionário
function getEmployeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}

// A função, a partir de informações recebidas nos parâmetros, é capaz de criar um objeto equivalente ao de uma pessoa colaboradora, retornando-o
// O parâmetro personalInfo recebe um objeto que contém o id, o firstName e o lastName
// O parâmetro associatedWith recebe um objeto que contém dois array: managers e responsibleFor
function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

// Verifica se uma pessoa colaboradora, a partir de seu id, ocupa cargo de gerência.
// Testa se o id passado é de um gerente
function isManager(id) {
  return employees.some(({ managers }) => managers.includes(id));
}

// A função irá adicionar uma nova pessoa colaboradora ao array employees, presente no arquivo data.js.
// Adiciona um funcionário no fim da lista
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

// Esta função é responsável por contabilizar a quantidade de animais.
// Sem parâmetros, retorna um objeto (animais e suas quantidade)
// Com o nome de uma espécie de animal, retorna um número (somente a quantidade)
function countAnimals(species) {
  if (species === undefined) {
    let totalAnimals = {};
    animalNames.forEach((animal) => {
      totalAnimals[animal.name] = animal.residents.length;
    });
    return totalAnimals;
  }
  return animalNames.find((animalsBySpecies) => animalsBySpecies.name === species).residents.length;
}

// A partir da quantidade de visitantes e a faixa etária de cada um, esta função é responsável por retornar o preço total a ser cobrado
// O parâmetro entrants recebe um objeto que contém as chaves Adult, Child e Senior, com suas respectivas quantidades de pessoas
// Retorna 0 se nenhum argumento for passado
// Retorna 0 se um objeto vazio for passado
// Retorna o preço total a ser cobrado dado o número de adultos, crianças e idosos
function calculateEntry(entrants) {
  if (entrants === undefined) {
    return 0;
  }
  return Object.keys(entrants).reduce((accumulator, currentValue) => accumulator + prices[currentValue] * entrants[currentValue], 0);
}
/**
* Consultei o repositório de Samuel Silva Melo para resolver essa parte
* Link: https://github.com/tryber/sd-011-project-zoo-functions/pull/117/commits/4e179e996adb153ce60b88e11a3edc28dae2b64e
*/
// console.log(calculateEntry());
// console.log(calculateEntry({}));

function getAnimalMap(options) {
  // seu código aqui
}

// A função é responsável por disponibilizar as informações de horário para uma consulta, que pode querer ter acesso a todo o cronograma da semana ou apenas o cronograma de um dia específico
// Analise o teste unitário para entender os retornos que são esperados para esta função
// Sem parâmetros, retorna um cronograma legível para humanos
// Se um único dia for passado, retorna somente este dia em um formato legível para humanos
function getSchedule(dayName) {
  // seu código aqui
}

// A função busca por informações do animal mais velho da primeira espécie gerenciada pela pessoa colaboradora do parâmetro
// Passado o id de um funcionário, encontra a primeira espécie de animal gerenciado pelo funcionário, e retorna um array com nome, sexo e idade do animal mais velho dessa espécie
function getOldestFromFirstSpecies(id) {
  const selectedEmployee = data.employees.find((employee) => employee.id === id).responsibleFor[0];
  const firstManagedAnimal = data.species.find((zooAnimal) => zooAnimal.id === selectedEmployee);
  return Object.values(firstManagedAnimal.residents.reduce((acc, curr) => {
    if (acc.age > curr.age) {
      return acc;
    }
    return curr;
  }));
}

// A função é responsável por aumentar o preço das visitas, com base no valor de aumento recebido no parâmetro, em porcentagem
// Se o parâmetro da função recebe o valor 20, o aumento é de 20%
// Altera o objeto prices do arquivo data.js
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
