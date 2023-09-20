import './secure-sign.scss';
import { Button, ProgressStep, ProgressStepper, Text, TextContent, TextVariants } from '@patternfly/react-core';
import { ArrowLeftIcon, ExternalLinkSquareAltIcon } from '@patternfly/react-icons';
import React from 'react';

type GettingStartedProps = {
  onGetStartedClick: () => void;
};

type ArtifactSignerProps = {
  currentStep: number;
  onDownloadSecret: () => void;
  userHasDownloadedSecret: boolean;
  nextStep: () => void;
  previousStep: () => void;
};

const GettingStarted = ({ onGetStartedClick }: GettingStartedProps) => {
  return (
    <div>
      <TextContent>
        <Text component={TextVariants.p}>
          {/* Trusted Artifact Signer enables secure signing and verification of software artifacts, enhancing supply chain security. Signed materials are stored in a
          tamper-resistant public log. */}
          Trusted Artifact Signer empowers software developers and consumers to securely sign and verify software artifacts such as release files,
          container images, binaries, bill of material manifests and more to enhance software supply chain security. Signing materials are then stored
          in a tamper-resistant public log.
        </Text>
      </TextContent>
      <Button
        onClick={onGetStartedClick}
        style={{
          marginTop: '1rem',
        }}
      >
        Get Started
      </Button>
    </div>
  );
};

type StepperFlowProps = {
  currentStep: number;
};
const StepperFlow = ({ currentStep }: StepperFlowProps) => {
  return (
    <ProgressStepper>
      <ProgressStep
        id="download-pull-secret"
        titleId="download-pull-secret-title"
        aria-label="Download pull secret step"
        isCurrent={currentStep === 1}
        variant={currentStep > 1 ? 'success' : currentStep === 1 ? 'info' : 'pending'}
      >
        Download pull secret
      </ProgressStep>
      <ProgressStep
        id="install-secure-sign"
        titleId="install-secure-sign-title"
        aria-label="Read Documentation"
        isCurrent={currentStep === 2}
        variant={currentStep > 2 ? 'success' : currentStep === 2 ? 'info' : 'pending'}
      >
        Install Trusted Artifact Signer in OpenShift
      </ProgressStep>
      <ProgressStep
        id="complete-step"
        titleId="complete-install-title"
        aria-label="Installation completed"
        isCurrent={currentStep === 3}
        variant={currentStep === 3 ? 'success' : 'pending'}
      >
        Complete Installation
      </ProgressStep>
    </ProgressStepper>
  );
};

type DownloadPullSecretStepProps = {
  onDownloadSecret: () => void;
  canProceed: boolean;
  onPrevious: () => void;
  onNext: () => void;
};
const DownloadPullSecretStep = ({ canProceed, onDownloadSecret, onNext, onPrevious }: DownloadPullSecretStepProps) => {
  return (
    <div
      style={{
        marginTop: '1rem',
      }}
    >
      <TextContent>
        <Text component={TextVariants.p}>Download the pull secret needed for your deployment</Text>
        <div
          style={{
            flex: 1,
            flexDirection: 'column',
            display: 'inline-flex',
          }}
        >
          <Button variant="primary" onClick={onDownloadSecret}>
            Download Pull Secret
          </Button>
          <div
            style={{
              paddingTop: '1rem',
            }}
          >
            <Button variant="link" isSmall onClick={onPrevious}>
              <ArrowLeftIcon /> Previous
            </Button>
            <Button variant="secondary" isSmall isDisabled={!canProceed} onClick={onNext}>
              Next
            </Button>
          </div>
        </div>
      </TextContent>
    </div>
  );
};

type InstallArtifactSignerStepProps = {
  onPrevious: () => void;
  onNext: () => void;
};
const InstallArtifactSignerStep = ({ onNext, onPrevious }: InstallArtifactSignerStepProps) => {
  return (
    <div>
      <TextContent>
        <Text component={TextVariants.p}>
          Install Trusted Artifact Signer on an OpenShift cluster by following the instructions in the documentation
        </Text>
        <div
          style={{
            flex: 1,
            flexDirection: 'column',
            display: 'inline-flex',
            justifyItems: 'center',
          }}
        >
          <Button
            variant="link"
            onClick={() => {
              // open the documentation in a new tab
              window.open('https://example.com');
            }}
            iconPosition="right"
            icon={<ExternalLinkSquareAltIcon />}
          >
            Trusted Artifact Signer Documentation
          </Button>
          <div
            style={{
              paddingTop: '1rem',
            }}
          >
            <Button variant="link" isSmall onClick={onPrevious}>
              <ArrowLeftIcon /> Previous
            </Button>
            <Button variant="secondary" isSmall onClick={onNext}>
              Finish
            </Button>
          </div>
        </div>
      </TextContent>
    </div>
  );
};

type SuccessStepProps = {
  onPrevious: () => void;
};
const SuccessStep = ({ onPrevious }: SuccessStepProps) => {
  return (
    <div>
      <TextContent>
        <Text component={TextVariants.p}>Trusted Artifact Signer is installed and ready to use</Text>
        <div>
          <Button variant="link" onClick={onPrevious}>
            <ArrowLeftIcon /> Previous
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              console.log('get started clicked');
            }}
          >
            Get Started
          </Button>
        </div>
      </TextContent>
    </div>
  );
};

const ArtifactSigner: React.FC<ArtifactSignerProps> = ({
  currentStep,
  nextStep,
  previousStep,
  userHasDownloadedSecret,
  onDownloadSecret,
}: ArtifactSignerProps) => {
  return (
    <div className="secure-sign-component" id="secure-sign-component">
      {currentStep === 0 ? <GettingStarted onGetStartedClick={nextStep} /> : <StepperFlow currentStep={currentStep} />}
      {currentStep === 1 && (
        <DownloadPullSecretStep
          canProceed={userHasDownloadedSecret}
          onDownloadSecret={onDownloadSecret}
          onNext={nextStep}
          onPrevious={previousStep}
        />
      )}
      {currentStep === 2 && <InstallArtifactSignerStep onPrevious={previousStep} onNext={nextStep} />}
      {currentStep === 3 && <SuccessStep onPrevious={previousStep} />}
    </div>
  );
};

ArtifactSigner.displayName = 'ArtifactSigner';

export default ArtifactSigner;
