# Frontend-Backend API Connection

## ✅ BookingPage Connected to Backend

The `BookingPage.tsx` component is now fully connected to the backend API.

### API Endpoint
- **URL**: `POST /api/bookings/book/public`
- **Base URL**: Configured via environment variable `VITE_API_URL` or defaults to `http://localhost:3002`

### Features Implemented

1. **API Integration**
   - Submits booking data to backend
   - Handles success and error responses
   - Validates data before submission

2. **User Experience**
   - Loading state during submission
   - Error messages displayed to user
   - Success confirmation modal
   - Form resets after successful submission

3. **Error Handling**
   - Network errors
   - Validation errors from backend
   - User-friendly error messages

### Environment Configuration

Create a `.env` file in the `website` directory:

```env
# Backend API URL
VITE_API_URL=http://localhost:3002
```

For production, set:
```env
VITE_API_URL=https://your-backend-domain.com
```

### Data Format

The component sends the following data to the backend:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+254712345678",
  "service": "Network Setup and Infrastructure",
  "date": "2024-12-25",
  "time": "14:00",
  "description": "Booking description"
}
```

### Testing

1. Make sure backend is running on port 3002
2. Fill out the booking form
3. Submit the form
4. Check:
   - Success modal appears
   - Confirmation email sent (if Brevo configured)
   - Admin notification email sent
   - Form resets after submission

### Troubleshooting

**CORS Errors:**
- Make sure backend CORS is configured to allow your frontend origin
- Check `ALLOWED_ORIGINS` in backend `.env` includes your frontend URL

**Connection Errors:**
- Verify backend is running: `curl http://localhost:3002/health`
- Check API URL in browser console
- Verify network tab for request/response details

**Validation Errors:**
- Check error message displayed in form
- Verify all required fields are filled
- Check date is in the future
- Verify time format is HH:MM

