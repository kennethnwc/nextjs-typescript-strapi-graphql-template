import { Box, Heading, List, Text } from "@chakra-ui/react";
import React from "react";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { Image } from "../components/Image";
import { Main } from "../components/Main";
import { useGallariesQuery } from "../generated/graphql";
import { getStrapiMedia } from "../lib/media";

const Index = () => {
  const { data } = useGallariesQuery();

  return (
    <Container height="100vh">
      <Hero title={"Gallaries"} />
      <Text>Drawing all images from gallries</Text>

      <List spacing={3} my={0}>
        {data?.gallaries?.map((item) => {
          console.log(item);
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

export default Index;
