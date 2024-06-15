// This function is used to generate Tab titles in the user display table
// It returns HTML span elements, so we can use UNICODE symbols (which we're using so we don't have to install a icon pack/download icons)

export const columnNameGenerator = (type: string, currentSort: string): JSX.Element => {
  switch (type) {
    case "Name":
      if(currentSort === "nameAsc") return <span>NAME &#8593;</span>;
      if(currentSort === "nameDesc") return <span>NAME &#8595;</span>;
      return <span>NAME &#8645;</span>;
      case "Username":
        if(currentSort === "usernameAsc") return <span>USERNAME &#8593;</span>;
        if(currentSort === "usernameDesc") return <span>USERNAME &#8595;</span>;
        return <span>USERNAME &#8645;</span>;
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