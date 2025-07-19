//import Job from "../Models/jobs.js";
import Job from "../Models/jobs.js"; es

// Get all jobs (sorted by newest first)
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch jobs", error: error.message });
  }
};

// Get single job by ID
export const getSpecificJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch job", error: error.message });
  }
};

// Create new job
export const createJob = async (req, res) => {
  try {
    const requiredFields = [
      "name",
      "nearestCity",
      "serviceType",
      "description",
      "scheduledDate",
      "startTime",
      "duration",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "Missing required fields",
        missingFields,
      });
    }

    // Validate date is in the future
    if (new Date(req.body.scheduledDate) < new Date()) {
      return res
        .status(400)
        .json({ message: "Scheduled date must be in the future" });
    }

    const newJob = new Job(req.body);
    await newJob.save();

    res.status(201).json({
      message: "Job created successfully",
      job: newJob,
    });
  } catch (error) {
    console.error("Error creating job:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed",
        error: error.message,
      });
    }

    res.status(500).json({
      message: "Failed to create job",
      error: error.message,
    });
  }
};

// Update existing job
export const updateJob = async (req, res) => {
  try {
    const updates = req.body;

    // Prevent updating immutable fields if needed
    delete updates.createdAt;
    delete updates.updatedAt;

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    console.error("Error updating job:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed",
        error: error.message,
      });
    }

    res.status(500).json({
      message: "Failed to update job",
      error: error.message,
    });
  }
};

// Delete job
export const deleteJob = async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({
      message: "Job deleted successfully",
      jobId: req.params.id,
    });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({
      message: "Failed to delete job",
      error: error.message,
    });
  }
};
