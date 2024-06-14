export const columnNameGenerator = (type: string, currentSort: string): JSX.Element => {
  switch (type) {
    case "Name":
      if(currentSort === "nameAsc") return <span>Name &#9650;</span>;
      if(currentSort === "nameDesc") return <span>Name &#9660;</span>;
      return <span>Name</span>;
    case "Email":
      if(currentSort === "emailAsc") return <span>Email &#9650;</span>;
      if(currentSort === "emailDesc") return <span>Email &#9660;</span>;
      return <span>Email</span>;
    case "Phone Number":
      if(currentSort === "phoneAsc") return <span>Phone Number &#9650;</span>;
      if(currentSort === "phoneDesc") return <span>Phone Number &#9660;</span>;
      return <span>Phone Number</span>;
    default:
      return <></>
  }
}