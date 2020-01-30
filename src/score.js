"use strict";

const maxNrOfScoreSaved = 5


function setScore (score, level) {
    var scores = getScores();
    var newScores = [];
    scores.push(newScoreObj(score, level));
    var sortedScore = scores.sort(function(a, b){
            const element1 = Number(a.score);
            const element2 = Number(b.score);
            let comparison = 0;
            if (element1 > element2) {
                comparison = 1;
            } else if (element1 < element2) {
                comparison = -1;
            }
            return comparison*-1;
        }).slice(0,maxNrOfScoreSaved);
    var scoreString = JSON.stringify(sortedScore)
    localStorage.setItem("score", scoreString);
    return sortedScore
};

function newScoreObj(score, level) {
    return {
        date: stringTimeStamp(),
        score: `${score}`,
        level: `${level}`}
}
function getScores() {
    var previousScore = JSON.parse(localStorage.getItem("score"));
    if (!previousScore) {
      previousScore = [];
    }
    return previousScore;
}

function stringTimeStamp () {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var hh = String(today.getHours()).padStart(2, '0');
    var min = String(today.getMinutes()).padStart(2, '0');
    return (mm + '/' + dd + '/' + yyyy + ' - ' + hh + ':'+ min);
}

function showStats (table, statsArray) {
    var statsTable = table;
    statsArray.forEach(element => {
        // Create HTML Element
        var newRow = document.createElement("tr");
        // Put needed html Structure in created table row
        newRow.innerHTML = `
            <td class="date">
                <span>${element.date}</span>
            </td>
            <td class="level">
                <span>${element.level}</span>
            </td>
            <td class="score">
                <span>${element.score}</span>
            </td>`
        //Append new TR to the existing table
        statsTable.appendChild(newRow);
        // Add "entry class" to new created row
        newRow.setAttribute("class", "entry") 
    });
}
