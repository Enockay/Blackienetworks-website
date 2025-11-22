const { sendBookingConfirmation, sendAdminNotification } = require('../utils/emailService');
const brevo = require('@getbrevo/brevo');
const dotenv = require('dotenv');
dotenv.config();

// Mock Brevo
jest.mock('@getbrevo/brevo', () => {
  const mockSendTransacEmail = jest.fn();
  return {
    TransactionalEmailsApi: jest.fn().mockImplementation(() => ({
      setApiKey: jest.fn(),
      sendTransacEmail: mockSendTransacEmail
    })),
    SendSmtpEmail: jest.fn(),
    TransactionalEmailsApiApiKeys: {
      apiKey: process.env.BREVO_API_KEY
    }
  };
});

describe('Email Service', () => {
  let apiInstance;
  let mockSendTransacEmail;

  beforeEach(() => {
    jest.clearAllMocks();
    // Set default test environment variables
    process.env.BREVO_API_KEY = process.env.BREVO_API_KEY || 'test-api-key';
    process.env.BREVO_SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || 'test@example.com';
    process.env.BREVO_REPLY_TO_EMAIL = process.env.BREVO_REPLY_TO_EMAIL || 'support@example.com';
    process.env.ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
    
    apiInstance = new brevo.TransactionalEmailsApi();
    mockSendTransacEmail = apiInstance.sendTransacEmail;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('sendBookingConfirmation', () => {
    const mockBookingData = {
      name: 'John Doe',
      email: 'john@example.com',
      service: 'Web Development',
      date: '2024-12-25',
      time: '10:00',
      description: 'Need a new website'
    };

    it('should send booking confirmation email successfully', async () => {
      const mockResponse = {
        body: {
          messageId: 'test-message-id-123'
        },
        response: {
          statusCode: 200
        }
      };

      mockSendTransacEmail.mockResolvedValue(mockResponse);

      const result = await sendBookingConfirmation(mockBookingData);

      expect(mockSendTransacEmail).toHaveBeenCalledTimes(1);
      expect(result.body.messageId).toBe('test-message-id-123');
      
      const callArgs = mockSendTransacEmail.mock.calls[0][0];
      expect(callArgs.subject).toBe('Booking Confirmation - Blackie Networks');
      expect(callArgs.to[0].email).toBe('john@example.com');
      expect(callArgs.to[0].name).toBe('John Doe');
      expect(callArgs.htmlContent).toContain('John Doe');
      expect(callArgs.htmlContent).toContain('Web Development');
    });

    it('should handle missing description gracefully', async () => {
      const bookingDataWithoutDescription = {
        ...mockBookingData,
        description: undefined
      };

      const mockResponse = {
        body: {
          messageId: 'test-message-id-456'
        }
      };

      mockSendTransacEmail.mockResolvedValue(mockResponse);

      await sendBookingConfirmation(bookingDataWithoutDescription);

      const callArgs = mockSendTransacEmail.mock.calls[0][0];
      expect(callArgs.htmlContent).not.toContain('Your Requirements:');
    });

    it('should throw error when email sending fails', async () => {
      const error = new Error('Email sending failed');
      mockSendTransacEmail.mockRejectedValue(error);

      await expect(sendBookingConfirmation(mockBookingData)).rejects.toThrow('Email sending failed');
      expect(mockSendTransacEmail).toHaveBeenCalledTimes(1);
    });

    it('should use default sender email when BREVO_SENDER_EMAIL is not set', async () => {
      delete process.env.BREVO_SENDER_EMAIL;

      const mockResponse = {
        body: {
          messageId: 'test-message-id-789'
        }
      };

      mockSendTransacEmail.mockResolvedValue(mockResponse);

      await sendBookingConfirmation(mockBookingData);

      const callArgs = mockSendTransacEmail.mock.calls[0][0];
      expect(callArgs.sender.email).toBe('noreply@blackienetworks.com');
    });
  });

  describe('sendAdminNotification', () => {
    const mockBookingData = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1234567890',
      service: 'Consultation',
      date: '2024-12-26',
      time: '14:00',
      description: 'Need consultation'
    };

    it('should send admin notification email successfully', async () => {
      // Set ADMIN_EMAIL for this test
      process.env.ADMIN_EMAIL = 'admin@example.com';
      
      const mockResponse = {
        body: {
          messageId: 'admin-message-id-123'
        },
        response: {
          statusCode: 200
        }
      };

      mockSendTransacEmail.mockResolvedValue(mockResponse);

      const result = await sendAdminNotification(mockBookingData);

      expect(mockSendTransacEmail).toHaveBeenCalledTimes(1);
      expect(result.body.messageId).toBe('admin-message-id-123');
      
      const callArgs = mockSendTransacEmail.mock.calls[0][0];
      expect(callArgs.subject).toContain('New Booking:');
      expect(callArgs.to[0].email).toBe('admin@example.com');
      expect(callArgs.htmlContent).toContain('Jane Smith');
      expect(callArgs.htmlContent).toContain('jane@example.com');
      expect(callArgs.htmlContent).toContain('+1234567890');
    });

    it('should handle missing phone number', async () => {
      const bookingDataWithoutPhone = {
        ...mockBookingData,
        phone: undefined
      };

      const mockResponse = {
        body: {
          messageId: 'admin-message-id-456'
        }
      };

      mockSendTransacEmail.mockResolvedValue(mockResponse);

      await sendAdminNotification(bookingDataWithoutPhone);

      const callArgs = mockSendTransacEmail.mock.calls[0][0];
      expect(callArgs.htmlContent).toContain('Not provided');
    });

    it('should skip admin notification when ADMIN_EMAIL is not set', async () => {
      delete process.env.ADMIN_EMAIL;
      delete process.env.BREVO_SENDER_EMAIL;

      const result = await sendAdminNotification(mockBookingData);

      expect(mockSendTransacEmail).not.toHaveBeenCalled();
      expect(result).toBeUndefined();
    });

    it('should throw error when email sending fails', async () => {
      // Set ADMIN_EMAIL for this test
      process.env.ADMIN_EMAIL = 'admin@example.com';
      
      const error = new Error('Admin notification failed');
      mockSendTransacEmail.mockRejectedValue(error);

      await expect(sendAdminNotification(mockBookingData)).rejects.toThrow('Admin notification failed');
      expect(mockSendTransacEmail).toHaveBeenCalledTimes(1);
    });
  });
});

