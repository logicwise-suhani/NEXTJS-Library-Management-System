export default function Form({ fields, values, errors,
    onChange, onSubmit, showLabels = false, children, submitButton }) {
    return (
        <form onSubmit={onSubmit}>
            {fields.map((field) => {
                switch (field.type) {
                    case "select":
                        return (
                            <div key={field.name}>
                                <select
                                    name={field.name}
                                    value={values[field.name]}
                                    onChange={onChange}
                                >
                                    <option value="">-- Select --</option>
                                    {field.options.map((values) => (
                                        <option key={values._id} value={values._id}>
                                            {values.name}
                                        </option>
                                    ))}
                                </select>
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
                        )

                    case "radio":
                        return (
                            field.options.map((option) => (
                                <label key={option} style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                    gap: "4px",
                                }}>
                                    {option}
                                    <input
                                        type="radio"
                                        value={option}
                                        onChange={onChange}
                                        name={field.name}
                                        checked={(field.defaultValue ?? values[field.name]) === option}
                                    />
                                </label>
                            ))
                        )

                    default:
                        return (
                            <div key={field.name}
                                style={{ marginBottom: "12px" }}>

                                {showLabels && (
                                    <label>
                                        {field.name === "login" ? "" : field.label || field.name} {" "}
                                    </label>
                                )}
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
                        )
                }

            }
                // (
                //     <div
                //         key={field.name}
                //         style={{ marginBottom: "12px" }}
                //     >
                //         {showLabels && (
                //             <label>
                //                 {field.name === "login" ? "" : field.label || field.name} {" "}
                //             </label>
                //         )}

                //         {field.type === "select" ? (
                //             <>
                //                 {field.options.map((option) => (
                //                     <label key={option} style={{
                //                         display: "inline-flex",
                //                         justifyContent: "flex-start",
                //                         alignItems: "center",
                //                         gap: "8px",
                //                     }}>
                //                         {option}
                //                         <input
                //                             type="radio"
                //                             value={option}
                //                             onChange={onChange}
                //                             name={field.name}
                //                             checked={(field.defaultValue ?? values[field.name]) === option}
                //                         />
                //                     </label>
                //                 ))}
                //                 <select
                //                     name={field.name}
                //                     value={values[field.name] ?? ""}
                //                     onChange={onChange}
                //                 >
                //                     {field.options.map((values) => (
                //                         <option key={values} value={values}>
                //                             {values}
                //                         </option>
                //                     ))}
                //                 </select>
                //             </>
                //         ) :
                //             <input
                //                 type={field.type || "text"}
                //                 name={field.name}
                //                 placeholder={field.placeholder}
                //                 value={values[field.name] ?? ""}
                //                 onChange={onChange}
                //                 style={{
                //                     border: errors[field.name]
                //                         ? "1px solid red"
                //                         : "1px solid #ccc",
                //                 }}
                //             />
                //         }


                //         {errors[field.name] && (
                //             <p style={{
                //                 color: "red",
                //                 fontSize: "12px",
                //             }}
                //             >
                //                 {errors[field.name]}
                //             </p>
                //         )}
                //     </div>
                // )
            )}
            {children}
            {submitButton}
        </form>
    );
}