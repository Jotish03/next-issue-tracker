import LoadingForm from "@/components/layout/form-loading";
import dynamic from "next/dynamic";
const IssueForm = dynamic(() => import("../_component/new-issue-form"), {
  ssr: false,
  loading: () => <LoadingForm />,
});

const NewIssue = async () => {
  return <IssueForm />;
};

export default NewIssue;
