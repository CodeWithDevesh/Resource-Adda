import React, { useState, useEffect } from "react";
import "./Resources.css";

export default function Resources() {
    return (
        <>
            <div className="res">
                <div className="res-inner">
                    <div className="br">
                        <span>Aapki Branch??</span>
                        <select name="Branch">
                            <option value="IT">IT</option>
                            <option value="CSE">CSE</option>
                            <option value="ECE">ECE</option>
                            <option value="Electrical">Electrical</option>
                        </select>
                    </div>
                    <div className="sem">
                        <span>Aapka Sem ??</span>
                        <select name="sem">
                            <option value="1">Sem-1</option>
                            <option value="2">Sem-2</option>
                            <option value="3">Sem-3</option>
                            <option value="4">Sem-4</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    );
}
