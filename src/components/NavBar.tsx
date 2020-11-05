import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Flex, Link, Box, Button } from "@chakra-ui/core";

import colors from "../colors";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const [{ data, fetching }] = useMeQuery();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  let body;

  if (fetching) {
  } else if (data?.me?.username) {
    body = (
      <Box>
        <NextLink href="/">
          <Link color={colors.white}>{data.me.username}</Link>
        </NextLink>
        <Button
          isLoading={logoutFetching}
          ml={4}
          backgroundColor={"transparent"}
          color={colors.white}
          _hover={{ background: colors.lighterNav }}
          onClick={() => {
            logout();
            router.push("/login");
          }}
        >
          logout
        </Button>
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
