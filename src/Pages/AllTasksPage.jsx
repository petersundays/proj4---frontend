import AsideAllTasks from "../Components/MyScrum/Tasks/AsideAllTasks";
import AsideAddTask from "../Components/MyScrum/Tasks/AsideAddTask";
import AllTasks from "../Components/MyScrum/Tasks/AllTasks";
import { UserStore } from "../Stores/UserStore";
import { useNavigate } from "react-router-dom";


function AllTasksPage() {

    const user = UserStore.getState().user; 
    const navigate = useNavigate();

    if (!user) {
        navigate('/');
    } 

    const asideToRender = () => {
        if (typeOfUser === DEVELOPER) {
            return (
                <>
                    <AsideAddTask />
                </>
            );
        } else {
            return (
                <>
                    <AsideAllTasks />
                </>
            );
        }
    }

    return (
        <>
            {asideToRender()}
            <AllTasks />
        </>
    );
}
export default AllTasksPage;