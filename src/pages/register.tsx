import React from "react";
import NextLink from "next/link";
import { Form, Formik } from "formik";
import { Box, Button, Link } from "@chakra-ui/core";
import { useRouter } from "next/router";

import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);
          if (response.data?.register?.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register?.user) {
            router.push("/");
          }
        }}
      >
        {({ handleChange, isSubmitting }) => {
          return (
            <Form>
              <InputField
                name="username"
                placeholder="enter a unique username"
                label="Username"
                inputMode="email"
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
                Register
              </Button>
            </Form>
          );
        }}
      </Formik>
      <Box mt={10}>
        <NextLink href="/login">
          <Link>already have an account? click here</Link>
        </NextLink>
      </Box>
    </Wrapper>
  );
};

export default Register;
