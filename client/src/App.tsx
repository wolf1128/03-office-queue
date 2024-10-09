import { Route, Routes } from "react-router-dom";
import NextCustomer from "./next-customer/components/NextCustomer";

function App() {
  return (
    <div className="App">
      <div className="min-vh-100 d-flex flex-column">
        <div className="flex-grow-1 d-flex flex-column">
          <Routes>
            <Route path="/next-customer" element={<NextCustomer />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
