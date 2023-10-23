import axios from "axios";

const BaseUrl = axios.create({
    baseURL:'http://172.16.0.183:8080/ussdinterface/ussdinterface',
});

export default BaseUrl;

// const sendXml = (e) =>{
  
//     // const url =`http://172.16.0.183:8080/ussdinterface/ussdinterface`;

//     const xmlData =`<?xml version="1.0"?><methodCall><methodName>handleUSSDRequest</methodName><params><param><value><struct><member><name>TransactionId</name><value><string>${TransactionId}</string></value></member><member><name>TransactionTime</name><value><dateTime.iso8601>20060723T14:08:55</dateTime.iso8601></value></member><member><name>MSISDN</name><value><string>251946934699</string></value></member><member><name>USSDServiceCode</name><value><string>543</string></value></member><member><name>USSDRequestString</name><value><string></string></value></member><member><name>response</name><value><string>false</string></value></member></struct></value></param></params></methodCall>`.trim();
  
//     const headers = {
//       'Content-Type':'application/xml; charset=UTF-8',

//     }
//     BaseUrl.post('',xmlData,{headers})
//     .then((response) => {
//       console.log(response)
//     })
//     .then((data) => {
//       xml2js.parseString(data,(error,result)=>{
//         if(error){
//           console.log(error)
//         }else{
//           const ussdResponse = result.methodResponse.params[0].param[0].value[0].struct[0].member.find((item) => item.name[0] === "USSDResponseString");
          
//           if(ussdResponse){
//             const ussdResponseValue = ussdResponse.value[0].string[0];
//             setConvertedJason(ussdResponseValue)
//             console.log(ussdResponseValue)
            
//           }else{
//             console.log('USSDResponseString not found in JSON data.')

//           }
//         }
//       })
//     })
//   }