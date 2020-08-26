import React from "react";
import InputContainer from "./InputContainer.js";
import Card from "./Card";
import shuffle from "shuffle-array";

class App extends React.Component {
  state = {
    groups: [],
    people: [],
    inputting: true,
    finished: false,
    groupSize: [],
    overflowPeople: [],
    finishedGroups: [],
  };

  updateArray = (arrayName, data) => {
    if (arrayName === "people") {
      let tempPeople = this.state.people;
      data.forEach((person) => {
        let tempPerson = { name: "", preferences: [] };
        tempPerson.name = person.name;
        tempPerson.preferences = person.preferences;
        tempPeople.push(tempPerson);
      });
      this.setState({
        people: tempPeople,
        groupSize: Math.floor(tempPeople.length / this.state.groups.length),
      });
    } else {
      this.setState({
        [arrayName]: data,
      });
    }
  };

  finishInputting = () => {
    this.setState({
      inputting: false,
    });
  };

  wrapUp = () => {
    this.computeGroups();
  };

  computeGroups = () => {
    let people = this.state.people;
    let groups = this.state.groups;
    groups.forEach((group) => {
      group.people = [];
    });
    console.log("People:");
    console.log(people);
    console.log("Groups");
    console.log(groups);
    let groupAssignments = this.shuffleAndAssign(groups, people);
    console.log(groupAssignments);
    this.setState({
      finishedGroups: groups,
      finished: true,
    });
  };

  shuffleAndAssign = (groups, people) => {
    console.log(this.state.groupSize);
    console.log(people.length);
    let groupsFull = true;
    groups.forEach((group) => {
      if (group.people.length < this.state.groupSize) {
        groupsFull = false;
      }
    });
    if (groupsFull) {
      this.assignRemainder(groups, people);
      return groups;
    }
    if (people.length === 0) {
      return groups;
    }
    let tempPeople = [];
    for (let i = 0; i < people.length; i++) {
      tempPeople.push(people[i]);
    }
    shuffle(tempPeople);
    for (let i = 0; i < tempPeople.length; i++) {
      let preferredGroup = tempPeople[i].preferences[0];
      for (let j = 0; j < groups.length; j++) {
        if (groups[j].name === preferredGroup) {
          if (groups[j].people.length >= this.state.groupSize) {
            tempPeople[i].preferences.shift();
            break;
          } else {
            groups[j].people.push(tempPeople[i].name);
            tempPeople.splice(i, 1);
          }
        }
      }
    }
    this.shuffleAndAssign(groups, tempPeople);
  };

  assignRemainder = (groups, people) => {
    /*people.forEach((person) => {
      for (let i = 0; i < groups.length; i++) {
        if (groups[i].name === person.preferences[0]) {
          groups[i].people.push(person.name);
        }
      }
    });
    */
    let overflowPeople = [];
    for (let i = 0; i < people.length; i++) {
      overflowPeople.push(people[i]);
    }
    this.setState({
      overflowPeople: overflowPeople,
    });
  };

  render() {
    if (!this.state.finished) {
      return (
        <div>
          <div>
            <h1>The Grouper</h1>
          </div>
          {this.state.inputting ? (
            <InputContainer
              finishInputting={this.finishInputting}
              updateArray={this.updateArray}
            />
          ) : (
            <div>
              <button onClick={this.wrapUp}>Finish And Group</button>
              <div>
                <h3>Groups:</h3>
                {this.state.groups.map((group, i) => {
                  return <Card key={i} header={group.name} />;
                })}
              </div>
              <br />
              <div>
                <h3>People:</h3>
                {this.state.people.map((person, j) => {
                  return <h4 key={j}>{person.name}</h4>;
                })}
              </div>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div>
          {this.state.finishedGroups ? (
            this.state.finishedGroups.map((group, i) => {
              return (
                <Card key={i} header={group.name}>
                  <div>
                    <ul>
                      {group.people.map((person, j) => {
                        return <li>{person}</li>;
                      })}
                    </ul>
                  </div>
                </Card>
              );
            })
          ) : (
            <p>Loading</p>
          )}

          <div>
            <h4>People left over. Assign these people manually.</h4>
            {this.state.overflowPeople
              ? this.state.overflowPeople.map((person, i) => {
                  return <p key={i}>{person.name}</p>;
                })
              : null}
          </div>
        </div>
      );
    }
  }
}

export default App;
