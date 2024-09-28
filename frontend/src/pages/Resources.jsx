import React, { useState, useEffect } from "react";
import "./Resources.css";
import NavigateButton from "../components/NavigateButton";

export default function Resources() {
    const [branch, setBranch] = useState("")
    const [sem, setSem] = useState("")
    const [redirect, setRedirect] = useState("")
    useEffect(() => {
        if(branch != "" && sem != "")
            setRedirect("/resources/" + branch + "/" + sem)
        else
            setRedirect("")
    }, [branch, sem])

    return (
        <>
            <div className="res">
                <div className="res-inner">
                    <div className="br">
                        <label htmlFor="branch">Aapki Branch ??</label>
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
                        <label htmlFor="sem">Aapka Sem ??</label>
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
                    <NavigateButton className="go-btn" text={"GO"} path={redirect}/>
                </div>
            </div>
        </>
    );
}
