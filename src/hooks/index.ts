import { useState } from 'react';

export const useSteps = () => {
  const [step, setStep] = useState(0);
  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);
  return { step, nextStep, prevStep };
};

export const useDownloadPullSecret = () => {
  const [userHasDownloadedSecret, setUserHasDownloadedSecret] = useState(false);

  const downloadPullSecret = () => {
    const pullSecret = new Blob(['My super secret pull secret'], { type: 'text/plain;charset=utf-8' });

    // Create a URL for the file blob
    const url = URL.createObjectURL(pullSecret);

    // Create a new anchor element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pull-secret.txt';

    // Append the anchor element to the body
    document.body.appendChild(a);

    // Trigger the download
    a.click();

    // Remove the anchor element from the body
    document.body.removeChild(a);

    // Revoke the URL to free up memory
    URL.revokeObjectURL(url);

    setUserHasDownloadedSecret(true);
  };
  return {
    userHasDownloadedSecret,
    downloadPullSecret,
  };
};
