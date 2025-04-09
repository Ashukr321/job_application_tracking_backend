import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  role: {
    type: String,
    required: [true, 'Job role is required'],
    trim: true
  },
  status: {
    type: String,
    required: [true, 'Application status is required'],
    enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
    default: 'Applied'
  },
  dateOfApplication: {
    type: Date,
    required: [true, 'Application date is required'],
    default: Date.now
  },
  link: {
    type: String,
    trim: true,
    validate: {
      validator: function (v) {
        return !v || /^(http|https):\/\/[^ "]+$/.test(v);
      },
      message: 'Please enter a valid URL'
    }
  }
}, {
  timestamps: true
});

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

export default JobApplication;