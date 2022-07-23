import { FC, SVGProps } from "react";

type SvgProps = SVGProps<SVGSVGElement>;

export const ArrowDownIcon: FC<SvgProps> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M17.7099 11.29C17.617 11.1963 17.5064 11.1219 17.3845 11.0711C17.2627 11.0203 17.132 10.9942 16.9999 10.9942C16.8679 10.9942 16.7372 11.0203 16.6154 11.0711C16.4935 11.1219 16.3829 11.1963 16.2899 11.29L12.9999 14.59V7C12.9999 6.73478 12.8946 6.48043 12.707 6.29289C12.5195 6.10536 12.2652 6 11.9999 6C11.7347 6 11.4804 6.10536 11.2928 6.29289C11.1053 6.48043 10.9999 6.73478 10.9999 7V14.59L7.70994 11.29C7.52164 11.1017 7.26624 10.9959 6.99994 10.9959C6.73364 10.9959 6.47825 11.1017 6.28994 11.29C6.10164 11.4783 5.99585 11.7337 5.99585 12C5.99585 12.2663 6.10164 12.5217 6.28994 12.71L11.2899 17.71C11.385 17.801 11.4972 17.8724 11.6199 17.92C11.7396 17.9729 11.8691 18.0002 11.9999 18.0002C12.1308 18.0002 12.2602 17.9729 12.3799 17.92C12.5027 17.8724 12.6148 17.801 12.7099 17.71L17.7099 12.71C17.8037 12.617 17.8781 12.5064 17.9288 12.3846C17.9796 12.2627 18.0057 12.132 18.0057 12C18.0057 11.868 17.9796 11.7373 17.9288 11.6154C17.8781 11.4936 17.8037 11.383 17.7099 11.29Z"
      fill="currentColor"
    />
  </svg>
);
