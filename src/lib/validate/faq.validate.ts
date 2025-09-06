import * as yup from "yup";

// ======================
// FAQ Form Validation Schema
// ======================
export const FaqAddEditFormValidation = yup.object({
  question: yup
    .string()
    .required("Question is required")
    .min(10, "Question must be at least 10 characters")
    .max(500, "Question must not exceed 500 characters"),
  answer: yup
    .string()
    .required("Answer is required")
    .min(20, "Answer must be at least 20 characters")
    .max(2000, "Answer must not exceed 2000 characters"),
  category: yup
    .string()
    .required("Category is required")
    .oneOf(["general", "about-us", "career"], "Category must be one of: general, about-us, career"),
  publish: yup
    .boolean()
    .required("Publish status is required"),
});
