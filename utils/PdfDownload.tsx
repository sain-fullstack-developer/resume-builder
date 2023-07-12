import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PdfDownloadButton = () => {
	const handleDownloadPdf = () => {
		html2canvas(document.body).then((canvas) => {
			const imgData = canvas.toDataURL("image/png");
			const pdfWidth = 300;
			const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
			const pdf = new jsPDF("p", "mm", "a4");

			pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

			pdf.save("download.pdf");
		});
	};

	return <button onClick={handleDownloadPdf}>Download PDF</button>;
};

export default PdfDownloadButton;
