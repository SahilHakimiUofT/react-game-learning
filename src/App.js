import logo from "./logo.svg";
import "./App.css";
import { Link, Outlet } from "react-router-dom";
// import your route components too

function App() {
  return (
    <div>
      <h1>asdadasd</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/breakout">Breakout Game</Link> | <Link to="/invoices">Invoices</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
