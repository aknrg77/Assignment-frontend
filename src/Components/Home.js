import React, { Component } from "react";

import { Route, BrowserRouter, Routes, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import CreateInterview from "./CreateInterview";
import EditInterview from "./EditInterview";
import ListInterview from "./ListInterview";

export class Home extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="content">
            <div>
              <div className="buttongroups">
                <Link to="/create">
                  <Button
                    id="sidebar"
                    type="submit"
                    variant="primary"
                    allign="left"
                  >
                    CreateInterview
                  </Button>
                </Link>
                <Link to="/">
                  <Button id="page-wrap" type="submit" variant="primary">
                    Upcoming Interview
                  </Button>
                </Link>
              </div>
            </div>

            <Routes>
              <Route path="/" element={<ListInterview />} exact />
              <Route path="/create" element={<CreateInterview />} />
              <Route path="/edit/:id" element={<EditInterview />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default Home;
