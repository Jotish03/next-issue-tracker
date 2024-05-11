import { mainModule } from "process";
import React from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const IssuePagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;
  return (
    <main className="flex items-center justify-center gap-1">
      <Label>
        Page {currentPage} of {pageCount}
      </Label>
      <Button variant={"outline"} disabled={currentPage === 1}>
        <MdKeyboardDoubleArrowLeft size={30} />
      </Button>
      <Button variant={"outline"} disabled={currentPage === 1}>
        <AiOutlineArrowLeft size={20} />
      </Button>
      <Button variant={"outline"} disabled={currentPage === pageCount}>
        <AiOutlineArrowRight size={20} />
      </Button>
      <Button variant={"outline"} disabled={currentPage === pageCount}>
        <MdKeyboardDoubleArrowRight size={30} />
      </Button>
    </main>
  );
};

export default IssuePagination;
