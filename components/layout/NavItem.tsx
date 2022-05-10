import Link from "next/link";
import { classNames } from "../../lib/toolbox";

interface NavItemProps {
  name: string;
  href: string;
  current: boolean;
  Icon: React.ComponentType<any>;
}

export default function NavItem({ name, href, current, Icon }: NavItemProps) {
  return (
    <Link key={name} href={href} passHref={true}>
      <a className={classNames(current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white", "group flex items-center px-2 py-2 text-base font-medium rounded-md")}>
        <Icon className={classNames(current ? "text-gray-300" : "text-gray-400 group-hover:text-gray-300", "mr-4 flex-shrink-0 h-6 w-6")} aria-hidden="true" />
        {name}
      </a>
    </Link>
  );
}
