// backend/controllers/bookingController.js
import Booking from '../models/Booking.js';
import Tour from '../models/Tour.js';
import User from '../models/User.js';
import { v4 as uuidv4 } from 'uuid';
import { sendEmail } from "../utils/sendEmail.js";

// ------------------------
// Helper Functions
// ------------------------

// Check if user can access booking
const checkUserAccess = (booking, user) => {
  if (user.role === 'customer' && booking.userId !== user.id) {
    const error = new Error('Not authorized');
    error.statusCode = 403;
    throw error;
  }
};

// Validate booking status
const validateStatus = (status) => {
  const valid = ['pending', 'confirmed', 'cancelled', 'completed'];
  if (!valid.includes(status)) {
    const error = new Error('Invalid status');
    error.statusCode = 400;
    throw error;
  }
};

// ------------------------
// Booking Controllers
// ------------------------

// Create a new booking

export const createBooking = async (req, res) => {
  try {
    const {
      tourId,
      tourName,
      guests,
      totalAmount,
      customerInfo,
      paymentMethod,
      status,
      tourDetails,
    } = req.body;

    console.log("📥 Received booking data:", req.body);

    // Validate basic info
    if (!customerInfo?.name || !customerInfo?.email || !customerInfo?.phone) {
      return res.status(400).json({ message: "Customer information is required" });
    }
    if (!tourId) {
      return res.status(400).json({ message: "Tour ID is required" });
    }
    if (!["online", "cash"].includes(paymentMethod)) {
      return res.status(400).json({ message: "Invalid payment method" });
    }

    // Find tour
    const tour = await Tour.findByPk(tourId);
    if (!tour) return res.status(404).json({ message: "Tour not found" });

    // Seat availability
    const availableSeats = tour.seats - tour.bookedSeats;
    if (availableSeats < guests) {
      return res.status(400).json({ message: `Only ${availableSeats} seats available` });
    }

    // Generate booking reference
    const bookingReference = `BK${Date.now()}${Math.random()
      .toString(36)
      .substr(2, 5)
      .toUpperCase()}`;

    // ✅ Auto logic: if cash → pending; else confirmed
    const bookingStatus = paymentMethod === "cash" ? "pending" : "confirmed";

    // Create booking
    const booking = await Booking.create({
      bookingReference,
      customerName: customerInfo.name.trim(),
      customerEmail: customerInfo.email.trim(),
      customerPhone: customerInfo.phone.trim(),
      numberOfTravelers: guests,
      totalAmount,
      paymentMethod,
      bookingStatus,
      userId: req.user ? req.user.id : null,
      tourId,
      travelDate: tourDetails?.departureDate || tour.departureDate,
      specialRequirements: "",
      emergencyContact: null,
    });

    // ✅ Only increase booked seats if online (confirmed)
    if (bookingStatus === "confirmed") {
      await tour.update({ bookedSeats: tour.bookedSeats + guests });
    }

    console.log(`✅ Booking created: ${booking.bookingReference} (${bookingStatus})`);

    // ====== ✉️ Send email notification ======
    const subject =
      bookingStatus === "confirmed"
        ? "Booking Confirmed 🎉"
        : "Booking Request Received 🕐";

    const html =
      bookingStatus === "confirmed"
        ? `
        <h2>Booking Confirmed 🎉</h2>
        <p>Dear ${booking.customerName},</p>
        <p>Your booking <strong>${booking.bookingReference}</strong> for <strong>${tour.title}</strong> has been <strong>confirmed</strong>.</p>
        <p><b>Departure Date:</b> ${tour.departureDate}</p>
        <p><b>Total Travelers:</b> ${booking.numberOfTravelers}</p>
        <p><b>Total Amount:</b> ₹${booking.totalAmount}</p>
        <p>We look forward to making your trip memorable!</p>
      `
        : `
        <h2>Booking Request Received 🕐</h2>
        <p>Dear ${booking.customerName},</p>
        <p>Thank you for your interest in <strong>${tour.title}</strong>.</p>
        <p>Your booking reference is <strong>${booking.bookingReference}</strong>.</p>
        <p>Our team will confirm your booking soon.</p>
      `;

    // fire and forget (don't block API response)
    sendEmail(booking.customerEmail, subject, html).catch((err) =>
      console.error("❌ Email send error:", err.message)
    );

    // ====== API Response ======
    res.status(201).json({
      success: true,
      bookingId: booking.bookingReference,
      message: `Booking created successfully. Status: ${bookingStatus}`,
      booking,
    });
  } catch (error) {
    console.error("❌ Booking creation error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};






// Get all bookings (Admin/Employee)
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({ include: [User, Tour], order: [['createdAt', 'DESC']] });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get bookings for logged-in customer
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { userId: req.user.id },
      include: [Tour],
      order: [['createdAt', 'DESC']]
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single booking by ID
export const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id, { include: [User, Tour] });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    checkUserAccess(booking, req.user);
    res.json(booking);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

// Update booking status (Admin only)
// backend/controllers/bookingController.js

// ✅ Update Booking Status
// export const updateBookingStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     console.log(`📝 Updating booking ${id} status to: ${status}`);

//     // Validate status
//     if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
//       return res.status(400).json({ 
//         success: false,
//         message: 'Invalid status. Must be: pending, confirmed, or cancelled' 
//       });
//     }

//     // Find booking
//     const booking = await Booking.findByPk(id, {
//       include: [Tour]
//     });

//     if (!booking) {
//       return res.status(404).json({ 
//         success: false,
//         message: 'Booking not found' 
//       });
//     }

//     const oldStatus = booking.bookingStatus;
//     const tour = booking.Tour;
//     const guests = booking.numberOfTravelers;

//     // Update booking status
//     await booking.update({ 
//       bookingStatus: status 
//     });

//     // Handle seat management based on status changes
//     if (oldStatus !== status) {
//       // If changing from pending/confirmed to cancelled, free up seats
//       if (status === 'cancelled' && (oldStatus === 'pending' || oldStatus === 'confirmed')) {
//         if (oldStatus === 'confirmed' && tour) {
//           await tour.update({ 
//             bookedSeats: Math.max(0, tour.bookedSeats - guests) 
//           });
//           console.log(`✅ Freed ${guests} seats for tour ${tour.id}`);
//         }
//       }
      
//       // If changing to confirmed from pending, reserve seats
//       if (status === 'confirmed' && oldStatus === 'pending' && tour) {
//         const availableSeats = tour.seats - tour.bookedSeats;
//         if (availableSeats >= guests) {
//           await tour.update({ 
//             bookedSeats: tour.bookedSeats + guests 
//           });
//           console.log(`✅ Reserved ${guests} seats for tour ${tour.id}`);
//         } else {
//           // Rollback booking status if not enough seats
//           await booking.update({ bookingStatus: oldStatus });
//           return res.status(400).json({
//             success: false,
//             message: `Only ${availableSeats} seats available. Cannot confirm booking.`
//           });
//         }
//       }
//     }

//     console.log(`✅ Booking ${id} status updated from ${oldStatus} to ${status}`);

//     res.json({
//       success: true,
//       message: `Booking status updated to ${status}`,
//       booking: {
//         id: booking.id,
//         bookingReference: booking.bookingReference,
//         bookingStatus: booking.bookingStatus,
//         customerName: booking.customerName,
//         numberOfTravelers: booking.numberOfTravelers
//       }
//     });

//   } catch (error) {
//     console.error('❌ Update booking status error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Internal server error'
//     });
//   }
// }; 



export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    console.log(`📝 Updating booking ${id} status to: ${status}`);

    // Validate status
    if (!["pending", "confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be: pending, confirmed, or cancelled",
      });
    }

    // Find booking with tour details
    const booking = await Booking.findByPk(id, { include: [Tour] });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    const oldStatus = booking.bookingStatus;
    const tour = booking.Tour;
    const guests = booking.numberOfTravelers;

    // Update booking status
    await booking.update({ bookingStatus: status });

    // ====== Seat management ======
    if (oldStatus !== status) {
      // Cancelled → Free up seats
      if (
        status === "cancelled" &&
        (oldStatus === "pending" || oldStatus === "confirmed")
      ) {
        if (oldStatus === "confirmed" && tour) {
          await tour.update({
            bookedSeats: Math.max(0, tour.bookedSeats - guests),
          });
          console.log(`✅ Freed ${guests} seats for tour ${tour.id}`);
        }
      }

      // Pending → Confirmed → Reserve seats
      if (status === "confirmed" && oldStatus === "pending" && tour) {
        const availableSeats = tour.seats - tour.bookedSeats;
        if (availableSeats >= guests) {
          await tour.update({
            bookedSeats: tour.bookedSeats + guests,
          });
          console.log(`✅ Reserved ${guests} seats for tour ${tour.id}`);
        } else {
          await booking.update({ bookingStatus: oldStatus });
          return res.status(400).json({
            success: false,
            message: `Only ${availableSeats} seats available. Cannot confirm booking.`,
          });
        }
      }
    }

    // ====== Email notifications ======
    if (status === "confirmed") {
      const emailHTML = `
        <h2>Booking Confirmed 🎉</h2>
        <p>Dear ${booking.customerName},</p>
        <p>Your booking <strong>${booking.bookingReference}</strong> for <strong>${tour.title}</strong> has been <strong>confirmed</strong>.</p>
        <p><b>Departure:</b> ${tour.departureDate}</p>
        <p><b>Travelers:</b> ${booking.numberOfTravelers}</p>
        <p>Thank you for choosing us! We look forward to your journey.</p>
      `;
      await sendEmail(booking.customerEmail, "Booking Confirmed", emailHTML);
    }

    if (status === "cancelled") {
      const emailHTML = `
        <h2>Booking Cancelled ❌</h2>
        <p>Dear ${booking.customerName},</p>
        <p>We’re sorry to inform you that your booking <strong>${booking.bookingReference}</strong> for <strong>${tour.title}</strong> has been <strong>cancelled</strong>.</p>
        <p>If this was a mistake, please contact our support team.</p>
      `;
      await sendEmail(booking.customerEmail, "Booking Cancelled", emailHTML);
    }

    console.log(`✅ Booking ${id} status updated from ${oldStatus} to ${status}`);

    res.json({
      success: true,
      message: `Booking status updated to ${status}`,
      booking: {
        id: booking.id,
        bookingReference: booking.bookingReference,
        bookingStatus: booking.bookingStatus,
        customerName: booking.customerName,
        customerEmail: booking.customerEmail,
        numberOfTravelers: booking.numberOfTravelers,
      },
    });
  } catch (error) {
    console.error("❌ Update booking status error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// Delete booking (Admin only)
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    await booking.destroy();
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
