/* eslint-disable */
// ele-api/services/cognitoAdminService.js

// Import AWS SDK v2 (much more stable)
const AWS = require('aws-sdk');

// Configure AWS
AWS.config.update({
  region: 'us-east-2'
});

// Create Cognito service object
const cognitoISP = new AWS.CognitoIdentityServiceProvider();

// Your Cognito User Pool ID
const USER_POOL_ID = 'us-east-2_qFqFIbjDz';

class CognitoAdminService {
  
  // Function to create a new user
  async createUser(email, userAttributes = {}) {
    try {
      console.log(`Creating user: ${email}`);
      
      // Generate a random temporary password
      const tempPassword = this.generateTemporaryPassword();
      
      // Set up the parameters for creating a user
      const params = {
        UserPoolId: USER_POOL_ID,
        Username: email.split('@')[0] + '_' + Date.now(), // Generate unique username
        TemporaryPassword: tempPassword,
        MessageAction: 'SUPPRESS',
        UserAttributes: [
          {
            Name: 'email',
            Value: email
          },
          {
            Name: 'email_verified',
            Value: 'true'
          },
          {
            Name: 'preferred_username',
            Value: email // Store email as preferred username
          }
        ]
      };

      // Use the promise version for easier async/await
      const result = await cognitoISP.adminCreateUser(params).promise();
      
      console.log(`User ${email} created successfully`);
      
      return {
        success: true,
        message: `User ${email} created successfully. Invitation email sent.`,
        temporaryPassword: tempPassword
      };
      
    } catch (error) {
      console.error('Error creating user:', error.message);
      
      if (error.code === 'UsernameExistsException') {
        return {
          success: false,
          error: 'A user with this email already exists'
        };
      }
      
      return {
        success: false,
        error: error.message || 'Failed to create user'
      };
    }
  }

  // Function to get a list of all users
  async listUsers() {
    try {
      console.log('Fetching user list...');
      
      const params = {
        UserPoolId: USER_POOL_ID,
        Limit: 60
      };

      const result = await cognitoISP.listUsers(params).promise();
      
      const users = result.Users.map(user => {
        const emailAttr = user.Attributes?.find(attr => attr.Name === 'email');
        
        return {
          username: user.Username,
          email: emailAttr ? emailAttr.Value : 'No email',
          status: user.UserStatus,
          enabled: user.Enabled,
          created: user.UserCreateDate,
          lastModified: user.UserLastModifiedDate
        };
      });
      
      console.log(`Found ${users.length} users`);
      
      return {
        success: true,
        users: users
      };
      
    } catch (error) {
      console.error('Error listing users:', error.message);
      return {
        success: false,
        error: error.message || 'Failed to list users'
      };
    }
  }

  // Function to disable a user account
  async disableUser(username) {
    try {
      console.log(`Disabling user: ${username}`);
      
      const params = {
        UserPoolId: USER_POOL_ID,
        Username: username
      };

      await cognitoISP.adminDisableUser(params).promise();
      
      console.log(`User ${username} disabled successfully`);
      
      return {
        success: true,
        message: `User ${username} disabled successfully`
      };
      
    } catch (error) {
      console.error('Error disabling user:', error.message);
      return {
        success: false,
        error: error.message || 'Failed to disable user'
      };
    }
  }

  // Function to enable a user account
  async enableUser(username) {
    try {
      console.log(`Enabling user: ${username}`);
      
      const params = {
        UserPoolId: USER_POOL_ID,
        Username: username
      };

      await cognitoISP.adminEnableUser(params).promise();
      
      console.log(`User ${username} enabled successfully`);
      
      return {
        success: true,
        message: `User ${username} enabled successfully`
      };
      
    } catch (error) {
      console.error('Error enabling user:', error.message);
      return {
        success: false,
        error: error.message || 'Failed to enable user'
      };
    }
  }

  // Function to permanently delete a user
  async deleteUser(username) {
    try {
      console.log(`Deleting user: ${username}`);
      
      const params = {
        UserPoolId: USER_POOL_ID,
        Username: username
      };

      await cognitoISP.adminDeleteUser(params).promise();
      
      console.log(`User ${username} deleted successfully`);
      
      return {
        success: true,
        message: `User ${username} deleted successfully`
      };
      
    } catch (error) {
      console.error('Error deleting user:', error.message);
      return {
        success: false,
        error: error.message || 'Failed to delete user'
      };
    }
  }

  // Helper function to create a secure temporary password
  generateTemporaryPassword() {
    const uppercase = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    const lowercase = 'abcdefghijkmnpqrstuvwxyz';
    const numbers = '23456789';
    const special = '!@#$%^&*';
    
    let password = '';
    
    password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
    password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
    password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    password += special.charAt(Math.floor(Math.random() * special.length));
    
    const allChars = uppercase + lowercase + numbers + special;
    for (let i = 0; i < 8; i++) {
      password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }
    
    return password.split('').sort(() => Math.random() - 0.5).join('');
  }
}

// Export the service
module.exports = new CognitoAdminService();