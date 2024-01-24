import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import faker from 'faker';
import API from '../utils/axios';
import Register from './Register'; // import your Register component
import { BrowserRouter } from 'react-router-dom';

jest.mock('axios');

test('should register with valid credentials', async () => {
  // Generate fake username, email and password
  const username = faker.internet.userName();
  const email = faker.internet.email();
  const password = faker.internet.password();

  // Mock the axios post call
  API.post.mockResolvedValue({ data: {} });

  // Render the Register component
  const { getByLabelText, getByRole, getByText } = render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );

  // Fill in the form
  userEvent.type(getByLabelText(/username/i), username);
  userEvent.type(getByLabelText(/email/i), email);
  userEvent.type(getByLabelText(/password/i), password);

  // Submit the form
  fireEvent.click(getByRole('button', { name: /register/i }));

  // Wait for the form to be submitted and the axios post call to be made
  await waitFor(() => expect(API.post).toHaveBeenCalledWith("/auth/register", { username, email, password }));

  // Add any additional assertions you want here
});