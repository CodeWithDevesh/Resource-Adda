import React, { useDebugValue, useEffect } from "react";
import { useState } from "react";
import Button from "../components/Button";
import axios from "axios";
import { BASE_SERVER_URL } from "../constants";
import AdminFileList from "../components/AdminFileList";
import AdminFolderList from "../components/AdminFolderList";

export default function Upload({ jwtToken }) {
    const [branchSem, setBranchSem] = useState({});
    const [data, setData] = useState({});
    const [uploading, setUploading] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [isFolderListVisible, setIsFolderListVisible] = useState(false);
    let branch, sem;

    const load = () => {
        if (!branchSem.branch || !branchSem.sem || uploading) return;
        branch = branchSem.branch;
        sem = branchSem.sem;
        try {
            axios
                .get(`${BASE_SERVER_URL}/files?branch=${branch}&sem=${sem}`)
                .then((res) => {
                    console.log("Got Files");
                    setData(res.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        } catch (e) {
            alert("something went wrong");
        }
    };

    useEffect(() => {
        load();
    }, [branchSem, uploading]);

    const [groupedBySubject, setGroupedBySubject] = useState({});

    useEffect(() => {
        let a;
        if (data.files) {
            a = data.files.reduce((acc, file) => {
                if (!acc[file.subject]) {
                    acc[file.subject] = {};
                }
                if (!acc[file.subject][file.unit]) {
                    acc[file.subject][file.unit] = [];
                }
                acc[file.subject][file.unit].push(file);
                return acc;
            }, {});
        } else a = {};
        if (selectedSubject && selectedUnit) {
            try {
                const b = a[selectedSubject][selectedUnit];
            } catch {
                setSelectedSubject(null);
                setSelectedUnit(null);
            }
        }
        setGroupedBySubject(a);
    }, [data]);

    useEffect(() => {}, [groupedBySubject]);

    const del = async (url) => {
        try {
            axios
                .delete(`${BASE_SERVER_URL}/delete`, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                    data: {
                        fileUrl: url,
                    },
                })
                .then((res) => {
                    console.log("File deleted successfully:", res.data);
                    load();
                });
        } catch (error) {
            console.error(
                "Error deleting file:",
                error.response ? error.response.data : error.message
            );
        } finally {
            load();
        }
    };

    const toggleFolderList = () => {
        setIsFolderListVisible(!isFolderListVisible);
    };

    return (
        <>
            {(!branchSem.branch || !branchSem.sem) && (
                <Select setBranchSem={setBranchSem} />
            )}
            {uploading && (
                <div className="admin-cont">
                    <div className="admin-inner-cont">
                        <Uploader
                            branch={branchSem.branch}
                            sem={branchSem.sem}
                            jwtToken={jwtToken}
                            setUploading={setUploading}
                        />
                    </div>
                </div>
            )}
            {branchSem.branch && branchSem.sem && !uploading && (
                <div className="upload">
                    <div className="file-explorer">
                        <button
                            className="toggle-btn"
                            onClick={toggleFolderList}
                        >
                            {isFolderListVisible
                                ? "Hide Folders"
                                : "Show Folders"}
                        </button>
                        <div
                            className={`left-pane ${
                                isFolderListVisible ? "visible" : ""
                            }`}
                        >
                            <AdminFolderList
                                groupedBySubject={groupedBySubject}
                                selectedSubject={selectedSubject}
                                setSelectedSubject={setSelectedSubject}
                                setSelectedUnit={setSelectedUnit}
                            />
                        </div>
                        <div className="right-pane">
                            {selectedSubject && selectedUnit ? (
                                <AdminFileList
                                    files={
                                        groupedBySubject[selectedSubject][
                                            selectedUnit
                                        ]
                                    }
                                    subject={selectedSubject}
                                    unit={selectedUnit}
                                    del={del}
                                />
                            ) : (
                                <div className="empty-box">
                                    Select a folder to see files
                                </div>
                            )}
                        </div>
                    </div>
                    <AddFileBtn setUploading={setUploading} />
                </div>
            )}
        </>
    );
}

const AddFileBtn = ({ setUploading }) => {
    return (
        <>
            <div
                onClick={() => {
                    setUploading(true);
                }}
                className="add-file-btn hover-effect"
            >
                <svg
                    enableBackground="new 0 0 50 50"
                    height="50px"
                    id="Layer_1"
                    version="1.1"
                    viewBox="0 0 50 50"
                    width="50px"
                >
                    <rect fill="none" height="50" width="50" />
                    <line
                        fill="none"
                        stroke="#FFF"
                        strokeMiterlimit="10"
                        strokeWidth="4"
                        x1="9"
                        x2="41"
                        y1="25"
                        y2="25"
                    />
                    <line
                        fill="none"
                        stroke="#FFF"
                        strokeMiterlimit="10"
                        strokeWidth="4"
                        x1="25"
                        x2="25"
                        y1="9"
                        y2="41"
                    />
                </svg>
            </div>
        </>
    );
};

const Uploader = ({ branch, sem, jwtToken, setUploading }) => {
    const [subject, setSubject] = useState("");
    const [unit, setUnit] = useState("");
    const [file, setFile] = useState(null);

    const submit = () => {
        if (!subject || !unit || !file || !branch || !sem) return;

        try {
            const formData = new FormData();
            formData.append("branch", branch);
            formData.append("sem", sem);
            formData.append("subject", subject);
            formData.append("unit", unit);
            formData.append("file", file);
            axios
                .post(`${BASE_SERVER_URL}/upload`, formData, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => {
                    console.log(res);
                    alert("Uploaded Successfully");
                });
        } catch {
            alert("Something Went Wrong");
        }
    };

    const cancel = () => {
        setUploading(false);
    };

    return (
        <>
            <div className="uploader-cont">
                <div className="subject-cont">
                    <label htmlFor="subject">Subject : </label>
                    <input
                        onChange={(e) => {
                            setSubject(e.target.value);
                        }}
                        type="text"
                        id="subject"
                    />
                </div>
                <div className="unit-cont">
                    <label htmlFor="unit">Unit : </label>
                    <input
                        onChange={(e) => {
                            setUnit(e.target.value);
                        }}
                        type="text"
                        id="unit"
                    />
                </div>
                <div className="file-cont">
                    <label htmlFor="file">File : </label>
                    <input
                        onChange={(e) => {
                            setFile(e.target.files[0]);
                        }}
                        type="file"
                        id="file"
                    />
                </div>
                <div className="btn-cont">
                    <Button text={"Upload"} onClick={submit} />
                    <Button text={"Go Back"} onClick={cancel} />
                </div>
            </div>
        </>
    );
};

const Select = ({ setBranchSem }) => {
    const [branch, setBranch] = useState("");
    const [sem, setSem] = useState("");

    const setItems = () => {
        if (!branch || !sem) return;
        setBranchSem({ branch, sem });
    };

    return (
        <>
            <div className="res">
                <div className="res-inner">
                    <div className="br">
                        <label htmlFor="branch">Branch ??</label>
                        <select
                            value={branch}
                            onChange={(e) => setBranch(e.target.value)}
                            name="Branch"
                            id="branch"
                        >
                            <option value="" disabled hidden>
                                Select Branch
                            </option>
                            <option value="IT">IT</option>
                            <option value="CSE">CSE</option>
                            <option value="ECE">ECE</option>
                            <option value="Electrical">Electrical</option>
                        </select>
                    </div>
                    <div className="sem">
                        <label htmlFor="sem">Semester ??</label>
                        <select
                            value={sem}
                            onChange={(e) => setSem(e.target.value)}
                            name="sem"
                            id="sem"
                        >
                            <option value="" disabled hidden>
                                Select Semester
                            </option>
                            <option value="1">Sem-1</option>
                            <option value="2">Sem-2</option>
                            <option value="3">Sem-3</option>
                            <option value="4">Sem-4</option>
                        </select>
                    </div>
                    <Button className="go-btn" text={"GO"} onClick={setItems} />
                </div>
            </div>
        </>
    );
};
