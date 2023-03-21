import React from "react";
import { Box, Flex, Link, Image, Container } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box bg="#19345c" py={4}>
      <Box width="100%" px={6}>
        <Flex justifyContent="space-between" alignItems="center">
          <Image
            src="https://uploads-ssl.webflow.com/6331d579cfc14f02a29e1f65/63f8eea544a84dea40ef3f4a_firm_complete.svg"
            alt="Logo"
            height="22px"
          />
          <Flex>
            <Link
              href="https://docs.firm.org/"
              target="_blank"
              color="white"
              mx={2}
            >
              Docs
            </Link>
            <Link
              href="https://twitter.com/firm"
              target="_blank"
              color="white"
              mx={2}
            >
              Twitter
            </Link>
            <Link
              href="https://github.com/firm-org"
              target="_blank"
              color="white"
              mx={2}
            >
              Github
            </Link>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Footer;
