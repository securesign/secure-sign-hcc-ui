import React, { Suspense, lazy, useMemo } from 'react';
import { Route as RouterRoute, Routes as RouterRoutes } from 'react-router-dom';
import { InvalidObject } from '@redhat-cloud-services/frontend-components/InvalidObject';
import { Bullseye, Spinner } from '@patternfly/react-core';

const SamplePage = lazy(() => import(/* webpackChunkName: "SamplePage" */ './Routes/SamplePage/SamplePage'));
const OopsPage = lazy(() => import(/* webpackChunkName: "OopsPage" */ './Routes/OopsPage/OopsPage'));
const NoPermissionsPage = lazy(() => import(/* webpackChunkName: "NoPermissionsPage" */ './Routes/NoPermissionsPage/NoPermissionsPage'));

const ArtifactSignerPage = lazy(() => import(/* webpackChunkName: "ArtifactSignerPage" */ './Routes/ArtifactSignerPage/ArtifactSigner'));

const routes = [
  {
    path: 'no-permissions',
    element: NoPermissionsPage,
  },
  {
    path: 'oops',
    element: OopsPage,
  },
  {
    path: '/sample-page',
    element: SamplePage,
  },
  /* Catch all unmatched routes */
  {
    route: {
      path: '*',
    },
    element: InvalidObject,
  },
  {
    path: '/',
    element: ArtifactSignerPage,
  },
];

interface RouteType {
  path?: string;
  element: React.ComponentType;
  childRoutes?: RouteType[];
  elementProps?: Record<string, unknown>;
}

const renderRoutes = (routes: RouteType[] = []) =>
  routes.map(({ path, element: Element, childRoutes, elementProps }) => (
    <RouterRoute key={path} path={path} element={<Element {...elementProps} />}>
      {renderRoutes(childRoutes)}
    </RouterRoute>
  ));

const Routing = () => {
  const renderedRoutes = useMemo(() => renderRoutes(routes), [routes]);
  return (
    <Suspense
      fallback={
        <Bullseye>
          <Spinner />
        </Bullseye>
      }
    >
      <RouterRoutes>{renderedRoutes}</RouterRoutes>
    </Suspense>
  );
};

export default Routing;
