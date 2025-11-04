import axios from "axios";
import PDFDocument from "pdfkit";

// Helper to format currency correctly
const formatCurrency = (amount) =>
  `₹${Number(amount || 0).toLocaleString("en-IN")}`;

// Main function to generate PDF buffer
export const generateTourPDFBuffer = async (tour = {}, extraInfo = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Create PDF document
      const doc = new PDFDocument({ margin: 50 });
      const buffers = [];

      // Collect PDF chunks
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);

      // === Safety defaults for missing fields ===
      const safeTour = {
        ...tour,
        images: Array.isArray(tour.images)
          ? tour.images
          : tour.coverImage
          ? [{ imageUrl: tour.coverImage }]
          : [],
        itineraries: Array.isArray(tour.itineraries) ? tour.itineraries : [],
        inclusions: Array.isArray(tour.inclusions) ? tour.inclusions : [],
        exclusions: Array.isArray(tour.exclusions) ? tour.exclusions : [],
      };

      // === Helper: Section Header ===
      const drawSectionHeader = (title, color = "#2E86C1") => {
        doc.moveDown(1.5);
        doc
          .font("Helvetica-Bold")
          .fontSize(16)
          .fillColor(color)
          .text(title, { underline: true });
        doc.moveDown(0.8);
        doc.fillColor("#000").font("Helvetica");
      };

      // === Cover Image ===
      if (safeTour.images.length > 0) {
        try {
          const response = await axios.get(safeTour.images[0].imageUrl, {
            responseType: "arraybuffer",
          });
          const imgBuffer = Buffer.from(response.data);
          doc.image(imgBuffer, { 
            fit: [500, 250], 
            align: "center", 
            valign: "center" 
          });
        } catch (err) {
          console.warn("⚠️ Could not load cover image:", err.message);
        }
        doc.moveDown(1.5);
      }

      // === Title & Location ===
      doc
        .font("Helvetica-Bold")
        .fontSize(22)
        .fillColor("#1A5276")
        .text(safeTour.title || "Untitled Tour", { align: "center" });
      doc.moveDown(0.3);
      doc
        .font("Helvetica")
        .fontSize(12)
        .fillColor("#555")
        .text(`${safeTour.state || ""}, ${safeTour.country || ""}`, { align: "center" });
      doc.moveDown(1.5);

      // === Overview ===
     
drawSectionHeader("Tour Overview");
doc.fontSize(12)
  .fillColor("#000")
  .font("Helvetica")
  .text(safeTour.overview || "No overview available.", {
    align: "justify",
    lineGap: 4,
  });

      // === Tour Details Table === FIXED VERSION
drawSectionHeader("Tour Details");
const details = [
  ["Destination", safeTour.destination || "-"],
  ["Duration", `${safeTour.duration || "-"} days`],
  ["Departure", safeTour.departureDate ? new Date(safeTour.departureDate).toDateString() : "-"],
  ["Return", safeTour.returnDate ? new Date(safeTour.returnDate).toDateString() : "-"],
  ["Price", formatCurrency(safeTour.price)],
  ["Discount", safeTour.discount > 0 ? formatCurrency(safeTour.discount) : "No discount"],
  ["Seats", `${safeTour.bookedSeats || 0}/${safeTour.seats || 0}`],
];

const startX = doc.x;
let y = doc.y;
const col1Width = 120;
const col2Width = 330;
const rowHeight = 20;

// Draw table rows
details.forEach(([label, value], i) => {
  const bgColor = i % 2 === 0 ? "#F8F9F9" : "#FFFFFF";
  
  // Draw background first
  doc.rect(startX, y, col1Width + col2Width, rowHeight).fill(bgColor);
  
  // Draw border
  doc.rect(startX, y, col1Width + col2Width, rowHeight).stroke("#D6DBDF");
  
  // Draw text ON TOP of the background
  doc.fillColor("#000")
     .font("Helvetica-Bold")
     .fontSize(10)
     .text(label, startX + 8, y + 5, { width: col1Width - 10 });
  
  doc.font("Helvetica")
     .fontSize(10)
     .text(value, startX + col1Width + 8, y + 5, { width: col2Width - 10 });
  
  y += rowHeight;
});

// Move cursor below the table
doc.y = y + 10;

      // === Itinerary ===
      if (safeTour.itineraries.length > 0) {
        drawSectionHeader("Tour Itinerary");
        safeTour.itineraries.forEach((item) => {
          doc
            .font("Helvetica-Bold")
            .fillColor("#154360")
            .fontSize(12)
            .text(`Day ${item.dayNumber || ""}: ${item.title || ""}`);
          doc
            .font("Helvetica")
            .fillColor("#000")
            .fontSize(11)
            .text(item.description || "", { align: "justify", lineGap: 3 });
          doc.moveDown(0.8);
        });
      }

      // === Inclusions ===
      if (safeTour.inclusions.length > 0) {
        drawSectionHeader("Inclusions", "#1E8449");
        safeTour.inclusions.forEach((inc) => {
          doc.circle(doc.x + 3, doc.y + 5, 2).fill("#1E8449");
          doc.fillColor("#000").text(`   ${inc.text || ""}`, doc.x + 10, doc.y - 3);
          doc.moveDown(0.3);
        });
      }

      // === Exclusions ===
      if (safeTour.exclusions.length > 0) {
        drawSectionHeader("Exclusions", "#C0392B");
        safeTour.exclusions.forEach((exc) => {
          doc.circle(doc.x + 3, doc.y + 5, 2).fill("#C0392B");
          doc.fillColor("#000").text(`   ${exc.text || ""}`, doc.x + 10, doc.y - 3);
          doc.moveDown(0.3);
        });
      }

      // === Gallery ===
      if (safeTour.images.length > 1) {
        await drawGallerySection(doc, safeTour.images);
      }

      // === Extra Info ===
      if (extraInfo.note) {
        drawSectionHeader("Note", "#2874A6");
        doc.fontSize(12).fillColor("#000").text(extraInfo.note, { align: "justify" });
      }

      // === Footer ===
      doc.moveDown(3);
      doc
        .fontSize(10)
        .fillColor("#7D7D7D")
        .text("Thank you for choosing WanderWorld Tours!", { align: "center" });
      doc.text("www.wanderworldtours.com | info@wanderworld.com", { align: "center" });

      // Finalize PDF
      doc.end();

    } catch (error) {
      reject(error);
    }
  });
};

// === Gallery Helper ===
const drawGallerySection = async (doc, images) => {
  doc.moveDown(1.5);
  doc.font("Helvetica-Bold").fontSize(16).fillColor("#2E86C1").text("Gallery");
  doc.moveDown(0.8);

  const imagesToShow = images.slice(0, 3);
  const imageWidth = 160;
  const imageHeight = 100;
  let imgX = 60;
  const imgY = doc.y;

  for (const img of imagesToShow) {
    try {
      const response = await axios.get(img.imageUrl, { responseType: "arraybuffer" });
      const imgBuffer = Buffer.from(response.data);
      doc.image(imgBuffer, imgX, imgY, { fit: [imageWidth, imageHeight] });
      imgX += imageWidth + 15;
    } catch {
      doc.rect(imgX, imgY, imageWidth, imageHeight).stroke("#ccc");
      imgX += imageWidth + 15;
    }
  }
  doc.moveDown(8);
};

