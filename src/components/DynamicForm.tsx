import React from "react";
import { FormField } from "../data/formFields";

interface DynamicFormProps {
  fields: FormField[];
  values: Record<string, any>;
  onChange: (name: string, value: any) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  fields,
  values,
  onChange,
}) => {
  return (
    <>
      {fields.map((field) => {
        switch (field.type) {
          case "text":
          case "autocomplete":
            return (
              <div key={field.name} style={{ marginBottom: "1.2rem" }}>
                <label>
                  {field.label}
                  {field.required && " *"}
                </label>
                <input
                  type="text"
                  name={field.name}
                  value={values[field.name] || ""}
                  placeholder={field.placeholder}
                  required={field.required}
                  autoComplete={field.autoSuggest ? "on" : "off"}
                  onChange={(e) => onChange(field.name, e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.7rem 1rem",
                    borderRadius: 7,
                    border: "1.5px solid #cfd8dc",
                  }}
                />
              </div>
            );
          case "select":
            return (
              <div key={field.name} style={{ marginBottom: "1.2rem" }}>
                <label>
                  {field.label}
                  {field.required && " *"}
                </label>
                <select
                  name={field.name}
                  value={values[field.name] || ""}
                  required={field.required}
                  onChange={(e) => onChange(field.name, e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.7rem 1rem",
                    borderRadius: 7,
                    border: "1.5px solid #cfd8dc",
                  }}
                >
                  <option value="">Select...</option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            );
          case "checkbox":
            return (
              <div key={field.name} style={{ marginBottom: "1.2rem" }}>
                <label>
                  {field.label}
                  {field.required && " *"}
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {field.options?.map((opt) => (
                    <label key={opt} style={{ marginRight: 12 }}>
                      <input
                        type="checkbox"
                        checked={
                          Array.isArray(values[field.name]) &&
                          values[field.name].includes(opt)
                        }
                        onChange={() => {
                          const arr = Array.isArray(values[field.name])
                            ? [...values[field.name]]
                            : [];
                          if (arr.includes(opt)) {
                            onChange(
                              field.name,
                              arr.filter((v) => v !== opt)
                            );
                          } else {
                            onChange(field.name, [...arr, opt]);
                          }
                        }}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            );
          default:
            return null;
        }
      })}
    </>
  );
};

export default DynamicForm;
