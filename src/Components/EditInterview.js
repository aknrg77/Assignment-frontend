import React, { Component } from "react";

import axios from "axios";
import Moment from "react-moment";
import InterviewForm from "./InterviewForm";

export class EditInterview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      interview: {},
    };
  }
  async componentDidMount() {
    let uid = String(window.location.href).replace(
      "https://interview-backend1.herokuapp.com/edit/",
      ""
    );

    this.setState({uid : uid});

    axios
      .get(`https://interview-backend1.herokuapp.com/interview/${uid}`, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJOZUdiQ3Z4b1kiLCJpYXQiOjE2Mzk5Mjk1MjN9.MmC_qA71GlTwVIgRzc9DExdUZNjf5UBMz7jNxhbX2m8",
        },
      })
      .then((res) => {
        this.setState({ interview: res.data });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  render() {
    return (
      <div>
        <h1>Edit Interview</h1>
        <h2 className="text-center text-xl font-bold mb-4">
          Interview Details
        </h2>
        <div className="flex flex-col border-2 rounded-md p-4">
          <div className="grid grid-cols-2 mb-2">
            <div>
              Start Date:
              <Moment>{this.state.interview.startDate}</Moment>
            </div>
            <div>
              End Date:
              <Moment >{this.state.interview.endDate}</Moment>
            </div>
          </div>
          <ul className="list-disc px-2">
            Participants:
            {this.state.interview.participants !== undefined ? this.state.interview.participants.map((user) => {
              return <li key={user}>{user}</li>;
            }) : <p>Hewll</p>
            }
          </ul>
        </div>
        <div>
        <InterviewForm method = "edit" uid = {this.state.uid} />
        </div>
      </div>
    );
  }
}

export default EditInterview;
