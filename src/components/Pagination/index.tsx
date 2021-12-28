import { HStack, Stack, Box } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";
export function Pagination() {
  return (
    <Stack
      direction={["column", "row"]}
      mt="8"
      justify="space-between"
      align="center"
      spacing={["4", "6"]}
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <HStack spacing="2">
        <PaginationItem value={1} isCurrent />
        <PaginationItem value={2} />
        <PaginationItem value={3} />
      </HStack>
    </Stack>
  );
}
