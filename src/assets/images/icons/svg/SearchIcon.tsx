const SearchIcon = ({ fill }: { fill?: string }) => (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.4583 19.7917C16.0607 19.7917 19.7917 16.0607 19.7917 11.4583C19.7917 6.85596 16.0607 3.125 11.4583 3.125C6.85596 3.125 3.125 6.85596 3.125 11.4583C3.125 16.0607 6.85596 19.7917 11.4583 19.7917Z"
      stroke={fill || "white"}
      strokeWidth="2.91667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.8737 21.875L17.3945 17.3959"
      stroke={fill || "white"}
      strokeWidth="2.91667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SearchIcon;
