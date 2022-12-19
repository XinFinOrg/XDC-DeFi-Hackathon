import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <a className="logo">
        <span className="type">NOMIS</span>
        <span className="beta">Beta</span>
      </a>
    </Link>
  );
}
