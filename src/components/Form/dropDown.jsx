import { allFields } from "@/utils/formFields";

export default function DropDown({ onChange, value }) {
    return (
        <>
            <select value={value} onChange={(e) => onChange(e.target.value)}>
                {Object.keys(allFields).map((field) => (
                    <option key={field} value={field}>{field}</option>
                ))}
            </select>
        </>
    )
}