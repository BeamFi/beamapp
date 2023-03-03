import { string, object } from "yup"

export const BeamCreateLinkSchema = object().shape({
  recipient: string()
    .min(5, "Too Short!")
    .max(3000, "Too Long!")
    .required("Enter your wallet Principal ID")
})

export const BeamMeetingCreateLinkSchema = object().shape({
  recipient: string()
    .min(5, "Too Short!")
    .max(3000, "Too Long!")
    .required("Enter your wallet Principal ID"),
  meetingNumber: string()
    .min(3, "Too Short!")
    .max(30, "Too Long!")
    .required("Enter your Meeting ID"),
  meetingPassword: string()
    .min(3, "Too Short!")
    .max(100, "Too Long!")
    .required("Enter your Meeting Password")
})
