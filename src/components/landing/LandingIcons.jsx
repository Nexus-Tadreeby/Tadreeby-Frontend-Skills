// Landing-page-only icons. Kept out of components/common/Icons.jsx so the
// Authentication pages (which share Icons.jsx) do not download them.
export const StudentIcon = ({ className = "w-14 h-14" }) => (
  <svg
    className={className}
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="56" height="56" rx="16" fill="#EFF6FF" />
    <path
      d="M41.3333 25.3333V33.3333M41.3333 25.3333L28 18.6666L14.6667 25.3333L28 32L41.3333 25.3333Z"
      stroke="#2563EB"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 28V34.6667C24.6667 37.3333 31.3333 37.3333 36 34.6667V28"
      stroke="#2563EB"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const UniversityIcon = ({ className = "w-14 h-14" }) => (
  <svg
    className={className}
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="56" height="56" rx="16" fill="#FFF4ED" />
    <path
      d="M28 12L27.416 12.303L14.084 19.0919L13.3333 19.4807V21.8595H42.6667V19.4807L41.916 19.0919L28.5827 12.303L28 12ZM28 15.1135L35.8333 19.0919H20.1667L28 15.1135ZM16 23.2432V37.0811H14.6667V39.8486H41.3333V37.0811H40V23.2432H37.3333V37.0811H34.6667V23.2432H32V37.0811H29.3333V23.2432H26.6667V37.0811H24V23.2432H21.3333V37.0811H18.6667V23.2432H16ZM12 41.2324V44H44V41.2324H12Z"
      fill="#FD7474"
    />
  </svg>
);

export const CompanyIcon = ({ className = "w-14 h-14" }) => (
  <svg
    className={className}
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="56" height="56" rx="16" fill="#ECFDF5" />
    <path
      d="M36.4 32H33.6V34.6667H36.4M36.4 26.6667H33.6V29.3333H36.4M39.2 37.3333H28V34.6667H30.8V32H28V29.3333H30.8V26.6667H28V24H39.2M25.2 21.3333H22.4V18.6667H25.2M25.2 26.6667H22.4V24H25.2M25.2 32H22.4V29.3333H25.2M25.2 37.3333H22.4V34.6667H25.2M19.6 21.3333H16.8V18.6667H19.6M19.6 26.6667H16.8V24H19.6M19.6 32H16.8V29.3333H19.6M19.6 37.3333H16.8V34.6667H19.6M28 21.3333V16H14V40H42V21.3333H28Z"
      fill="#68B69D"
    />
  </svg>
);

export const MatchingIcon = ({ className = "w-12 h-12" }) => (
  <svg
    className={className}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="48" height="48" rx="14" fill="#EEF3FF" />
    <path
      d="M24 32.1593C29.5229 32.1593 34 27.6822 34 22.1593C34 16.6364 29.5229 12.1593 24 12.1593C18.4771 12.1593 14 16.6364 14 22.1593C14 27.6822 18.4771 32.1593 24 32.1593Z"
      stroke="#1D4ED8"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M26.0174 18.4239C25.6237 17.9505 25.156 17.5751 24.6411 17.3192C24.1262 17.0633 23.5742 16.9319 23.0169 16.9326C22.4596 16.9319 21.9076 17.0633 21.3927 17.3192C20.8778 17.5751 20.4101 17.9505 20.0164 18.4239M29.4995 30.4401L34 35.8407"
      stroke="#1D4ED8"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
