
export async function getTasksFromUser(username, token) {

    const getTasksFromUser = `http://localhost:8080/backend_proj4_war_exploded/rest/users/${username}/tasks`;
    try {
        const response = await fetch(getTasksFromUser, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                token: token
            }
        });
        
        if (response.ok) {
            const tasks = await response.json();
            return tasks;
        } else {
            return [];
        }
    }
    catch (error) {
        console.log(error);
    }
}

