import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../firebase';

const AddNewPerson = () => {
  const [rows, setRows] = useState([]);

  const addRow = () => {
    setRows([...rows, { name: "", dob: "", aadhaar: "", mobile: "", age: "" }]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;

    if (field === "dob") {
      const age = new Date().getFullYear() - new Date(value).getFullYear();
      updatedRows[index].age = age;
    }
    setRows(updatedRows);
  };

  const saveRow = async (index) => {
    const row = rows[index];
    if (
      !row.name ||
      !row.dob ||
      row.aadhaar.length !== 12 ||
      row.mobile.length !== 10
    ) {
      alert("Please fill all fields with valid data.");
      return;
    }

    try {
      await addDoc(collection(db, "people"), row);
      alert("Row saved to Firebase!");
      setRows(rows.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const deleteRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>Add New Person</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Aadhaar Number</th>
            <th>Mobile Number</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={row.name}
                  onChange={(e) => handleInputChange(index, "name", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={row.dob}
                  onChange={(e) => handleInputChange(index, "dob", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  maxLength="12"
                  value={row.aadhaar}
                  onChange={(e) =>
                    handleInputChange(index, "aadhaar", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  maxLength="10"
                  value={row.mobile}
                  onChange={(e) =>
                    handleInputChange(index, "mobile", e.target.value)
                  }
                />
              </td>
              <td>
                <input type="text" value={row.age} readOnly />
              </td>
              <td>
                <button onClick={() => saveRow(index)}>Save</button>
                <button onClick={() => deleteRow(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-row-container">
      <button onClick={addRow}>Add Row</button>
    </div>
    </div>
  );
};

export default AddNewPerson;
