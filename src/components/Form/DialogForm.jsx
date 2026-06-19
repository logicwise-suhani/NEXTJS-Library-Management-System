import Button from "../Button/Button";
import DropDown from "./dropDown";
import Form from "./Form";
import styles from "./form.module.css"

export default function DialogForm({ dialogRef, handleDialogClose, fields, values, errors, onChange, onSubmit, submitLabel,
    children, selectedType, setSelectedType, showDropDown = true, showCloseButton = true,
}) {

    return (
        <>
            <dialog ref={dialogRef} className={styles.dialogForm}>
                {showCloseButton && <div className={styles.closeMark}>
                    <Button onClick={handleDialogClose} label="❌" />
                </div>}

                <Form
                    fields={fields}
                    values={values}
                    errors={errors}
                    onChange={onChange}
                    onSubmit={onSubmit}
                    submitButton={
                        <Button type="submit" label={submitLabel} />}
                >
                    {children}
                </Form>
                {showDropDown && <DropDown value={selectedType} onChange={setSelectedType} />}
            </dialog>
        </>
    )
}