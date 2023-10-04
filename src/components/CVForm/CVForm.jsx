// src/components/CVForm.js
import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";

const CVForm = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    languages: "",
    github_profile: "",
    linkedin_profile: "",
    skills: "",
    institute_name: "",
    graduation_year: "",
    degree_pursued: "",
    short_description: "",
  });

  const [cvData, setCvData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Generate PDF logic
    const pdfBytes = await generatePDF(formData);
    setCvData(pdfBytes);
  };

  const generatePDF = async (data) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    const { width, height } = page.getSize();
    const fontSize = 12;

    const content = `
      ${data.full_name}
      Email: ${data.email}
      Phone Number: ${data.phone_number}
      Languages: ${data.languages}
      GitHub: ${data.github_profile}
      LinkedIn: ${data.linkedin_profile}
      Skills: ${data.skills}
      Institute Name: ${data.institute_name}
      Graduation Year: ${data.graduation_year}
      Degree Pursued: ${data.degree_pursued}
      Short Description: ${data.short_description}
    `;

    // Remove curly braces and double quotations
    const formattedContent = content.replace(/[\{\}"]/g, "");

    page.drawText(formattedContent, { x: 50, y: height - 50, fontSize });

    return pdfDoc.save();
  };

  const downloadPdf = () => {
    if (cvData) {
      const blob = new Blob([cvData], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "cv.pdf";
      link.click();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          phone_number:
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
          />
        </label>
        <label>
          languages:
          <input
            type="text"
            name="languages"
            value={formData.languages}
            onChange={handleInputChange}
          />
        </label>
        <label>
          github_profile:
          <input
            type="text"
            name="github_profile"
            value={formData.github_profile}
            onChange={handleInputChange}
          />
        </label>
        <label>
          linkedin_profile:
          <input
            type="text"
            name="linkedin_profile"
            value={formData.linkedin_profile}
            onChange={handleInputChange}
          />
        </label>
        <label>
          skills:
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleInputChange}
          />
        </label>
        <label>
          institute_name:
          <input
            type="text"
            name="institute_name"
            value={formData.institute_name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          graduation_year:
          <input
            type="text"
            name="graduation_year"
            value={formData.graduation_year}
            onChange={handleInputChange}
          />
        </label>
        <label>
          degree_pursued:
          <input
            type="text"
            name="degree_pursued"
            value={formData.degree_pursued}
            onChange={handleInputChange}
          />
        </label>
        <label>
          short_description:
          <input
            type="text"
            name="short_description"
            value={formData.short_description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          degree_pursued:
          <input
            type="text"
            name="degree_pursued"
            value={formData.degree_pursued}
            onChange={handleInputChange}
          />
        </label>
        <label>
          degree_pursued:
          <input
            type="text"
            name="degree_pursued"
            value={formData.degree_pursued}
            onChange={handleInputChange}
          />
        </label>
        <label>
          degree_pursued:
          <input
            type="text"
            name="degree_pursued"
            value={formData.degree_pursued}
            onChange={handleInputChange}
          />
        </label>
        <label>
          degree_pursued:
          <input
            type="text"
            name="degree_pursued"
            value={formData.degree_pursued}
            onChange={handleInputChange}
          />
        </label>
        <label>
          degree_pursued:
          <input
            type="text"
            name="degree_pursued"
            value={formData.degree_pursued}
            onChange={handleInputChange}
          />
        </label>
        <label>
          degree_pursued:
          <input
            type="text"
            name="degree_pursued"
            value={formData.degree_pursued}
            onChange={handleInputChange}
          />
        </label>
        <label>
          degree_pursued:
          <input
            type="text"
            name="degree_pursued"
            value={formData.degree_pursued}
            onChange={handleInputChange}
          />
        </label>
        <label>
          degree_pursued:
          <input
            type="text"
            name="degree_pursued"
            value={formData.degree_pursued}
            onChange={handleInputChange}
          />
        </label>
        <label>
          degree_pursued:
          <input
            type="text"
            name="degree_pursued"
            value={formData.degree_pursued}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Generate CV</button>
      </form>

      {cvData && (
        <div>
          <h2>Generated CV</h2>
          <div
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px",
            }}
          >
            <p>Download your CV:</p>
            <button onClick={downloadPdf}>Download CV</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CVForm;
