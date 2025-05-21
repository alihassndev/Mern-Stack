import mongoose from "mongoose";

const hospitalHourSchema = new mongoose.Schema({
  hospital: {
    type: String,
    required: true,
  },
  hours: {
    type: Number,
    required: true,
  },
});

const HospitalHour = mongoose.model("HospitalHour", hospitalHourSchema);

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    experienceInYears: {
      type: Number,
      default: 0,
    },
    workInHospital: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HospitalHour",
      },
    ],
  },
  { timestamps: true }
);

export const Doctor = mongoose.model("Doctor", doctorSchema);
