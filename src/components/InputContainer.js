import React from "react";
import GroupInput from "./GroupInput.js";
import PersonInput from "./PersonInput.js";

const labels = {
  peopleLabel: "Input People",
  groupLabel: "Input Groups",
};

class InputContainer extends React.Component {
  state = {
    groups: [],
    people: [],
    personInput: "",
    groupInput: "",
    inputtingGroups: true,
  };

  handleEnter(event, arr) {
    if (event.key === "Enter") {
      this.addArray(arr, { name: event.target.value });
      this.clearInput(event.target.name);
    }
  }

  handlePersonEnter(event, arr) {
    if (event.key === "Enter") {
      this.addArray(arr, { name: event.target.value });
      this.clearInput(event.target.name);
    }
  }

  addArray = (arr, item) => {
    let arrayFromState = this.state[arr];
    arrayFromState.push(item);
    this.setState({
      [arr]: arrayFromState,
    });
  };

  clearInput = (inputName) => {
    this.setState({
      [inputName]: "",
    });
  };

  handleChange = (e) => {
    const stateName = e.target.name;
    const value = e.target.value;
    this.setState({
      [stateName]: value,
    });
  };

  remove = (arrayName, itemName) => {
    let tempArray = this.state[arrayName];
    for (let i = 0; i < tempArray.length; i++) {
      if (tempArray[i].name === itemName) {
        tempArray.splice(i, 1);
      }
    }
    this.setState({
      [arrayName]: tempArray,
    });
  };

  addItem = (itemName) => {};

  submit = () => {
    this.setState({
      inputtingGroups: false,
    });
    this.props.updateArray("groups", this.state.groups);
  };

  submitPerson = (person) => {
    let tempPerson = { name: "", preferences: [] };
    tempPerson.name = person.name;
    for (let i = 0; i < person.preferences.length; i++) {
      tempPerson.preferences.push(person.preferences[i].name);
    }
    let people = this.state.people;
    people.push(tempPerson);
    this.setState({
      people: people,
    });
  };

  finalize = () => {
    this.props.updateArray("people", this.state.people);
    this.props.finishInputting();
  };

  render() {
    return (
      <div>
        {this.state.inputtingGroups ? (
          <div>
            <GroupInput
              name="groupInput"
              value={this.state.groupInput}
              type="text"
              onChange={this.handleChange}
              onKeyDown={(e) => this.handleEnter(e, "groups")}
              arrayName="groups"
              label={labels.groupLabel}
              list={this.state.groups}
              add={this.addItem}
              remove={this.remove}
            />
            <button onClick={this.submit}>Enter Groups</button>
          </div>
        ) : (
          <div>
            <PersonInput
              name="personInput"
              value={this.state.personInput}
              type="text"
              onChange={this.handleChange}
              groups={this.state.groups}
              submitPerson={this.submitPerson}
              finalize={this.finalize}
            ></PersonInput>
          </div>
        )}
      </div>
    );
  }
}

export default InputContainer;
