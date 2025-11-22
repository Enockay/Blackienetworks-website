const {
  generateOTP,
  storeOTP,
  verifyOTP,
  sendOTPViaEmail,
  sendOTPViaSMS,
  sendOTPViaBoth,
  clearOTP,
  getOTPInfo,
  clearAllOTPs,
  getOTPStore
} = require('../utils/otpService');
const { sendNotification } = require('../utils/notificationService');

// Mock notification service
jest.mock('../utils/notificationService', () => ({
  sendNotification: jest.fn()
}));

describe('OTP Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Clear all OTPs and timers before each test
    clearAllOTPs();
  });

  afterAll(() => {
    // Clean up all timers after all tests
    clearAllOTPs();
  });

  describe('generateOTP', () => {
    it('should generate a 6-digit OTP by default', () => {
      const otp = generateOTP();
      expect(otp).toMatch(/^\d{6}$/);
    });

    it('should generate OTP of specified length', () => {
      const otp4 = generateOTP(4);
      const otp8 = generateOTP(8);
      
      expect(otp4).toMatch(/^\d{4}$/);
      expect(otp8).toMatch(/^\d{8}$/);
    });

    it('should generate different OTPs on each call', () => {
      const otp1 = generateOTP();
      const otp2 = generateOTP();
      // Very unlikely to be the same
      expect(otp1).not.toBe(otp2);
    });
  });

  describe('storeOTP and verifyOTP', () => {
    it('should store and verify OTP successfully', () => {
      const identifier = 'test@example.com';
      const otp = '123456';
      
      storeOTP(identifier, otp, 10);
      
      const result = verifyOTP(identifier, otp);
      
      expect(result.valid).toBe(true);
      expect(result.message).toBe('OTP verified successfully');
    });

    it('should reject invalid OTP', () => {
      const identifier = 'test@example.com';
      const correctOTP = '123456';
      const wrongOTP = '654321';
      
      storeOTP(identifier, correctOTP, 10);
      
      const result = verifyOTP(identifier, wrongOTP);
      
      expect(result.valid).toBe(false);
      expect(result.error).toBe('INVALID_OTP');
      expect(result.attemptsRemaining).toBe(4); // 5 max attempts - 1
    });

    it('should reject expired OTP', async () => {
      const identifier = 'test@example.com';
      const otp = '123456';
      
      // Manually create an expired OTP in the store (bypassing storeOTP to avoid cleanup timer)
      const store = getOTPStore();
      const expiredDate = new Date(Date.now() - 1000); // 1 second ago
      store.set(identifier, {
        otp,
        expiresAt: expiredDate,
        attempts: 0,
        maxAttempts: 5
      });
      
      // Verify - should be expired
      const result = verifyOTP(identifier, otp);
      
      expect(result.valid).toBe(false);
      expect(result.error).toBe('OTP_EXPIRED');
      // OTP should be deleted after expiration check
      expect(store.has(identifier)).toBe(false);
    });

    it('should reject OTP after max attempts', () => {
      const identifier = 'test@example.com';
      const correctOTP = '123456';
      const wrongOTP = '654321';
      
      storeOTP(identifier, correctOTP, 10);
      
      // Try wrong OTP 5 times
      for (let i = 0; i < 5; i++) {
        verifyOTP(identifier, wrongOTP);
      }
      
      // Now try correct OTP - should fail because max attempts exceeded
      const result = verifyOTP(identifier, correctOTP);
      
      expect(result.valid).toBe(false);
      expect(result.error).toBe('MAX_ATTEMPTS_EXCEEDED');
    });

    it('should return error for non-existent OTP', () => {
      const result = verifyOTP('nonexistent@example.com', '123456');
      
      expect(result.valid).toBe(false);
      expect(result.error).toBe('OTP_NOT_FOUND');
    });

    it('should delete OTP after successful verification', () => {
      const identifier = 'test@example.com';
      const otp = '123456';
      
      storeOTP(identifier, otp, 10);
      verifyOTP(identifier, otp);
      
      // Try to verify again - should fail
      const result = verifyOTP(identifier, otp);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('OTP_NOT_FOUND');
    });
  });

  describe('sendOTPViaEmail', () => {
    const mockAccessTokenId = 'test-token-id';
    const mockEmail = 'test@example.com';
    const mockRecipientName = 'Test User';

    it('should send OTP via email successfully', async () => {
      const mockNotificationResult = {
        success: true,
        notificationId: 'notif-123',
        messageId: 'msg-123',
        status: 'sent',
        channel: 'email'
      };

      sendNotification.mockResolvedValue(mockNotificationResult);

      const result = await sendOTPViaEmail(mockAccessTokenId, mockEmail, mockRecipientName);

      expect(result.success).toBe(true);
      expect(result.otp).toMatch(/^\d{6}$/);
      expect(result.expiresInMinutes).toBe(10);
      expect(result.notificationId).toBe('notif-123');
      expect(result.messageId).toBe('msg-123');
      
      expect(sendNotification).toHaveBeenCalledTimes(1);
      const callArgs = sendNotification.mock.calls[0];
      expect(callArgs[0]).toBe(mockAccessTokenId);
      expect(callArgs[1]).toBe('email');
      expect(callArgs[2]).toBe(mockEmail);
      expect(callArgs[3].recipientName).toBe(mockRecipientName);
      expect(callArgs[3].subject).toContain('OTP Code');
      expect(callArgs[3].message).toContain(result.otp);
    });

    it('should use custom options', async () => {
      const mockNotificationResult = {
        success: true,
        notificationId: 'notif-456',
        messageId: 'msg-456'
      };

      sendNotification.mockResolvedValue(mockNotificationResult);

      const result = await sendOTPViaEmail(
        mockAccessTokenId,
        mockEmail,
        mockRecipientName,
        { otpLength: 8, expiresInMinutes: 15, subject: 'Custom Subject' }
      );

      expect(result.otp).toMatch(/^\d{8}$/);
      expect(result.expiresInMinutes).toBe(15);
      
      const callArgs = sendNotification.mock.calls[0];
      expect(callArgs[3].subject).toBe('Custom Subject');
    });

    it('should store OTP after sending', async () => {
      const mockNotificationResult = {
        success: true,
        notificationId: 'notif-789',
        messageId: 'msg-789'
      };

      sendNotification.mockResolvedValue(mockNotificationResult);

      const result = await sendOTPViaEmail(mockAccessTokenId, mockEmail);

      // Verify OTP was stored
      const verifyResult = verifyOTP(mockEmail, result.otp);
      expect(verifyResult.valid).toBe(true);
    });

    it('should handle notification service errors', async () => {
      const error = new Error('Notification service failed');
      sendNotification.mockRejectedValue(error);

      await expect(sendOTPViaEmail(mockAccessTokenId, mockEmail)).rejects.toThrow('Notification service failed');
    });
  });

  describe('sendOTPViaSMS', () => {
    const mockAccessTokenId = 'test-token-id';
    const mockPhoneNumber = '+1234567890';

    it('should send OTP via SMS successfully', async () => {
      const mockNotificationResult = {
        success: true,
        notificationId: 'notif-sms-123',
        messageId: 'msg-sms-123',
        status: 'sent',
        channel: 'sms'
      };

      sendNotification.mockResolvedValue(mockNotificationResult);

      const result = await sendOTPViaSMS(mockAccessTokenId, mockPhoneNumber);

      expect(result.success).toBe(true);
      expect(result.otp).toMatch(/^\d{6}$/);
      expect(result.expiresInMinutes).toBe(10);
      expect(result.notificationId).toBe('notif-sms-123');
      
      expect(sendNotification).toHaveBeenCalledTimes(1);
      const callArgs = sendNotification.mock.calls[0];
      expect(callArgs[0]).toBe(mockAccessTokenId);
      expect(callArgs[1]).toBe('sms');
      expect(callArgs[2]).toBe(mockPhoneNumber);
      expect(callArgs[3].message).toContain(result.otp);
    });

    it('should use custom message', async () => {
      const mockNotificationResult = {
        success: true,
        notificationId: 'notif-sms-456',
        messageId: 'msg-sms-456'
      };

      sendNotification.mockResolvedValue(mockNotificationResult);

      const customMessage = 'Your code is: {otp}';
      await sendOTPViaSMS(mockAccessTokenId, mockPhoneNumber, { message: customMessage });

      const callArgs = sendNotification.mock.calls[0];
      expect(callArgs[3].message).toBe(customMessage);
    });

    it('should store OTP after sending', async () => {
      const mockNotificationResult = {
        success: true,
        notificationId: 'notif-sms-789',
        messageId: 'msg-sms-789'
      };

      sendNotification.mockResolvedValue(mockNotificationResult);

      const result = await sendOTPViaSMS(mockAccessTokenId, mockPhoneNumber);

      // Verify OTP was stored
      const verifyResult = verifyOTP(mockPhoneNumber, result.otp);
      expect(verifyResult.valid).toBe(true);
    });
  });

  describe('sendOTPViaBoth', () => {
    const mockAccessTokenId = 'test-token-id';
    const mockEmail = 'test@example.com';
    const mockPhoneNumber = '+1234567890';
    const mockRecipientName = 'Test User';

    it('should send OTP via both email and SMS', async () => {
      const mockEmailResult = {
        success: true,
        notificationId: 'notif-email-123',
        messageId: 'msg-email-123'
      };

      const mockSMSResult = {
        success: true,
        notificationId: 'notif-sms-123',
        messageId: 'msg-sms-123'
      };

      sendNotification
        .mockResolvedValueOnce(mockEmailResult)
        .mockResolvedValueOnce(mockSMSResult);

      const result = await sendOTPViaBoth(mockAccessTokenId, mockEmail, mockPhoneNumber, mockRecipientName);

      expect(result.success).toBe(true);
      expect(result.otp).toMatch(/^\d{6}$/);
      expect(result.email.notificationId).toBe('notif-email-123');
      expect(result.sms.notificationId).toBe('notif-sms-123');
      
      expect(sendNotification).toHaveBeenCalledTimes(2);
      
      // Verify both channels were called
      const emailCall = sendNotification.mock.calls.find(call => call[1] === 'email');
      const smsCall = sendNotification.mock.calls.find(call => call[1] === 'sms');
      
      expect(emailCall).toBeDefined();
      expect(smsCall).toBeDefined();
      expect(emailCall[2]).toBe(mockEmail);
      expect(smsCall[2]).toBe(mockPhoneNumber);
    });

    it('should store OTP for both identifiers', async () => {
      const mockEmailResult = {
        success: true,
        notificationId: 'notif-email-456',
        messageId: 'msg-email-456'
      };

      const mockSMSResult = {
        success: true,
        notificationId: 'notif-sms-456',
        messageId: 'msg-sms-456'
      };

      sendNotification
        .mockResolvedValueOnce(mockEmailResult)
        .mockResolvedValueOnce(mockSMSResult);

      const result = await sendOTPViaBoth(mockAccessTokenId, mockEmail, mockPhoneNumber);

      // Verify OTP can be verified with both identifiers
      const emailVerify = verifyOTP(mockEmail, result.otp);
      const smsVerify = verifyOTP(mockPhoneNumber, result.otp);
      
      expect(emailVerify.valid).toBe(true);
      expect(smsVerify.valid).toBe(true);
    });

    it('should handle partial failures', async () => {
      const mockEmailResult = {
        success: true,
        notificationId: 'notif-email-789',
        messageId: 'msg-email-789'
      };

      const error = new Error('SMS sending failed');
      
      sendNotification
        .mockResolvedValueOnce(mockEmailResult)
        .mockRejectedValueOnce(error);

      await expect(
        sendOTPViaBoth(mockAccessTokenId, mockEmail, mockPhoneNumber)
      ).rejects.toThrow('SMS sending failed');
    });
  });

  describe('clearOTP and getOTPInfo', () => {
    it('should clear OTP', () => {
      const identifier = 'test@example.com';
      const otp = '123456';
      
      storeOTP(identifier, otp, 10);
      clearOTP(identifier);
      
      const result = verifyOTP(identifier, otp);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('OTP_NOT_FOUND');
    });

    it('should get OTP info', () => {
      const identifier = 'test@example.com';
      const otp = '123456';
      
      storeOTP(identifier, otp, 10);
      
      const info = getOTPInfo(identifier);
      expect(info).toBeDefined();
      expect(info.expiresAt).toBeInstanceOf(Date);
      expect(info.attempts).toBe(0);
      expect(info.maxAttempts).toBe(5);
      expect(info.isExpired).toBe(false);
    });

    it('should return null for non-existent OTP', () => {
      const info = getOTPInfo('nonexistent@example.com');
      expect(info).toBeNull();
    });
  });
});

