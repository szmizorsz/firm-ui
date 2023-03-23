import Head from "next/head";
import { Inter } from "next/font/google";
import MenuBar from "@/components/menuBar";
import Footer from "@/components/footer";
import { Box, Grid, GridItem, VStack } from "@chakra-ui/react";
import Firms from "@/components/firms";

export default function Home() {
  return (
    <>
      <Head>
        <title>Firm: Build an internet-native company</title>
        <meta
          content="Start a company, issue shares and handle payments. All onchain, no paperwork."
          name="description"
        />
        <meta
          content="Firm: Build an internet-native company"
          property="og:title"
        />
        <meta
          content="Start a company, issue shares and handle payments. All onchain, no paperwork."
          property="og:description"
        />
        <meta
          content="https://uploads-ssl.webflow.com/6331d579cfc14f02a29e1f65/63fca893a8b0c1643ba627af_Frame%2033645.png"
          property="og:image"
        />
        <meta
          content="Firm: Build an internet-native company"
          property="twitter:title"
        />
        <meta
          content="Start a company, issue shares and handle payments. All onchain, no paperwork."
          property="twitter:description"
        />
        <meta
          content="https://uploads-ssl.webflow.com/6331d579cfc14f02a29e1f65/63fca893a8b0c1643ba627af_Frame%2033645.png"
          property="twitter:image"
        />
        <meta property="og:type" content="website" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link
          rel="icon"
          href="https://uploads-ssl.webflow.com/6331d579cfc14f02a29e1f65/6331d6c2e63fc2333b92f77f_f2.png"
        />
      </Head>
      <Box bg="gray.300">
        <MenuBar />
        <Grid templateColumns="repeat(6, 1fr)" gap={4} p={4} pb={8}>
          <GridItem colSpan={1} />
          <GridItem colSpan={4}>
            <Firms />
          </GridItem>
          <GridItem colSpan={1} />
        </Grid>
        <Footer />
      </Box>
    </>
  );
}
