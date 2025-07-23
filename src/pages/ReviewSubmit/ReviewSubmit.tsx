import React from "react";
import { useFormContext } from "../../context/FormContext";

const ReviewSubmit: React.FC = () => {
  const { data } = useFormContext();

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "2rem" }}>
      <h2>Review & Submit</h2>

      <div>
        <strong>Access Request Types:</strong>
        <ul>
          {data.accessTypes.map((type) => (
            <li key={type}>{type}</li>
          ))}
        </ul>
      </div>

      <div>
        <strong>Training Status:</strong> {data.trainingStatus}
      </div>

      <div>
        <strong>Equipment ID:</strong> {data.equipmentId}
      </div>

      <div>
        <strong>Application Name:</strong> {data.appName}
      </div>

      <div>
        <strong>Role:</strong> {data.role}
      </div>

      <div>
        <strong>Version:</strong> {data.version}
      </div>

      <button style={{ marginTop: "2rem" }}>Submit Request</button>
    </div>
  );
};

export default ReviewSubmit;

