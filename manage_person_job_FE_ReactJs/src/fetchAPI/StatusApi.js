import { LIMIT } from '../constant/StatusConstant'

async function PageStatus(page) {
    try {
        const respone = await fetch(" http://localhost:8080/status/getPage/" +(page-1) + "/" + LIMIT, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const result = await respone.json();
        console.log("result nay: ", result);
        return result;
    }
    catch (error) {
        console.error("Error: ", error)
    }
}
async function AddStatus(data) {
    try {
        const respone = await fetch("http://localhost:8080/status/add", {
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
async function DeleteStatus(data) {
    // console.log(data);
    const respone = await fetch("http://localhost:8080/status/delete/" + data ,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
    const result = await respone.json();
    return result;
}
async function UpdateStatus(data) {
    const respone = await fetch("http://localhost:8080/status/update/" + data.id,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data.updateObject)
        })
    const result = await respone.json();
    return result;
}
async function SearchStatus(payload) {
    // console.log("data goi API", payload);
    try {
        const respone = await fetch(" http://localhost:8080/status/search/" + (payload.page-1)+"/"+LIMIT+"?textSearch="+payload.textSearch, {
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

async function SortStatus(payload) {
    try {
        const respone = await fetch(" http://localhost:8080/status/sort/" + (payload.page-1) + "/" + LIMIT + "?sortType=" + payload.sortType, {
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
async function SortSearchStatus(payload) {
    console.log("payload sortSearch", payload);
    try {
        const respone = await fetch(" http://localhost:8080/status/sortSearch/" + (payload.page -1) + "/" + LIMIT + "?sortType=" + payload.sortType + "&textSearch=" + payload.textSearch, {
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
    PageStatus,AddStatus,DeleteStatus,UpdateStatus,SearchStatus,SortStatus,SortSearchStatus
}



