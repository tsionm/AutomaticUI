import React from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";
import xml2js from "xml2js";
import Modal from "react-bootstrap/Modal";
import { CDBBtn, CDBInputGroup, CDBContainer, CDBInput } from "cdbreact";
import { getAuthority, getName, getPhone } from "../util";
const SequentialTest = () => {
  const [TransactionId, setTransactionId] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Pin, setPin] = useState("");
  const [Choice, setChoice] = useState("");
  const [convertedJason, setConvertedJason] = useState(null);
  const [convertedJasonPin, setConvertedJasonPin] = useState(null);
  const [convertedJasonChoice, setConvertedJasonChoice] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [action, setAction] = useState(null);
  const [SessionId, setSessionId] = useState("");
  const [BaseUrl, setBaseURl] = useState("");

  const currentDate = new Date();
  console.log(currentDate);
  const isoDate = new Date();

  // Use Date methods to construct the ISO 8601 formatted date
  const year = isoDate.getFullYear();
  const month = String(isoDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(isoDate.getDate()).padStart(2, "0");
  const hours = String(isoDate.getHours()).padStart(2, "0");
  const minutes = String(isoDate.getMinutes()).padStart(2, "0");
  const seconds = String(isoDate.getSeconds()).padStart(2, "0");

  // Format the date in ISO 8601 format
  const isoString = `${year}${month}${day}T${hours}:${minutes}:${seconds}`;

  const phone = getPhone(localStorage.getItem("token"));
  useEffect(() => {
    const fetchSessionId = async (e) => {
      const url = `${BaseUrl}/automate-test/rest/automateTest/getSessionId`;
      await fetch(
        url,
        // http://10.57.40.116:7005/automate-test/rest/automateTest/getSessionId     http://172.16.0.183:8080/
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((result) => {
          // setSessionId(result);

          if (result !== 0) {
            console.log(result + "first");
            setSessionId(result);
            console.log(SessionId + "long ago");
          } else {
            setSessionId(1);
            console.log(SessionId + "inside else");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchSessionId();
  }, [BaseUrl]);
  // useEffect(() => {
  //   const fetchSessionId = async (e) => {
  //     try {
  //       const response = await fetch(
  //         "http://172.16.0.183:8080/automate-test/rest/automateTest/getSessionId",
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }

  //       const result = await response.json();

  //       if (result !== 0) {
  //         console.log( typeof result + " first");
  //         setSessionId(result); // Set the SessionId here
  //         console.log(result + " long ago"); // Updated SessionId should be used here
  //       } else {
  //         setSessionId('1'); // Set the SessionId to '1'
  //         console.log('1' + " inside else");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchSessionId();
  // }, []);

  const sendXml = async (e) => {
    const url = `${BaseUrl}/ussdinterface/ussdinterface`;
    console.log(url);
    const xmlData = `<?xml version="1.0"?>
          <methodCall><methodName>handleUSSDRequest</methodName><params><param><value><struct><member><name>TransactionId</name><value><string>${SessionId}</string></value></member><member><name>TransactionTime</name><value><dateTime.iso8601>${isoString}</dateTime.iso8601></value></member><member><name>MSISDN</name><value><string>${phone}</string></value></member><member><name>USSDServiceCode</name><value><string>543</string></value></member><member><name>USSDRequestString</name><value><string></string></value></member><member><name>response</name><value><string>false</string></value></member></struct></value></param></params></methodCall>`.trim();

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/xml; charset=UTF-8",
      },
      body: xmlData.trim(),
    })
      .then((response) => response.text())
      .then((data) => {
        xml2js.parseString(data, (error, result) => {
          if (error) {
            console.log(error);
          } else {
            const ussdResponse =
              result.methodResponse.params[0].param[0].value[0].struct[0].member.find(
                (item) => item.name[0] === "USSDResponseString"
              );
            const action =
              result.methodResponse.params[0].param[0].value[0].struct[0].member.find(
                (item) => item.name[0] === "action"
              );

            if (ussdResponse) {
              const ussdResponseValue = ussdResponse.value[0].string[0];
              const actionResponse = action.value[0].string[0];
              setAction(actionResponse);
              console.log(actionResponse);
              setConvertedJason(ussdResponseValue);
              console.log(ussdResponseValue);
            } else {
              console.log("USSDResponseString not found in JSON data.");
            }
          }
        });
      });
  };
  const sendPin = async (e) => {
    console.log("^^^^^^^^^^^^^^^^^"+Pin)
    const url = `${BaseUrl}/ussdinterface/ussdinterface`;

    const xmlData = `<?xml version="1.0"?>
          <methodCall><methodName>handleUSSDRequest</methodName><params><param><value><struct><member><name>TransactionId</name><value><string>${SessionId}</string></value></member><member><name>TransactionTime</name><value><dateTime.iso8601>${isoString}</dateTime.iso8601></value></member><member><name>MSISDN</name><value><string>${phone}</string></value></member><member><name>USSDServiceCode</name><value><string>543</string></value></member><member><name>USSDRequestString</name><value><string>${Pin}</string></value></member><member><name>response</name><value><string>true</string></value></member></struct></value></param></params></methodCall>`.trim();

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/xml; charset=UTF-8",
      },
      body: xmlData.trim(),
    })
      .then((response) => response.text())
      .then((data) => {
        xml2js.parseString(data, (error, result) => {
          if (error) {
            console.log(error);
          } else {
            const ussdResponse =
              result.methodResponse.params[0].param[0].value[0].struct[0].member.find(
                (item) => item.name[0] === "USSDResponseString"
              );
            const action =
              result.methodResponse.params[0].param[0].value[0].struct[0].member.find(
                (item) => item.name[0] === "action"
              );
            if (ussdResponse) {
              const ussdResponseValue = ussdResponse.value[0].string[0];
              setConvertedJasonPin(ussdResponseValue);
              const actionResponse = action.value[0].string[0];
              setAction(actionResponse);
              console.log(actionResponse);
              console.log(ussdResponseValue);
            } else {
              console.log("USSDResponseString not found in JSON data.");
            }
          }
        });
      });
  };

  const sendChoice = async (e) => {
    const url = `${BaseUrl}/ussdinterface/ussdinterface`;

    const xmlData = `<?xml version="1.0"?>
          <methodCall><methodName>handleUSSDRequest</methodName><params><param><value><struct><member><name>TransactionId</name><value><string>${SessionId}</string></value></member><member><name>TransactionTime</name><value><dateTime.iso8601>${isoString}</dateTime.iso8601></value></member><member><name>MSISDN</name><value><string>${phone}</string></value></member><member><name>USSDServiceCode</name><value><string>543</string></value></member><member><name>USSDRequestString</name><value><string>${Choice}</string></value></member><member><name>response</name><value><string>true</string></value></member></struct></value></param></params></methodCall>`.trim();

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/xml; charset=UTF-8",
      },
      body: xmlData.trim(),
    })
      .then((response) => response.text())
      .then((data) => {
        xml2js.parseString(data, (error, result) => {
          if (error) {
            console.log(error);
          } else {
            const ussdResponse =
              result.methodResponse.params[0].param[0].value[0].struct[0].member.find(
                (item) => item.name[0] === "USSDResponseString"
              );
            const action =
              result.methodResponse.params[0].param[0].value[0].struct[0].member.find(
                (item) => item.name[0] === "action"
              );
            if (ussdResponse) {
              const ussdResponseValue = ussdResponse.value[0].string[0];
              setConvertedJasonChoice(ussdResponseValue);
              const actionResponse = action.value[0].string[0];
              setAction(actionResponse);
              setChoice("");
              console.log(actionResponse);
              console.log(ussdResponseValue);
            } else {
              console.log("USSDResponseString not found in JSON data.");
            }
          }
        });
      });
  };

  const again = () =>{
    setBaseURl("")
    setConvertedJasonChoice(null)
    setConvertedJasonPin(null)
    setConvertedJason(null)
    setPin(null)
    setAction(null)
  }
  return (
    <div>
      <div className="container d-flex justify-content-end mt-3"></div>
      <div className="container pt-5 test flex-left" style={{ width: "50%" }}>
        <div className="">
          <h2 className="d-flex justify-content-center align-items-center mb-5">
            Sequential Test
          </h2>
          <div className="d-grid gap-2">
            <Form.Control
              value={BaseUrl}
              onChange={(e) => setBaseURl(e.target.value)}
              aria-label="Large"
              placeholder="URL......."
            />
            <InputGroup size="lg" className="d-flex justify-content-center">
              {/* <Form.Control
                    value={PhoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    aria-label="Large"
                    placeholder="PhoneNumber......."
                  /> */}
              <Button
                variant="primary"
                className="start flex-fill"
                onClick={sendXml}
              >
                start
              </Button>{" "}
            </InputGroup>
          </div>

          {convertedJason != null && (
            <h6 className="d-flex justify-content-center align-items-center response mt-3">
              {convertedJason}
            </h6>
          )}
          {action != null && action !== "end" && (
            <InputGroup className="mb-5" size="lg">
              <Form.Control
                value={Pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="pin.."
                aria-label="pin"
              />
              <Button variant="primary" className="start" onClick={sendPin}>
                send
              </Button>{" "}
            </InputGroup>
          )}
          {convertedJasonPin != null && (
            <h6 className="d-flex justify-content-center align-items-center response">
              {convertedJasonPin}
            </h6>
          )}

          {action != null && action !== "end" && convertedJasonPin != null && (
            <InputGroup className="mb-5" size="lg">
              <Form.Control
                value={Choice}
                onChange={(e) => setChoice(e.target.value)}
                placeholder="choice.."
                aria-label="choice"
              />
              <Button variant="primary" className="start" onClick={sendChoice}>
                send
              </Button>{" "}
            </InputGroup>
          )}
          {convertedJasonChoice != null && (
            <h6 className="d-flex justify-content-center align-items-center response">
              {convertedJasonChoice}
            </h6>
          )}
          {action === "end" && (
            <InputGroup size="lg" className="d-flex justify-content-center">
              <Button
                variant="primary"
                className="start flex-fill"
                onClick={again}
              >
                again
              </Button>{" "}
            </InputGroup>
          )}
        </div>
      </div>
      {modalShow ? (
        <div
          className="modal show"
          style={{ display: "block", position: "initial" }}
        >
          <Modal.Dialog>
            <Modal.Header closeButton onClick={sendXml}>
              <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>Modal body text goes here.</p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary">Close</Button>
              <Button variant="primary">Save changes</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      ) : null}
    </div>
  );
};

export default SequentialTest;
