import { utilService } from "./util.service.js";
import { storageService } from "./async-storage.service.js";

const TOY_KEY = "toyDB";
_createToys();

export const toyService = {
  labels,
  query,
  get,
  remove,
  save,
  getEmptyToy,
  getDefaultFilter,
  getFilterFromSearchParams,
  // getSpeedStats,
  // getVendorStats,
  // _createBooks,
};

const labels = [
  "On wheels",
  "Box game",
  "Art",
  "Baby",
  "Doll",
  "Puzzle",
  "Outdoor",
  "Battery Powered",
];

// For Debug (easy access from console):
window.cs = toyService;

function query(filterBy = {}) {
  return storageService.query(TOY_KEY).then((toys) => {
    /**TODO: Update for toys */
    if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, "i");
      toys = toys.filter((toy) => regExp.test(car.vendor));
    }

    if (filterBy.minSpeed) {
      toys = toys.filter((toy) => car.maxSpeed >= filterBy.minSpeed);
    }

    return toys;
  });
}

function get(toyId) {
  return storageService.get(TOY_KEY, toyId).then((toy) => {
    toy = _setNextPrevToyId(toy);
    return toy;
  });
}

function remove(toyId) {
  return storageService.remove(TOY_KEY, toyId);
}

function save(toy) {
  if (toy.id) {
    return storageService.put(TOY_KEY, toy);
  } else {
    return storageService.post(TOY_KEY, toy);
  }
}

function getEmptyToy(name = "", price = "") {
  return { name, price };
}

function getDefaultFilter() {
  return { txt: "", maxPrice: 0 };
}

function getFilterFromSearchParams(searchParams) {
  const defaultFilter = getDefaultFilter();
  const filterBy = {};
  for (const field in defaultFilter) {
    filterBy[field] = searchParams.get(field) || "";
  }
  return filterBy;
}

/**OLD */
// function getSpeedStats() {
//     return storageService.query(CAR_KEY)
//         .then(cars => {
//             const carCountBySpeedMap = _getCarCountBySpeedMap(cars)
//             const data = Object.keys(carCountBySpeedMap).map(speedName => ({ title: speedName, value: carCountBySpeedMap[speedName] }))
//             return data
//         })

// }

/**OLD */
// function getVendorStats() {
//     return storageService.query(CAR_KEY)
//         .then(cars => {
//             const carCountByVendorMap = _getCarCountByVendorMap(cars)
//             const data = Object.keys(carCountByVendorMap)
//                 .map(vendor =>
//                 ({
//                     title: vendor,
//                     value: Math.round((carCountByVendorMap[vendor] / cars.length) * 100)
//                 }))
//             return data
//         })
// }

function _createToys() {
  let toys = utilService.loadFromStorage(TOY_KEY);
  if (!toys || !toys.length) {
    toys = [];
    for (let i = 0; i < 20; i++) {
      const name = utilService.makeLorem(4);
      toys.push(_createToy(name, utilService.getRandomIntInclusive(50, 300)));
    }
    utilService.saveToStorage(TOY_KEY, toys);
  }
}

function _createToy(name, maxPrice = 100) {
  const toy = getEmptyToy(name, maxPrice);
  toy.id = utilService.makeId();
  /** for each new toy created, select at random between 1 to 4 from the label options and give them to the toy */
  let labels_copy = {...labels};
  let toy_labels = [];
  for (
    let num_of_labels = utilService.getRandomIntInclusive(1, 4);
    num_of_labels > 0;
    num_of_labels--
  ) {
    toy_labels.unshift(
      labels_copy[
        utilService.getRandomIntInclusive(0, labels_copy.length - 1)
      ]
    );
    labels_copy = labels_copy.filter(
      (label) => label.id != toy_labels[0].id
    );
  }
  toy.labels = toy_labels

  return toy;
}

function _setNextPrevToyId(toy) {
  return storageService.query(TOY_KEY).then((toys) => {
    const toyIdx = toys.findIndex((currToy) => currToy.id === toy.id);
    const nextToy = toys[toyIdx + 1] ? toys[toyIdx + 1] : toys[0];
    const prevToy = toys[toyIdx - 1] ? toys[toyIdx - 1] : toys[toys.length - 1];
    toy.nextToyId = nextToy.id;
    toy.prevToyId = prevToy.id;
    return toy;
  });
}

/**OLD */
// function _getCarCountBySpeedMap(cars) {
//     const carCountBySpeedMap = cars.reduce((map, car) => {
//         if (car.maxSpeed < 120) map.slow++
//         else if (car.maxSpeed < 200) map.normal++
//         else map.fast++
//         return map
//     }, { slow: 0, normal: 0, fast: 0 })
//     return carCountBySpeedMap
// }

/**OLD */
// function _getCarCountByVendorMap(cars) {
//     const carCountByVendorMap = cars.reduce((map, car) => {
//         if (!map[car.vendor]) map[car.vendor] = 0
//         map[car.vendor]++
//         return map
//     }, {})
//     return carCountByVendorMap
// }

/**SUPER OLD */
// function _createBooks() {
//     const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
//     const books = []
//     for (let i = 0; i < 20; i++) {
//         const book = {
//             id: utilService.makeId(),
//             title: utilService.makeLorem(2),
//             subtitle: utilService.makeLorem(4),
//             authors: [
//                 utilService.makeLorem(1)
//             ],
//             publishedDate: utilService.getRandomIntInclusive(1950, 2024),
//             description: utilService.makeLorem(20),
//             pageCount: utilService.getRandomIntInclusive(20, 600),
//             categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
//             thumbnail: `http://coding-academy.org/books-photos/${i+1}.jpg`,
//             language: "en",
//             listPrice: {
//                 amount: utilService.getRandomIntInclusive(80, 500),
//                 currencyCode: "EUR",
//                 isOnSale: Math.random() > 0.7
//             }
//         }
//         books.push(book)
//     }
//     console.log('books', books)
// }
