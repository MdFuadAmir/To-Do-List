import { Toaster } from "react-hot-toast";
import logo from "../src/assets/todo.png";
import ToDoList from "./Component/ToDoList/ToDoList";

const App = () => {
  return (
    <div className="min-h-screen overflow-hidden px-4 py-8 relative">
      {/* background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://i.ibb.co.com/0yXK3pjz/back.jpg)`,
        }}
      >
        <img src={logo} alt="to-do" className="w-16 h-16 m-6" />
      </div>
      {/* main */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-indigo-400">
            To Do <span className="text-purple-500">List</span>
          </h1>
          <p className="text-gray-500">
            Because remembering everything is hard
          </p>
        </div>
        <ToDoList />
      </div>
      <Toaster />
    </div>
  );
};

export default App;
