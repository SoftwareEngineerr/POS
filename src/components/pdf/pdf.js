import React from 'react';
import { jsPDF } from 'jspdf';

const Receipt = ({ items, total, customerName }) => {
    const generatePDF = () => {
        const doc = new jsPDF();

        // Title
        doc.setFontSize(20);
        doc.text("POS Receipt", 20, 20);
        
        // Customer name
        doc.setFontSize(12);
        doc.text(`Customer: ${customerName}`, 20, 40);
        
        // Item table headers
        doc.text("Item", 20, 60);
        doc.text("Qty", 80, 60);
        doc.text("Price", 140, 60);
        
        // Items
        let y = 70; // Starting y position for items
        items.forEach(item => {
            doc.text(item.name, 20, y);
            doc.text(item.quantity.toString(), 80, y);
            doc.text(item.price.toFixed(2), 140, y);
            y += 10; // Move down for the next item
        });

        // Total
        doc.setFontSize(14);
        doc.text(`Total: $${total.toFixed(2)}`, 20, y + 10);

        // Save PDF
        doc.save("receipt.pdf");
    };

    return (
        <div>
            <h1>Receipt</h1>
            <button onClick={generatePDF}>Download Receipt</button>
            <div>
                <h2>Items</h2>
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>{item.name} - {item.quantity} x ${item.price.toFixed(2)}</li>
                    ))}
                </ul>
                <h3>Total: ${total.toFixed(2)}</h3>
            </div>
        </div>
    );
};

export default Receipt;
