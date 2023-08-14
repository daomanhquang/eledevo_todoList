import { put, takeEvery } from 'redux-saga/effects'
import *as type from '../constant/DetailJobConstant'
import { PageDetailJob, AddDetailJob, DeleteDetailJob, UpdateDetailJob, SortDetailJob, SearchDetailJob, SortSearchDetailJob, GetStatus } from "../fetchAPI/DetailJobApi"
function* getDetailJobSaga(page) {
    // console.log("da chay den get Detail");
    try {
        const response = yield PageDetailJob(page.payload);
        // console.log("response la gi: ", response);
        yield put({
            type: type.Get_DetailJob_Sucsses, payload: {
                dataOfPageDetail: response.content.at(0),
                total: response.content.at(1).at(0)
            }
        })
    } catch (error) {
        console.log("Get DetailJob fail", error);
    }
}
function* pageDetailJobSaga(page) {
    try {
        const response = yield PageDetailJob(page.payload);
        console.log("response la gi: ", response);
        yield put({
            type: type.Page_DetailJob_Sucsses, payload: {
                dataOfPageDetail: response.content.at(0),
                total: response.content.at(1).at(0)
            }
        })
    } catch (error) {
        console.log("Page DetailJob fail");
    }
}
function* addToSaga(data) {
    console.log("data add o Saga", data);

    var add = yield AddDetailJob(data.payload);
    var response = ""
    var currentPage = ""
    if (add.status == 200) {
        try {
            if (data.payload.total % type.LIMIT == 0) {
                var fetchAdd = yield PageDetailJob({
                    page: data.payload.page + 1,
                    idJob: data.payload.addObject.idJob
                });
                response = fetchAdd.content.at(0)
                currentPage = data.payload.page + 1
            }
            else {
                var fetchAdd = yield PageDetailJob({
                    page: data.payload.page,
                    idJob: data.payload.addObject.idJob
                });

                response = fetchAdd.content.at(0)
                currentPage = data.payload.page
            }
        } catch (error) {
            console.log("Add fail:", error);
        }
        yield put({
            type: type.Add_DetailJob_Sucsses,
            payload: {
                dataOfPageDetail: response,
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

        var dele = yield DeleteDetailJob(data.payload.id);
        var response = ""
        var currentPage = ""
        if (dele.status == 200) {
            if (Math.ceil(data.payload.total / type.LIMIT) == data.payload.currentPage && data.payload.total % type.LIMIT == 1) {
                var fetch = yield PageDetailJob({
                    page: data.payload.currentPage - 1,
                    idJob: data.payload.idJob
                });
                response = fetch.content.at(0)
                currentPage = data.payload.currentPage - 1
                console.log("page", currentPage);
            }
            else {
                var fetch = yield PageDetailJob({
                    page: data.payload.currentPage,
                    idJob: data.payload.idJob
                });
                response = fetch.content.at(0)
                currentPage = data.payload.currentPage
            }

            yield put({
                type: type.Delete_DetailJob_Sucsses,
                payload: {
                    dataOfPageDetail: response,
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
    // console.log("data add o Saga", data);
    var currentPage = ""
    try {
        var update = yield UpdateDetailJob(data.payload);
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
                                    fetch = yield SortSearchDetailJob({
                                        idJob: data.payload.updateObject.idJob,
                                        page: data.payload.page,
                                        sortType: data.payload.sortType,
                                        textSearch: data.payload.textSearch

                                    })
                                }
                                break;
                            case false:                          // dang sort va ko search
                                {
                                    console.log("dang sort ko search");
                                    fetch = yield SortDetailJob({
                                        idJob: data.payload.updateObject.idJob,
                                        page: data.payload.page,
                                        sortType: data.payload.sortType
                                    });
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
                                    fetch = yield SearchDetailJob({
                                        idJob: data.payload.updateObject.idJob,
                                        page: data.payload.page,
                                        textSearch: data.payload.textSearch
                                    });
                                }
                                break;
                            case false:                         // dang ko sort va ko search
                                {
                                    console.log("dang ko search va ko sort");
                                    fetch = yield PageDetailJob({
                                        page: data.payload.page,
                                        idJob: data.payload.updateObject.idJob
                                    });
                                }
                                break;
                        }
                    }
                    break;
            }
            console.log("response sau update:", fetch);
            var response = fetch.content.at(0)
            yield put({
                type: type.Update_DetailJob_Sucsses,
                payload: {
                    dataOfPageDetail: response,
                    currentPage: data.payload.page,
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

function* searchDetailJobSaga(data) {
    // console.log("data goi API", data);

    try {
        const response = yield SearchDetailJob(data.payload);
        console.log("kqua search response", response);
        yield put({
            type: type.Search_DetailJob_Sucsses, payload: {
                dataOfPage: response.content.at(0),
                total: response.content.at(1).at(0)
            }
        })
    } catch (error) {
        console.log(error);
    }

}

function* sortDetailJobSaga(data) {
    try {
        const response = yield SortDetailJob(data.payload);
        // console.log(response, "akakaka");
        yield put({
            type: type.Sort_DetailJob_Sucsses, payload: {
                dataOfPage: response.content.at(0),
                total: response.content.at(1).at(0)
            }
        })
    } catch (error) {
        console.log(error);
    }

}
function* sortSearchDetailJobSaga(key) {
    try {
        const response = yield SortSearchDetailJob(key.payload);
        console.log(response, "akakaka");
        yield put({
            type: type.Sort_Search_DetailJob_Sucsses, payload: {
                dataOfPage: response.content.at(0),
                total: response.content.at(1).at(0)
            }
        })
    } catch (error) {
        console.log(error);
    }

}


export const DetailJobSaga = [
    takeEvery(type.Page_DetailJob_Request, pageDetailJobSaga),
    takeEvery(type.Get_DetailJob_Request, getDetailJobSaga),
    takeEvery(type.Add_DetailJob_Request, addToSaga),
    takeEvery(type.Delete_DetailJob_Request, deleteToSaga),
    takeEvery(type.Update_DetailJob_Request, updateToSaga),
    takeEvery(type.Search_DetailJob_Request, searchDetailJobSaga),
    takeEvery(type.Sort_DetailJob_Request, sortDetailJobSaga),
    takeEvery(type.Sort_Search_DetailJob_Request, sortSearchDetailJobSaga),

]