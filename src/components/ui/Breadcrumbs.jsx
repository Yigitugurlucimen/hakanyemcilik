import { Link } from "react-router-dom";

const Breadcrumbs = ({ items }) => {
  if (!items?.length) return null;

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-emeraldDark/60">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {index > 0 ? <span aria-hidden className="text-emeraldDark/30">/</span> : null}
              {isLast || (!item.to && !item.href) ? (
                <span className="font-medium text-emeraldDark" aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              ) : item.to ? (
                <Link to={item.to} className="transition hover:text-emeraldDark">
                  {item.label}
                </Link>
              ) : (
                <a href={item.href} className="transition hover:text-emeraldDark">
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
