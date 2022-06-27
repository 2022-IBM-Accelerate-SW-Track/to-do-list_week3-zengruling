import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render duplicate Task', () => {
  render(<App />);

  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByRole('textbox', {name: /Due Date/i});
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";

  fireEvent.change(inputTask, {target: {value: "History Test"}});
  fireEvent.change(inputDate, {target: {value: dueDate}});
  fireEvent.click(element);

  fireEvent.change(inputTask, {target: {value: "History Test"}});
  fireEvent.change(inputDate, {target: {value: dueDate}});
  fireEvent.click(element);

  const check = screen.getAllByText(/History Test/i);
  expect(check.length).toBe(1);
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);

  const inputDate = screen.getByRole('textbox', {name: /Due Date/i});
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";

  fireEvent.change(inputDate, {target: {value: dueDate}});
  fireEvent.click(element);

  const check = screen.getByText(/You have no todo's left/i);
  expect(check).toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);

  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const element = screen.getByRole('button', {name: /Add/i});

  fireEvent.change(inputTask, {target: {value: "History Test"}});
  fireEvent.click(element);

  const check = screen.getByText(/You have no todo's left/i);
  expect(check).toBeInTheDocument();
 });

 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);

  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByRole('textbox', {name: /Due Date/i});
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";

  fireEvent.change(inputTask, {target: {value: "History Test"}});
  fireEvent.change(inputDate, {target: {value: dueDate}});
  fireEvent.click(element);

  const deleteByCheck = screen.getByRole('checkbox');
  fireEvent.click(deleteByCheck);

  const check = screen.getByText(/You have no todo's left/i);
  expect(check).toBeInTheDocument();
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);

  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByRole('textbox', {name: /Due Date/i});
  const element = screen.getByRole('button', {name: /Add/i});

  fireEvent.change(inputTask, {target: {value: "History Test"}});
  fireEvent.change(inputDate, {target: {value: "05/30/2023"}});
  fireEvent.click(element);

  fireEvent.change(inputTask, {target: {value: "Maths Test"}});
  fireEvent.change(inputDate, {target: {value: "05/30/2020"}});
  fireEvent.click(element);

  const check = screen.getByTestId(/History Test/i).style.background;
  const checkOverdue = screen.getByTestId(/Maths Test/i).style.background;
  expect (check == checkOverdue).toBe(false);
 });
