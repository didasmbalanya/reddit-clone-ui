import React from "react";
import NextLink from "next/link";
import { Flex, Link, Box } from "@chakra-ui/core";

import colors from "../colors";
import { useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  let body;

  if (fetching) {
  } else if (data?.me?.username) {
    body = (
      <Box>
        <NextLink href="/">
          <Link color={colors.white}>{data.me.username}</Link>
        </NextLink>
        <NextLink href="register">
          <Link ml={4} color={colors.white}>
            logout
          </Link>
        </NextLink>
      </Box>
    );
  } else {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={4} color={colors.white}>
            login
          </Link>
        </NextLink>
        <NextLink href="register">
          <Link color={colors.white}>register</Link>
        </NextLink>
      </>
    );
  }

  return (
    <Flex bg={colors.navBackground} p={5} flex="flex" alignItems="flex-end">
      <Box ml="auto">{body}</Box>
    </Flex>
  );
};
