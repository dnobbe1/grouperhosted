import React from "react";

class Card extends React.Component {
  state = {
    list: [],
  };

  render() {
    return (
      <div style={{ backgroundColor: "lightGrey", margin: "10px" }}>
        <div className="header">
          <h4 style={{ textAlign: "center" }}>{this.props.header}</h4>
        </div>
        <div className="content">
          <div>
            <ul>
              {this.props.team
                ? this.props.team.map((person, i) => {
                    return <li key={i}>{person}</li>;
                  })
                : null}
            </ul>
            <div>{this.props.children}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
