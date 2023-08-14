import { LIMIT } from "../constant/JobConstant"

async function GetStatus() {
    try {
        const respone = await fetch(" http://localhost:8080/status/getStatus", {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
            }
        })
        const result = await respone.json();

        return result;

    }
    catch (error) {
        console.error("Error: ", error)
    }
}



async function PageJob(page) {
    try {
        const respone = await fetch(" http://localhost:8080/job/getPage/" + LIMIT + "?page=" +(page-1), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const result = await respone.json();
        return result;
    }
    catch (error) {
        console.error("Error: ", error)
    }
}
async function AddJob(data) {
    try {
        const respone = await fetch("http://localhost:8080/job/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        const result = await respone.json();
        // console.log("Succses: ", result);
        return result;
    }
    catch (error) {
        console.error("Error: ", error);
        alert(error)
    }
}
async function DeleteJob(data) {
    // console.log(data);
    const respone = await fetch("http://localhost:8080/job/delete/" + data ,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
    const result = await respone.json();
    return result;
}
async function UpdateJob(data) {
    const respone = await fetch("http://localhost:8080/job/update/" + data.id,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data.updateObject)
        })
    const result = await respone.json();
    console.log("kqua", result);
    return result;
}
async function SearchJob(payload) {
    console.log("data goi API", payload);
    try {
        const respone = await fetch(" http://localhost:8080/job/search/" + (payload.page-1)+"/"+LIMIT+"?textSearch="+payload.textSearch, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const result = await respone.json();
        // console.log("Succses: ", result);
        return result;
    }
    catch (error) {
        console.error("Error: ", error)
    }

}

async function SortJob(payload) {
    try {
        const respone = await fetch(" http://localhost:8080/job/sort/" + (payload.page-1) + "/" + LIMIT + "?sortType=" + payload.sortType, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const result = await respone.json();
        // console.log("Succses: ", result);
        return result;
    }
    catch (error) {
        console.error("Error: ", error)
    }
}
async function SortSearchJob(payload) {
    console.log("payload sortSearch", payload);
    try {
        const respone = await fetch(" http://localhost:8080/job/sortSearch/" + (payload.page -1) + "/" + LIMIT + "?sortType=" + payload.sortType + "&textSearch=" + payload.textSearch, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const result = await respone.json();
        // console.log("Succses: ", result);
        return result;
    }
    catch (error) {
        console.error("Error: ", error)
    }

}
export {
   AddJob, DeleteJob, UpdateJob, SearchJob, PageJob,
 SortJob, SortSearchJob,  GetStatus
}
