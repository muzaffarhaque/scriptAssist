import { useRouteError, isRouteErrorResponse } from "react-router-dom";

 function ErrorPage() {
  const error = useRouteError();

  console.error(error);

  return (
    <div className="mai-error-container-wrapper">
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          {isRouteErrorResponse(error)
            ? error.statusText
            : (error as Error)?.message || "Unknown error"}
        </i>
      </p>
    </div>
    </div>
  );
}
export default ErrorPage;