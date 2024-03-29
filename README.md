import React, { useState } from "react";
import axios from "axios";
import memberdatas from "./memberdata.json";

export const CkycIterate = () => {
  const [memberData, setMemberData] = useState([...memberdatas]);
  const [responseData, setResponseData] = useState([]);
  const [error, setError] = useState("");

  const chunkSize = 100; // Define the number of items in each chunk

  const fetchData = async () => {
    try {
      const totalChunks = Math.ceil(memberData.length / chunkSize);

      for (let i = 0; i < totalChunks; i++) {
        const start = i * chunkSize;
        const end = (i + 1) * chunkSize;
        const chunkData = memberData.slice(start, end);

        const responses = await Promise.all(
          chunkData.map(async (data) => {
            try {
              const response = await axios.post(
                "https://services.com/endpoint/ckyc/v1.0.0/CheckCc",
                data,
                {
                  headers: {
                    "Content-Type": "application/json",
                    apikey: "eyJ4NXQiOiJPREUzWTJaaE1cCjb5vSh3_oLOrjKAek-SmZylK8QbzZFA3qGp1m6EBWs6e4dvgPEth1zDMm8KVuDb-aIwrjEsen2qila1BxrXbnu0Q==",
                  },
                }
              );
              return response.data;
            } catch (error) {
              console.error("Error processing data:", error.message);
              return { status: "error", message: error.message };
            }
          })
        );

        setResponseData((prevData) => [...prevData, ...responses]);
      }
    } catch (error) {
      setError("Error processing data");
      console.error("Error processing data:", error.message);
    }
  };

  return (
    <div>
      <h1>CKYC Endpoint</h1>
      <button onClick={fetchData}>Get Response</button>
      <div>
        <h2>Responses:</h2>
        <table>
          <thead>
            <tr>
              <th>Index</th>
              <th>Status</th>
              <th>Message</th>
              <th>Ckyc Number</th>
              <th>First Name</th>
            </tr>
          </thead>
          <tbody>
            {responseData.map((response, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{response.status}</td>
                <td>{response.message}</td>
                <td>{response.data ? response.data.ckycNumber : "-"}</td>
                <td>{response.data ? response.data.firstName : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default CkycIterate;
