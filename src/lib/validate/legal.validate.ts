import * as yup from "yup";

export const LegalFormValidation = yup.object({
  type: yup
    .string()
    .oneOf(["privacy", "terms", "license"], "Please select a valid document type")
    .required("Document type is required"),
  title: yup
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must not exceed 200 characters")
    .required("Title is required"),
  content: yup
    .string()
    .min(10, "Content must be at least 10 characters")
    .required("Content is required"),
  version: yup
    .string()
    .required("Version is required"),
  isActive: yup
    .boolean()
    .required("Active status is required"),
});
