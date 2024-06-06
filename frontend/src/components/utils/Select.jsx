const Select = ({ item, value, onChange }) => {
  return (
    <div>
      <select
        className="text-[#979DAA] text-center text-md py-3 rounded-md bg-gray-400 bg-opacity-10 outline-none w-full lg:w-[250px]"
        value={value}
        onChange={onChange}
      >
        <option className="text-black" disabled value="">
          Selecione uma opção
        </option>

        {item.map((position) => (
          <option key={position.id} value={position.id} className="text-black">
            {position.position}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
