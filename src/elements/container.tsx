import React from 'react';

export function Container(props: {children: JSX.Element, xAttr: string}) {
  const { children, xAttr } = props;
  return (<div x-container="true" x-component-attr={xAttr}>{{...children}}</div>);
}
