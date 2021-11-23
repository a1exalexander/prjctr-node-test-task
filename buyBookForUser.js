const database = {
  getUser: (id, callback) => {
    const users = [
      {
        id: 1,
        name: 'Robert',
      },
      {
        id: 2,
        name: 'John',
      },
    ];

    const user = users.find((user) => user.id === id);
    if (!user) {
      callback(`User with id=${id} not found`);
    } else {
      callback(null, user);
    }
  },
  getUsersBook: (userId, callback) => {
    const usersBooks = {
      1: [],
      2: [1, 2],
    };

    const userBook = usersBooks[userId];
    if (!userBook) {
      callback(`Set of books related to userId=${userId} not found`);
    } else {
      callback(null, userBook);
    }
  },
  buyBook: (id, callback) => {
    const books = [
      {
        id: 1,
        name: 'Art of war',
      },
      {
        id: 2,
        name: 'Hunger games',
      },
      {
        id: 3,
        name: '1984',
      },
    ];

    const book = books.find((book) => book.id === id);
    if (!book) {
      callback(`Book with id=${id} not found`);
    } else {
      callback(null, true);
    }
  },
};

const buyBookForUser = async (bookId, userId, callback) => {
  const getPromise = (fn, value) => {
    return new Promise((resolve, reject) => {
      fn(value, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };

  try {
    await getPromise(database.getUser, userId);
    const userBooks = await getPromise(database.getUsersBook, userId);
    if (userBooks.includes(bookId)) {
      throw `User already has book with id=${bookId}`;
    }
    await getPromise(database.buyBook, bookId);
    callback(null, 'Success');
  } catch (err) {
    callback(err);
  }
};

// to show logs in order
(async () => {
  await buyBookForUser(1, 1, (err, message) => {
    console.log(err); // null
    console.log(message); // 'Success'
  });

  await buyBookForUser(1, 2, (err, message) => {
    console.log(err); // 'User already has book with id=1'
    console.log(message); // undefined
  });

  await buyBookForUser(3, 2, (err, message) => {
    console.log(err); // null
    console.log(message); // 'Success'
  });

  await buyBookForUser(5, 2, (err, message) => {
    console.log(err); // 'Book with id=5 not found'
    console.log(message); // undefined
  });

  await buyBookForUser(1, 3, (err, message) => {
    console.log(err); // 'User with id=3 not found'
    console.log(message); // undefined
  });
})();
