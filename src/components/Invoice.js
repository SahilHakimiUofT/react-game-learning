import { useParams } from "react-router-dom";
import { getInvoice } from "../data";

const Invoice = (props) => {
  let params = useParams();
  let invoice = getInvoice(parseInt(params.invoiceId, 10));

  return (
    <div>
      <h2>Total Due: {invoice.amount}</h2>
      <p>
        {invoice.name}: {invoice.number}
      </p>
      <p>Due Date: {invoice.due}</p>
    </div>
  );
};

export default Invoice;
