import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // console.log(req.json());
    const { skills, resumeUrl, jobDescription } = await req.json();

    const profile = await currentProfile();
    console.log(skills, resumeUrl, jobDescription);
    if (!profile) {
      return new NextResponse("unauth", { status: 401 });
    }

    const interview = await db.generalInterview.create({
      data: {
        userId: profile.id,
        skills: skills,
        resumeUrl: resumeUrl,
        jobDescription: jobDescription,
      },
    });
    console.log("here");
    console.log(interview.id);
    return NextResponse.json("here");
  } catch (error) {
    console.log("Server Api Error - general Interview POST");
    console.log(error);
    return new NextResponse("server error");
  }
}

export async function PUT(req: Request) {
  try {
    const { recordingUrl, textTranscribe, review, suggestions, score, id } =
      await req.json();
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("unauth", { status: 401 });
    }

    const interview = await db.generalInterview.update({
      where: {
        id: id,
      },
      data: {
        recordingUrl: recordingUrl,
        textTranscribe: textTranscribe,
        review: review,
        suggestions: suggestions,
        score: score,
      },
    });
    return NextResponse.json(interview);
  } catch (error) {
    console.log("error");
  }
}
