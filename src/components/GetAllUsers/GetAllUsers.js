import React, { useEffect } from "react";
import { getAllUsers } from "../Api/Api";

function GetAllUsers() {
    useEffect(() => {
        fetchAllUsers();
    }, []);

    async function fetchAllUsers() {
        try {
            let result = await getAllUsers();
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }
}

export default GetAllUsers;
