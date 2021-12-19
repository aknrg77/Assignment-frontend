import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Moment from "react-moment";


export class RowData extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr className="mainbody ">
        <td>{this.props.value.uid}</td>
        <td><Moment>{this.props.value.startDate}</Moment></td>
        <td><Moment>{this.props.value.endDate}</Moment></td>
        <td>
          <ul>
            {this.props.value.participants.map((user) => {
              let obj = this.props.users.find((o) => o.uid === String(user));
              if (this.props.users.length > 0) {
                return <li key={String(user)}> {obj.name}</li>;
              }
            })}
          </ul>
        </td>

        <td>
          <NavLink to={`/edit/${this.props.value.uid}`}>
            <Button variant="success">Edit</Button>
          </NavLink>
        </td>
      </tr>
    );
  }
}

export default RowData;
