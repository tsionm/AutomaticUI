import React, { useState } from 'react'
import { Col, Button, Row, Container, Card, Form } from  "react-bootstrap";
import logo from "../images/logo.png";
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const [fullname, setFullName] = useState("")
    const [username,setUserName] = useState("");
    const [phone,setPhone] = useState("");
    const navigate = useNavigate();

    const handleLogin = () =>{
        navigate("/login")
      }

    const Register = async (e) =>{
        e.preventDefault()
        const url = `http://172.26.5.203:80/automate-test/rest/automateTest/registerTester`
        const data = {
            fullname:fullname,
            username: username,
            phone: phone
        }
        await fetch (url,{
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
        }).then((res) => {
            if (res.status === "204") {
                //   console.log("No data found");
              } else if (res.status === 403) {
              //   dispatch(alert_error("Username or password is not correct!"));
              console.log("not authorized")
              } else {
                return res.json();
              }

        }).then((resData) =>{
            if(!resData.status){
                alert(resData.msg)
            }
                
            else{
                alert(resData.msg)
                navigate("/login")
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
                    <Form onSubmit={Register}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                         
                          placeholder="fullname"
                          style={{ fontSize: "20px" }}
                          value={fullname}
                onChange={(e) => setFullName(e.target.value)}
                        />

                    
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Control
                          type="username"
                          placeholder="username"
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
                          type="phone"
                          placeholder="Phone"
                          style={{ fontSize: "20px" }}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
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
                          Register
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
                          onClick={handleLogin}
                        
                        >
                          Login
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

export default Register