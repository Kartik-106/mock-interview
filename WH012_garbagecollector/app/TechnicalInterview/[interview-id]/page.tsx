"use client";
import React from "react";
import axios from "axios";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Navbar from "@/components/ui/navbar";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { encode as base64_encode, decode } from "base-64";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export default function ResizableDemo() {
  const testcases = {
    testcases: [
      {
        id: 1,
        input: "abaaab",
        output: "1",
        answer: "",
      },
      {
        id: 2,
        input: "abaabababab",
        output: "1",
      },
      {
        id: 3,
        input: "ababbbabbababa",
        output: "3",
      },
    ],
  };

  const [code, setCode] = useState("");
  const [executionCode, setExecutionCode] = useState(0);
  const [stdout, setStdout] = useState(testcases["testcases"]);

  const [language, setlanguage] = useState("cpp");

  function handleEditorChange(value: any, event: any) {
    console.log(base64_encode(value));
    setCode(value);
    // console.log(decode("NQo="));
    // console.log(code);
  }

  const handleRun = async () => {
    const base64Code = base64_encode(code);
    console.log(code);

    testcases["testcases"].map(async (tcs, key = tcs.id) => {
      const options = {
        method: "POST",
        url: "https://judge0-ce.p.rapidapi.com/submissions",
        params: {
          base64_encoded: "true",
          wait: "true",
        },
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key":
            "a153a9a044mshceeb2d2e39060a2p151ab3jsn4eb3661acc00",
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
        data: {
          language_id: 52,
          source_code: base64Code,
          stdin: base64_encode(tcs.input),
          expected_output: base64_encode(tcs.output),
        },
      };

      try {
        const response = await axios.request(options);
        console.log(response.data);
        setExecutionCode(response.data.status.id);
        let tscs = testcases["testcases"];
        tscs.map((tcs2) => {
          if (tcs.id == tcs2.id) {
            tcs2.answer = decode(response.data.stdout);
          }
        });
        setStdout(tscs);
      } catch (error) {
        console.error(error);
      }
    });
  };

  return (
    <div>
      <Navbar />
      <div style={{ width: "100vw", height: "calc(100vh - 64px)" }}>
        <ResizablePanelGroup
          direction="horizontal"
          className="max-w-full h-full rounded-lg border"
          style={{ width: "100%", height: "100%", alignItems: "stretch" }}
        >
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup
              direction="vertical"
              style={{ width: "100%", height: "100%" }}
            >
              <ResizablePanel defaultSize={50}>
                <div className="p-6">
                  <h1 className="text-2xl">Problem</h1>
                  <div className="text-left">
                    <Card className="border-none">
                      <CardHeader>
                        <CardTitle className="text-xl">
                          Pallindrome Partiting
                        </CardTitle>
                        <CardDescription>Hard</CardDescription>
                      </CardHeader>
                      <CardContent className="text-base">
                        Given a string str, a partitioning of the string is a
                        palindrome partitioning if every sub-string of the
                        partition is a palindrome. Determine the fewest cuts
                        needed for palindrome partitioning of the given string.
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Example</CardTitle>
                        <CardContent>
                          Input: str = "ababbbabbababa" <br></br>
                          Output: 3
                        </CardContent>
                      </CardHeader>
                    </Card>
                    <Card className="border-none">
                      <CardHeader>
                        <CardTitle className="text-xl">Constraints</CardTitle>
                        <CardContent>1 ≤ length of str ≤ 500</CardContent>
                      </CardHeader>
                    </Card>
                  </div>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={50}>
                <div className="p-6">
                  <span className="font-semibold">Assistant</span> <br></br>
                  <Button>How may i help you</Button>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>

          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup
              direction="vertical"
              style={{ width: "100%", height: "100%" }}
            >
              <ResizablePanel defaultSize={50}>
                <div className="p-6">
                  <span className="font-semibold p-6">Code</span>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild p-6>
                      <Button variant="ghost">{language}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup
                        value={language}
                        onValueChange={setlanguage}
                      >
                        <DropdownMenuRadioItem value="cpp">
                          C++
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="java">
                          Java
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="python">
                          Python
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Editor
                    height="90vh"
                    defaultLanguage="cpp"
                    defaultValue="// some comment"
                    language={language}
                    onChange={handleEditorChange}
                  />
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={50}>
                <div className="p-6">
                  <span className="font-semibold">Test Cases</span>

                  <Tabs defaultValue="account" className="">
                    <TabsList className="w-full justify-between">
                      <div>
                        {testcases["testcases"].map((tcs) => {
                          return (
                            <TabsTrigger value={tcs.id.toString()} key={tcs.id}>
                              Testcase {tcs.id}
                            </TabsTrigger>
                          );
                        })}
                      </div>
                      <div>
                        <Button onClick={handleRun}> Run</Button>
                        <Button>Submit</Button>
                      </div>
                    </TabsList>
                    {testcases["testcases"].map((tcs) => {
                      return (
                        <TabsContent value={tcs.id.toString()} key={tcs.id}>
                          <span className="font-size:18px">
                            <strong>Input:</strong> str = "{tcs.input}"<br></br>
                            <strong>Expected Output:</strong> {tcs.output}
                            <br></br>
                            {executionCode == 3 ? (
                              <>
                                <strong>Output: </strong>
                                {tcs.answer}
                                {console.log(tcs.answer)}
                              </>
                            ) : (
                              <></>
                            )}
                          </span>
                        </TabsContent>
                      );
                    })}
                  </Tabs>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
