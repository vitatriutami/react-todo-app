import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";

const Todo = ({ todos }) => {
  return (
    <li className="p-2 bg-teal-300 my-2 rounded-md uppercase shadow-sm">
      <div>
        <p>{todos}</p>
        <div>
          <button>
            <CheckIcon />
          </button>
          <button>
            <DeleteIcon />
          </button>
        </div>
      </div>
    </li>
  );
};

export default Todo;
