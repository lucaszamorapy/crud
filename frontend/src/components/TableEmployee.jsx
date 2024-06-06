import React, { useState } from "react";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import { deleteEmployeers, searchEmployee } from "../functions";
import { format } from "date-fns";
import Input from "./utils/Input";
import Button from "./utils/button/Button";
import { toast } from "react-toastify";

const TableEmployee = ({ item, setItem, setEdit }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const handleEdit = (employee) => {
    setEdit(employee);
  };

  const handleDelete = async (id) => {
    await deleteEmployeers(id);
    const newArray = item.filter((i) => i.id !== id);
    setItem(newArray);
    toast.success("Funcionário deletado com sucesso!");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const data = await searchEmployee(searchTerm);
    setItem(data);
  };

  const handleSort = (column) => {
    if (sortedColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortedColumn(column);
      setSortOrder("asc");
    }
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Nome" },
    { key: "email", label: "E-mail" },
    { key: "position", label: "Cargo" },
    { key: "salario", label: "Salário" },
    { key: "dtNasc", label: "Data de Nascimento" },
  ];

  console.log(columns);

  const sortedItems = sortedColumn
    ? [...item].sort((a, b) => {
        if (a[sortedColumn] < b[sortedColumn])
          return sortOrder === "asc" ? -1 : 1;
        if (a[sortedColumn] > b[sortedColumn])
          return sortOrder === "asc" ? 1 : -1;
        return 0;
      })
    : item;

  return (
    <>
      <form
        className="flex flex-col justify-between gap-5 mt-10 lg:flex-row"
        onSubmit={handleSearchSubmit}
      >
        <Input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar funcionário..."
          className="mr-2 rounded-md px-3 py-1 border border-gray-600"
        />
        <Button type="submit" buttonText={"Buscar"} />
      </form>

      <div className="w-full overflow-x-auto">
        {sortedItems.length > 0 ? (
          <table className="w-full mt-20 shadow-md">
            <thead>
              <tr className="bg-[#242424] text-[#979DAA]">
                {columns.map(({ key, label }) => (
                  <th
                    onClick={() => handleSort(key)}
                    key={key}
                    className="py-3 cursor-pointer"
                  >
                    {label}
                    {sortedColumn === key && (
                      <span>
                        {sortOrder === "asc" ? <FaSortDown /> : <FaSortUp />}
                      </span>
                    )}
                  </th>
                ))}
                <th className="py-3 cursor-pointer">Ações</th>
              </tr>
            </thead>

            <tbody>
              {sortedItems.map((employee) => (
                <tr key={employee.id}>
                  {columns.map((colum) => (
                    <td
                      key={colum.key}
                      className="px-5 py-2 border-2 border-gray-600 text-[#979DAA] bg-[#303030]"
                    >
                      {colum.key === "dtNasc"
                        ? format(new Date(employee[colum.key]), "dd/MM/yyyy")
                        : employee[colum.key]}
                    </td>
                  ))}
                  <td className="p-10 border-2 border-gray-600 text-[#979DAA] bg-[#303030]">
                    <button
                      onClick={() => handleEdit(employee)}
                      className="mr-2 text-[#979DAA] bg-transparent border border-[#979DAA] rounded-md px-3 py-1 transition duration-300 hover:bg-[#979DAA] hover:text-[#303030]"
                    >
                      <MdEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(employee.id)}
                      className="text-[#979DAA] bg-transparent border border-[#979DAA] rounded-md px-3 py-1 transition duration-300 hover:bg-[#979DAA] hover:text-[#303030]"
                    >
                      <MdDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-2xl mt-10 text-red-700 font-semibold text-center">
            Funcionário não existe
          </p>
        )}
      </div>
    </>
  );
};

export default TableEmployee;
