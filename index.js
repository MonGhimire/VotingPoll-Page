const database = {}; //this is list of candidates

//   -----------------CANDIDATE NAME FORM ----------------------------------

let addButton = document.getElementById("addPeople");

const addCandidateNameInput = () => {
  let newInputField = document.createElement("input");
  newInputField.classList.add("input-name");
  //add placeholder in new input;
  newInputField.placeholder = "Candidate name";

  // append newInputField in the form to see if it shows in browser;
  let userInputFormFromHTML = document.querySelector("form #inputFields");
  userInputFormFromHTML.appendChild(newInputField);
};

addButton.addEventListener("click", addCandidateNameInput);
//the on-click event is a  callBackFunction calling function from the top.

// ---------------------SINGULAR/PLURAL FIX -----------------------------

const fixPlural = (number, word) => {
  return number > 1 ? number + " " + word + "s" : number + " " + word;
};

// ----AFTER SUBMISSION OF CANDIDATE'S INFORMATION------
const submitCandidateForm = () => {
  // get submit candidate input form inputs
  // for each input
  // get value
  // call function to add to db

  let form = document.querySelector(".formStyle");
  form.style.display = "none";

  let candidateInputs = document.querySelectorAll(".input-name");
  //selecting input tags of the form.

  candidateInputs.forEach((input) => {
    // console.log(input.value); //a,b ---the usernames
    if (database[input.value] === undefined) {
      //if the Database doesnot have this/same input element, then do this!

      addToDb(input.value);
      addCandidateVoteBox(input.value); //these are the individual vote boxes// divs.
    }
  });

  let numOfCandidates = Object.keys(database).length;
  document.querySelector("p span").innerText = fixPlural(
    numOfCandidates,
    "candidate"
  ); //this is numberOfCandidates.

  // ------------END VOTING SESSION ------
  let endSessionDiv = document.body.querySelector(".endSession");
  let endSessionButton = document.createElement("button");
  endSessionButton.classList.add("endBtn");
  endSessionButton.innerText = "End Voting";

  endSessionDiv.appendChild(endSessionButton);

  endSessionButton.addEventListener("click", showWinner);

  console.log(database);
};

// -----------------AFTER END VOTE BUTTON CLICK ACTIONS ----------------

let showWinner = (event) => {
  let winnerName = Object.keys(database).reduce((acc, curr) =>
    database[acc] > database[curr] ? acc : curr
  );

  let arr = Object.entries(database);

  let highestValueArr = arr.filter(
    (element) => element[element.length - 1] == database[winnerName]
  );

  // [['a',1],['b',1]]

  //['a', 'b']

  Object.keys(database).forEach((key) => {
    document.querySelector(`p[data-name ="${key}"]`).style.color = "white";
  });

  let winners = highestValueArr.map((element) => element[0]); //Incase of two or more winners.

  winners.forEach((winner) => {
    document.querySelector(`p[data-name ="${winner}"]`).style.color = "red";
  });

  let text1 = `${winnerName} is the Winner!`;
  let text2 = `It's a tie between ${winners.join(" and ")}!`;

  let winnerText = highestValueArr.length == 1 ? text1 : text2;

  document.body.querySelector(".totalVotesWindow").innerText = winnerText;
};

// ---------------------ADD ONE ELEMENT TO DATABASE---------------------------

const addToDb = (userName) => {
  // console.log(userName);      //a,b ---the usernames
  //we are adding users one by one to the DataBase for vote count
  //and for the added names,these names are assigned as an object's(in our case i.e. Database) key with the value 0 in the beginning..

  if (userName === "") return; //if this is true, this returns nothing and gets out of the function's execution,
  database[userName] = 0; //assigning Object[key] == 0; in the beginning.
};

// -------------- SUBMIT CANDIDATE FORM ACTIONS -----------------------

let submitButton = document.getElementById("submit-Btn");
submitButton.addEventListener("click", submitCandidateForm);

// ...CANDIDATES TO BE VOTED-NUMBERS IN INTERFACE

//   const countCandidateNumbers = () => {
//     // document.querySelector(".candidateWindow p span").innerText =  Object.keys(database).length; //this is numberOfCandidates.
//     };

// ........................................UI/VOTE BOXES ---------------------

// ----Dynamically generated individual vote boxes for candidates.
// created a div, with classname "peopleDiv" and p tag to hold the name of the user, and second p tag to hold the number of votes earned. Appended this in candidateWindow.

function addCandidateVoteBox(userName) {
  if (userName === "") return;
  //this means  break out/return nothing from the function, do not execute the lines below..

  let newCandidateDiv = document.createElement("div");
  newCandidateDiv.classList.add("peopleDiv");

  let candidateWindowLocation = document.querySelector(".candidateWindow");

  let contentP = document.createElement("p");
  newCandidateDiv.appendChild(contentP);
  contentP.innerText = userName; // this is the name of the person.

  let voteCountElement = document.createElement("p");
  newCandidateDiv.appendChild(voteCountElement);

  voteCountElement.dataset.name = userName;
  voteCountElement.innerText = `${database[userName]} vote`;

  let voteButton = document.createElement("button"); //button for vote
  voteButton.classList.add("voteCountButton");
  voteButton.dataset.name = userName;

  newCandidateDiv.appendChild(voteButton);
  voteButton.innerText = "Click to vote";

  //newCandidateDiv.
  voteButton.addEventListener("click", whatHappensAfterVoteClicks);

  candidateWindowLocation.appendChild(newCandidateDiv);
}

let whatHappensAfterVoteClicks = (event) => {
  let userName = event.target.dataset.name;
  increaseVote(userName);
  // console.log(database);
  updateVoteBox(userName);
};

// -------VOTING COUNTS -------------
const increaseVote = (userName) => (database[userName] += 1); //this increases vote of each user as per clicks on their individual vote button.
// this info is also needed to update the DB object below..

const updateVoteBox = (userName) => {
  //this is for updating the number of votes for each candidate in the UI.
  // x = `p[data-name ="${userName}"]`;

  // console.log(x);

  //  document.querySelector(".candidateWindow p span").innerText = fixPlural(numOfCandidates,"candidate");
  document.querySelector(`p[data-name ="${userName}"]`).innerText = fixPlural(
    database[userName],
    "vote"
  );
};

// foreach,filter,map,reduce,
