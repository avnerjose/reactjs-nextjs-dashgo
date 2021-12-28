import { Button } from "@chakra-ui/react";

interface PaginationItemProps {
  value: number;
  isCurrent?: boolean;
}

export function PaginationItem({
  isCurrent = false,
  value,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        colorScheme="pink"
        disabled
        _disabled={{
          bgColor: "pink.500",
          cursor: "default",
        }}
      >
        {value}
      </Button>
    );
  }
  return (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      bg="gray.700"
      _hover={{
        bg: "gray.500",
      }}
    >
      {value}
    </Button>
  );
}
