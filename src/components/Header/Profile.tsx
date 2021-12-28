import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Avner José Guimararães Ribeiro</Text>
          <Text color="gray.300" fontSize="small">
            avnerj.g.r@gmail.com
          </Text>
        </Box>
      )}
      <Avatar
        size="md"
        name="Avner José"
        src="https://github.com/avnerjose.png"
      />
    </Flex>
  );
}
