import { LIMIT } from "../constant/JobConstant"


async function PageDetailJob(page) {
    try {
        // console.log("idJob o api:", page);
        const respone = await fetch("http://localhost:8080/detailJob/getPage/" +(page.page-1) + "/" + LIMIT+"?idJob="+page.idJob, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const result = await respone.json();
        return result;
    }
    catch (error) {
        console.log("Error: ", error)
    }
}
async function AddDetailJob(data) {
console.log("data add", data);
    try {
        const respone = await fetch("http://localhost:8080/detailJob/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data.addObject)
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
async function DeleteDetailJob(data) {
    // console.log(data);
    const respone = await fetch("http://localhost:8080/detailJob/delete/" + data ,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
    const result = await respone.json();
    return result;
}
async function UpdateDetailJob(data) {
    const respone = await fetch("http://localhost:8080/detailJob/update/" + data.id,
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
async function SearchDetailJob(payload) {
    console.log("data goi API", payload);
    try {
        const respone = await fetch(" http://localhost:8080/detailJob/search/" + (payload.page-1)+"/"+LIMIT+"?textSearch="
        + payload.textSearch+"&idJob="+ payload.idJob, {
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

async function SortDetailJob(payload) {
    try {
        const respone = await fetch(" http://localhost:8080/detailJob/sort/" + (payload.page-1) + "/" + LIMIT + "?sortType=" 
        + payload.sortType+"&idJob="+payload.idJob, {
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
async function SortSearchDetailJob(payload) {
    console.log("payload sortSearch", payload);
    try {
        const respone = await fetch(" http://localhost:8080/detailJob/sortSearch/" + (payload.page -1) + "/" + LIMIT + "?sortType=" 
        + payload.sortType + "&textSearch=" + payload.textSearch+"&idJob="+payload.idJob, {
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
    PageDetailJob, AddDetailJob, DeleteDetailJob, UpdateDetailJob, SearchDetailJob, 
 SortDetailJob, SortSearchDetailJob,  
}
