const Job = require("../models/Job");

const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const getAlljob = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userID }).sort("createdAt");
  res.status(StatusCodes.OK).json({ count: jobs.length, jobs });
};

const Singlejob = async (req, res) => {
  const userID = req.user.userID;
  const jobID = req.params.id;

  //   console.log(req.params.id);
  //   console.log(req.user.userID);
  const job = await Job.findOne({ _id: jobID, createdBy: userID });
  if (!job) {
    throw new CustomAPIError(
      `Not Found related with ${jobID}`,
      StatusCodes.NOT_FOUND
    );
  }
  res.status(StatusCodes.OK).json({ job });
};

const Createjob = async (req, res) => {
  req.body.createdBy = req.user.userID;
  console.log(req.body);
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const Updatejob = async (req, res) => {
  const userID = req.user.userID;
  const jobID = req.params.id;
  const { company, position } = req.body;

  if (company === "" || position === "") {
    throw new CustomAPIError("Please provide value", StatusCodes.BAD_REQUEST);
  }

  const job = await Job.findByIdAndUpdate(
    { _id: jobID, createdBy: userID },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new CustomAPIError(
      `Not Found related with ${jobID}`,
      StatusCodes.NOT_FOUND
    );
  }
  res.status(StatusCodes.OK).json({ job });
};

const Deletejob = async (req, res) => {
  const userID = req.user.userID;
  const jobID = req.params.id;
  const job = await Job.findByIdAndDelete({ _id: jobID, createdBy: userID });
  if (!job) {
    throw new CustomAPIError(
      `Not Found related with ${jobID}`,
      StatusCodes.NOT_FOUND
    );
  }
  res.status(StatusCodes.OK).send("Deleted");
};

module.exports = { getAlljob, Singlejob, Updatejob, Deletejob, Createjob };
