import { ToastContainer, toast } from "react-toastify";
import Form from "./components/Form.jsx";
import TableEmployee from "./components/TableEmployee.jsx";
import { useEffect, useState } from "react";
import { getEmployeers } from "./functions.js";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [employeers, setEmployeers] = useState([]);
  const [edit, setEdit] = useState(null);

  const fetchEmployeers = async () => {
    try {
      const data = await getEmployeers();
      setEmployeers(data);
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployeers();
  }, []);

  return (
    <section className="mt-10 px-5">
      <div className="container justify-center items-center">
        <h1 className="font-semibold font-color text-center text-4xl">
          Cadastro de Funcionários
        </h1>
        <Form
          edit={edit}
          setEdit={setEdit}
          getEmployeers={fetchEmployeers}
          item={employeers}
        />
        <TableEmployee
          item={employeers}
          setItem={setEmployeers}
          setEdit={setEdit}
        />
        <ToastContainer autoClose={3000} />
      </div>
    </section>
  );
};

export default App;
