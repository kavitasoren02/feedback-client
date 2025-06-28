import { getIn } from "formik";
import { InputWithLabel } from "../../components/comman/Input-with-label";
import { Checkbox } from "../../components/ui/checkbox";
import { Label } from "../../components/ui/label";
import { RadioGroup, RadioItem } from "../../components/ui/radio";

const PreviewForm = ({ fields = [], formik, isDisabled = true, isFormData = false }) => {
    return (
        <>
            {fields.map((field, idx) => {
                const key = isFormData ? `form_data.${field.name}` : field.name;
                const value = getIn(formik.values, key) || "";
                const error = getIn(formik.errors, key);
                const touched = getIn(formik.touched, key);

                if (field.type === "checkbox") {
                    return (
                        <RadioGroup key={field.id}>
                            <Label required={field.required}>{field.label}</Label>
                            {field.options.map((option, index) => (
                                <Checkbox
                                    key={`${field.id}-${index}`}
                                    value={option}
                                    id={`${field.id}-${index}`}
                                    disabled={isDisabled}
                                    checked={value?.includes?.(option)}s
                                    name={key}
                                    onChange = {formik.handleChange}
                                    onBlur = {formik.handleBlur}
                                >
                                    {option}
                                </Checkbox>
                            ))}
                            {touched && error && <p className="text-red-500 text-sm">{error}</p>}
                        </RadioGroup>
                    );
                }

                if (field.type === "radio") {
                    return (
                        <RadioGroup
                            key={field.id}
                            value={value}
                            onValueChange={(val) => formik.setFieldValue(key, val)}
                        >
                            <Label required={field.required}>{field.label}</Label>
                            {field.options.map((option, index) => (
                                <div key={`${field.id}-${index}`} className="flex gap-4">
                                    <RadioItem 
                                        {...field}
                                        name={key}
                                        value={option}
                                        id={`${field.id}-${index}`}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <label htmlFor={`${field.id}-${index}`}>{option}</label>
                                </div>
                            ))}
                            {touched && error && <p className="text-red-500 text-sm">{error}</p>}
                        </RadioGroup>
                    );
                }

                return (
                    <InputWithLabel
                        key={field.id}
                        {...field}
                        name={key}
                        value={value}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={isDisabled}
                        error={touched && error ? error : null}
                    />
                );
            })}
        </>
    );
};

export default PreviewForm;