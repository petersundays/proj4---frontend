import './PriorityButtons.css'

function PriorityButtons () {
    
    return(
        <div className="priority-buttons-home">
            <button className="priority-button-home low" id="low-button-home">Low</button>
            <button className="priority-button-home medium" id="medium-button-home">Medium</button>
            <button className="priority-button-home high" id="high-button-home">High</button>
        </div>
    )
}
export default PriorityButtons;