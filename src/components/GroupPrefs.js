import React from "react";

class GroupPrefs extends React.Component {
  state = { doneAssigning: false };

  render() {
    return (
      <div>
        {this.props.groups.map((group, i) => {
          return <div key={i}>{group.name}</div>;
        })}
      </div>
    );
  }
}

export default GroupPrefs;
