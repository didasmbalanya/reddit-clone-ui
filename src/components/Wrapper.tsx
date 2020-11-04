import { Box } from "@chakra-ui/core";
import React from "react";

interface WrapperProps {
  variant?: "small" | "regular";
}

const size = {
  regular: "65vw",
  small: "32vw",
};

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    <Box mt={8} mx="auto" maxW={size[variant]} w="100%">
      {children}
    </Box>
  );
};
