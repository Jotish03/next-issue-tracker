"use client";
import React from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const IssuePagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  return (
    <main className="flex items-center justify-center gap-1">
      <Label>
        Page {currentPage} of {pageCount}
      </Label>
      <Button
        variant={"outline"}
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <MdKeyboardDoubleArrowLeft size={30} />
      </Button>
      <Button
        variant={"outline"}
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <AiOutlineArrowLeft size={20} />
      </Button>
      <Button
        variant={"outline"}
        disabled={currentPage === pageCount}
        onClick={() => changePage(currentPage + 1)}
      >
        <AiOutlineArrowRight size={20} />
      </Button>
      <Button
        variant={"outline"}
        disabled={currentPage === pageCount}
        onClick={() => changePage(pageCount)}
      >
        <MdKeyboardDoubleArrowRight size={30} />
      </Button>
    </main>
  );
};

export default IssuePagination;
