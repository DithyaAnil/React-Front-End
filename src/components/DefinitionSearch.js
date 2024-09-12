import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function DefinitionSearch() {
  const [word, setword] = useState("");
  const navigate = useNavigate();
  return (
    <form
      className="flex space-between space-x-2 max-w-[300]"
      onSubmit={() => {
        navigate("/dictionary/" + word);
      }}
    >
      <input
        className="shrink  min-w-0 px-2 py-1 rounded"
        placeholder="Apple"
        type="text"
        onChange={(e) => {
          setword(e.target.value);
        }}
      />
      <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-2 py-1 ">
        Search
      </button>
    </form>
  );
}
