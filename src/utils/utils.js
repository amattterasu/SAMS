import React from "react";
import Input from "../components/UI/Input/Input";

export const renderControls = formControls => {
    return Object.keys(formControls).map((controlName, index) => {
        const control = formControls[controlName]
        return (
            <React.Fragment key={controlName + index}>
                <Input
                    placeholder={control.value}
                    label={control.label}
                    value={control.value}
                    valid={control.valid}
                    shouldValidate={!!control.validation}
                    touched={control.touched}
                    errorMessage={control.errorMessage}
                    onChange={event => this.changeHandler(event.target.value, controlName)}
                />
            </React.Fragment>
        )
    })
}