import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";
import { getApplicationsDetailsResource } from "../services/message.service";

export const ApplicationsDetailsPage = () => {
  const [message, setMessage] = useState("");

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    let isMounted = true;

    const getMessage = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getApplicationsDetailsResource(accessToken);

      if (!isMounted) {
        return;
      }

      if (data) {
        setMessage(JSON.stringify(data, null, 2));
      }

      if (error) {
        setMessage(JSON.stringify(error, null, 2));
      }
    };

    getMessage();

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently]);

  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Applications Details
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>
              This page retrieves the applications in your tenant, and the
              Actions that apply to each application.
            </span>
            <span>
              <strong>
                Only authenticated users with the{" "}
                <code>read:manager-features</code> permission should access this
                page.
              </strong>
            </span>
          </p>
          <CodeSnippet title="Applications Details" code={message} />
        </div>
      </div>
    </PageLayout>
  );
};
