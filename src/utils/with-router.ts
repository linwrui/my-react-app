import React from 'react';
import { useLocation, useNavigate, Location } from 'react-router-dom';

export interface WithRouterProps {
  location: Location;
  navigate: (to: string) => void;
}

export function withRouter<P extends WithRouterProps>(
  Component: React.ComponentType<P>
): React.ComponentType<Omit<P, keyof WithRouterProps>> {
  const WithRouterComponent = (props: Omit<P, keyof WithRouterProps>) => {
    const location = useLocation();
    const navigate = useNavigate();

    const allProps = { ...props, location, navigate } as unknown as P;
    return React.createElement(Component, allProps);
  };
  
  WithRouterComponent.displayName = `withRouter(${Component.displayName || Component.name || 'Component'})`;
  
  return WithRouterComponent;
}
