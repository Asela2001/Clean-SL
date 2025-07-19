import mongoose from "mongoose";

// Define the Job schema
const jobSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    nearestCity: {
      type: String,
      required: true,
      maxlength: 100,
    },
    serviceType: {
      // Corrected typo
      type: String,
      required: true,
      enum: ["Plumbing", "Gardening", "House", "Office", "Other"], // Example values
    },
    description: {
      type: String,
      required: true,
      maxlength: 500,
    },
    scheduledDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          // Ensure date is not in the past
          return value >= new Date();
        },
        message: "Scheduled date must be in the future",
      },
    },
    startTime: {
      type: String,
      required: true,
      match: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, // HH:MM format (24-hour)
    },
    duration: {
      type: Number, // Duration in minutes
      required: true,
      min: 30, // Minimum 30 minutes
      max: 480, // Maximum 8 hours (adjust as needed)
    },
  },
  { timestamps: true }
);

// Create the Job model
const Job = mongoose.model("Job", jobSchema);

export default Job;