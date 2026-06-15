export default function Form({ fields, values, errors,
    onChange, onSubmit, showLabels = false, children, submitButton }) {
    return (
        <form onSubmit={onSubmit}>
            {fields.map((field) => (
                <div
                    key={field.name}
                    style={{ marginBottom: "12px" }}
                >
                    {showLabels && (
                        <label>
                            {field.label || field.name} {" "}
                        </label>
                    )}

                    <input
                        type={field.type || "text"}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={values[field.name] ?? ""}
                        onChange={onChange}
                        style={{
                            border: errors[field.name]
                                ? "1px solid red"
                                : "1px solid #ccc",
                        }}
                    />

                    {errors[field.name] && (
                        <p style={{
                            color: "red",
                            fontSize: "12px",
                        }}
                        >
                            {errors[field.name]}
                        </p>
                    )}
                </div>
            ))}
            {children}
            {submitButton}
        </form>
    );
}