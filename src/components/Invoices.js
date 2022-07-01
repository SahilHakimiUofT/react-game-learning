import { NavLink, Outlet, useSearchParams } from "react-router-dom";
import { getInvoices } from "../data";
import styles from "./Invoices.module.css";

const Invoices = (props) => {
  let invoices = getInvoices();
  let [searchParams, setSearchParams] = useSearchParams();
  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >
        <input
          value={searchParams.get("filter") || ""}
          onChange={(event) => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />

        {invoices
          .filter((invoice) => {
            let filter = searchParams.get("filter");
            if (!filter) return true;
            let name = invoice.name.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
          .map((invoice) => (
            <NavLink className={({ isActive }) => (isActive ? `${styles.red} ${styles.nav}` : `${styles.blue} ${styles.nav}`)} to={`/invoices/${invoice.number}`} key={invoice.number}>
              {invoice.name}
            </NavLink>
          ))}
      </nav>
      <Outlet />
    </div>
  );
};
export default Invoices;
