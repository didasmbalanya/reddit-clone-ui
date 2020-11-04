import React from "react";
import Link from "next/link";
import { Form, Formik } from "formik";
import { Box, Button } from "@chakra-ui/core";
import { useRouter } from "next/router";

import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({ options: values });
          if (response.data?.login?.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login?.user) {
            router.push("/");
          }
        }}
      >
        {({ handleChange, isSubmitting }) => {
          return (
            <Form>
              <InputField
                name="username"
                placeholder="enter your username"
                label="Username"
                onChange={handleChange}
              />

              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="password"
                  label="password"
                  type="password"
                  onChange={handleChange}
                />
              </Box>

              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                variantColor="teal"
              >
                Login
              </Button>
            </Form>
          );
        }}
      </Formik>
      <Box mt={10}>
        <Link href="/register">
          <a>new user? register...</a>
        </Link>
      </Box>
    </Wrapper>
  );
};

export default Login;
