import { splitProps, type Component, type ComponentProps, type JSX, type ParentComponent, type Ref } from "solid-js"
import { Dynamic } from "solid-js/web";

type ValidHostElements<HostProps> = {
  [P in keyof JSX.IntrinsicElements as JSX.IntrinsicElements[P] extends HostProps ? P : never]: JSX.IntrinsicElements[P];
}

export type ValidHost<HostProps> =
  | keyof ValidHostElements<HostProps>
  | HostComponent<HostProps>;

export type HostComponent<HostProps> = Component<HostProps>;

type OverrideProps<T, P> = Omit<T, keyof P> & P;

type _HostProps<HostProps, Host extends ValidHost<HostProps>, ResolvedProps = ComponentProps<Host>> = {
  [P in keyof ResolvedProps as P extends keyof HostProps ? ResolvedProps[P] extends HostProps[P] ? P : never : never]: ResolvedProps[P];
}

type _DynamicProps<
  Props,
  HostProps,
  Host extends AnyHost<HostProps>,
  ResolvedProps = ComponentProps<Host>,
> = keyof ResolvedProps extends keyof HostProps ? {} : never;

export type DynamicProps<
  Props,
  HostProps,
  Host extends AnyHost<HostProps>,
> = _DynamicProps<Props, HostProps, Host>;


export type AnyHost<HostProps> = keyof JSX.IntrinsicElements | Component<HostProps>;



// Resolved
type A = {
  ref: HTMLButtonElement;
}

// Host
type B = {
  ref: HTMLElement;
}

type C = {
  [P in keyof A as P extends keyof B ? A[P] extends B[P] ? P : never : never]: A[P];
}



type D = {
  foo: true;
  bar: false;
}

type E = {
  [P ]
}
