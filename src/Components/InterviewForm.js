import React, { Component } from "react";
import { Form, Card, Button } from "react-bootstrap";
import axios from "axios";

import Select from "react-select";
import { NavLink } from "react-router-dom";

export class InterviewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      interview: {
        startDate: "",
        endDate: "",
        participants: [],
      },
    };
  }

  componentDidMount() {
    axios
      .get("https://interview-backend1.herokuapp.com/user/", {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJOZUdiQ3Z4b1kiLCJpYXQiOjE2Mzk5Mjk1MjN9.MmC_qA71GlTwVIgRzc9DExdUZNjf5UBMz7jNxhbX2m8",
        },
      })
      .then((res) => {
        this.setState({ users: res.data });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  render() {
    const getParticipants = () => {
      let us = [];
      this.state.users.forEach((user) => {
        
        us.push({ label: user.email, value: user.uid });
      });
      return us;
    };

    const handleFormSubmit = (event) => {
      event.preventDefault();
      let baseURL = "https://interview-backend1.herokuapp.com/interview/";

      let msg = "Interview Created Succedfully";

      let Auth = {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJOZUdiQ3Z4b1kiLCJpYXQiOjE2Mzk5Mjk1MjN9.MmC_qA71GlTwVIgRzc9DExdUZNjf5UBMz7jNxhbX2m8",
        },
      };

      if (this.props.method === "edit" && this.props.uid != null) {
        baseURL = baseURL + String(this.props.uid);
        msg = "Interview Edited Succedfully";

        axios
          .patch(baseURL, this.state.interview, Auth)
          .then((res) => {
            const data = res.data;
            if (res.status === 200) {
              
              alert(msg);
            } else {
              console.log("asdasd")
              alert(data.Message);
            }
          })
          .catch((error) => {
    
            alert(error.response.data.Message);
          });
      } else {
        axios
          .post(baseURL, this.state.interview, Auth)
          .then((res) => {
            const data = res.data;
            if (res.status === 200) {
              
              alert(msg);
            } else {
              
              alert(data.Message);
            }
          })
          .catch((error) => {
            alert(error.response.data.Message);
          });
      }
    };

    return (
      <div>
        <form onSubmit={handleFormSubmit} className="flex flex-col">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Card style={{ width: "50%" }}>
              <Card.Header as="h5">Create Interview</Card.Header>
              <Card.Body>
                <label>Select Participants : </label>
                <Select
                  isMulti
                  closeMenuOnSelect={false}
                  name="participants"
                  options={getParticipants()}
                  onSubmit={handleFormSubmit}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={(e) => {
                    let newInterview = this.state.interview;
                    newInterview.participants = e;
                    this.setState({ interview: newInterview });
                  }}
                />
                <Form.Group className="mb-3">
                  <Form.Label>Start Date</Form.Label>
                  <input
                    className="form-control expandInputboxes"
                    type="datetime-local"
                    onChange={(e) => {
                      let newInterview = this.state.interview;
                      newInterview.startDate = e.target.value;
                      this.setState({ interview: newInterview });
                    }}
                    value={this.state.interview.startDate}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>End Date</Form.Label>
                  <input
                    className="form-control expandInputboxes"
                    type="datetime-local"
                    onChange={(e) => {
                      let newInterview = this.state.interview;
                      newInterview.endDate = e.target.value;
                      this.setState({ interview: newInterview });
                    }}
                    value={this.state.interview.endDate}
                  />
                </Form.Group>

                <Button type="submit" variant="success">
                  Submit
                </Button>
              </Card.Body>
            </Card>
          </div>
        </form>
      </div>
    );
  }
}

export default InterviewForm;
