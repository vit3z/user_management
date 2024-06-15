import '@testing-library/jest-dom'
import { render, screen  } from '@testing-library/react'
import { columnNameGenerator } from '.'

describe('columnNameGenerator', () => {
  it('should render Name with ascending arrow', () => {
    render(columnNameGenerator('Name', 'nameAsc'));
    const name = screen.getByText(/Name/i);
    const symbol = screen.getByText(/↑/i);
    const symbolFalse = screen.queryByText(/↓/i);

    expect(name).toBeInTheDocument();
    expect(symbol).toBeInTheDocument();
    expect(symbolFalse).not.toBeInTheDocument();
  });

  it('should render Name with descending arrow', () => {
    render(columnNameGenerator('Name', 'nameDesc'));
    const name = screen.getByText(/Name/i);
    const symbol = screen.getByText(/↓/i);
    const symbolFalse = screen.queryByText(/↑/i);

    expect(name).toBeInTheDocument();
    expect(symbol).toBeInTheDocument();
    expect(symbolFalse).not.toBeInTheDocument();
  });

  it('should render Name with both arrows', () => {
    render(columnNameGenerator('Name', ''));
    const name = screen.getByText(/Name ⇅/i);
    const symbol1 = screen.queryByText(/↓/i);
    const symbol2 = screen.queryByText(/↑/i);

    expect(name).toBeInTheDocument();
    expect(symbol1).not.toBeInTheDocument();
    expect(symbol2).not.toBeInTheDocument();
  });

  it('should render Email with ascending arrow', () => {
    render(columnNameGenerator('Email', 'emailAsc'));
    const email = screen.getByText(/Email/i);
    const symbol = screen.getByText(/↑/i);
    const symbolFalse = screen.queryByText(/↓/i);

    expect(email).toBeInTheDocument();
    expect(symbol).toBeInTheDocument();
    expect(symbolFalse).not.toBeInTheDocument();
  });

  it('should render Email with descending arrow', () => {
    render(columnNameGenerator('Email', 'emailDesc'));
    const email = screen.getByText(/Email/i);
    const symbol = screen.getByText(/↓/i);
    const symbolFalse = screen.queryByText(/↑/i);

    expect(email).toBeInTheDocument();
    expect(symbol).toBeInTheDocument();
    expect(symbolFalse).not.toBeInTheDocument();
  });

  it('should render Email with both arrows', () => {
    render(columnNameGenerator('Email', ''));
    const email = screen.getByText(/Email ⇅/i);
    const symbol1 = screen.queryByText(/↓/i);
    const symbol2 = screen.queryByText(/↑/i);

    expect(email).toBeInTheDocument();
    expect(symbol1).not.toBeInTheDocument();
    expect(symbol2).not.toBeInTheDocument();
  });

  it('should render Phone Number with ascending arrow', () => {
    render(columnNameGenerator('Phone Number', 'phoneAsc'));
    const phone = screen.getByText(/Phone Number/i);
    const symbol = screen.getByText(/↑/i);
    const symbolFalse = screen.queryByText(/↓/i);

    expect(phone).toBeInTheDocument();
    expect(symbol).toBeInTheDocument();
    expect(symbolFalse).not.toBeInTheDocument();
  });

  it('should render Phone Number with descending arrow', () => {
    render(columnNameGenerator('Phone Number', 'phoneDesc'));
    const phone = screen.getByText(/Phone Number/i);
    const symbol = screen.getByText(/↓/i);
    const symbolFalse = screen.queryByText(/↑/i);

    expect(phone).toBeInTheDocument();
    expect(symbol).toBeInTheDocument();
    expect(symbolFalse).not.toBeInTheDocument();
  });

  it('should render Phone Number with both arrows', () => {
    render(columnNameGenerator('Phone Number', ''));
    const phone = screen.getByText(/Phone Number ⇅/i);
    const symbol1 = screen.queryByText(/↓/i);
    const symbol2 = screen.queryByText(/↑/i);

    expect(phone).toBeInTheDocument();
    expect(symbol1).not.toBeInTheDocument();
    expect(symbol2).not.toBeInTheDocument();
  });

  it('should render an empty fragment for unknown type', () => {
    const { container } = render(columnNameGenerator('Unknown', ''));
    expect(container.firstChild).toBe(null);
  });
});