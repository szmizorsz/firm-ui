import * as React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";

function MenuBar() {
  return (
    <>
      <Box>
        <Container maxWidth="1600px">
          <Flex as="nav" align="center" justify="space-between" py={4}>
            <Link href="/" display="block">
              <Image
                src="https://uploads-ssl.webflow.com/6331d579cfc14f02a29e1f65/6336c6b3566e8027d35db3f6_logo_header.png"
                width="16"
                alt="logo"
              />
            </Link>

            <Button bg="#6485ff" _hover={{ bg: "#284779" }} color="white">
              Connect wallet
            </Button>
          </Flex>
        </Container>
      </Box>
    </>
  );
}

export default MenuBar;
