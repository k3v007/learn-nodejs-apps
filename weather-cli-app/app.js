require('dotenv').config()
const inquirer = require("inquirer")
const request = require("request")
const readline = require("readline")
const chalk = require("chalk")

const findCoordinates = require("./find-location")
const getWeather = require("./get-weather")

inquirer
    .prompt([
        {
            name: "unit",
            type: "confirm",
            message: "Select SI unit (°C):"
        },
        {
            name: "search",
            message: "Search location:",
            validate(input) {
                input = input.trim()
                if (input === ''){
                    return "Empty location not allowed!";
                }
                return true;
            }
        }
    ])
    .then(answer => {
        unit =  answer.unit === true ? "°C" : "°F"
        findCoordinates(answer.search, (error, locations) => {
            if (error) {
                return console.log(chalk.redBright(error))
            } 
            
            if(locations.length === 0){
                return console.log(chalk.redBright("City not found!"))
            }
            
            choices = []
            locations.forEach((loc, i) => {
                choices.push(`${i+1}) ${loc.place_name}`)
            });
            
            // Now ask the user for best match
            inquirer
                .prompt([
                    {
                        name: "results",
                        message: "Select your location:",
                        type: "list",
                        choices: choices
                    }
                ])
                .then(answer => {
                    index = answer.results[0] - 1
                    getWeather(locations[index].coordinates, unit, (error, {temperature, summary} = {}) => {
                        if (error){
                            return console.log(chalk.redBright(error))
                        }
                        console.log(chalk.magenta("\nLocation: ") + locations[index].place_name);
                        console.log(chalk.magenta("Temperature: ") + temperature + " " + unit)
                        console.log(chalk.magenta("Summary: ") + summary)
                    })
                })
        })
    })
