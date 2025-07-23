import { FormField } from "../data/formFields";
const DynamicForm: React.FC<{
  fields: FormField[];
  values: Record<string, any>;
  onChange: (name: string, value: any) => void;
}> = ({ fields, values, onChange }) => {
  const getIcon = (label: string) => {
    if (/new user/i.test(label)) return "👤";
    if (/modify/i.test(label)) return "✏️";
    if (/activate|enable/i.test(label)) return "✅";
    if (/de-activation|disable/i.test(label)) return "🚫";
    if (/password/i.test(label)) return "🔑";
    if (/unlock/i.test(label)) return "🔓";
    if (/bulk/i.test(label)) return "📦";
    return "🔹";
  };
  return (
    <>
      {fields.map((field) => {
        if (field.type === "text" || field.type === "autocomplete") {
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
        }
        if (field.type === "select") {
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
                {field.options?.map((opt: string) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          );
        }
        if (field.type === "checkbox") {
          const opts = field.options || [];
          const col1 = opts.slice(0, 4);
          const col2 = opts.slice(4, 8);
          return (
            <div key={field.name} style={{ marginBottom: "1.2rem" }}>
              <span className="checkboxGridLabel accessTypeLabel">
                {field.label}
                {field.required && " *"}
              </span>
              <div className="checkboxGrid">
                <div className="checkboxColumn">
                  {col1.map((opt: string) => (
                    <label className="checkboxItem" key={opt}>
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
                      <span className="checkboxIcon">{getIcon(opt)}</span>
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
                <div className="checkboxColumn">
                  {col2.map((opt: string) => (
                    <label className="checkboxItem" key={opt}>
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
                      <span className="checkboxIcon">{getIcon(opt)}</span>
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          );
        }
        return null;
      })}
    </>
  );
};

export default DynamicForm;
