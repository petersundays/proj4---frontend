import './HomeMainContainer.css';

function HomeMainContainer() {
  
  return (
    
    <>
        <main>
            <div className="titulo-main">
                <h2 className="main-home">To do</h2>
                <div className="panel" id="todo">
                </div>
            </div>
            <div className="titulo-main">
                <h2 className="main-home">Doing</h2>
                <div className="panel" id="doing">
                </div>
            </div>
            <div className="titulo-main">
                <h2 className="main-home">Done</h2>
                <div className="panel" id="done">
                </div>
            </div>
        </main>
    </>
    );
}
export default HomeMainContainer;