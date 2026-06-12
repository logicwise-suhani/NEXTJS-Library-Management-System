import { fields } from "./formFields"

export default function useForm(handleSubmit) {

    return (
        <>
            <form onSubmit={handleSubmit}>
                {fields.map((field) => (
                    <div key={field.name}>
                        <input
                            name={field.name}
                            placeholder={field.placeholder}
                        />

                    </div>
                ))}
            </form>
        </>
    )
}