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
    .min(2, "Category must be at least 2 characters")
    .max(100, "Category must not exceed 100 characters"),
  status: yup
    .string()
    .required("Status is required")
    .oneOf(["active", "inactive"], "Status must be either active or inactive"),
  priority: yup
    .number()
    .required("Priority is required")
    .min(1, "Priority must be at least 1")
    .max(100, "Priority must not exceed 100"),
});
