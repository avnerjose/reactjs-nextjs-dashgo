import {
  Td,
  Tr,
  Skeleton,
  SkeletonText,
  Checkbox,
  Button,
  Icon,
  Box,
} from "@chakra-ui/react";
import { RiPencilLine } from "react-icons/ri";

interface UserListItemSkeletonProps {
  isWideVersion: boolean;
}

export function UserListItemSkeleton({
  isWideVersion,
}: UserListItemSkeletonProps) {
  return (
    <Tr>
      <Td px={["2", "4", "6"]}>
        <Skeleton speed={0.5} fadeDuration={10}>
          <Checkbox />
        </Skeleton>
      </Td>
      <Td>
        <SkeletonText noOfLines={2} w="40" speed={0.5} />
      </Td>
      {isWideVersion && (
        <Td>
          <SkeletonText noOfLines={1} w="170px" speed={0.5} />
        </Td>
      )}
      <Td>
        <SkeletonText noOfLines={1} w="3rem" lineHeight="6px" speed={0.5} />
      </Td>
    </Tr>
  );
}
