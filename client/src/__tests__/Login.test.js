import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import faker from 'faker';
import Login from './Login'; // import your Login component
import { Context } from "../../context/Context"; // import your Context
import { BrowserRouter } from 'react-router-dom';

test('should login with valid credentials', async () => {
	// Generate fake username and password
	const username = faker.internet.userName();
	const password = faker.internet.password();

	// Mock the context
	const mockDispatch = jest.fn();
	const contextValue = { dispatch: mockDispatch, isFetching: false };

	// Render the Login component
	const { getByLabelText, getByRole } = render(
		<BrowserRouter>
			<Context.Provider value={contextValue}>
				<Login />
			</Context.Provider>
		</BrowserRouter>
	);

	// Fill in the form
	userEvent.type(getByLabelText(/username/i), username);
	userEvent.type(getByLabelText(/password/i), password);

	// Submit the form
	fireEvent.click(getByRole('button', { name: /login/i }));

	// Wait for the form to be submitted and the state to be updated
	await waitFor(() => expect(mockDispatch).toHaveBeenCalledWith({ type: "LOGIN_START" }));

	// Add any additional assertions you want here
});