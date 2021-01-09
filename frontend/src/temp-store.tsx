

import { ICardModel } from './types/card';

import { IGameModel } from './types/game';
import { ISwipeModel } from './types/swipe';





const testCards: Array<ICardModel> = [{
   'adult': false,
   'backdrop_path': '/kf456ZqeC45XTvo6W9pW5clYKfQ.jpg',
   'genre_ids': [
     16,
     35,
     18,
     10402,
     14
   ],
   'id': 508442,
   'original_language': 'en',
   'original_title': 'Soul',
   'overview': 'Joe Gardner is a middle school teacher with a love for jazz music. After a successful gig at the Half Note Club, he suddenly gets into an accident that separates his soul from his body and is transported to the You Seminar, a center in which souls develop and gain passions before being transported to a newborn child. Joe must enlist help from the other souls-in-training, like 22, a soul who has spent eons in the You Seminar, in order to get back to Earth.',
   'popularity': 3142.992,
   'poster_path': '/hm58Jw4Lw8OIeECIq5qyPYhAeRJ.jpg',
   'release_date': '2020-12-25',
   'title': 'Soul',
   'video': false,
   'vote_average': 8.4,
   'vote_count': 3002
 },
 {
   'adult': false,
   'backdrop_path': '/ibwOX4xUndc6E90MYfglghWvO5Z.jpg',
   'genre_ids': [
     878,
     12
   ],
   'id': 517096,
   'original_language': 'ru',
   'original_title': 'Вратарь Галактики',
   'overview': 'Cosmoball is a mesmerizing intergalactic game of future played between humans and aliens at the giant extraterrestrial ship hovering in the sky over Earth. A young man with enormous power of an unknown nature joins the team of hot-headed superheroes in exchange for a cure for his mother’s deadly illness. The Four from Earth will fight not only to defend the honor of their home planet in the spectacular game, but to face the unprecedented threat to the Galaxy and embrace their own destiny.',
   'popularity': 2473.835,
   'poster_path': '/eDJYDXRoWoUzxjd52gtz5ODTSU1.jpg',
   'release_date': '2020-08-27',
   'title': 'Cosmoball',
   'video': false,
   'vote_average': 4.5,
   'vote_count': 31
 }];

 const testSwipes: Array<ISwipeModel> = [{
      vote: 1,
      card: {
         'adult': false,
         'backdrop_path': '/kf456ZqeC45XTvo6W9pW5clYKfQ.jpg',
         'genre_ids': [
         16,
         35,
         18,
         10402,
         14
         ],
         'id': 508442,
         'original_language': 'en',
         'original_title': 'Soul',
         'overview': 'Joe Gardner is a middle school teacher with a love for jazz music. After a successful gig at the Half Note Club, he suddenly gets into an accident that separates his soul from his body and is transported to the You Seminar, a center in which souls develop and gain passions before being transported to a newborn child. Joe must enlist help from the other souls-in-training, like 22, a soul who has spent eons in the You Seminar, in order to get back to Earth.',
         'popularity': 3142.992,
         'poster_path': '/hm58Jw4Lw8OIeECIq5qyPYhAeRJ.jpg',
         'release_date': '2020-12-25',
         'title': 'Soul',
         'video': false,
         'vote_average': 8.4,
         'vote_count': 3002
      }
   },
   {
      vote: 2,
      card: {
         'adult': false,
         'backdrop_path': '/ibwOX4xUndc6E90MYfglghWvO5Z.jpg',
         'genre_ids': [
         878,
         12
         ],
         'id': 517096,
         'original_language': 'ru',
         'original_title': 'Вратарь Галактики',
         'overview': 'Cosmoball is a mesmerizing intergalactic game of future played between humans and aliens at the giant extraterrestrial ship hovering in the sky over Earth. A young man with enormous power of an unknown nature joins the team of hot-headed superheroes in exchange for a cure for his mother’s deadly illness. The Four from Earth will fight not only to defend the honor of their home planet in the spectacular game, but to face the unprecedented threat to the Galaxy and embrace their own destiny.',
         'popularity': 2473.835,
         'poster_path': '/eDJYDXRoWoUzxjd52gtz5ODTSU1.jpg',
         'release_date': '2020-08-27',
         'title': 'Cosmoball',
         'video': false,
         'vote_average': 4.5,
         'vote_count': 31
      }
   }
];

export const tempState: IGameModel = {
   prevSwipes: testSwipes,
   nextSwipes: testCards
};



