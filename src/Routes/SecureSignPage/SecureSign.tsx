import React, { Suspense, lazy, useEffect } from 'react';
// import { useDispatch } from 'react-redux';

import { Spinner, Stack, StackItem } from '@patternfly/react-core';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import { PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components/PageHeader';
// import { addNotification } from '@redhat-cloud-services/frontend-components-notifications/redux';
import { useChrome } from '@redhat-cloud-services/frontend-components/useChrome';

const SecureSignComponent = lazy(() => import('../../Components/SecureSign/secure-sign'));

import './secure-sign.scss';
// import AppLink from '../../Components/AppLink';
import { useDownloadPullSecret, useSteps } from '../../hooks';

/**
 * https://reactjs.org/docs/components-and-props.html
 * https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43
 */
const SamplePage = () => {
  const { appAction } = useChrome();
  // const dispatch = useDispatch();
  const { nextStep, prevStep, step } = useSteps();
  const { downloadPullSecret, userHasDownloadedSecret } = useDownloadPullSecret();

  useEffect(() => {
    appAction('secure-sign');
  }, []);

  // const handleAlert = () => {
  //   dispatch(
  //     addNotification({
  //       variant: 'success',
  //       title: 'Notification title',
  //       description: 'notification description',
  //     })
  //   );
  // };

  return (
    <React.Fragment>
      <PageHeader>
        <PageHeaderTitle title="Secure Sign" />
        <p>Enables cryptographic signing, verification and provenance of software</p>
      </PageHeader>
      <Main>
        <Stack hasGutter>
          {/* <StackItem>
            <Title headingLevel="h2" size="3xl">
              Alerts
            </Title>
            <Button variant="primary" onClick={handleAlert}>
              Dispatch alert
            </Button>
          </StackItem> */}
          <StackItem>
            <Suspense fallback={<Spinner />}>
              <SecureSignComponent
                nextStep={nextStep}
                previousStep={prevStep}
                currentStep={step}
                onDownloadSecret={downloadPullSecret}
                userHasDownloadedSecret={userHasDownloadedSecret}
              />
            </Suspense>
          </StackItem>
          {/* <StackItem>
            <Stack hasGutter>
              <StackItem>
                <Title headingLevel="h2" size="3xl">
                  Links
                </Title>
              </StackItem>
              <StackItem>
                <AppLink to="/oops"> How to handle 500s in app </AppLink>
              </StackItem>
              <StackItem>
                <AppLink to="/no-permissions">How to handle 403s in app</AppLink>
              </StackItem>
            </Stack>
          </StackItem> */}
        </Stack>
      </Main>
    </React.Fragment>
  );
};

export default SamplePage;
