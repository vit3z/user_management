import "@testing-library/jest-dom";
import {
  render,
  fireEvent,
  cleanup,
  waitFor,
  screen,
} from "@testing-library/react";
import UserList from ".";
import useFetchUsers from "../../hooks/useFetchUsers";
import { UserInformationProps } from "@/consts/interfaces";
jest.mock("../../hooks/useFetchUsers");

describe("UserList", () => {
  const mockUsers = [
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
          lat: "-37.3159",
          lng: "81.1496",
        },
      },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets",
      },
    },
    {
      id: 2,
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv",
      address: {
        street: "Victor Plains",
        suite: "Suite 879",
        city: "Wisokyburgh",
        zipcode: "90566-7771",
        geo: {
          lat: "-43.9509",
          lng: "-34.4618",
        },
      },
      phone: "010-692-6593 x09125",
      website: "anastasia.net",
      company: {
        name: "Deckow-Crist",
        catchPhrase: "Proactive didactic contingency",
        bs: "synergize scalable supply-chains",
      },
    },
  ] as UserInformationProps[];

  const mockUseFetchUsers = jest.mocked(useFetchUsers);

  beforeEach(() => {
    mockUseFetchUsers.mockReturnValue({
      users: mockUsers,
      error: null,
      loading: false,
    });
  });
  it("should render the component", () => {
    const { queryByPlaceholderText, container } = render(<UserList />);

    const searchBar = queryByPlaceholderText("Search User By Name");
    expect(searchBar).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("should display user names", async () => {
    const { getByText } = render(<UserList />);

    await waitFor(() => {
      const user1 = getByText("Leanne Graham");
      const user2 = getByText("Ervin Howell");

      expect(user1).toBeInTheDocument();
      expect(user2).toBeInTheDocument();
    });
  });

  it("should search users by name", async () => {
    const { queryByText } = render(<UserList />);

    fireEvent.change(screen.getByPlaceholderText("Search User By Name"), {
      target: { value: "Leanne" },
    });

    await waitFor(() => {
      const user1 = queryByText("Leanne Graham");
      const user2 = queryByText("Ervin Howell");

      expect(user1).toBeInTheDocument();
      expect(user2).not.toBeInTheDocument();
    });
  });

  it("should return an empty result when looking for a user that is not in the list", async () => {
    const { queryByText } = render(<UserList />);

    fireEvent.change(screen.getByPlaceholderText("Search User By Name"), {
      target: { value: "Test" },
    });

    await waitFor(() => {
      const user1 = queryByText("Leanne Graham");
      const user2 = queryByText("Ervin Howell");
      const noUser = queryByText("No Users Found");

      expect(user1).not.toBeInTheDocument();
      expect(user2).not.toBeInTheDocument();
      expect(noUser).toBeInTheDocument();
    });
  });

  it("should return the list to it's initial state when there is no text in the search bar", async () => {
    const { queryByText } = render(<UserList />);

    fireEvent.change(screen.getByPlaceholderText("Search User By Name"), {
      target: { value: "Test" },
    });
    fireEvent.change(screen.getByPlaceholderText("Search User By Name"), {
      target: { value: "" },
    });

    await waitFor(() => {
      const user1 = queryByText("Leanne Graham");
      const user2 = queryByText("Ervin Howell");

      expect(user1).toBeInTheDocument();
      expect(user2).toBeInTheDocument();
    });
  });

  it("should sort users by name in asc order when the appropriate element is clicked", async () => {
    render(<UserList />);

    fireEvent.click(screen.getByText("Name"));

    await waitFor(() => {
      const sortedUsers = screen.getAllByText(/Ervin Howell|Leanne Graham/);
      expect(sortedUsers[0]).toHaveTextContent("Ervin Howell");
      expect(sortedUsers[1]).toHaveTextContent("Leanne Graham");
    });
  });

  it("should sort users by name in desc order when the appropriate element is clicked twice", async () => {
    render(<UserList />);

    fireEvent.click(screen.getByText("Name"));
    fireEvent.click(screen.getByText("Name ▲"));

    await waitFor(() => {
      const sortedUsers = screen.getAllByText(/Ervin Howell|Leanne Graham/);
      expect(sortedUsers[0]).toHaveTextContent("Leanne Graham");
      expect(sortedUsers[1]).toHaveTextContent("Ervin Howell");
    });
  });

  it("should sort users by name in asc order when the appropriate element is clicked thrice", async () => {
    render(<UserList />);

    fireEvent.click(screen.getByText("Name"));
    fireEvent.click(screen.getByText("Name ▲"));
    fireEvent.click(screen.getByText("Name ▼"));

    await waitFor(() => {
      const sortedUsers = screen.getAllByText(/Ervin Howell|Leanne Graham/);
      expect(sortedUsers[0]).toHaveTextContent("Ervin Howell");
      expect(sortedUsers[1]).toHaveTextContent("Leanne Graham");
    });
  });

  it("should sort users by email in asc order when the appropriate element is clicked", async () => {
    render(<UserList />);

    fireEvent.click(screen.getByText("Email"));

    await waitFor(() => {
      const sortedUsers = screen.getAllByText(
        /Shanna@melissa.tv|Sincere@april.biz/
      );
      expect(sortedUsers[0]).toHaveTextContent("Shanna@melissa.tv");
      expect(sortedUsers[1]).toHaveTextContent("Sincere@april.biz");
    });
  });

  it("should sort users by email in desc order when the appropriate element is clicked twice", async () => {
    render(<UserList />);

    fireEvent.click(screen.getByText("Email"));
    fireEvent.click(screen.getByText("Email ▲"));

    await waitFor(() => {
      const sortedUsers = screen.getAllByText(
        /Shanna@melissa.tv|Sincere@april.biz/
      );
      expect(sortedUsers[0]).toHaveTextContent("Sincere@april.biz");
      expect(sortedUsers[1]).toHaveTextContent("Shanna@melissa.tv");
    });
  });

  it("should sort users by email in asc order when the appropriate element is clicked thrice", async () => {
    render(<UserList />);

    fireEvent.click(screen.getByText("Email"));
    fireEvent.click(screen.getByText("Email ▲"));
    fireEvent.click(screen.getByText("Email ▼"));

    await waitFor(() => {
      const sortedUsers = screen.getAllByText(
        /Shanna@melissa.tv|Sincere@april.biz/
      );
      expect(sortedUsers[0]).toHaveTextContent("Shanna@melissa.tv");
      expect(sortedUsers[1]).toHaveTextContent("Sincere@april.biz");
    });
  });

  it("should sort users by phone number in asc order when the appropriate element is clicked", async () => {
    render(<UserList />);

    fireEvent.click(screen.getByText("Phone Number"));

    await waitFor(() => {
      const sortedUsers = screen.getAllByText(
        /010-692-6593 x09125|1-770-736-8031 x56442/
      );
      expect(sortedUsers[0]).toHaveTextContent("010-692-6593 x09125");
      expect(sortedUsers[1]).toHaveTextContent("1-770-736-8031 x56442");
    });
  });

  it("should sort users by phone number in desc order when the appropriate element is clicked twice", async () => {
    render(<UserList />);

    fireEvent.click(screen.getByText("Phone Number"));
    fireEvent.click(screen.getByText("Phone Number ▲"));

    await waitFor(() => {
      const sortedUsers = screen.getAllByText(
        /010-692-6593 x09125|1-770-736-8031 x56442/
      );
      expect(sortedUsers[0]).toHaveTextContent("1-770-736-8031 x56442");
      expect(sortedUsers[1]).toHaveTextContent("010-692-6593 x09125");
    });
  });

  it("should sort users by phone number in asc order when the appropriate element is clicked thrice", async () => {
    render(<UserList />);

    fireEvent.click(screen.getByText("Phone Number"));
    fireEvent.click(screen.getByText("Phone Number ▲"));
    fireEvent.click(screen.getByText("Phone Number ▼"));

    await waitFor(() => {
      const sortedUsers = screen.getAllByText(
        /010-692-6593 x09125|1-770-736-8031 x56442/
      );
      expect(sortedUsers[0]).toHaveTextContent("010-692-6593 x09125");
      expect(sortedUsers[1]).toHaveTextContent("1-770-736-8031 x56442");
    });
  });

  it("should open the details modal when the user clicks on a data point", async () => {
    render(<UserList />);

    fireEvent.click(screen.getByText("Leanne Graham"));

    await waitFor(() => {
      const modalUserName = screen.queryByText("Bret");

      expect(modalUserName).toBeInTheDocument();
    });
  });

  it("should handle the closing of the modal", async() => {
    render(<UserList />);

    fireEvent.click(screen.getByText("Leanne Graham"));

    await waitFor(() => {
      const modalUserName = screen.queryByText("Bret");
      expect(modalUserName).toBeInTheDocument();
      fireEvent.click(screen.getByText("Close"));
      expect(modalUserName).not.toBeInTheDocument();
    });
  });
});
