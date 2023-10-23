import React from "react";
import "./PagesCss.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { getAuthority, getName } from "../util";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Welcome = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="d-flex justify-content-center align-items-center text-success ">
        <h1 className="text-center welcome">
          WELCOME TO USSD TEST{" "}
          
        </h1>
      </div>
      <p className="text-center  paragraph">How would you like to proceed?</p>
      <div className="d-flex justify-content-center align-items-center">
        <Card style={{ width: "28rem", height: "15rem" }} className="m-3">
          <Card.Body>
            <Card.Title>Normal Test</Card.Title>
            <Card.Text>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy
            </Card.Text>
          </Card.Body>
          <Card.Body>
            {/* <Card.Link href="#" className='fs-5'>Start</Card.Link> */}
            <Button className="fs-5 start">
              <Link className="link" to="/normalTest">
                Start
              </Link>
            </Button>
          </Card.Body>
        </Card>
        <Card style={{ width: "28rem", height: "15rem" }} className="m-3">
          <Card.Body>
            <Card.Title>Run a Script</Card.Title>
            <Card.Text>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy
            </Card.Text>
          </Card.Body>
          <Card.Body>
            {/* <Card.Link href="#" className='fs-5'>Start</Card.Link> */}
            <Button className="fs-5 start">
              <Link className="link" to="/runScript">
                Start
              </Link>
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Welcome;
