import express from 'express';
import { registerCompany } from '../controllers/companyController.js';
import { loginCompany } from '../controllers/companyController.js';
import { getCompanyData } from '../controllers/companyController.js';
import { postJob } from '../controllers/companyController.js';
import { getCompanyJobApplicants } from '../controllers/companyController.js';
import { getCompanyPostedJobs } from '../controllers/companyController.js';
import { changeJobApplicationsStatus } from '../controllers/companyController.js';
import { changeVisibility } from '../controllers/companyController.js';
import upload from '../config/multer.js';
import { protectCompany } from '../middleware/authMiddleware.js';

const router = express.Router();

// Register company
router.post('/register', upload.single('image'), registerCompany);

// company login
router.post('/login', loginCompany);

// get company data
router.get('/company', protectCompany, getCompanyData);


// post a job
router.post('/post-job',protectCompany, postJob);

// get Applicants data of company
router.get('/applicants/', protectCompany,getCompanyJobApplicants);

// get company posted job list
router.get('/list-jobs',protectCompany, getCompanyPostedJobs);

// change Application status
router.post('/change-status',protectCompany, changeJobApplicationsStatus);

// change Application visibility
router.post('/change-visibility',protectCompany, changeVisibility);

export default router;