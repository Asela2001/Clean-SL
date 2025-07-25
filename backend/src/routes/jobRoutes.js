import express from 'express';
import { createJob, deleteJob, getAllJobs, getSpecificJob, updateJob,  } from '../Controllers/jobController.js';

const router = express.Router();

router.get("/", getAllJobs);
router.get("/:id", getSpecificJob);
router.post("/", createJob);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);

export default router;