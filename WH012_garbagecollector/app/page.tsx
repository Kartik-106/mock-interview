"use client";

import { Button } from "@/components/ui/button";
import { UploadButton } from "@uploadthing/react";
const { Uploader } = require("uploader");
import axios from "axios";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/ui/navbar";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const handleFileSelected = (e: any): void => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };
  // const uploader = Uploader({
  //   apiKey: "free",
  // });

  const options = {
    method: "POST",
    url: "https://resume-parsing-api2.p.rapidapi.com/processDocument",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "a153a9a044mshceeb2d2e39060a2p151ab3jsn4eb3661acc00",
      "X-RapidAPI-Host": "resume-parsing-api2.p.rapidapi.com",
    },
    data: {
      extractionDetails: {
        name: "Resume - Extraction",
        language: "English",
        fields: [
          {
            key: "personal_info",
            description: "personal information of the person",
            type: "object",
            properties: [
              {
                key: "name",
                description: "name of the person",
                example: "Alex Smith",
                type: "string",
              },
              {
                key: "email",
                description: "email of the person",
                example: "alex.smith@gmail.com",
                type: "string",
              },
              {
                key: "phone",
                description: "phone of the person",
                example: "0712 123 123",
                type: "string",
              },
              {
                key: "address",
                description: "address of the person",
                example: "Bucharest, Romania",
                type: "string",
              },
            ],
          },
          {
            key: "work_experience",
            description: "work experience of the person",
            type: "array",
            items: {
              type: "object",
              properties: [
                {
                  key: "title",
                  description: "title of the job",
                  example: "Software Engineer",
                  type: "string",
                },
                {
                  key: "start_date",
                  description: "start date of the job",
                  example: "2022",
                  type: "string",
                },
                {
                  key: "end_date",
                  description: "end date of the job",
                  example: "2023",
                  type: "string",
                },
                {
                  key: "company",
                  description: "company of the job",
                  example: "Fastapp Development",
                  type: "string",
                },
                {
                  key: "location",
                  description: "location of the job",
                  example: "Bucharest, Romania",
                  type: "string",
                },
                {
                  key: "description",
                  description: "description of the job",
                  example:
                    "Designing and implementing server-side logic to ensure high performance and responsiveness of applications.",
                  type: "string",
                },
              ],
            },
          },
          {
            key: "education",
            description: "school education of the person",
            type: "array",
            items: {
              type: "object",
              properties: [
                {
                  key: "title",
                  description: "title of the education",
                  example: "Master of Science in Computer Science",
                  type: "string",
                },
                {
                  key: "start_date",
                  description: "start date of the education",
                  example: "2022",
                  type: "string",
                },
                {
                  key: "end_date",
                  description: "end date of the education",
                  example: "2023",
                  type: "string",
                },
                {
                  key: "institute",
                  description: "institute of the education",
                  example: "Bucharest Academy of Economic Studies",
                  type: "string",
                },
                {
                  key: "location",
                  description: "location of the education",
                  example: "Bucharest, Romania",
                  type: "string",
                },
                {
                  key: "description",
                  description: "description of the education",
                  example:
                    "Advanced academic degree focusing on developing a deep understanding of theoretical foundations and practical applications of computer technology.",
                  type: "string",
                },
              ],
            },
          },
          {
            key: "languages",
            description: "languages spoken by the person",
            type: "array",
            items: {
              type: "string",
              example: "English",
            },
          },
          {
            key: "skills",
            description: "skills of the person",
            type: "array",
            items: {
              type: "string",
              example: "NodeJS",
            },
          },
          {
            key: "certificates",
            description: "certificates of the person",
            type: "array",
            items: {
              type: "string",
              example: "AWS Certified Developer - Associate",
            },
          },
        ],
      },
      file: "https://utfs.io/f/094e49b2-800c-4152-a994-c90137ac0869-wrp4la.pdf",
    },
  };

  const beginGeneralInetrview = async () => {
    try {
      const response = await axios.request(options);
      console.log(response.data);
      const interview = await fetch("/api/general-interview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skills: ["cpp", "java"],
          resumeUrl:
            "https://utfs.io/f/094e49b2-800c-4152-a994-c90137ac0869-wrp4la.pdf",
          jobDescription: jobDescription,
        }),
      });
      console.log(interview);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <UserButton afterSignOutUrl="/"></UserButton>
      <div className="flex justify-center items-center h-screen">
        <div className="space-y-5 p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-blue-500 text-white hover:bg-blue-700"
                >
                  Technical Interview
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="bg-blue-500 text-white">
                  Technical Interview
                </DialogHeader>
                <DialogDescription className="text-gray-700">
                  All the best for your interview. You will be given 40 minutes
                  for the question. If you find any difficulty, you can ask the
                  assistant for guidance.
                </DialogDescription>
                <DialogFooter>
                  <Button
                    type="submit"
                    className="bg-blue-500 text-white hover:bg-blue-700"
                  >
                    Start
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-blue-500 text-white hover:bg-blue-700"
                >
                  General Interview
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>General Interview</DialogHeader>
                <DialogDescription className="text-gray-700">
                  All the best for your interview.
                </DialogDescription>
                <div className="grid gap-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="resume" className="text-right">
                      Resume
                    </Label>
                    {/* <Input></Input */}
                    <UploadButton
                      endpoint="fileUploader"
                      onClientUploadComplete={(res: any) => {
                        // Do something with the response
                        console.log("Files: ", res);
                        setFile(res[0].url);
                      }}
                      onUploadError={(error: Error) => {
                        // Do something with the error.
                        alert(`ERROR! ${error.message}`);
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="job-description" className="text-right">
                      Job Description
                    </Label>
                    <textarea
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    className="bg-blue-500 text-white hover:bg-blue-700"
                    onClick={beginGeneralInetrview}
                  >
                    Start
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
