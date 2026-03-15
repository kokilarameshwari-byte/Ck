import { BrowserRouter as Router, Routes, Route } from "react-router";
import Dashboard from "@/react-app/pages/Dashboard";
import AddExpense from "@/react-app/pages/AddExpense";
import Reports from "@/react-app/pages/Reports";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddExpense />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Router>
  );
}
