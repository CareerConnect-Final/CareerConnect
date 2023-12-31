import * as yup from "yup";

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(8, "Username must be at least 8 characters long")
    .matches(
      /^[a-zA-Z0-9!\(\)\-\.\?\[\]\_\`\~\;\:\!\@\#\$\%\^\&\*\+\=]+$/,
      "Username can only contain letters, numbers, and the following special characters: !()-.[]_`~;:!@#$%^&*+="
    ),
  email: yup.string().email("invalid email").min(8).required("required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!\(\)\-\.\?\[\]\_\`\~\;\:\!\@\#\$\%\^\&\*\+\=])[a-zA-Z0-9!\(\)\-\.\?\[\]\_\`\~\;\:\!\@\#\$\%\^\&\*\+\=]{8,}$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one of the following special characters: !()-.[]_`~;:!@#$%^&*+="
    ),
});

export const loginSchema = yup.object().shape({
  username: yup.string().required("required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Invalid password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!\(\)\-\.\?\[\]\_\`\~\;\:\!\@\#\$\%\^\&\*\+\=])[a-zA-Z0-9!\(\)\-\.\?\[\]\_\`\~\;\:\!\@\#\$\%\^\&\*\+\=]{8,}$/,
      "Invalid password"
    ),
});
