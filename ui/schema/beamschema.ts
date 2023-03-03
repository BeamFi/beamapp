import { string, object } from "yup"

export const BeamCreateLinkSchema = object().shape({
  recipient: string()
    .min(5, "Too Short!")
    .max(3000, "Too Long!")
    .required("Enter your recipient")
})
