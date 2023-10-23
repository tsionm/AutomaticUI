import React from 'react'
import { useState } from 'react';
import xml2js from 'xml2js';
import Button from 'react-bootstrap/Button';

const Request = () => {
    const [TransactionId,setTransactionId] = useState("");
    const [convertedJason,setConvertedJason] = useState(null);
   
  
    const sendXml = async(e) =>{
      const url =`http://172.16.0.183:8080/ussdinterface/ussdinterface`;
      
      const xmlData =`<?xml version="1.0"?>
      <methodCall><methodName>handleUSSDRequest</methodName><params><param><value><struct><member><name>TransactionId</name><value><string>${TransactionId}</string></value></member><member><name>TransactionTime</name><value><dateTime.iso8601>20060723T14:08:55</dateTime.iso8601></value></member><member><name>MSISDN</name><value><string>251946934699</string></value></member><member><name>USSDServiceCode</name><value><string>543</string></value></member><member><name>USSDRequestString</name><value><string></string></value></member><member><name>response</name><value><string>false</string></value></member></struct></value></param></params></methodCall>`.trim();
    
      await fetch(url,{
        method: 'POST',
        headers: {
          'Content-Type':'application/xml; charset=UTF-8',
        },
        body:xmlData.trim(),
      }).then((response) => response.text())
      .then((data) => {
        xml2js.parseString(data,(error,result)=>{
          if(error){
            console.log(error) 
          }else{
            const ussdResponse = result.methodResponse.params[0].param[0].value[0].struct[0].member.find((item) => item.name[0] === "USSDResponseString");
            
            if(ussdResponse){
              const ussdResponseValue = ussdResponse.value[0].string[0];
              setConvertedJason(ussdResponseValue)
              console.log(ussdResponseValue)
              
            }else{
              console.log('USSDResponseString not found in JSON data.')
  
            }
          }
        })
      })
    }
  return (
    <div>
              <input value={TransactionId} onChange={(e) => setTransactionId(e.target.value)}></input>
              <Button variant="primary" onClick={sendXml}>Primary</Button>{' '}
      {/* <button onClick={sendXml}>send xml data</button> */}
      {(convertedJason != null) && (<p>this is true{convertedJason}</p>)}  
    </div>
  )
}

export default Request;