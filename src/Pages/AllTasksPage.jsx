import AsideAllTasks from "../Components/MyScrum/Tasks/AsideAllTasks";
import AsideAddTask from "../Components/MyScrum/Tasks/AsideAddTask";
import AllTasks from "../Components/MyScrum/Tasks/AllTasks";
import { UserStore } from "../Stores/UserStore";


function AllTasksPage() {
    const typeOfUser = UserStore.getState().user.typeOfUser;
    const DEVELOPER = 100;

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