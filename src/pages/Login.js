import React, { useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
    // const [data, setData] = useState({ username: "", password: "" });
    const [username,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    // const onChange = (e) =>{
    //     const thisData = { ...data };
    //     thisData[e.target.name] = e.target.value;
    //     setData(thisData);
    // }
    const handleRegister = () =>{
      navigate("/register")
    }
    const login = async (e) => {
      e.preventDefault()
        const url = `http://172.16.0.183:8080/automate-test/rest/auth/authTester`;
        console.log(username)
        console.log(password)
        const data = {
            username: username,
            password: password
        }
        await fetch(url,{
            method: "POST",
            rejectUnauthorized: false,
            requestCert: false,
            agent: false,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            
            body: JSON.stringify(data),
        })
        .then((res) => {
            if (res.status === "204") {
              //   console.log("No data found");
            } else if (res.status === 403) {
            //   dispatch(alert_error("Username or password is not correct!"));
            console.log("not authorized")
            } else {
              return res.json();
            }
          })
          .then((resData) => {
            if (resData && resData.token) {
            //   localStorage.setItem("hijrausername", `${data.username}`);
              localStorage.setItem("token", `${resData.token}`);
              //   localStorage.setItem("authorities", `${resData.authorities}`);
            //   dispatch(alert_success("Login successful!"));
              navigate("/");
            }
          })

    }
 


  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center ">
          <Col md={8} lg={5} xs={12}>
            <Card className="shadow">
              <div className="d-flex justify-content-center p-3">
                <img
                  src={logo}
                  alt="Logo"
                  width="100"
                  height="auto"
                  className="pt-3"
                  style={{ width: "35%" }}
                />
              </div>

              <Card.Body>
                <div className="p-3 mb-3 mt-md-4">
                  <div className="mb-3">
                    <Form onSubmit={login}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                         
                          placeholder="UserName"
                          style={{ fontSize: "20px" }}
                          value={username}
                onChange={(e) => setUserName(e.target.value)}
                        />
                    
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          style={{ fontSize: "20px" }}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>
                      <div className="d-grid">
                        <Button
                          className="start"
                          type="submit"
                          style={{
                            backgroundColor: "#5D88B0",
                            borderColor: "#5D88B0",
                            fontSize: "20px",
                            color: "black",
                          }}
                        
                        >
                          Login
                        </Button>
                      </div>
                      <div className="d-flex justify-content-end mt-3">
                      <Button
                          className=""
                          type="submit"
                          style={{
                            backgroundColor: "#ffffff",
                            borderColor: "#ffffff",
                            fontSize: "15px",
                            color: "#03609b",
                          }}
                          onClick={handleRegister}
                        
                        >
                          Register
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
