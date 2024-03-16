import "./TasksContainer.css";
import AsideAddTask from "./AsideAddTask";
import AsideCategories from "../Categories/AsideCategories";

function TasksContainer() {
  return (
    <>
        <AsideAddTask />
        <AsideCategories />

      <div className="titulo-main">
        <h2 className="main-home">To do</h2>
        <div className="panel" id="todo"></div>
      </div>
      <div className="titulo-main">
        <h2 className="main-home">Doing</h2>
        <div className="panel" id="doing"></div>
      </div>
      <div className="titulo-main">
        <h2 className="main-home">Done</h2>
        <div className="panel" id="done"></div>
      </div>
    </>
  );
}
export default TasksContainer;
