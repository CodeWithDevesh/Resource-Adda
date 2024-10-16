import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';


export default function View() {
    const location = useLocation();
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [uri, setUri] = useState()

    const params = new URLSearchParams(location.search);

    function onDocLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
            "pdfjs-dist/build/pdf.worker.mjs",
            import.meta.url
        ).toString();
        setUri("../assets/ab.pdf")
    }, []);

    return (
        <>
            <Document file={uri} onLoadSuccess={onDocLoadSuccess}>
                <Page pageNumber={pageNumber} />
            </Document>
        </>
    );
}
