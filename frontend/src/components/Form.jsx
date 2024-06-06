import React, { useEffect, useState } from "react";
import Input from "./utils/Input";
import useForm from "../hooks/useForm";
import Button from "./utils/button/Button";
import axios from "axios";
import { toast } from "react-toastify";
import Select from "./utils/Select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import { addEmployee, updateEmployee } from "../functions";

const Form = ({ edit, setEdit, getEmployeers, item }) => {
  const name = useForm("name");
  const email = useForm("email");
  // const salario = useForm("number");
  const data = useForm("number");
  const [salario, setSalario] = useState("");
  const [date, setDate] = useState(new Date());
  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState("");

  const dataItem = item.map((employee) => employee.email);
  console.log(dataItem);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get("http://localhost:8800/positions");
        setPositions(response.data);
      } catch (error) {
        toast.error("Erro ao buscar posições");
      }
    };

    fetchPositions();
  }, []);

  useEffect(() => {
    if (edit) {
      name.setValue(edit.name);
      email.setValue(edit.email);
      setSelectedPosition(edit.position_id);
      setSalario(edit.salario || "");
      setDate(edit.dtNasc);
    } else {
      name.setValue("");
      email.setValue("");
      setSelectedPosition("");
      setSalario("");
      setDate(new Date());
    }
  }, [edit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.value || !email.value || !selectedPosition) {
      return toast.warn("Preencha todos os campos!");
    }

    try {
      if (edit) {
        await updateEmployee(edit.id, {
          name: name.value,
          email: email.value,
          position_id: selectedPosition,
          dtNasc: date,
          salario: salario,
        });
        toast.success("Funcionário atualizado com sucesso!");
      } else {
        if (dataItem.includes(email.value)) {
          return toast.warn("Email já cadastrado");
        }
        await addEmployee({
          name: name.value,
          email: email.value,
          position_id: selectedPosition,
          dtNasc: date,
          salario: salario,
        });
        toast.success("Funcionário adicionado com sucesso!");
      }
      name.setValue("");
      email.setValue("");
      setSelectedPosition("");
      setSalario("");
      setDate("");
      setEdit(null);
      getEmployeers();
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      toast.error("Erro ao salvar funcionário");
    }
  };

  const handleChange = ({ target }) => {
    setSelectedPosition(target.value);
  };

  const formatCurrency = (value) => {
    const cleanValue = value.replace(/[^\d]/g, "");
    let intValue = parseInt(cleanValue, 10);

    if (isNaN(intValue)) {
      intValue = 0;
    }

    const floatValue = intValue / 100;
    const formattedValue = floatValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    return formattedValue;
  };

  const handleChangeSalario = ({ target }) => {
    const formattedValue = formatCurrency(target.value);
    setSalario(formattedValue);
  };

  return (
    <section className="mt-20">
      <div className="container">
        <form
          className="flex gap-10 py-10 px-5 bg-[#242424] shadow-md flex-col"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-10 items-center flex-col lg:flex-row">
            <Input placeholder={"Nome"} type="text" name="name" {...name} />
            <Input placeholder={"Email"} type="email" name="email" {...email} />
            <Input
              placeholder={"Salário"}
              type="text"
              name="salario"
              value={salario}
              onChange={handleChangeSalario}
            />
          </div>
          <div className="flex gap-10 items-center flex-col lg:flex-row">
            <Select
              item={positions}
              onChange={handleChange}
              value={selectedPosition}
            />
            <DatePicker
              className="outline-none text-[#979DAA] px-5 py-3 bg-[#303030] rounded-md shadow-md"
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Data"
            />
            <Button
              buttonText={"Salvar"}
              type="submit"
              styled={"w-full lg:w-auto"}
            />
            {/* //teste */}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Form;
