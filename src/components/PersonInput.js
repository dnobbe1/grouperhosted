import React from "react";
import Card from "./Card.js";

class PersonInput extends React.Component {
  state = {
    people: [],
    currentPerson: { name: "", preferences: [] },
    numGroupsRanked: 0,
  };

  handleAssign = (key) => {
    if (this.state.currentPerson.name === "") {
      alert("Please Enter A Name Before You Rank Groups");
      return;
    }
    this.incrementRank();
    this.addGroupPreference(this.props.groups[key]);
    return this.props.groups[key];
  };

  incrementRank = () => {
    let currentRank = this.state.numGroupsRanked;
    this.setState({
      numGroupsRanked: currentRank + 1,
    });
  };

  addGroupPreference = (group) => {
    let person = this.state.currentPerson;
    let currentPreferences = person.preferences;
    for (let i = 0; i < currentPreferences.length; i++) {
      if (currentPreferences[i].name === group.name) {
        alert("You cannot assign a preference more than once!");
        return;
      }
    }
    currentPreferences.push(group);
    this.setState({
      currentPerson: person,
    });
  };

  handleSubmitPerson(person) {
    let currentPerson = this.state.currentPerson;
    this.props.submitPerson(currentPerson);
    currentPerson.name = "";
    currentPerson.preferences = [];
    this.setState({
      currentPerson: currentPerson,
    });
  }

  handleEnter = (e) => {
    if (e.key === "Enter") {
      let currentPerson = this.state.currentPerson;
      currentPerson.name = this.props.value;
      this.setState({
        currentPerson: currentPerson,
      });
    }
  };

  clearPerson = () => {
    this.setState({
      currentPerson: { name: "", preferences: [] },
    });
  };

  render() {
    return (
      <div>
        <h3>Enter Each Person</h3>
        <h4>And Their Group Preferences</h4>
        <div className="input">
          <input
            value={this.props.value}
            name={this.props.name}
            type={this.props.type}
            onChange={this.props.onChange}
            onKeyDown={(e) => this.handleEnter(e)}
          />
        </div>
        <div className="groups">
          {this.props.groups.map((group, i) => {
            return (
              <div
                style={{
                  backgroundColor: "lightGreen",
                  height: "50px",
                  margin: "10px",
                }}
                onClick={() => this.handleAssign(i)}
                key={i}
              >
                <Card style={{ display: "auto" }} header={group.name} />
              </div>
            );
          })}
        </div>
        <div className="currentPerson" style={{ backgroundColor: "yellow" }}>
          <h5>{this.state.currentPerson.name}</h5>
          <div>
            <button onClick={this.clearPerson}>
              Clear Person and Start Over
            </button>
            {this.state.currentPerson.preferences.map((group, i) => {
              return (
                <div key={i}>
                  Preference {i + 1}: {group.name}
                </div>
              );
            })}
          </div>
        </div>
        {this.state.currentPerson.name &&
        this.state.currentPerson.preferences.length ===
          this.props.groups.length ? (
          <button onClick={() => this.handleSubmitPerson()}>Submit</button>
        ) : null}
        <button onClick={() => this.props.finalize()}>
          Done Inputting All People
        </button>
      </div>
    );
  }
}

export default PersonInput;
