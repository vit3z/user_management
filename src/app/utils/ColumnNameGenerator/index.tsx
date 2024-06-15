export const columnNameGenerator = (type: string, currentSort: string): JSX.Element => {
  switch (type) {
    case "Name":
      if(currentSort === "nameAsc") return <span>NAME &#8593;</span>;
      if(currentSort === "nameDesc") return <span>NAME &#8595;</span>;
      return <span>NAME &#8645;</span>;
    case "Email":
      if(currentSort === "emailAsc") return <span>EMAIL &#8593;</span>;
      if(currentSort === "emailDesc") return <span>EMAIL &#8595;</span>;
      return <span>EMAIL &#8645;</span>;
    case "Phone Number":
      if(currentSort === "phoneAsc") return <span>PHONE NUMBER &#8593;</span>;
      if(currentSort === "phoneDesc") return <span>PHONE NUMBER &#8595;</span>;
      return <span>PHONE NUMBER &#8645;</span>;
    default:
      return <></>
  }
}