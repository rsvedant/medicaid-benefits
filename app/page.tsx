import React, { useState } from "react"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

const fieldTemplates: Record<string, string[]> = {
  "Utility Bill": [
    "Account Number",
    "Billing Date",
    "Due Date",
    "Amount Due",
    "Service Address"
  ],
  "Payslip": [
    "Employee Name",
    "Employee ID",
    "Pay Period",
    "Gross Salary",
    "Deductions",
    "Net Pay"
  ],
  "ID Card": [
    "Full Name",
    "ID Number",
    "Date of Birth",
    "Expiry Date",
    "Nationality"
  ]
}

const classifyDocumentPrompt = `
You are an expert document classifier. Given the following document text, classify the document type as one of:
- Utility Bill
- Payslip
- ID Card
- Unknown

Respond ONLY with the document type.
`

const fallbackPrompt = `
You are a document parser. Extract any meaningful information (names, dates, amounts, IDs) from the document text below. Respond in JSON.
`

export default function App() {
  const [extractedData, setExtractedData] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Convert file to base64 string
  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })

  // Send prompt + base64 to Gemini
  async function callGemini(prompt: string, base64Data: string, fileType: string) {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" })
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: fileType,
          data: base64Data.split(",")[1] // Remove prefix `data:application/pdf;base64,`
        }
      }
    ])
    const response = await result.response
    return response.text()
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setExtractedData("")
    setLoading(true)

    try {
      const file = e.target.files?.[0]
      if (!file) throw new Error("No file selected")

      const base64Data = await fileToBase64(file)

      // 1. Classify document type
      const docTypeRaw = await callGemini(
        classifyDocumentPrompt,
        base64Data,
        file.type
      )
      const docType = docTypeRaw.trim()

      // 2. Build extraction prompt based on doc type
      let extractionPrompt: string
      if (docType in fieldTemplates) {
        extractionPrompt = `
You are a document parser. The document is a ${docType}.
Extract the following fields in JSON format:
${fieldTemplates[docType].join(", ")}
Here is the document text:
`
      } else {
        extractionPrompt = fallbackPrompt
      }

      // 3. Extract fields
      const extracted = await callGemini(extractionPrompt, base64Data, file.type)

      setExtractedData(
        `Document Type Detected: ${docType}\n\nExtracted Data:\n${extracted}`
      )
    } catch (err: any) {
      setError(err.message || "Failed to process the document.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white p-8 rounded-xl shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-700">
          Multi-Document Extractor
        </h1>

        <input
          type="file"
          accept=".pdf"
          onChange={handleFileUpload}
          className="file:bg-blue-600 file:text-white file:px-5 file:py-3 file:rounded-lg file:cursor-pointer hover:file:bg-blue-700"
        />

        {loading && (
          <p className="text-center text-blue-600 font-semibold animate-pulse">
            Processing document, please wait...
          </p>
        )}

        {error && (
          <p className="text-center text-red-600 font-semibold">{error}</p>
        )}

        {extractedData && (
          <pre className="bg-gray-100 rounded-lg p-4 overflow-x-auto whitespace-pre-wrap text-sm font-mono">
            {extractedData}
          </pre>
        )}
      </div>
    </div>
  )
}