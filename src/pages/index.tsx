import type { NextPage } from "next";
import { Flex, Button, Stack } from "@chakra-ui/react";
import { Input } from "../components/Form/input";

const SignIn: NextPage = () => {
  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        w="100%"
        maxW={360}
        bg="gray.800"
        p={8}
        borderRadius={8}
        flexDir="column"
      >
        <Stack spacing="4">
          <Input label="E-mail" name="email" type="email" />
          <Input label="Senha" name="password" type="password" />
          <Button type="submit" colorScheme="pink" size="lg">
            Entrar
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default SignIn;
