import { string, object, number } from "yup"

export const BeamCreateLinkSchema = object().shape({
  recipient: string()
    .min(5, "Too short!")
    .max(3000, "Too long!")
    .required("Enter your wallet Principal ID")
})

export const BeamMeetingCreateLinkSchema = object().shape({
  recipient: string()
    .min(5, "Too short!")
    .max(3000, "Too long!")
    .required("Enter your wallet Principal ID"),
  meetingId: number()
    .positive("Must be positive number")
    .integer("Must be integer")
    .max(4294967295, "Too large!")
    .required("Enter your Meeting ID"),
  meetingPassword: string()
    .min(3, "Too short!")
    .max(100, "Too long!")
    .required("Enter your Meeting Password")
})
