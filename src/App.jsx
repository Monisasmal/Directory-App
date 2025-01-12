import { useState } from 'react'

import './App.css'
import AddNewPerson from './Components/AddNewPerson/AddNewPerson'
import RetrieveInformation from './Components/RetrieveInfo/RetrieveInfo';

function App() {

  const [activeTab, setActiveTab] = useState("add");
  return (
    <>

<div>
      <h1>Directory App</h1>
      <div className="tab-buttons">
        <button onClick={() => setActiveTab("add")}>Add New Person</button>
        <button onClick={() => setActiveTab("retrieve")}>Retrieve Information</button>
      </div>
      {activeTab === "add" && <AddNewPerson />}
      {activeTab === "retrieve" && <RetrieveInformation />}
    </div>
     
    </>
  )
}

export default App;

// 986745671245
