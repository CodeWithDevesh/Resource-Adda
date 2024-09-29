import React, { useState } from "react";
import "./FileExplorer.css";

const FolderList = ({
    groupedBySubject,
    selectedSubject,
    setSelectedSubject,
    setSelectedUnit,
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
            <h2>Folders</h2>
            <ul className="folder-list">
                {Object.keys(groupedBySubject).map((subject, idx) => (
                    <li key={idx} className="folder-item">
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
                                className="unit-dropdown"
                                onChange={(e) =>
                                    setSelectedUnit(e.target.value)
                                }
                                defaultValue=""
                            >
                                <option value="" disabled>
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
