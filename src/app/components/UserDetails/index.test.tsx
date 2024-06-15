import '@testing-library/jest-dom'
import { render, fireEvent, cleanup } from '@testing-library/react'
import UserDetails from '.'

describe("UserDetails", () => {
  const basicUserDetails = {
    id: 125,
    name: "John",
    username: "Doe",
    email: "jd@jd.jd",
    address: {
      street: "Test Avenue",
      suite: "11",
      city: "London",
      zipcode: "EC1",
      geo: {
        lat: "test lat",
        lng: "test lng",
      }
    },
    phone: "555-5555",
    website: "test.com",
    company: {
      name: "Company",
      catchPhrase: "Phrase",
      bs: "We do it",
    }
  }

  const onClose = jest.fn()

  describe("renders all elements when needed", () => {
    it("renders the component when props are passed", () => {
      const {container} = render(<UserDetails isOpen={true} onClose={onClose} data={basicUserDetails}/>);
      expect(container).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    })
  
    it("does not render the user ID when props are passed", () => {
      const {queryByText} = render(<UserDetails isOpen={true} onClose={onClose} data={basicUserDetails}/>);
      const userID = queryByText('125');
      expect(userID).not.toBeInTheDocument();
    })
  
    it("renders the user name when props are passed", () => {
      const {queryByText} = render(<UserDetails isOpen={true} onClose={onClose} data={basicUserDetails}/>);
      const userFullName = queryByText('John');
      expect(userFullName).toBeInTheDocument();
    })
  
    it("renders the user website when props are passed", () => {
      const {getByText} = render(<UserDetails isOpen={true} onClose={onClose} data={basicUserDetails}/>);
      const userWebsite = getByText('test.com');
      expect(userWebsite).toBeInTheDocument();
    })
  
    it("renders the user contact details when props are passed", () => {
      const {getByText} = render(<UserDetails isOpen={true} onClose={onClose} data={basicUserDetails}/>);
      const userEmail = getByText('jd@jd.jd');
      expect(userEmail).toBeInTheDocument();
  
      const userPhone = getByText('555-5555');
      expect(userPhone).toBeInTheDocument();
  
      const userUsername = getByText('Doe');
      expect(userUsername).toBeInTheDocument();
    })
  
    it("renders the user company details when props are passed", () => {
      const {getByText} = render(<UserDetails isOpen={true} onClose={onClose} data={basicUserDetails}/>);
      const userCompany = getByText(/Company/i);
      expect(userCompany).toBeInTheDocument();
  
      const userSummary = getByText(/We do it/i);
      expect(userSummary).toBeInTheDocument();
    })
  
    it("renders the user address when props are passed", () => {
      const {getByText} = render(<UserDetails isOpen={true} onClose={onClose} data={basicUserDetails}/>);
      const userAddress = getByText('11 Test Avenue, London');
      expect(userAddress).toBeInTheDocument();
  
      const userZipCode = getByText('EC1');
      expect(userZipCode).toBeInTheDocument();
      
      const userGeoLoc = getByText('test lat, test lng');
      expect(userGeoLoc).toBeInTheDocument();
    })
  
    it("does not render user details if isOpen is false", () => {
      const {queryByText} = render(<UserDetails isOpen={false} onClose={onClose} data={basicUserDetails}/>);
      const userFullName = queryByText('John');
      expect(userFullName).not.toBeInTheDocument();
    })
  })

  describe("triggers functions when needed", () => {
    afterEach(cleanup);

    it('calls onClose when Escape key is pressed', () => {
      const onCloseMock = jest.fn();
      render(<UserDetails isOpen={true} onClose={onCloseMock} data={basicUserDetails}/>);
  
      // Simulate pressing the Escape key
      fireEvent.keyDown(document, { key: 'Escape', code: 'Escape', keyCode: 27, charCode: 27 });
  
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it('removes the event listener on unmount', () => {
      const onCloseMock = jest.fn();
      const {unmount} = render(<UserDetails isOpen={true} onClose={onCloseMock} data={basicUserDetails}/>);
  
      // Unmount the component
      unmount();
  
      // Simulate pressing the Escape key after unmount
      fireEvent.keyDown(document, { key: 'Escape', code: 'Escape', keyCode: 27, charCode: 27 });
  
      expect(onCloseMock).not.toHaveBeenCalled();
    });
  })
})