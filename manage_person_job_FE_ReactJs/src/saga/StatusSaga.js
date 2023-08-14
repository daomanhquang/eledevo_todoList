import { put, takeEvery } from 'redux-saga/effects'
import *as type from '../constant/StatusConstant'
import { AddStatus, PageStatus, DeleteStatus, UpdateStatus,SearchStatus,SortStatus,SortSearchStatus } from "../fetchAPI/StatusApi"

function* pageStatusSaga(page) {
    const response = yield PageStatus(page.payload);
    console.log("response la gi: ", response);
    yield put({
        type: type.Page_Status_Sucsses, payload: {
            dataOfPage: response.content.at(0),
            total: response.content.at(1).at(0)
        }
    })
}
function* addToSaga(data) {
    var add = yield AddStatus(data.payload.addObject);
    var response = ""
    var page = ""
    if (add.status == 200) {
        try {
            if (data.payload.total % type.LIMIT == 0) {
                var fetchAdd = yield PageStatus(data.payload.page + 1);
                response = fetchAdd.content.at(0)
                page = data.payload.page + 1
            }
            else {
                var fetchAdd = yield PageStatus(data.payload.page);
                response = fetchAdd.content.at(0)
                page = data.payload.page
            }
        } catch (error) {
            console.error("Add fail:", error);
        }
        yield put({
            type: type.Add_Status_Sucsses,
            payload: {
                dataOfPage: response,
                page: page,
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

        var dele = yield DeleteStatus(data.payload.id);
        var response = ""
        var currentPage = ""
        if (dele.status == 200) {
            if (Math.ceil(data.payload.total / type.LIMIT) == data.payload.currentPage && data.payload.total % type.LIMIT == 1) {
                var fetch = yield PageStatus(data.payload.currentPage - 1);
                response = fetch.content.at(0)
                currentPage = data.payload.currentPage - 1
                console.log("page", currentPage);
            }
            else {
                var fetch = yield PageStatus(data.payload.currentPage);
                response = fetch.content.at(0)
                currentPage = data.payload.currentPage
            }

            yield put({
                type: type.Delete_Status_Sucsses,
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
        var update = yield UpdateStatus(data.payload);
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

                                    fetch = yield SortSearchStatus(data.payload)
                                }
                                break;

                            case false:                          // dang sort va ko search
                                {
                                    console.log("dang sort ko search");

                                    fetch = yield SortStatus(data.payload);
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

                                    fetch = yield SearchStatus(data.payload);
                                }
                                break;

                            case false:                         // dang ko sort va ko search
                                {
                                    console.log("dang ko search va ko sort");
                                    fetch = yield PageStatus(data.payload.page);
                                }
                                break;
                        }
                    }
                    break;
            }
            console.log("response sau update:", fetch);
            var response = fetch.content.at(0)
            yield put({
                type: type.Update_Status_Sucsses,
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
function* searchStatusSaga(data) {
    // console.log("data goi API", data);

    try {
        const response = yield SearchStatus(data.payload);
        console.log("kqua search response", response);
        yield put({
            type: type.Search_Status_Sucsses, payload: {
                dataOfPage: response.content.at(0),
                total: response.content.at(1).at(0)
            }
        })
    } catch (error) {
        console.log(error);
    }

}

function* sortStatusSaga(data) {
    try {
        const response = yield SortStatus(data.payload);
        // console.log(response, "akakaka");
        yield put({
            type: type.Sort_Status_Sucsses, payload: {
                dataOfPage: response.content.at(0),
                total: response.content.at(1).at(0)
            }
        })
    } catch (error) {
        console.log(error);
    }

}
function* sortSearchStatusSaga(key) {
    try {
        const response = yield SortSearchStatus(key.payload);
        console.log(response, "akakaka");
        yield put({
            type: type.Sort_Search_Status_Sucsses, payload: {
                dataOfPage: response.content.at(0),
                total: response.content.at(1).at(0)
            }
        })
    } catch (error) {
        console.log(error);
    }

}
export const StatusSaga = [
    takeEvery(type.Page_Status_Request, pageStatusSaga),
    takeEvery(type.Add_Status_Request, addToSaga),
    takeEvery(type.Delete_Status_Request, deleteToSaga),
    takeEvery(type.Update_Status_Request, updateToSaga),
    takeEvery(type.Search_Status_Request, searchStatusSaga),
    takeEvery(type.Sort_Status_Request, sortStatusSaga),
    takeEvery(type.Sort_Search_Status_Request, sortSearchStatusSaga),
]