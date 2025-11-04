// controllers/customTourController.js
import CustomTour from "../models/CustomTour.js";

import { sendEmail } from "../utils/sendEmail.js";

// ✅ Create a new tour request


// ✅ Get all tour requests (for admin)
export const getAllCustomTours = async (req, res) => {
  try {
    const tours = await CustomTour.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(tours);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Get single tour request by ID
export const getCustomTourById = async (req, res) => {
  try {
    const tour = await CustomTour.findByPk(req.params.id);
    if (!tour) return res.status(404).json({ message: "Not found" });
    res.json(tour);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Delete a tour request
export const deleteCustomTour = async (req, res) => {
  try {
    const tour = await CustomTour.findByPk(req.params.id);
    if (!tour) return res.status(404).json({ message: "Not found" });
    await tour.destroy();
    res.json({ message: "Tour request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
// controllers/customTourController.js


// ✅ Create a new tour request
export const createCustomTour = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) data.image = req.file.path;

    const tour = await CustomTour.create(data);

    // 📧 Email to customer
    const customerHtml = `
      <h2>Thank you, ${data.name}!</h2>
      <p>Your tour customization request has been received successfully.</p>
      <p>Our representative will contact you soon.</p>
      <br/>
      <h3>Request Summary</h3>
      <ul>
        <li><b>Tour Type:</b> ${data.tourType}</li>
        <li><b>Destination:</b> ${data.destinationType}</li>
        <li><b>Stay Type:</b> ${data.stayType}</li>
        <li><b>Days:</b> ${data.days}</li>
        <li><b>Persons:</b> ${data.persons}</li>
        <li><b>Dates:</b> ${data.fromDate || "N/A"} → ${data.toDate || "N/A"}</li>
      </ul>
      <p>We look forward to planning your perfect trip!</p>
      <p>– The DentodermalCare Tours Team</p>
    `;

    await sendEmail(data.email, "Tour Request Received", customerHtml);

    // 📧 Email to admin
    const adminHtml = `
      <h2>New Custom Tour Request</h2>
      <p><b>Name:</b> ${data.name}</p>
      <p><b>Email:</b> ${data.email}</p>
      <p><b>Phone:</b> ${data.phone}</p>
      <p><b>Tour Type:</b> ${data.tourType}</p>
      <p><b>Destination:</b> ${data.destinationType}</p>
      <p><b>Stay Type:</b> ${data.stayType}</p>
      <p><b>Days:</b> ${data.days}</p>
      <p><b>Persons:</b> ${data.persons}</p>
      <p><b>Budget:</b> ${data.budgetRange || "N/A"}</p>
      <p><b>Transport:</b> ${data.transportMode || "N/A"}</p>
      <p><b>Interests:</b> ${data.interests || "N/A"}</p>
      <p><b>Comments:</b> ${data.comments || "N/A"}</p>
      <p><b>Dates:</b> ${data.fromDate || "N/A"} → ${data.toDate || "N/A"}</p>
    `;

    await sendEmail(process.env.ADMIN_EMAIL, "New Tour Request Received", adminHtml);

    res.status(201).json({
      message: "Tour request submitted successfully",
      tour,
    });
  } catch (error) {
    console.error("Error creating custom tour:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
