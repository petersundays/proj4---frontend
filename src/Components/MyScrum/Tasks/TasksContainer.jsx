import "./TasksContainer.css";
import AsideAddTask from "./AsideAddTask";

function TasksContainer() {
  return (
    <>
        <AsideAddTask />
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
