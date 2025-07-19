"use client";
import React, { useRef, useState } from "react";

// Types for uploaded files
interface UploadedFile {
  file: File;
  name: string;
}

export default function Home() {
  // State for each file
  const [questionPaper, setQuestionPaper] = useState<UploadedFile | null>(null);
  const [answerSheet, setAnswerSheet] = useState<UploadedFile | null>(null);
  const [answerKey, setAnswerKey] = useState<UploadedFile | null>(null);

  // File input refs for resetting
  const questionInputRef = useRef<HTMLInputElement>(null!);
  const answerInputRef = useRef<HTMLInputElement>(null!);
  const keyInputRef = useRef<HTMLInputElement>(null!);

  // Handlers
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<UploadedFile | null>>
  ) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setter({ file, name: file.name });
    } else {
      setter(null);
    }
  };

  // UI for file upload
  const renderFileUpload = (
    label: string,
    file: UploadedFile | null,
    setter: React.Dispatch<React.SetStateAction<UploadedFile | null>>,
    inputRef: React.RefObject<HTMLInputElement>,
    required: boolean = false
  ) => (
    <div className="flex flex-col gap-1">
      <label className="font-medium">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="file:mr-2 file:py-1 file:px-3 file:rounded file:border file:border-gray-300 file:bg-white file:text-sm file:font-medium file:shadow-sm file:hover:bg-gray-50"
        onChange={e => handleFileChange(e, setter)}
      />
      <span className="text-xs text-gray-500">PDF only</span>
      {file && (
        <div className="mt-1 text-xs text-green-700 truncate max-w-xs">
          Selected: {file.name}
        </div>
      )}
    </div>
  );

  // Next button enabled only if required files are present
  const canProceed = questionPaper && answerSheet;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center mb-2">Q&A PDF Evaluator</h1>
        <form className="flex flex-col gap-5" onSubmit={e => e.preventDefault()}>
          {renderFileUpload(
            "Question Paper (PDF)",
            questionPaper,
            setQuestionPaper,
            questionInputRef,
            true
          )}
          {renderFileUpload(
            "Answer Sheet (PDF)",
            answerSheet,
            setAnswerSheet,
            answerInputRef,
            true
          )}
          {renderFileUpload(
            "Answer Key (PDF, optional)",
            answerKey,
            setAnswerKey,
            keyInputRef,
            false
          )}
          <button
            type="button"
            className={`mt-4 py-2 px-4 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed`}
            disabled={!canProceed}
            // TODO: Add onClick to proceed to parsing step
          >
            Next
          </button>
        </form>
        {/* TODO: Add PDF parsing and preview logic here */}
      </div>
    </main>
  );
}
