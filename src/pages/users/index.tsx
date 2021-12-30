import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Link,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import NextLink from "next/link";
import { useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { UserListItem } from "../../components/UserListItem";
import { UserListItemSkeleton } from "../../components/UserListItem/skeleton";
import { getUsers, useUsers } from "../../hooks/useUsers";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";

type User = {
  id: string;
  name: string;
  email: string;
  created_at: string;
};

type UserListProps = {
  users: User[];
};

const UserList: NextPage<UserListProps> = ({ users }) => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error } = useUsers(page, {
    initialData: users,
  });

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(
      ["user", userId],
      async () => {
        const { data } = await api.get(`/users/${userId}`);

        return data;
      },
      { staleTime: 1000 * 60 * 10 }
    );
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>
            <NextLink href="/users/create">
              <Button
                as="a"
                size="sm"
                colorScheme="pink"
                cursor="pointer"
                leftIcon={<Icon as={RiAddLine} />}
              >
                Criar novo
              </Button>
            </NextLink>
          </Flex>
          {error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos usuários.</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th
                      px={["2", "4", "6"]}
                      color="gray.300"
                      width={["6", "8"]}
                    >
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    <Th width="2"></Th>
                  </Tr>
                </Thead>
                {isLoading ? (
                  <Tbody>
                    {[...new Array(6)].map((_, index) => (
                      <UserListItemSkeleton
                        key={index}
                        isWideVersion={!!isWideVersion}
                      />
                    ))}
                  </Tbody>
                ) : (
                  <>
                    <Tbody>
                      {data?.users.map((user) => (
                        <UserListItem
                          key={user.id}
                          user={user}
                          isWideVersion={!!isWideVersion}
                          handlePrefetchUser={handlePrefetchUser}
                        />
                      ))}
                    </Tbody>
                  </>
                )}
              </Table>
              {!isLoading && (
                <Pagination
                  totalRegisters={data?.totalRegisters || 0}
                  currentPage={page}
                  onPageChange={setPage}
                />
              )}
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default UserList;

// export const getServerSideProps: GetServerSideProps = async () => {
//   const { users, totalRegisters } = await getUsers(1);
//   return {
//     props: {
//       users,
//     },
//   };
// };
