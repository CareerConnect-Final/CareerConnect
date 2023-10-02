import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth/authContext";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
  useMediaQuery,
  MenuItem,
  useTheme,
} from "@mui/material";
import ErrorAlert from "../../components/ErrorAlert/index";
import { Formik, Field } from "formik";
import { loginSchema, registerSchema } from "../../utils/Schemas";

function LoginPage(props) {
  const initialValuesRegister = {
    username: "",
    email: "",
    password: "",
    role: "",
  };

  const initialValuesLogin = {
    username: "",
    password: "",
  };

  const location = useLocation().pathname.slice(1);
  const [pageType, setPageType] = useState(location); //To turn '/register' to 'register'
  let isLogin = pageType === "login";
  let isRegister = pageType === "register";
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState([]);

  const { login, signup } = useContext(AuthContext); // or   const authContext = useContext(AuthContext); and to access the shared states ==> authContext.somthing

  const { palette } = useTheme();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  const registerHandler = async (values, onSubmitProps) => {
    setLoading(true);
    try {
      const { username, password, email, role } = values;

      const signUpResponse = await signup(username, password, role, email);
      onSubmitProps.resetForm();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const loginHandler = async (values, onSubmitProps) => {
    setLoading(true);
    try {
      const { username, password } = values;
      const loggedInResponse = await login(username, password);
      onSubmitProps.resetForm();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isRegister) await registerHandler(values, onSubmitProps);
    if (isLogin) await loginHandler(values, onSubmitProps);
  };
  /* */
  return (
    <>
      <Container maxWidth="sm">
        {" "}
        <Typography
          fontWeight="bold"
          textAlign="center"
          paddingTop="1rem"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/")}
          sx={{
            "&:hover": {
              color: palette.primary.light,
              cursor: "pointer",
            },
          }}
        >
          hi mom!
        </Typography>
        {globalError.length ? (
          <ErrorAlert errors={globalError}></ErrorAlert>
        ) : null}
        <Formik
          initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
          validationSchema={isLogin ? loginSchema : registerSchema}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            resetForm,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                padding="1.5rem"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  label="Username"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setGlobalError([]);
                    handleChange(e);
                  }}
                  value={values.username}
                  name="username"
                  error={Boolean(touched.username) && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
                {isRegister && (
                  <>
                    <TextField
                      label="Email"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        setGlobalError([]);
                        handleChange(e);
                      }}
                      value={values.email}
                      name="email"
                      error={Boolean(touched.email) && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <Field
                      as={TextField}
                      label="Role"
                      select
                      name="role"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.role}
                      error={Boolean(touched.role) && Boolean(errors.role)}
                      helperText={touched.role && errors.role}
                      sx={{ gridColumn: "span 4" }}
                      required
                    >
                      <MenuItem key={"user"} value={"user"}>
                        {"user"}
                      </MenuItem>
                      <MenuItem key={"company"} value={"company"}>
                        {"company"}
                      </MenuItem>
                    </Field>
                  </>
                )}
              </Box>

              {/* BUTTONS */}
              <Box padding="0 1.5rem 1.5rem 1.5rem">
                <Button
                  fullWidth
                  type="submit"
                  disabled={loading}
                  sx={{
                    m: "2rem 0",
                    p: "0.8rem",
                    backgroundColor: palette.primary.main,
                    color: palette.background.alt,
                    "&:hover": { color: palette.primary.main },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={22} />
                  ) : isLogin ? (
                    "LOGIN"
                  ) : (
                    "REGISTER"
                  )}
                </Button>
                <Typography
                  onClick={() => {
                    setGlobalError([]);
                    setPageType(isLogin ? "register" : "login");
                    navigate(isLogin ? "/register" : "/login");
                    resetForm();
                  }}
                  sx={{
                    textDecoration: "underline",
                    color: palette.primary.main,
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  {isLogin
                    ? "Don't have an account? Sign Up here."
                    : "Already have an account? Login here."}
                </Typography>
              </Box>
            </form>
          )}
        </Formik>
      </Container>
    </>
  );
}
export default LoginPage;
