// src/Receipt.js
import React from 'react';
import jsPDF from 'jspdf';

const Receipt = ({ items, total }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add content to the PDF
    doc.setFontSize(12);
    doc.text('Receipt', 20, 20);
    
    items.forEach((item, index) => {
      doc.text(`${item.name}: $${item.price.toFixed(2)}`, 20, 30 + index * 10);
    });

    doc.text(`Total: $${total.toFixed(2)}`, 20, 30 + items.length * 10);
    
    // Save the PDF or send to the printer directly
    doc.autoPrint(); // This will open the print dialog
    doc.output('dataurlnewwindow'); // Opens the PDF in a new window
  };

  return (
    <div>
      <h1>Receipt</h1>
      <button onClick={generatePDF}>Print Receipt</button>
    </div>
  );
};

export default Receipt;
