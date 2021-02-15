import { Box, Heading, List, Text } from "@chakra-ui/react";
import { GetStaticProps, NextPage } from "next";
import React from "react";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { Image } from "../components/Image";
import { GallariesDocument, useGallariesQuery } from "../generated/graphql";
import { addApolloState, initializeApollo } from "../lib/apolloCilent";
import { getStrapiMedia } from "../lib/media";

type Props = {
  title: string;
};
const Index: NextPage<Props> = ({}) => {
  const { data } = useGallariesQuery();

  return (
    <Container height="100vh">
      <Hero title={"Gallaries"} />
      <Text>Drawing all images from gallries</Text>

      <List spacing={3} my={0}>
        {data?.gallaries?.map((item) => {
          if (!item) return null;
          return (
            <Box key={item.title}>
              <Heading>{item.title}</Heading>
              {item.images!.map((image) => {
                if (!image?.url) return null;
                return (
                  <Image
                    dimensions={[200, 200]}
                    key={image.url}
                    src={getStrapiMedia({ url: image.url })}
                    alt="cat"
                  />
                );
              })}
            </Box>
          );
        })}
      </List>

      <DarkModeSwitch />
      <Footer>
        <Text>Anything 🌈</Text>
      </Footer>
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GallariesDocument,
  });

  return addApolloState(apolloClient, {
    props: {
      title: "Hello",
    },
  });
};

export default Index;
