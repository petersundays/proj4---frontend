import React from "react";
import TasksContainer from '../Components/MyScrum/Tasks/TasksContainer';
import AsideSearch from "../Components/MyScrum/Search/AsideSearch";

function SearchTasksPage() {
    return (
        <>

                <AsideSearch />
                <TasksContainer />
                              
        </>
    );
}

export default SearchTasksPage;