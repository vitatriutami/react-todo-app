import AddCircleIcon from "@mui/icons-material/AddCircle";

const Form = () => {
  return (
    <form className="flex justify-between bg-teal-300 p-4 rounded-lg items-center">
      <input className="w-full text-xl rounded-lg p-[3px]" />
      <button className="ml-2 rounded-lg text-gray-800">
        <AddCircleIcon />
      </button>
    </form>
  );
};

export default Form;
