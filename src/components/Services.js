import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    getServices();
  }, []);

  const getServices = async (e) => {
    const url = `http://172.16.0.183:8080/automate-test/rest/automateTest/getAllServices`;
    await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (res.status === "204") {
          console.log("out");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setServices(data);
      });
  };

  return (
    <div className="mt-5 ">
      <h2 className="d-flex justify-content-center services align-items-center mb-2 ">
        Services
      </h2>
      <div className="">
      <Table
        responsive="true"
        striped="columns"
        bordered="bool"
        hover="bool"
        className="mt-5"
      >
        <thead>
          <tr>
            {/* <th>#</th> */}
            <th>menu</th>
            <th>serviceUrl</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {services.length > 0 ? (
            services.map((service, index) => (
              <tr key={index}>
                {/* <td>{service.id ?? ""}</td> */}
                <td>{service.menu ?? ""}</td>
                <td>{service.serviceurl ?? ""}</td>
                <td>{service.status ?? ""}</td>
              </tr>
            ))
          ) : (
            <tr className="d-flex justify-content-center">No data found</tr>
          )}
        </tbody>
      </Table>
      </div>
    </div>
  );
};

export default Services;
