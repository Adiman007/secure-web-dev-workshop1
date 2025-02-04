// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict'

// https://opendata.paris.fr/explore/dataset/lieux-de-tournage-a-paris/information
const filmingLocations = require('./lieux-de-tournage-a-paris.json')

console.log('🚀 It Works!');

/**
 * 💅 Try to produce the most readable code, use meaningful variable names
 * Your intentions should be clear by just reading the code
 * Good luck, have fun !
 */

// 📝 TODO: Number of filming locations
// 1. Make the function return the number of filming locations
function getFilmingLocationsNumber () {
	let s1 =new Set()
	for (let i=0;i<filmingLocations.length;i++) {
		s1.add(filmingLocations[i].fields.adresse_lieu)
	}
	return s1.size
}
console.log(`There are ${getFilmingLocationsNumber()} filming locations in Paris`)

// 📝 TODO: Filming locations sorted by start date, from most recent to oldest.
// 1. Implement the function
// 2. Log the first and last item in array
function sortFilmingLocationsByStartDate () {
	let SortedFilm = filmingLocations.sort(function (a,b){return new Date(b.fields.date_debut) - new Date(a.fields.date_debut)})
	return SortedFilm
}
const sortF = sortFilmingLocationsByStartDate()
console.log(sortF[0],sortF[sortF.length-1])

// 📝 TODO: Number of filming locations in 2020 only
// 1. Make the function return the number of filming locations in 2020 only
// 2. Log the result
function getFilmingLocationsNumber2020 () {
	let resul =0
	for (let i=0;i<filmingLocations.length;i++) {
		if (filmingLocations[i].fields.annee_tournage=="2020")
		{
			resul++
		}
	}
	return resul
}
console.log(`There were ${getFilmingLocationsNumber2020()} filmed in 2020`)

// 📝 TODO: Number of filming locations per year
// 1. Implement the function, the expected result is an object with years as
// keys and filming locations number as value, e.g:
//    const filmingLocationsPerYear = {
//      '2020': 1234,
//      '2021': 1234,
//    }
// 2. Log the result
function getFilmingLocationsNumberPerYear () {
	let resul = {}
	const years=["2016","2017","2018","2019","2020","2021","2022"]
	for (let a of years)
	{
		let number =0
		for (let i=0;i<filmingLocations.length;i++) {
			if (filmingLocations[i].fields.annee_tournage==a)
			{
				number++
			}
		}
	resul[a]=number
	}
	return resul

}
console.log(getFilmingLocationsNumberPerYear())

// 📝 TODO: Number of filming locations by district (arrondissement)
// 1. Implement the function, the expected result is an object with
// district as keys and filming locations number as value, e.g:
//    const filmingLocationsPerDistrict = {
//      '75013': 1234,
//      '75014': 1234,
//    }
// 2. Log the result
function getFilmingLocationsNumberPerDistrict () {
	let locationPerDistrict = {}

	for (let i=0; i<filmingLocations.length; i++){

		if(locationPerDistrict[filmingLocations[i].fields.ardt_lieu] === undefined)
		{
			locationPerDistrict[filmingLocations[i].fields.ardt_lieu] = 0
		}

		locationPerDistrict[filmingLocations[i].fields.ardt_lieu] += 1
	}
	return locationPerDistrict
}
console.log(getFilmingLocationsNumberPerDistrict())

// 📝 TODO: Number of locations per film, sorted in descending order
// 1. Implement the function, result expected as an array of object like:
//    const result = [{film: 'LRDM - Patriot season 2', locations: 12}, {...}]
// 2. Log the first and last item of the array
function getFilmLocationsByFilm () {
	let resul = []
	let locationPerFilm = {}
	for (let i=0; i<filmingLocations.length; i++){

		if(locationPerFilm[filmingLocations[i].fields.nom_tournage] === undefined)
		{
			locationPerFilm[filmingLocations[i].fields.nom_tournage] = 0
		}

		locationPerFilm[filmingLocations[i].fields.nom_tournage] += 1
	}
	for (const key in locationPerFilm)
	{

		let c={film : key , locations : locationPerFilm[key]}
		resul.push(c)
	}
	let SortedFilm = resul.sort(function (a,b){return b.locations -  a.locations})
	return SortedFilm
}
console.log(getFilmLocationsByFilm())

