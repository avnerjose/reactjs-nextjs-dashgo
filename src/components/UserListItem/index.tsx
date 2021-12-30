import {
  Box,
  Button,
  Checkbox,
  Icon,
  Link,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { RiPencilLine } from "react-icons/ri";

type User = {
  id: string;
  name: string;
  email: string;
  created_at: string;
};

type UserListItemProps = {
  user: User;
  isWideVersion: boolean;
  handlePrefetchUser: (id: string) => void;
};

export function UserListItem({
  isWideVersion,
  user: { id, name, email, created_at },
  handlePrefetchUser,
}: UserListItemProps) {
  return (
    <Tr key={id}>
      <Td px={["2", "4", "6"]}>
        <Checkbox colorScheme="pink" />
      </Td>
      <Td>
        <Box>
          <Link color="purple.500" onMouseEnter={() => handlePrefetchUser(id)}>
            <Text fontWeight="bold">{name}</Text>
          </Link>
          <Text fontSize="small" color="gray.300">
            {email}
          </Text>
        </Box>
      </Td>
      {isWideVersion && <Td>{created_at}</Td>}
      <Td p={["0", "3"]}>
        <Button
          cursor="pointer"
          as="a"
          size="sm"
          colorScheme="purple"
          leftIcon={<Icon as={RiPencilLine} />}
          variant="ghost"
          p={1}
        >
          Editar
        </Button>
      </Td>
    </Tr>
  );
}
