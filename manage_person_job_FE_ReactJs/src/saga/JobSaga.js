import { put, takeEvery } from 'redux-saga/effects'
import *as type from '../constant/JobConstant'
import * as typeStatus from '../constant/StatusConstant'

import { AddJob, PageJob, DeleteJob, UpdateJob, SortJob, SearchJob, SortSearchJob, GetStatus } from "../fetchAPI/JobApi"

function* getStatusSaga() {
    try {
        const response = yield GetStatus();
        // console.log("response detail la gi: ", response);
        yield put({
            type: typeStatus.Get_Status_Sucsses, payload: {
                dataStatus: response.content.at(0),
            }
        })
    } catch (error) {
        console.log(error);
    }
}

function* pageJobSaga(page) {
    try {
        const response = yield PageJob(page.payload);
        yield put({
            type: type.Page_Job_Sucsses, payload: {
                dataOfPage: response.content.at(0),
                total: response.content.at(1).at(0)
            }
        })
    } catch (error) {
        console.log("Get fail");
    }
}

function* addToSaga(data) {
    console.log("data add job", data);
    var add = yield AddJob(data.payload.addObject);
    var response = ""
    var currentPage = ""
    if (add.status == 200) {
        try {
            if (data.payload.total % type.LIMIT == 0) {
                var fetchAdd = yield PageJob(data.payload.page + 1);
                response = fetchAdd.content.at(0)
                currentPage = data.payload.page + 1
            }
            else {
                var fetchAdd = yield PageJob(data.payload.page);
                response = fetchAdd.content.at(0)
                currentPage = data.payload.page
            }
        } catch (error) {
            console.error("Add fail:", error);
        }
        yield put({
            type: type.Add_Job_Sucsses,
            payload: {
                dataOfPage: response,
                currentPage: currentPage,
                total: data.payload.total + 1
            }
        })

    }
    else {
        alert("add that bai!!")
    }

}

function* deleteToSaga(data) {
    try {

        var dele = yield DeleteJob(data.payload.id);
        var response = ""
        var currentPage = ""
        if (dele.status == 200) {
            if (Math.ceil(data.payload.total / type.LIMIT) == data.payload.currentPage && data.payload.total % type.LIMIT == 1) {
                var fetch = yield PageJob(data.payload.currentPage - 1);
                response = fetch.content.at(0)
                currentPage = data.payload.currentPage - 1
                console.log("page", currentPage);
            }
            else {
                var fetch = yield PageJob(data.payload.currentPage);
                response = fetch.content.at(0)
                currentPage = data.payload.currentPage
            }

            yield put({
                type: type.Delete_Job_Sucsses,
                payload: {
                    dataOfPage: response,
                    currentPage: currentPage,
                    total: data.payload.total - 1
                }
            })
        }
        else {
            throw ({ error: "ko xoa dc" })
        }
    } catch (error) {
        console.error("Delete fail:", error);
    }
}

function* updateToSaga(data) {
    console.log("data luc update:", data.payload);
    try {
        var update = yield UpdateJob(data.payload);
        if (update.status == 200) {
            var fetch;
            switch (data.payload.sorting) {
                case true:                                  // dang sort
                    {
                        console.log("dang sort");
                        switch (data.payload.searching) {
                            case true:                          // dang sort va search
                                {
                                    console.log("dang searchSort");

                                    fetch = yield SortSearchJob(data.payload)
                                }
                                break;

                            case false:                          // dang sort va ko search
                                {
                                    console.log("dang sort ko search");

                                    fetch = yield SortJob(data.payload);
                                }
                                break;

                        }
                    }
                    break;

                case false:                                 // dang ko sort 
                    {
                        console.log("dang ko sort");

                        switch (data.payload.searching) {
                            case true:                           // dang search va ko sort 
                                {
                                    console.log("dang search ko sort");

                                    fetch = yield SearchJob(data.payload);
                                }
                                break;


                            case false:                         // dang ko sort va ko search
                                {
                                    console.log("dang ko search va ko sort");
                                    fetch = yield PageJob(data.payload.page);
                                }
                                break;

                        }
                    }
                    break;
            }
            console.log("response sau update:", fetch);
            var response = fetch.content.at(0)
            yield put({
                type: type.Update_Job_Sucsses,
                payload: {
                    dataOfPage: response,
                }
            })
        }
        else {
            throw ({ error: "ko sua dc" })
        }

    } catch (error) {
        console.log(error);
    }
}


function* searchJobSaga(data) {
    console.log("data goi API", data);

    try {
        const response = yield SearchJob(data.payload);
        console.log("kqua search response", response);
        yield put({
            type: type.Search_Job_Sucsses, payload: {
                dataOfPage: response.content.at(0),
                total: response.content.at(1).at(0)
            }
        })
    } catch (error) {
        console.log(error);
    }

}

function* sortJobSaga(data) {
    try {
        const response = yield SortJob(data.payload);
        // console.log(response, "akakaka");
        yield put({
            type: type.Sort_Job_Sucsses, payload: {
                dataOfPage: response.content.at(0),
                total: response.content.at(1).at(0)
            }
        })
    } catch (error) {
        console.log(error);
    }

}

function* sortSearchJobSaga(key) {
    try {
        const response = yield SortSearchJob(key.payload);
        console.log(response, "akakaka");
        yield put({
            type: type.Sort_Search_Job_Sucsses, payload: {
                dataOfPage: response.content.at(0),
                total: response.content.at(1).at(0)
            }
        })
    } catch (error) {
        console.log(error);
    }

}
export const JobSaga = [
    takeEvery(type.Page_Job_Request, pageJobSaga),
    takeEvery(type.Add_Job_Request, addToSaga),
    takeEvery(type.Delete_Job_Request, deleteToSaga),
    takeEvery(type.Update_Job_Request, updateToSaga),
    takeEvery(type.Search_Job_Request, searchJobSaga),
    takeEvery(type.Sort_Job_Request, sortJobSaga),
    takeEvery(type.Sort_Search_Job_Request, sortSearchJobSaga),
    takeEvery(typeStatus.Get_Status_Request, getStatusSaga),
]