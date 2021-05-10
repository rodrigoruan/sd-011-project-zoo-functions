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

const { species } = data;
const { employees } = data;
const { hours } = data;

//  Se o ids for diferente de 0 = negativo, retornara todas as especies que estão no ids, caso não haja, retorna um obj vazio.
const getSpeciesByIds = (...ids) => (ids ? species.filter((animal) => [...ids].includes(animal.id)) : []);

//  Encontra nas species o nome do animal e faz uma varredura, se todas idades dos animais forem >= age, retorna true, otherwise retorna falso.
const getAnimalsOlderThan = (animal, age) =>
  species.find((animalName) => animalName.name === animal).residents.every((animals) => animals.age >= age);

//  Se employee for diferente de 0 = negativo, encontra o funcionario e o retorna, otherwise retorna um empty object.
const getEmployeeByName = (employee) =>
  (employee ? employees.find((name) => name.firstName === employee || name.lastName === employee) : {});

//  Cria um novo funcionario com as informações passadas em personalInfo e associatedWith, obs: os dois param serão um obj, por isso o uso do spread operator.
const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });

//  verifica nos employess se algum contém o id passado em managers, caso yes retorn true, otherwise false
const isManager = (id) => employees.some((worker) => worker.managers.includes(id));

//  adicionado um employee ao no data.js, caso managers e responsibleFor não forem passados, retorna um empty array.
const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) =>
  employees.push({ id, firstName, lastName, managers, responsibleFor });

const countAnimals = (specie) =>
  (specie ? species.find((animal) => animal.name === specie).residents.length
    : Object.fromEntries(species.map((animal) => [animal.name, animal.residents.length])));

const calculateEntry = (entrants = 0) =>
  (Object.entries(entrants).length ? Object.entries(entrants).reduce((acc, curr) => acc + data.prices[curr[0]] * curr[1], 0) : 0);

//  args[0] vai ser o residents, args[1] sorted, args[2] sex, o reduce irá concatenar caso o sexo do animal 'current seja igual ao do args[2]', caso contrário só retorna o array, caso seja passado o sort = args[1] retorna o array ordenado, caso contrario retorna só o array;
const animalsName = (...args) => {
  const nameOfAnimals = args[0].reduce((acc, curr) => (args[2] && curr.sex !== args[2] ? acc : acc.concat(curr.name)), []);
  return args[1] ? nameOfAnimals.sort() : nameOfAnimals;
};

const getAnimalMap = (options = {}) => {
  //  criado um objeto dinamicamente em obj, com key NE, NW, SE, SW. todos com o valor [].
  let obj = {};
  const names = ['NE', 'NW', 'SE', 'SW'];

  for (let i of names) obj[i] = [];
  //  caso não seja passado o includeNames, irá retornar o objeto somente com os nomes da espécies, caso o includes seja passado irá chamar cada elemento do species e irá puxar para cada um uma chave com o nome da espécie do animal e os valores como um array ordenado ou etc... com o nome dos animais.
  species.map((animal) =>
    (options.includeNames ? obj[animal.location].push({ [animal.name]:
       animalsName(animal.residents, options.sorted, options.sex),
    }) : obj[animal.location].push(animal.name)));
  return obj;
};

const arrOfDays = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday'];

const verifyDay = (day) => (!hours[day].open && !hours[day].close ? [[day], 'CLOSED']
  : [[day], `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`]);

const getSchedule = (day) => (day ? Object.fromEntries([verifyDay(day).map((value) => (Array.isArray(value) ? value[0] : value))])
  : Object.fromEntries(arrOfDays.map((oneDay) => verifyDay(oneDay))));

const getOldestFromFirstSpecies = (id) =>
  Object.values(species.find((animal) => animal.id === employees.find((person) => person.id === id).responsibleFor[0])
    .residents.sort((animal1, animal2) => animal2.age - animal1.age)[0]);

//  Função para calcular a porcentagem que será adicionado aos preços.
const addPercentage = (peop, percentage) => Math.round((peop + peop * (percentage / 100)) * 100) / 100;

//  Função que aumenta os preços por porcentagem no data.js: Adult, Child e Senior.
const increasePrices = (percent) => {
  const { prices } = data;
  const { Adult, Child, Senior } = prices;
  prices.Adult = addPercentage(Adult, percent);
  prices.Child = addPercentage(Child, percent);
  prices.Senior = addPercentage(Senior, percent);
};

//  Função que encontra o funcionário por id name ou lastname, os animais pelo qual o funcionário é responsável e retorna um objeto com o nome completo e um array com os animais pelo qual o mesmo é responsável.
const employeeWithId = (idOrName) => {
  const person = employees.find((people) =>
    people.id === idOrName || people.firstName === idOrName || people.lastName === idOrName);

  const personFullName = `${person.firstName} ${person.lastName}`;
  const animalName = person.responsibleFor.map((id) => species.find((animal) => animal.id === id)).map((animal) => animal.name);

  let obj = {};
  obj[personFullName] = animalName;

  return obj;
};

//  Função que retorna todos os funcionários com todos os animais pelo qual são responsáveis, reutilizado a mesma função para encontrar o funcionário por id.
const employeeWithoutId = () => {
  let arrOfEmployees = employees.map((person) => person.firstName);
  let obj = {};
  for (let i of arrOfEmployees) Object.assign(obj, employeeWithId(i));
  return obj;
};

//  Função final onde serão ultilizada as duas últimas funções criadas, caso seja passado um id retornará o funcionário e os animais pelo qual o mesmo é resposável, otherwise retornará todos os funcionários com os animais pelo qual são responsáveis.
const getEmployeeCoverage = (idOrName) => (idOrName ? employeeWithId(idOrName) : employeeWithoutId());

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
