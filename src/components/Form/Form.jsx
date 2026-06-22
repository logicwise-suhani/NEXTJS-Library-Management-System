export default function Form({ fields, values, errors,
    onChange, onSubmit, showLabels = false, children, submitButton }) {
    return (
        <form onSubmit={onSubmit}>
            {fields.map((field) => {
                let inputElement;

                switch (field.type) {
                    case "select":
                        inputElement = (
                            <select
                                name={field.name}
                                value={values[field.name]}
                                onChange={onChange}
                            >
                                <option value="">-- Select --</option>
                                {field.options.map((option) => (
                                    <option
                                        key={option._id || option}
                                        value={option._id || option}
                                    >
                                        {option.name || option}
                                    </option>
                                ))}
                            </select>
                        );
                        break;

                    case "radio":
                        inputElement = (
                            <>
                                {field.options.map((option) => (
                                    <label key={option}>
                                        {option} {" "}
                                        <input
                                            type="radio"
                                            value={option}
                                            name={field.name}
                                            onChange={onChange}
                                        /> {" "}
                                    </label>
                                ))}
                            </>
                        );
                        break;

                    default:
                        inputElement = (
                            <input
                                type={field.type || "text"}
                                name={field.name}
                                placeholder={field.placeholder}
                                value={values[field.name]}
                                onChange={onChange}
                                style={{
                                    border: errors[field.name]
                                        ? "1px solid red"
                                        : "1px solid #ccc",
                                }}
                            />
                        );
                }

                return (
                    <div key={field.name} style={{ marginBottom: "12px" }}>
                        {showLabels && (
                            <label>
                                {field.name === "login" ? "" : field.label || field.name}
                            </label>
                        )}

                        {inputElement}

                        {errors[field.name] && (
                            <p
                                style={{
                                    color: "red",
                                    fontSize: "12px",
                                }}
                            >
                                {errors[field.name]}
                            </p>
                        )}
                    </div>
                );
            })}
            {children}
            {submitButton}
        </form>
    );
}