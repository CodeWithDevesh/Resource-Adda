import React, { useState } from "react";
import "./Contribute.css";

export default function Contribute() {
    const [branch , setBranch] = useState()
    const [sem, setSem] = useState()
    return (
        <div className="contribute">
            <span className="contri-head">Wanna help others?</span>
            <div className="contri-form-cont">
                <div className="res-inner">
                    <form action="#" className="contri-form">
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
                        <label htmlFor="subject">Subject ??</label>
                        <input type="text" id="subject"/>
                        <label htmlFor="unit">Unit ??</label>
                        <input type="text" id="unit"/>
                        <label htmlFor="file">File ??</label>
                        <input type="file" id="file"/>
                        <label htmlFor="email">Email ??</label>
                        <input type="email" id="email"/>
                    </form>
                </div>
            </div>
        </div>
    );
}
