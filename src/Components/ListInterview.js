import React, { Component } from "react";
import axios from "axios";
import reactDom from "react-dom";

import RowData from "./RowData";
import { Spinner } from "react-bootstrap";

export class ListInterview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      users: [],
      loading: false
    };
  }


  componentDidMount = async () => {
      
    try {
      this.setState({ loading: true });
      let res = await axios.get("https://interview-backend1.herokuapp.com/interview/", {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJOZUdiQ3Z4b1kiLCJpYXQiOjE2Mzk5Mjk1MjN9.MmC_qA71GlTwVIgRzc9DExdUZNjf5UBMz7jNxhbX2m8",
        },
      });

      await this.setState({ items: res.data});

      res = await axios.get("https://interview-backend1.herokuapp.com/user/", {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJOZUdiQ3Z4b1kiLCJpYXQiOjE2Mzk5Mjk1MjN9.MmC_qA71GlTwVIgRzc9DExdUZNjf5UBMz7jNxhbX2m8",
        },
      });
      await this.setState({
        users: res.data,
        loading: false
      });

    } catch (err) {
      console.log(err);
    }
  };


  render() {
    return (
      <div className="App">
        <table id="inter">
          <thead>
            <tr>
              <th>InterviewId</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Participants</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {this.state.loading === false ? (
              this.state.items.map(interview => 
                <RowData
                  key={interview.uid}
                  value={interview}
                  users={this.state.users}
                />
              )
            ) : (
              <tr>
                <td colSpan="4">
                  <Spinner animation="border" />
                </td>
              </tr>
            )}
        
          </tbody>
        </table>
      </div>
    );
  }
}

export default ListInterview;
