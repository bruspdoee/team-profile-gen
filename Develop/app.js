const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = []; 
const idArray = []; 

function appMenu () {

    function createManager() {
        console.log("Please build your team"); 
        inquirer.prompt([
            {
                type: "input", 
                name: "managerName", 
                message: "What is your manager's name?", 
                validate: answer => {
                    if(answer !== "") {
                        return true;
                    }
                    return "Please enter atleast one character!"; 
                }
            }, 
            {
                type: "input", 
                name: "mangerId",
                message: "What is your manager's ID?", 
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    ); 
                    if (pass) {
                        return  true; 
                    }
                    return "Please enter number greater than zero"; 
                }

            },
            {
                type: "input", 
                name: "managerEmail",
                validate: answer => {
                    const pass = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if(pass) {
                        return true; 
                    }
                    return "Please enter a valid email address"; 
                }
            }, 
            {
                type: "input", 
                name: "managerOfficeNumber",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if(pass) {
                        return true; 
                    }
                    return "Please enter number greater than zero"; 
                }
            }
        ]).then(answers => {
            const manager = new Manager (answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber) 
            teamMembers.push(manager); 
            idArray.push(answers.mangerId); 
            createTeam(); 
        }); 
    }

    function createTeam() {

        inquirer.prompt([ 
            {
                type: "list", 
                name: "memberChoice", 
                message: "Which type of team member would you like to add?", 
                choices: [
                    "Engineer", 
                    "Intern", 
                    "No more team members"
                ]
            }
        ]).then(userChoice => {
            switch(userChoice.memberChoice) {
            case "Engineer":
                addEngineer();
                break;  
            case "Intern":
                addIntern(); 
                break; 
            default:
                buildTeam(); 
            }
        }); 
    }


    function addEngineer() {
        inquirer.prompt([
            {
                type: "input", 
                name: "engineerName", 
                message: "What is your engineers's name?", 
                validate: answer => {
                    if(answer !== "") {
                        return true;
                    }
                    return "Please enter atleast one character!"; 
                }
            }, 
            {
                type: "input", 
                name: "engineerId",
                message: "What is your engineers's ID?", 
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    ); 
                    if (pass) {
                        return  true; 
                    }
                    return "Please enter number greater than zero"; 
                }

            },
            {
                type: "input", 
                name: "engineerEmail",
                validate: answer => {
                    const pass = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if(pass) {
                        return true; 
                    }
                    return "Please enter a valid email address"; 
                }
            }, 
            {
                type: "input", 
                name: "engineerGithub", 
                message: "What is your engineers's Github username?", 
                validate: answer => {
                    if(answer !== "") {
                        return true;
                    }
                    return "Please enter atleast one character!"; 
                }
            }
        ]).then(answers => {
            const engineer = new Engineer (answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub) 
            teamMembers.push(engineer); 
            idArray.push(answers.engineerId); 
            createTeam(); 
        }); 
    }

    function addIntern() {
        inquirer.prompt([
            {
                type: "input", 
                name: "internName", 
                message: "What is your inters's name?", 
                validate: answer => {
                    if(answer !== "") {
                        return true;
                    }
                    return "Please enter atleast one character!"; 
                }
            }, 
            {
                type: "input", 
                name: "internId",
                message: "What is your interns's ID?", 
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    ); 
                    if (pass) {
                        return  true; 
                    }
                    return "Please enter number greater than zero"; 
                }

            },
            {
                type: "input", 
                name: "internEmail",
                validate: answer => {
                    const pass = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if(pass) {
                        return true; 
                    }
                    return "Please enter a valid email address"; 
                }
            }, 
            {
                type: "input", 
                name: "internSchool", 
                message: "What is your intern's university?", 
                validate: answer => {
                    if(answer !== "") {
                        return true;
                    }
                    return "Please enter atleast one character!"; 
                }
            }
        ]).then(answers => {
            const intern = new Intern (answers.internName, answers.internId, answers.internEmail, answers.internSchool) 
            teamMembers.push(intern); 
            idArray.push(answers.internId); 
            createTeam(); 
        }); 
    }


    function buildTeam() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    }

    createManager();

}

appMenu(); 