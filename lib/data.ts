"use server";
import { SearchParamsProps } from "@/app/(root)/(dashboard)/page";
import { Job, User } from "./models";
import { connectToDB } from "./utils";

export interface UserQuery {
  gender?: string;
  age?: {
    $gte?: number;
    $lte?: number;
  };
  expectedSalary?: {
    $gte?: number;
    $lte?: number;
  };
  region?: string;
  checked?: string;
  telegramId?: number;
}

interface JobData {
  name: string;
  description: string;
  salary: string;
  city: string;
  region: string;
  responsibilities: string[];
  bonuses: string[];
}

export const fetchAllUsers = async (searchParams: SearchParamsProps) => {
  try {
    await connectToDB();
    const query: UserQuery = {};

    if (searchParams.gender) {
      query.gender = searchParams.gender;
    }
    if (searchParams.ageFrom || searchParams.ageTo) {
      query.age = {};
      if (searchParams.ageFrom) query.age.$gte = searchParams.ageFrom;
      if (searchParams.ageTo) query.age.$lte = searchParams.ageTo;
    }
    if (searchParams.salaryFrom || searchParams.salaryTo) {
      query.expectedSalary = {};
      if (searchParams.salaryFrom)
        query.expectedSalary.$gte = searchParams.salaryFrom;
      if (searchParams.salaryTo)
        query.expectedSalary.$lte = searchParams.salaryTo;
    }
    if (searchParams.region) {
      query.region = searchParams.region;
    }
    if (searchParams.checked) {
      query.checked = searchParams.checked;
    }
    if (searchParams.telegramId) {
      query.telegramId = searchParams.telegramId;
    }

    const sort: Record<string, 1 | -1> = {};
    sort.checked = -1;
    if (searchParams.sortBy) {
      if (searchParams.sortBy === "name_asc") sort.name = 1;
      else if (searchParams.sortBy === "name_desc") sort.name = -1;
      else if (searchParams.sortBy === "date_asc") sort.createdAt = 1;
      else if (searchParams.sortBy === "date_desc") sort.createdAt = -1;
    }

    const users = await User.find(query).sort(sort);
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
};

export async function fetchAllJobs(searchParams: SearchParamsProps) {
  try {
    await connectToDB();

    let query = Job.find();

    if (searchParams.search) {
      query = query.where("name", new RegExp(searchParams.search, "i"));
    }

    if (searchParams.salaryFrom) {
      query = query
        .where("salary")
        .regex(new RegExp(`^[0-9]+$`))
        .gte(searchParams.salaryFrom);
    }
    if (searchParams.salaryTo) {
      query = query
        .where("salary")
        .regex(new RegExp(`^[0-9]+$`))
        .lte(searchParams.salaryTo);
    }
    if (searchParams.region) {
      query = query.where("region", searchParams.region);
    }

    const sortField = searchParams.sortBy?.split("_")[0] || "createdAt";
    const sortDirection = searchParams.sortBy?.includes("desc") ? -1 : 1;

    return query.sort({ [sortField]: sortDirection, createdAt: -1 }).exec();
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}

export async function createJob(jobData: JobData) {
  try {
    const newJob = new Job({
      name: jobData.name,
      description: jobData.description,
      salary: jobData.salary,
      city: jobData.city,
      region: jobData.region,
      responsibilities: jobData.responsibilities,
      bonuses: jobData.bonuses,
    });
    const savedJob = await newJob.save();

    return {
      id: savedJob._id.toString(),
      name: savedJob.name,
      description: savedJob.description,
      salary: savedJob.salary,
      city: savedJob.city,
      region: savedJob.region,
      responsibilities: savedJob.responsibilities,
      bonuses: savedJob.bonuses,
    };
  } catch (error) {
    console.error("Failed to create job:", error);
    throw error;
  }
}

export async function fetchJobById(jobId: string) {
  try {
    await connectToDB();
    const job = await Job.findById(jobId);

    if (!job) {
      console.log("Job not found with id:", jobId);
      return null;
    }

    return {
      id: job._id.toString(),
      name: job.name,
      description: job.description,
      salary: job.salary,
      city: job.city,
      region: job.region,
      responsibilities: job.responsibilities,
      bonuses: job.bonuses,
    };
  } catch (error) {
    console.error("Failed to fetch job by id:", error);
    throw new Error("Failed to fetch job");
  }
}

export async function updateJob(jobId: string, jobData: JobData) {
  try {
    await connectToDB();
    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      {
        $set: {
          ...jobData,
        },
      },
      { new: true }
    );

    if (!updatedJob) {
      console.log("Job not found with id:", jobId);
      return null;
    }

    return {
      id: updatedJob._id.toString(),
      name: updatedJob.name,
      description: updatedJob.description,
      salary: updatedJob.salary,
      city: updatedJob.city,
      region: updatedJob.region,
      responsibilities: updatedJob.responsibilities,
      bonuses: updatedJob.bonuses,
    };
  } catch (error) {
    console.error("Failed to update job:", error);
    throw new Error("Failed to update job");
  }
}

export const fetchUsers = async () => {
  try {
    connectToDB();
    const user = await User.find();

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch users");
  }
};

export const deleteUser = async (id: string) => {
  try {
    connectToDB();
    const user = await User.findByIdAndDelete(id);
    return user ? user.toObject() : null;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete user");
  }
};

export const deleteJob = async (jobId: string) => {
  try {
    connectToDB();
    await Job.deleteOne({ _id: jobId });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete user");
  }
};

export const updateUserStatus = async (id: string, status: string) => {
  try {
    connectToDB();
    const user = await User.findByIdAndUpdate(
      id,
      { checked: status },
      { new: true }
    );

    if (!user) return null;

    const plainUser = user.toObject();
    plainUser.id = plainUser._id.toString();
    delete plainUser._id;
    delete plainUser.__v;

    return plainUser;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update user status");
  }
};
