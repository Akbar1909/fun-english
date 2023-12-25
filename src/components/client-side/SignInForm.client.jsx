import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { httpPostSignin } from "@/data/auth";
import SocialSignButtons from "./SocialSignButtons";
import PasswordField from "../PasswordField/PasswordField";

const SignInForm = () => {
  const router = useRouter();
  const [httpErrorMessage, setHttpErrorMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (values) => {
    try {
      const data = await signIn("credentials", { ...values, redirect: false });
      if (data.error) {
        setHttpErrorMessage("Something went wrong 😕");
      }
      router.replace("/");
      router.refresh();
    } catch (e) {
      console.log(e.message);
    }
  });

  return (
    <>
      {httpErrorMessage && (
        <Alert severity="error" sx={{ mb: "8px" }}>
          {httpErrorMessage}
        </Alert>
      )}
      {/* <SocialSignButtons /> */}
      <form onSubmit={onSubmit}>
        <Grid container rowSpacing="8px">
          <Grid item xs={12}>
            <TextField
              sx={{ width: "100%" }}
              size="small"
              helperText={errors?.email && "Email is required *"}
              error={Boolean(errors?.email)}
              placeholder="Email"
              type="email"
              {...register("email", { required: true })}
            />
          </Grid>
          <Grid item xs={12}>
            <PasswordField
              placeholder="Password"
              sx={{ width: "100%" }}
              size="small"
              helperText={errors?.password && "Password is required *"}
              error={Boolean(errors?.password)}
              {...register("password", { required: true })}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={onSubmit}
              variant="contained"
              size="large"
              sx={{ width: "100%" }}
            >
              Sign in
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default SignInForm;
