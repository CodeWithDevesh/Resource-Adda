import React, { useState } from "react";
import "./fileexplorer.css";

const FolderList = ({
    groupedBySubject,
    selectedSubject,
    setSelectedSubject,
    setSelectedUnit,
    setIsFolderListVisible,
}) => {
    const [dropdownOpen, setDropdownOpen] = useState(null); // Manage dropdown state for each subject

    const toggleDropdown = (subject) => {
        if (dropdownOpen === subject) {
            setDropdownOpen(null);
        } else {
            setDropdownOpen(subject);
        }
        setSelectedSubject(subject);
        setSelectedUnit(null); // Reset selected unit when folder changes
    };

    return (
        <div>
            <h2 className="folder-list-header">Subjects</h2>
            <ul className="folder-list">
                {Object.keys(groupedBySubject).map((subject, idx) => (
                    <li key={idx} className="folder-item hover-effect">
                        <div
                            onClick={() => toggleDropdown(subject)}
                            className={`subject ${
                                selectedSubject === subject ? "selected" : ""
                            }`}
                        >
                            📁 {subject}
                        </div>
                        {/* Dropdown for units */}
                        {dropdownOpen === subject && (
                            <select
                                className="unit-dropdown hover-effect"
                                onChange={(e) =>{
                                    setSelectedUnit(e.target.value)
                                    setIsFolderListVisible(false)
                                }
                                }
                                defaultValue=""
                            >
                                <option value="" disabled hidden>
                                    Select Unit
                                </option>
                                {Object.keys(groupedBySubject[subject]).map(
                                    (unit, idx) => (
                                        <option key={idx} value={unit}>
                                            Unit {unit}
                                        </option>
                                    )
                                )}
                            </select>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FolderList;
