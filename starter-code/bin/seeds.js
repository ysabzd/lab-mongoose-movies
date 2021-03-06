// const celebrities = [
//     {
//         name: "Leonardo DiCaprio",
//         ocupation: "Actor",
//         catchPhrase: "My true love was Rose"
//     },
//     {
//         name: "Leo Messio",
//         ocupation: "Athlete",
//         catchPhrase: "I'm the GOAT"
//     },
//     {
//         name: "Lebron James",
//         ocupation: "Athlete",
//         catchPhrase: "Call me King James. And I'm the GOAT too, by the way."
//     }
// ]

require("dotenv").config();
require('../app');
const faker = require('faker');
const mongoose = require('mongoose');

// Create Celebrities
// const Celebrity = require('../models/Celebrity.model')

// Celebrity.deleteMany()
//     .then(() => {
//         for (let i = 0; i < 20; i++) {
//             Celebrity.create({
//                     name: faker.name.firstName(),
//                     lastName: getRandom(["", faker.name.lastName()]),
//                     ocupation: getRandom(["artist", "athlete", "actor", "politician", "public figure", "unknown"]),
//                     catchPhrase: faker.lorem.sentence()
//                 })
//                 .then(createdCeleb => console.log(`Created celebrity: ${createdCeleb.name}${createdCeleb.lastName}`))
//                 .catch(error => console.log(`Error while creating a new celebrity: ${error}`))
//                 .finally(() => mongoose.connection.close())
//         }
//     });

// Create Movies
// const Movie = require('../models/Movie.model');

// Movie.deleteMany()
//     .then(() => {
//         for (let i = 0; i < 10; i++) {
//             Movie.create({
//                     title: faker.lorem.words(),
//                     genre: faker.lorem.word(),
//                     plot: faker.lorem.paragraphs(2)
//                 })
//                 .then(createdMovie => console.log(`Created movie: ${createdMovie.title}`))
//                 .catch(error => console.log(`Error while creating a new movie: ${error}`))
//                 .finally(() => mongoose.connection.close())
//         }
//     });


// Create Users
// const User = require('../models/User.model')
// const Celebrity = require('../models/Celebrity.model')

// Promise.all([Celebrity.deleteMany(), User.deleteMany()])
//     .then(() => {
//         for (let i = 0; i < 10; i++) {
//             User.create({
//                     name: faker.name.findName(),
//                     userName: faker.internet.userName(),
//                     email: faker.internet.email(),
//                     age: Math.ceil(Math.random() * 101) + 18,
//                 })
//                 .then(user => {
//                     for (let i = 0; i < 10; i++) {
//                         Celebrity.create({
//                                 name: faker.name.firstName(),
//                                 lastName: getRandom(["", faker.name.lastName()]),
//                                 ocupation: getRandom(["artist", "athlete", "actor", "politician", "public figure", "unknown"]),
//                                 catchPhrase: faker.lorem.sentence(),
//                                 user: user._id
//                             })
//                             .then(createdCeleb => {
//                                 console.log(`Created ${createdCeleb.name} by ${createdCeleb.user}`);
//                             });
//                     }
//                 });
//         }
//     });

const User = require('../models/User.model');
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');

Movie.deleteMany()
    .then(() => {
        User.find({})
            .then(usersFromDB => {
                console.log(usersFromDB);
                usersFromDB.forEach(user => {
                    let n = randomNumber(3);
                    const movies = new Array(n).fill().map(() => ({
                        title: faker.lorem.words(),
                        genre: getRandom(["drama", "comedy", "action", "fantasy", "horror/thriller", "romance"]),
                        plot: faker.lorem.paragraphs(),
                        //cast: [celebrity._id],
                        user: user._id
                    }))
                    Movie.insertMany(movies)
                        .then(createdMovies => {
                            console.log(`Created movie: ${createdMovies}`)
                        })
                        .catch(error => console.log(`Error while creating a new movie: ${error}`))
                        .finally(() => mongoose.connection.close())
                })
            })
            .catch(error => console.log(`Error while creating a new movie: ${error}`))
            // .finally(() => mongoose.connection.close())
    });

// Movie.deleteMany()
//     .then(() => {
//         // for (let i = 0; i < 10; i++) {
//         Celebrity.find({
//             // name: faker.name.findName(),
//             // userName: faker.internet.userName(),
//             // email: faker.internet.email(),
//             // age: Math.ceil(Math.random() * 101) + 18,
//         })
//         .then(celebritiesFromDB => {
//                 randomCelebrities = getRandom(celebritiesFromDB);
//                 console.log(randomCelebrities)
//                 return randomCelebrities;
//             })
//             .then(randomCelebrities => {
//                 //console.log(users)
//                 let n = randomNumber(10);
//                 // return randomCelebrities.map(celebrity => {
//                     for (let i = 0; i < n; i++) {
//                         Movie.create({
//                                 title: faker.lorem.words(),
//                                 genre: getRandom(["drama", "comedy", "action", "fantasy", "horror/thriller", "romance"]),
//                                 plot: faker.lorem.paragraphs(),
//                                 cast: [randomCelebrities._id],
//                                 //user: user._id
//                             })
//                             .then(createdMovie => console.log(`Created movie: ${createdMovie.title}`))
//                             .catch(error => console.log(`Error while creating a new movie: ${error}`))
//                             .finally(() => mongoose.connection.close())
//                     }
//                 // })

//             })
//         // }
//     });

// Get Random function
function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

function randomNumber(n) {
    return Math.ceil(Math.random() * n)
}