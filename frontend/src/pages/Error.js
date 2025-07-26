import { useRouteError } from "react-router";

import PageContent from "../components/PageContent";

export default function ErrorPage() {
  const error = useRouteError();

  let title = "An error occured",
    message = "Something went wrong";

  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  }

  if (error.status === 404) {
    title = "Not found";
    message = "Could not find resource or page";
  }
  return (
    <PageContent title={title}>
      <p>{message}</p>
    </PageContent>
  );
}
