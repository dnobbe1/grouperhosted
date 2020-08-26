import React from "react";
import Card from "./Card.js";
import GroupPrefs from "./GroupPrefs.js";

class GroupInput extends React.Component {
  render() {
    return (
      <div>
        <label>{this.props.label}</label>
        <br />
        <div>
          <input
            value={this.props.value}
            name={this.props.name}
            type={this.props.type}
            onChange={this.props.onChange}
            onKeyDown={this.props.onKeyDown}
          />
          <div style={{ width: "50%" }}>
            <ul>
              {this.props.list
                ? this.props.list.map((item, i) => {
                    return (
                      <Card
                        type="group"
                        key={i}
                        team={item.team}
                        header={item.name}
                      >
                        <button
                          onClick={() =>
                            this.props.remove(this.props.arrayName, item.name)
                          }
                        >
                          Remove
                        </button>
                      </Card>
                    );
                  })
                : null}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default GroupInput;
