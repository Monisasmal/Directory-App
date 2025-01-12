import React, { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../firebase';

const RetrieveInformation = () => {
  const [aadhaar, setAadhaar] = useState("");
  const [result, setResult] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    const q = query(
      collection(db, "people"),
      where("aadhaar", "==", aadhaar)
    );

    try {
      const querySnapshot = await getDocs(q);
      const person = querySnapshot.docs.map((doc) => doc.data())[0];
      setResult(person || "No match found");
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
  };

  return (
    <div>
      <h2>Retrieve Information</h2>
      <form onSubmit={handleSearch}>
        <label>
          Aadhaar Number:
          <input
            type="text"
            value={aadhaar}
            maxLength="12"
            onChange={(e) => setAadhaar(e.target.value)}
          />
        </label>
        <button type="submit">Search</button>
      </form>
      {result && (
        <div id="search-result">
          {typeof result === "string" ? (
            <p>{result}</p>
          ) : (
            <table>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{result.name}</td>
                </tr>
                <tr>
                  <td>Date of Birth</td>
                  <td>{result.dob}</td>
                </tr>
                <tr>
                  <td>Aadhaar Number</td>
                  <td>{result.aadhaar}</td>
                </tr>
                <tr>
                  <td>Mobile Number</td>
                  <td>{result.mobile}</td>
                </tr>
                <tr>
                  <td>Age</td>
                  <td>{result.age}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default RetrieveInformation;
