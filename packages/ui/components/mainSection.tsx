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

function MainSection() {
  return (
    <VStack>
      {/* Rest of the sections */}
      <Container maxW="container.xl">
        {/* Hero Section */}
        {/* ... */}

        {/* Section 1 */}
        <Box py="10">
          <Heading as="h1" size="xl" mb="6">
            Why are we doing this
          </Heading>
          <Heading as="h2" size="lg" mb="6" fontWeight="normal">
            We believe companies are a fantastic organization form but they are
            due for a fundamental upgrade
          </Heading>
          {/* Slider */}
        </Box>

        {/* Section 2 */}
        <Box py="10">
          <Heading as="h1" size="xl" mb="6">
            How it works
          </Heading>
          <Heading as="h2" size="lg" mb="6" fontWeight="normal">
            We super-charge your Safe with powerful company features
          </Heading>
          {/* Steps */}
        </Box>

        {/* Section 3 */}
        <Box py="10">
          <Heading as="h1" size="xl" mb="6">
            What you can build
          </Heading>
          <Heading as="h2" size="lg" mb="6" fontWeight="normal">
            With just a few lines of code
          </Heading>
          {/* Examples */}
        </Box>

        {/* Section 4 */}
        <Box py="10">
          <Heading as="h1" size="xl" mb="6">
            Start now
          </Heading>
          <Heading as="h2" size="lg" mb="6" fontWeight="normal">
            Use our tools to build the company you ve always wanted
          </Heading>
          {/* Buttons */}
        </Box>
      </Container>
    </VStack>
  );
}

export default MainSection;
