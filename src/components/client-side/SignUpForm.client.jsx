import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import Alert from "@mui/material/Alert";
import { useMutation } from "@tanstack/react-query";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDebounce } from "react-use";
import { useForm } from "react-hook-form";
import { httpPostCheckUsernameExist, httpPostSignup } from "@/data/auth";
import SocialSignButtons from "./SocialSignButtons";

const SignUpForm = () => {
  const [debouncedValue, setDebouncedValue] = useState("");
  const [httpErrorMessage, setHttpErrorMessage] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const checkUsernameMutate = useMutation({
    mutationFn: httpPostCheckUsernameExist,
    mutationKey: ["check-username-exist"],
  });

  const signupMutate = useMutation({
    mutationFn: httpPostSignup,
    mutationKey: ["sign-up"],
  });

  const username = watch("username");

  const [, _] = useDebounce(() => setDebouncedValue(username), 1000, [
    username,
  ]);

  useEffect(() => {
    if (!debouncedValue) {
      return;
    }

    checkUsernameMutate.mutate({ username: debouncedValue });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const onSubmit = handleSubmit(async (values) => {
    try {
      const response = await signupMutate.mutateAsync(values);

      if (response?.status === 201) {
        const r = await signIn("credentials", {
          email: values.email,
          password: values.password,
        });
      }
    } catch (e) {
      setHttpErrorMessage(e?.response?.data?.message);
    }
  });

  return (
    <>
      {/* <SocialSignButtons /> */}
      {httpErrorMessage && (
        <Alert severity="error" sx={{ mb: "8px" }}>
          {httpErrorMessage}
        </Alert>
      )}
      <form onSubmit={onSubmit}>
        <Grid container rowSpacing="8px">
          <Grid item xs={12}>
            <TextField
              sx={[
                { width: "100%" },
                checkUsernameMutate.isPending && {
                  "& .MuiFormHelperText-root": {
                    color: (theme) => theme.palette.warning.main,
                  },
                },
              ]}
              size="small"
              placeholder="Username"
              error={Boolean(errors?.username)}
              helperText={
                checkUsernameMutate.isPending
                  ? "Checking the username availability..."
                  : checkUsernameMutate.error
                  ? `username is taken`
                  : errors?.username && "Username is required"
              }
              {...register("username", { required: true })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              sx={{ width: "100%" }}
              size="small"
              placeholder="Email"
              helperText={Boolean(errors?.email) && "Email is required"}
              error={Boolean(errors?.email)}
              {...register("email", { required: true })}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              placeholder="Password"
              sx={{ width: "100%" }}
              size="small"
              helperText={Boolean(errors.password) && "Password is required"}
              error={Boolean(errors.password)}
              {...register("password", { required: true })}
              type="password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={onSubmit}
              variant="contained"
              size="large"
              sx={{ width: "100%" }}
            >
              {signupMutate.isPending ? "..." : "Sign up"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default SignUpForm;
