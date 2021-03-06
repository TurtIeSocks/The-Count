# TheCount
## Description
 Pokemon GO community "The Count" Generator.

## Demo
https://pogo-the-count.herokuapp.com/

## Features 
- Shows every possible Pokemon/IV combination for a specified CP.
- Calculates approximately 184,320,000 possibilities.
- Limits to 50,000 results if there are more than that for performance reasons. 
- Includes filters for IVs, Attack, Defense, Stamina, and Levels. 
- Pokedex generator to fill in new values when new Pokemon are released.

## Technologies Used
- React frontend
- Material UI Styling

## PreReqs
- NodeJS (Recommend using V14.*)

## Installation Instructions
1. Clone the repo
2. Open up the directory (`cd The-Count`)
3. `npm install`
4. `npm run build`
5. `npm start`

## For Development
1. `npm install`
2. `npm run clientStart`

## Updating the Pokedex!
1. Shut down the server if running
2. `npm run generate`
