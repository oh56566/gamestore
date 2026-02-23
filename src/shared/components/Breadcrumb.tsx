import React from "react";
import { Breadcrumb as BootstrapBreadcrumb } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

const Breadcrumb: React.FC = () => {
  const location = useLocation();

  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const pathnames = location.pathname.split("/").filter(x => x);

    const breadcrumbs: BreadcrumbItem[] = [
      { label: "홈", path: "/" }
    ];

    if (pathnames.length === 0) {
      return [{ label: "홈" }];
    }

    // 상세 페이지 경로 처리 (/detail/123)
    if (pathnames[0] === "detail" && pathnames.length === 2) {
      breadcrumbs.push({ label: "게임 목록", path: "/list" });
      breadcrumbs.push({ label: "게임 상세" }); // 링크 없음
      return breadcrumbs;
    }

    // 일반 경로 처리
    pathnames.forEach((path, index) => {
      const fullPath = `/${pathnames.slice(0, index + 1).join("/")}`;

      switch (path) {
        case "list":
          breadcrumbs.push({ label: "게임 목록", path: fullPath });
          break;
        case "cart":
          breadcrumbs.push({ label: "장바구니", path: fullPath });
          break;
        case "library":
          breadcrumbs.push({ label: "내 라이브러리", path: fullPath });
          break;
        case "about":
          breadcrumbs.push({ label: "고객지원", path: fullPath });
          break;
        default:
          // 그 외 경로는 처리하지 않음
          break;
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <BootstrapBreadcrumb className="mb-4" style={{ fontSize: "0.9rem" }}>
      {breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <BootstrapBreadcrumb.Item
            key={index}
            active={isLast}
            linkAs={Link}
            linkProps={!isLast && item.path ? { to: item.path } : undefined}
            style={{
              color: isLast ? "var(--text-1)" : "var(--accent)",
              textDecoration: isLast ? "none" : "none"
            }}
          >
            {item.label}
          </BootstrapBreadcrumb.Item>
        );
      })}
    </BootstrapBreadcrumb>
  );
};

export default Breadcrumb;