// 📝 TODO: Number of different films
// 1. Implement the function
// 2. Log the result
function getNumberOfFilms() {
	let resul = getFilmLocationsByFilm()
	return resul.length
}
console.log(getNumberOfFilms())
// 📝 TODO: All the filming locations of `LRDM - Patriot season 2`
// 1. Return an array with all filming locations of LRDM - Patriot season 2
// 2. Log the result
function getArseneFilmingLocations () {
	let LRDMlocations = []

	for (let i=0; i<filmingLocations.length; i++){

		if(filmingLocations[i].fields.nom_tournage === "LRDM - Patriot season 2")
		{
			LRDMlocations.push(filmingLocations[i].fields.adresse_lieu)
		}

	}
	let resul = new Set(LRDMlocations)
	return resul
}
console.log(getArseneFilmingLocations())

// 📝 TODO: Tous les arrondissement des lieux de tournage de nos films favoris
//  (favoriteFilms)
// 1. Return an array of all the districts of each favorite films given as a
//    parameter. e.g. :
//    const films = { 'LRDM - Patriot season 2': ['75013'] }
// 2. Log the result
function getFavoriteFilmsLocations (favoriteFilmsNames) {
	let resul =[]
	let d
	for (let film of favoriteFilmsNames) {
		let Favlocations = []
		for (let i = 0; i < filmingLocations.length; i++) {

			if (filmingLocations[i].fields.nom_tournage === film) {
				Favlocations.push(filmingLocations[i].fields.ardt_lieu)
			}
			let s = new Set(Favlocations)
			d = {[film] :s}

		}
		resul.push(d)

	}

	return resul
}
const favoriteFilms =
	[
		'LRDM - Patriot season 2',
		'Alice NEVERS',
		'Emily in Paris',
	]
console.log(getFavoriteFilmsLocations(favoriteFilms))
// 📝 TODO: All filming locations for each film
//     e.g. :
//     const films = {
//        'LRDM - Patriot season 2': [{...}],
//        'Une jeune fille qui va bien': [{...}]
//     }
function getFilmingLocationsPerFilm (favoriteFilmsNames) {
	let resul =[]
	let d
	for (let film of favoriteFilmsNames) {
		let Favlocations = []
		for (let i = 0; i < filmingLocations.length; i++) {

			if (filmingLocations[i].fields.nom_tournage === film) {
				Favlocations.push(filmingLocations[i].fields.adresse_lieu)
			}
			let s = new Set(Favlocations)
			d = {[film] :s}

		}
		resul.push(d)

	}

	return resul
}

console.log(getFilmingLocationsPerFilm(favoriteFilms))

// 📝 TODO: Count each type of film (Long métrage, Série TV, etc...)
// 1. Implement the function
// 2. Log the result
function countFilmingTypes () {
	let FilmType = {}

	for (let i=0; i<filmingLocations.length; i++){

		if(FilmType[filmingLocations[i].fields.type_tournage] === undefined)
		{
			FilmType[filmingLocations[i].fields.type_tournage] = 0
		}

		FilmType[filmingLocations[i].fields.type_tournage] += 1
	}
	return FilmType
}

console.log(countFilmingTypes())
// 📝 TODO: Sort each type of filming by count, from highest to lowest
// 1. Implement the function. It should return a sorted array of objects like:
//    [{type: 'Long métrage', count: 1234}, {...}]
// 2. Log the result
function sortedCountFilmingTypes () {
	return []
}

/**
 * This arrow functions takes a duration in milliseconds and returns a
 * human-readable string of the duration
 * @param ms
 * @returns string
 */
const duration = (ms) => `${(ms/(1000*60*60*24)).toFixed(0)} days, ${((ms/(1000*60*60))%24).toFixed(0)} hours and ${((ms/(1000*60))%60).toFixed(0)} minutes`

// 📝 TODO: Find the filming location with the longest duration
// 1. Implement the function
// 2. Log the filming location, and its computed duration

// 📝 TODO: Compute the average filming duration
// 1. Implement the function
// 2. Log the result
